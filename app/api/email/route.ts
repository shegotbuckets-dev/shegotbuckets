import WaiverSignedEmail from "@/components/sign-waiver/waiver-email";

import { NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    const body = await request.json();

    try {
        const { data } = await resend.emails.send({
            from: "David <onboarding@resend.dev>",
            to: [`${body.email}`],
            subject: "Welcome to SGB!!!",
            react: WaiverSignedEmail({ name: `${body.name}` }),
        });

        return Response.json({ data });
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
