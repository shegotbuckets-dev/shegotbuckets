import WorkInProgress from "@/components/common/wip";

export const metadata = {
    title: "About",
};

export default function About() {
    return (
        <WorkInProgress features={["Details about SGB's story", "Etc..."]} />
    );
}
