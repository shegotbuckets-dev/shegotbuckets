"use client";

import Image from "next/image";

export default function WhoWeAre() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative h-[600px] flex items-center justify-center">
                <Image
                    src="/images/court.png"
                    alt="Basketball court"
                    fill
                    className="object-cover"
                />
            </section>
            <section className="relative z-10 text-center px-4">
                <div className="max-w-2xl mx-auto px-4 py-8 text-center space-y-8">
                    <h1 className="text-4xl font-bold tracking-tight">
                        Who We Are
                    </h1>
                    <div className="w-12 h-[1px] bg-neutral-300 mx-auto" />
                    <blockquote className="text-2xl font-serif italic text-neutral-800">
                        ONCE WE PLAY ON THE COURT,
                        <br />
                        WE IMMEDIATELY BECAME A FAMILY
                        <br />A FAMILY.
                    </blockquote>
                    <div className="w-12 h-[1px] bg-neutral-300 mx-auto" />
                </div>
            </section>

            <section className="py-8 px-4 text-center">
                <div className="max-w-4xl mx-auto">
                    <p className="text-lg mb-4">
                        She Got Buckets is a 501 (c) 3 non-profit organization.
                        We aim to create an open platform for all Asian Women to
                        enhance their recreational skills and confidence through
                        basketball tournaments, competitive leagues, and
                        training events.
                    </p>
                    <p className="text-lg">
                        Our community is open for women across all recreational
                        level, providing a safe environment for every Asian
                        woman to pursue their passion in sports and basketball.
                    </p>
                </div>
            </section>
        </div>
    );
}
