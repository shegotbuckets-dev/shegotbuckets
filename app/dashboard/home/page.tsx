import { Metadata } from "next";

import { DashboardContent } from "../_components/dashboard-content";

export const metadata: Metadata = {
    title: "Dashboard",
    description:
        "Your She Got Buckets dashboard home page with upcoming events and important information.",
};

export default function DashboardHomePage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-8">
                She Got Buckets Dashboard
            </h1>

            <div className="grid gap-8">
                <DashboardContent />
            </div>
        </div>
    );
}
