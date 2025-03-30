import { QAStory } from "./_components/qa-story";
import { ResourcesSection } from "./_components/resources-section";

export const metadata = {
    title: "Q&A and Resources",
    description:
        "Find answers to frequently asked questions about She Got Buckets and access valuable resources for women's basketball and financial independence.",
    openGraph: {
        title: "Q&A and Resources - She Got Buckets",
        description:
            "Find answers to frequently asked questions about She Got Buckets and access valuable resources for women's basketball and financial independence.",
    },
};

export default function QnAPage() {
    return (
        <main className="min-h-screen pt-20">
            {/* Story section - white/transparent background */}
            <div className="flex w-full justify-center items-center bg-gray-50 dark:bg-gray-900/30">
                <div className="w-full max-w-7xl">
                    <QAStory />
                </div>
            </div>

            {/* Resources section */}
            <div className="flex w-full justify-center items-center bg-white/10">
                <div className="w-full max-w-7xl">
                    <ResourcesSection />
                </div>
            </div>
        </main>
    );
}
