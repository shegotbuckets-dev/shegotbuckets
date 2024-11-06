import { Button } from "@/components/ui/button";

import Link from "next/link";

export default function Registration() {
    return (
        <section id="registration-event" className="py-16">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-8">
                    Register for the League
                </h2>
                <p className="mb-8">
                    Secure your spot in the College League 2024. Limited spaces
                    available!
                </p>
                <Link href="/dashboard">
                    <Button size="lg">Register Now</Button>
                </Link>
            </div>
        </section>
    );
}
