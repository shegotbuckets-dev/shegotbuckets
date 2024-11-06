import { Button } from "@/components/ui/button";
import { SUPABASE_STORAGE } from "@/public/constants/events";

import { Calendar, ChevronRight, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSectionEvent(props: any) {
    const { image, title, subtitle, date, location } = props.eventData;

    return (
        <>
            <section
                className="relative bg-gradient-to-br from-primary to-primary-foreground overflow-hidden"
                id="heroCard-event"
            >
                <div className="absolute inset-0">
                    <Image
                        src={
                            SUPABASE_STORAGE.EVENTS_BUCKET_URL_TEST +
                                "eventImage.jpg" || image
                        }
                        alt="Basketball court"
                        fill
                        className="object-cover mix-blend-overlay opacity-20"
                    />
                </div>
                <div className="relative container mx-auto px-4 py-24 sm:py-32">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                            {title}
                        </h1>
                        <p className="text-xl sm:text-2xl text-primary-foreground mb-8">
                            {subtitle}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                            <div className="flex items-center text-primary-foreground">
                                <Calendar className="w-5 h-5 mr-2 mb-1" />
                                <span>{date}</span>
                            </div>
                            <div className="flex items-center text-primary-foreground">
                                <MapPin className="w-5 h-5 mr-2 mb-1" />
                                <span>{location}</span>
                            </div>
                            <div className="flex items-center text-primary-foreground">
                                <Users className="w-5 h-5 mr-2 mb-1" />
                                <span>32 Teams</span>
                            </div>
                        </div>
                        <Button size="lg" asChild className="group">
                            <Link href="#register">
                                Register Now
                                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
            </section>
        </>
    );
}
