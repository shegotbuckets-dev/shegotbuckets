import { WaiverContentPDF } from "@/app/dashboard/_components/table-section/waiver-column/waiver-content-PDF";
import { WaiverSignedEmail } from "@/app/dashboard/_components/table-section/waiver-column/waiver-email";

import { renderToBuffer } from "@react-pdf/renderer";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "");

// Add this to your environment variables or configuration
const ADMIN_EMAIL = "waivers@shegotbuckets.org";

interface RequestBody {
    name: string;
    email: string;
    signatureData: string;
    timestamp: string;
    firstName: string;
    lastName: string;
    tournamentName: string;
    location: string;
    eventDate: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: RequestBody = await request.json();

        if (
            !body.email ||
            !body.signatureData ||
            !body.firstName ||
            !body.lastName ||
            !body.timestamp
        ) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const signatureData = body.signatureData.split(",");
        if (signatureData.length !== 2 || !signatureData[1]) {
            return NextResponse.json(
                { error: "Invalid signature data" },
                { status: 400 }
            );
        }

        const signatureBuffer = Buffer.from(signatureData[1], "base64");
        const signatureDataUrl = `data:image/png;base64,${signatureBuffer.toString("base64")}`;

        const pdfBuffer = await renderToBuffer(
            WaiverContentPDF({
                firstName: body.firstName,
                lastName: body.lastName,
                signatureDataUrl: signatureDataUrl,
                timestamp: body.timestamp,
            })
        );

        const { data, error } = await resend.emails.send({
            from: "SHE GOT BUCKETS OFFICIAL: DO NOT REPLY <noreply@shegotbuckets.org>",
            to: [body.email, ADMIN_EMAIL],
            subject: `SGB Waiver - ${body.tournamentName}`,
            react: WaiverSignedEmail({
                name: body.name,
                tournamentName: body.tournamentName,
                location: body.location,
                eventDate: body.eventDate,
            }),
            attachments: [
                {
                    filename: `SGB Waiver - ${body.tournamentName}.pdf`,
                    content: pdfBuffer,
                },
            ],
        });

        if (error) {
            return NextResponse.json(
                { error: "Failed to send email" + error },
                { status: 500 }
            );
        }

        return NextResponse.json({ data });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal server error" + error },
            { status: 500 }
        );
    }
}
