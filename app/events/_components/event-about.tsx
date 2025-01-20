"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Database } from "@/constants/supabase";

import { useState } from "react";

import { motion } from "framer-motion";
import { Calendar, CircleDollarSign, MapPin, Users } from "lucide-react";

export const EventAbout = ({
    league,
    events,
}: {
    league: Database["public"]["Tables"]["leagues"]["Row"];
    events: Database["public"]["Tables"]["events"]["Row"][];
}) => {
    const [selectedEvent, setSelectedEvent] = useState<string>(events[0].title);
    const selectedEventData = events.find(
        (event) => event.title === selectedEvent
    );
    const { description, location, price, date } = selectedEventData || {
        description: "",
        location: "",
        price: "",
        date: "",
    };

    return (
        <>
            <section id="aboutInfor-event" className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 text-center">
                        About the League
                    </h2>
                    <p className="text-lg mb-8 text-center">
                        {league.description}
                    </p>
                </div>
            </section>
            <section className="py-20 bg-gray-200/25">
                <h2 className="text-3xl font-bold mb-8 text-center">
                    Our Conferences
                </h2>
                <div className="flex justify-center space-x-4 mb-">
                    <div className="flex justify-center space-x-4 mb-12">
                        {events.map((event) => (
                            <motion.button
                                key={event.title}
                                onClick={() => setSelectedEvent(event.title)}
                                className={`px-6 py-3 rounded-md text-lg font-semibold transition-all duration-300 ease-in-out ${
                                    selectedEvent === event.title
                                        ? "bg-primary text-primary-foreground shadow-lg"
                                        : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {event.title_short?.split(" - ")[0]}
                            </motion.button>
                        ))}
                    </div>
                </div>
                <motion.div
                    key={selectedEvent}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="max-w-2xl mx-auto text-center mb-8 ">
                        {description}
                    </p>
                    <div className="grid md:grid-cols-4 gap-8 mx-8">
                        <Card>
                            <CardContent className="flex flex-col items-center p-6">
                                <Calendar className="w-12 h-12 text-primary mb-4" />
                                <h3 className="text-xl font-semibold mb-2">
                                    Duration
                                </h3>
                                <p className="text-center">2 days</p>
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
                                    Game Time
                                </h3>
                                <p className="text-center">{date}</p>
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
            </section>
        </>
    );
};
