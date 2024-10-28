import HeroSection from "@/components/homepage/hero-section";
import GetInvolvedSection from "@/components/homepage/involve-section";
import SideBySide from "@/components/homepage/side-by-side";
import TeamMarquee from "@/components/homepage/team-marquee";
import PageWrapper from "@/components/wrapper/page-wrapper";

export default function Home() {
    return (
        <PageWrapper>
            <div className="flex flex-col justify-center items-center w-full">
                <HeroSection />
            </div>
            <div className="flex w-full justify-center items-center bg-black/80">
                <TeamMarquee />
            </div>
            <div className="flex w-full justify-center items-center bg-gray-100/25">
                <SideBySide />
            </div>
            <div className="flex w-full justify-center items-center bg-white dark:bg-gray-900">
                <GetInvolvedSection />
            </div>
        </PageWrapper>
    );
}
