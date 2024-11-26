import { userCreate } from "@/utils/data/user/userCreate";
import { userUpdate } from "@/utils/data/user/userUpdate";

import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error(
            "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
        );
    }

    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Missing svix headers", { status: 400 });
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(WEBHOOK_SECRET);
    let evt: WebhookEvent;

    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        return new Response("Verification error", { status: 400 });
    }

    const eventType = evt.type;

    switch (eventType) {
        case "user.created":
            try {
                const result = await userCreate({
                    email: payload?.data?.email_addresses?.[0]?.email_address,
                    first_name: payload?.data?.first_name || null,
                    last_name: payload?.data?.last_name || null,
                    profile_image_url: payload?.data?.profile_image_url || null,
                    user_id: payload?.data?.id,
                });

                return NextResponse.json({
                    status: 200,
                    message: "User info inserted",
                    result,
                });
            } catch (error: any) {
                console.error("User creation error:", error);
                return NextResponse.json({
                    status: 400,
                    message: error.message,
                });
            }

        case "user.updated":
            try {
                await userUpdate({
                    email: payload?.data?.email_addresses?.[0]?.email_address,
                    first_name: payload?.data?.first_name || null,
                    last_name: payload?.data?.last_name || null,
                    profile_image_url: payload?.data?.profile_image_url || null,
                    user_id: payload?.data?.id,
                });

                return NextResponse.json({
                    status: 200,
                    message: "User info updated",
                });
            } catch (error: any) {
                console.error("User update error:", error);
                return NextResponse.json({
                    status: 400,
                    message: error.message,
                });
            }

        default:
            return new Response("Unhandled event type", { status: 200 });
    }
}
