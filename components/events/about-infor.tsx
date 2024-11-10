"use client";

import { Card, CardContent } from "@/components/ui/card";
import { leagueData } from "@/constants/events";

import { useState } from "react";

import { motion } from "framer-motion";
import { Calendar, CircleDollarSign, MapPin, Users } from "lucide-react";

export default function AboutInforEvent() {
    const [selectedLeague, setSelectedLeague] = useState<
        "Southern Conference" | "Northern Conference" | "National Finals"
    >("National Finals");
    const { description, location, price } = leagueData[selectedLeague];

    return (
        <section id="aboutInfor-event" className="py-20 bg-gray-200/25">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-center">
                    About the League
                </h2>
                <div className="flex justify-center space-x-4 mb-8">
                    <div className="flex justify-center space-x-4 mb-12">
                        {(
                            [
                                "Southern Conference",
                                "Northern Conference",
                                "National Finals",
                            ] as const
                        ).map((league) => (
                            <motion.button
                                key={league}
                                onClick={() => setSelectedLeague(league)}
                                className={`px-6 py-3 rounded-md text-lg font-semibold transition-all duration-300 ease-in-out ${
                                    selectedLeague === league
                                        ? "bg-primary text-primary-foreground shadow-lg"
                                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {league}
                            </motion.button>
                        ))}
                    </div>
                </div>
                <motion.div
                    key={selectedLeague}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="max-w-2xl mx-auto text-center mb-8">
                        {description}
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
                                <p className="text-center">{location}</p>
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
                                <CircleDollarSign className="w-12 h-12 text-primary mb-4" />
                                <h3 className="text-xl font-semibold mb-2">
                                    Price
                                </h3>
                                <p className="text-center">{price}</p>
                            </CardContent>
                        </Card>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
