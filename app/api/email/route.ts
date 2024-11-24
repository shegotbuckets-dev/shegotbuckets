import { WaiverContentPDF } from "@/app/dashboard/_components/table-section/waiver-column/waiver-content-PDF";
import { WaiverSignedEmail } from "@/app/dashboard/_components/table-section/waiver-column/waiver-email";

import { renderToBuffer } from "@react-pdf/renderer";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface RequestBody {
    name: string;
    email: string;
    signatureData: string;
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
            !body.lastName
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
            })
        );

        const { data, error } = await resend.emails.send({
            from: "sgb-no-reply <noreply@shegotbuckets.org>",
            to: [body.email],
            subject: "SGB Adult Player Registration Form",
            react: WaiverSignedEmail({
                name: body.name,
                tournamentName: body.tournamentName,
                location: body.location,
                eventDate: body.eventDate,
            }),
            attachments: [
                {
                    filename: "waiver.pdf",
                    content: pdfBuffer,
                },
            ],
        });

        if (error) {
            console.error("Resend API error:", error);
            return NextResponse.json(
                { error: "Failed to send email" },
                { status: 500 }
            );
        }

        return NextResponse.json({ data });
    } catch (error) {
        console.error("Unexpected error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
