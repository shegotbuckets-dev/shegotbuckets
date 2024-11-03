"use client";

import TeamMarquee from "@/components/common/team-marquee";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { useState } from "react";

import {
    Award,
    BookOpen,
    Calendar,
    ChevronRight,
    Flag,
    MapPin,
    Trophy,
    Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const mockData: any = {
    event1: {
        id: "event1",
        title: "College Basketball League",
        subtitle: "Spring 2024 Season",
        image: "/images/court.png",
        description: `Join our competitive college basketball league starting this spring. 
        Teams will compete in a round-robin format followed by playoffs. 
        Perfect for college students looking to play organized basketball.`,
        date: "Starts March 15, 2024",
        location: "Main Campus Arena",
        price: "$250 per team",
    },
    event2: {
        id: "event2",
        title: "Summer Skills Camp",
        subtitle: "Elite Training Program",
        image: "/images/league.png",
        description: `Intensive basketball skills development camp led by professional coaches. 
        Focus on fundamentals, advanced techniques, and game strategy. 
        Limited spots available for serious players looking to improve their game.`,
        date: "July 10-24, 2024",
        location: "SGB Training Facility",
        price: "$450 per player",
    },
    event3: {
        id: "event3",
        title: "National Tournament",
        subtitle: "Championship Series",
        image: "/images/league.png",
        description: `Annual national tournament bringing together top teams from across the country. 
        Compete against the best talent and showcase your skills. 
        Tournament includes division brackets for different skill levels.`,
        date: "August 15-20, 2024",
        location: "National Sports Complex",
        price: "$600 per team",
    },
};

export default function EventPage() {
    const { id } = useParams();

    const eventData = mockData[id.toString()];

    const [language, setLanguage] = useState<"en" | "zh">("en");

    // Option 1: Add a loading check
    if (!eventData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-background text-foreground pt-20">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary to-primary-foreground overflow-hidden">
                <div className="absolute inset-0">
                    {eventData?.image && (
                        <Image
                            src={eventData.image}
                            alt="Basketball court"
                            fill
                            className="object-cover mix-blend-overlay opacity-20"
                        />
                    )}
                </div>
                <div className="relative container mx-auto px-4 py-24 sm:py-32">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                            {eventData.title}
                        </h1>
                        <p className="text-xl sm:text-2xl text-primary-foreground mb-8">
                            {eventData.subtitle}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                            <div className="flex items-center text-primary-foreground">
                                <Calendar className="w-5 h-5 mr-2" />
                                <span>{eventData.date}</span>
                            </div>
                            <div className="flex items-center text-primary-foreground">
                                <MapPin className="w-5 h-5 mr-2" />
                                <span>{eventData.location}</span>
                            </div>
                            <div className="flex items-center text-primary-foreground">
                                <Users className="w-5 h-5 mr-2" />
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
            <section className="flex w-full justify-center items-center bg-black/80">
                <TeamMarquee />
            </section>
            {/* About the League Section */}
            <section id="about" className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 text-center">
                        About the League
                    </h2>
                    <p className="max-w-2xl mx-auto text-center mb-8">
                        {eventData.description}
                    </p>
                    <div className="grid md:grid-cols-4 gap-8">
                        <Card>
                            <CardContent className="flex flex-col items-center p-6">
                                <Calendar className="w-12 h-12 text-primary mb-4" />
                                <h3 className="text-xl font-semibold mb-2">
                                    Duration
                                </h3>
                                <p className="text-center">6 days</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="flex flex-col items-center p-6">
                                <MapPin className="w-12 h-12 text-primary mb-4" />
                                <h3 className="text-xl font-semibold mb-2">
                                    Location
                                </h3>
                                <p className="text-center">
                                    {eventData.location}
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="flex flex-col items-center p-6">
                                <Users className="w-12 h-12 text-primary mb-4" />
                                <h3 className="text-xl font-semibold mb-2">
                                    Game Times
                                </h3>
                                <p className="text-center">
                                    Saturdays, 2 PM - 8 PM
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="flex flex-col items-center p-6">
                                <Users className="w-12 h-12 text-primary mb-4" />
                                <h3 className="text-xl font-semibold mb-2">
                                    Price
                                </h3>
                                <p className="text-center">{eventData.price}</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
            {/*League Info Section */}
            <section className="py-16 bg-muted">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 text-center">
                        League Info
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card>
                            <CardContent className="flex flex-col items-center p-6">
                                <Flag className="w-12 h-12 text-primary mb-4" />
                                <h3 className="text-xl font-semibold mb-2">
                                    Certified Referees
                                </h3>
                                <p className="text-center">
                                    Two certified referees per game
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="flex flex-col items-center p-6">
                                <Trophy className="w-12 h-12 text-primary mb-4" />
                                <h3 className="text-xl font-semibold mb-2">
                                    Playoffs
                                </h3>
                                <p className="text-center">
                                    Single-elimination playoffs for eligible
                                    teams
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="flex flex-col items-center p-6">
                                <Award className="w-12 h-12 text-primary mb-4" />
                                <h3 className="text-xl font-semibold mb-2">
                                    Prizes
                                </h3>
                                <p className="text-center">
                                    Team championship prizes
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="mx-auto py-6">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Card className="cursor-pointer transition-all hover:shadow-lg border-4 border-primary bg-primary-foreground">
                                    <CardContent className="flex items-center justify-between p-6">
                                        <div className="flex items-center">
                                            <BookOpen className="w-16 h-16 text-primary mr-6" />
                                            <div>
                                                <h3 className="text-2xl font-bold mb-2 text-primary">
                                                    Rule Book
                                                </h3>
                                                <p className="text-lg">
                                                    Essential guidelines for all
                                                    players
                                                </p>
                                            </div>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            className="ml-4"
                                        >
                                            View Rules
                                        </Button>
                                    </CardContent>
                                </Card>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[800px]">
                                <div className="relative">
                                    <div className="absolute top-4 right-4 z-10">
                                        <Button
                                            onClick={() =>
                                                setLanguage(
                                                    language === "en"
                                                        ? "zh"
                                                        : "en"
                                                )
                                            }
                                            variant="outline"
                                            size="sm"
                                        >
                                            {language === "en" ? "中文" : "EN"}
                                        </Button>
                                    </div>
                                    <div className="mt-2">
                                        {language === "en" ? (
                                            <Image
                                                src="/images/rule.png"
                                                alt="Tournament Rules in English"
                                                width={800}
                                                height={1000}
                                                className="w-full rounded-lg"
                                            />
                                        ) : (
                                            <Image
                                                src="/images/ruleChinese.png"
                                                alt="Tournament Rules in Chinese"
                                                width={800}
                                                height={1000}
                                                className="w-full rounded-lg"
                                            />
                                        )}
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </section>
            {/* Registration Section */}
            <section id="register" className="py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-8">
                        Register for the League
                    </h2>
                    <p className="mb-8">
                        Secure your spot in the College League 2024. Limited
                        spaces available!
                    </p>
                    <Button size="lg">Register Now</Button>
                </div>
            </section>
        </div>
    );
}
