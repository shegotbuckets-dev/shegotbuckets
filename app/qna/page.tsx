import { Metadata } from "next";

import QAAccordion from "./_components/qa-accordion";
import { QAStory } from "./_components/qa-story";
import { ResourcesSection } from "./_components/resources-section";

export const metadata: Metadata = {
    title: "FAQ",
    description:
        "Find answers to commonly asked questions about team registration, waivers, and payments",
    openGraph: {
        title: "FAQ and Resources - She Got Buckets",
        description:
            "Find answers to commonly asked questions about team registration, waivers, and payments",
    },
};

export default function QnAPage() {
    return (
        <main className="min-h-screen pt-20">
            {/* Add an H1 that can be visually hidden if needed */}
            <h1 className="sr-only">FAQ and Resources - She Got Buckets</h1>

            {/* Q&A Accordion - white/transparent background */}
            <div className="flex w-full justify-center items-center bg-white/10">
                <div className="w-full max-w-7xl">
                    <QAAccordion />
                </div>
            </div>

            {/* story section - light background */}
            <div className="flex w-full justify-center items-center bg-gray-200/25">
                <div className="w-full max-w-7xl">
                    <QAStory />
                </div>
            </div>

            {/* Resources section - white/transparent background */}
            <div className="flex w-full justify-center items-center bg-white/10">
                <div className="w-full max-w-7xl">
                    <ResourcesSection />
                </div>
            </div>
        </main>
    );
}
