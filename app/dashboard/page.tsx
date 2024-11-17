import EventSection from "@/app/dashboard/_components/events-section";

export default function DashboardPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-8">
                She Got Buckets Dashboard
            </h1>

            <div className="grid gap-8">
                <EventSection />
            </div>
        </div>
    );
}
