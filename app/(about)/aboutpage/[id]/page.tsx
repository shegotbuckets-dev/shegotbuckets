import WhoWeAre from "@/components/about/who-we-are";
import WorkInProgress from "@/components/common/wip";

export default async function AboutPage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = params;

    switch (id) {
        case "whoweare":
            return <WhoWeAre />;
        default:
            return <WorkInProgress features={["Our Story", "Etc..."]} />;
    }
}
