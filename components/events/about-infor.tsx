import { Card, CardContent } from "@/components/ui/card";

import { Calendar, CircleDollarSign, MapPin, Users } from "lucide-react";

export default function AboutInforEvent(props: any) {
    const { price, location, description } = props.eventData;

    return (
        <>
            <div className="pt-16">
                {/* About the League Section */}
                <section id="aboutInfor-event" className="py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-8 text-center">
                            About the League
                        </h2>
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
                    </div>
                </section>
            </div>
        </>
    );
}
