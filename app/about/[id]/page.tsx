import { MemberDetailPage } from "../_components/about-member-detail";

export default function AboutMemberPage({
    params,
}: {
    params: { id: string };
}) {
    return (
        <main>
            <MemberDetailPage params={params} />
        </main>
    );
}
