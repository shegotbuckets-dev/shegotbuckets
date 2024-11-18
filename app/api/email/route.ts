import WaiverSignedEmail from "@/components/sign-waiver/waiver-email";

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface RequestBody {
    name: string;
    email: string;
    signatureData: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: RequestBody = await request.json();

        if (!body.email || !body.signatureData) {
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

        const { data, error } = await resend.emails.send({
            from: "sgb-no-reply <noreply@shegotbuckets.org>",
            to: [body.email],
            subject: "Welcome to SGB!!!",
            react: WaiverSignedEmail({ name: body.name }),
            attachments: [
                {
                    filename: "signature.png",
                    content: signatureBuffer,
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
