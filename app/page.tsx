import BannerSection from "@/components/homepage/banner-section";
import EventsSection from "@/components/homepage/events-section";
import HeroSection from "@/components/homepage/hero-section";
import GetInvolvedSection from "@/components/homepage/involve-section";
import SideBySide from "@/components/homepage/side-by-side";
import TestimonialSection from "@/components/homepage/testimonial-section";
import PageWrapper from "@/components/wrapper/page-wrapper";

export default function Home() {
    return (
        <PageWrapper>
            <div className="flex flex-col justify-center items-center w-full">
                <HeroSection />
            </div>
            <div className="flex w-full justify-center items-center bg-white/10">
                <BannerSection />
            </div>
            <div className="flex w-full justify-center items-center bg-gray-200/25">
                <SideBySide />
            </div>
            <div className="flex w-full justify-center items-center bg-white/10">
                <TestimonialSection />
            </div>
            <div className="flex w-full justify-center items-center bg-gray-200/25">
                <GetInvolvedSection />
            </div>
            <div className="flex w-full justify-center items-center bg-white/10">
                <EventsSection />
            </div>
        </PageWrapper>
    );
}
