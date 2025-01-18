import { MemberDetailPage } from "../_components/about-member-detail";

export default function About({ params }: { params: { id: string } }) {
    return (
        <main className="min-h-screen bg-background">
            <MemberDetailPage params={params} />
        </main>
    );
}
