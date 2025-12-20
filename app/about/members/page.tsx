import { AboutMembers } from "../_components/about-members";

export const metadata = {
    title: "Meet Our Members",
    description:
        "Explore the She Got Buckets team, learn about their roles, and discover the people driving our mission forward.",
    openGraph: {
        title: "Meet Our Members",
        description:
            "Get to know the She Got Buckets members and the leadership powering our community.",
    },
};

export default function AboutMembersPage() {
    return (
        <main className="min-h-screen bg-white/10">
            <div className="flex w-full justify-center items-start pt-20">
                <div className="w-full max-w-7xl">
                    <AboutMembers />
                </div>
            </div>
        </main>
    );
}
