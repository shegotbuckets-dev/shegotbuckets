import EventsHome from "@/components/homepage/event-home";
import HeroSection from "@/components/homepage/hero-section";
// import MarketingCards from "@/components/homepage/marketing-cards";
import SideBySide from "@/components/homepage/side-by-side";
import PageWrapper from "@/components/wrapper/page-wrapper";

export default function Home() {
    return (
        <PageWrapper>
            <div className="flex flex-col justify-center items-center w-full">
                <HeroSection />
            </div>
            <div className="flex w-full justify-center items-center bg-orange-100/25">
                <SideBySide />
            </div>
            <div className="flex w-full py-12 justify-center items-center bg-blue-100/25">
                <EventsHome />
            </div>
            {/* <div className="flex flex-col p-2 w-full justify-center items-center">
                <MarketingCards />
            </div> */}
        </PageWrapper>
    );
}
