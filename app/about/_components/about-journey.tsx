import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { MapPin, School, Users } from "lucide-react";
import Link from "next/link";

export const AboutJourney = () => {
    return (
        <section className="py-16 bg-background">
            <div className="container mx-auto px-4 space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">Our Journey</h2>
                <div className="grid lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <div className="space-y-6 text-lg text-muted-foreground">
                                <p className="text-xl font-semibold text-primary">
                                    However, our journeys have not always been
                                    so easy.
                                </p>

                                <div className="space-y-6 text-lg text-muted-foreground">
                                    <p>
                                        The ABSENCE of an inclusive Asian
                                        women&apos;s basketball community has
                                        held us back from pursuing our
                                        enthusiasm toward basketball. There were
                                        too few opportunities for Asian girls
                                        who wanted to participate in basketball
                                        on the court, and it is difficult for an
                                        Asian woman to find a platform that
                                        supports their basketball journey.
                                    </p>

                                    <p>
                                        In summer 2018, we commenced our journey
                                        on promoting the celebration of
                                        inclusion and diversity of basketball.
                                        We began as a student club that
                                        organized regional tournaments and
                                        invited female players from schools to
                                        join.
                                    </p>
                                </div>
                                <div className="py-4">
                                    <h3 className="text-2xl font-semibold text-primary mb-2">
                                        Born in 2021
                                    </h3>
                                    <p>
                                        In 2021, She Got Buckets was born, and
                                        now we are here to make a change.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex flex-col items-center text-center space-y-2">
                                        <MapPin className="h-8 w-8 text-primary mb-2" />
                                        <p className="text-2xl font-bold">4</p>
                                        <p className="text-sm text-muted-foreground">
                                            Countries: US, UK, China, Japan
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex flex-col items-center text-center space-y-2">
                                        <Users className="h-8 w-8 text-primary mb-2" />
                                        <p className="text-2xl font-bold">
                                            500+
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Participants across the globe
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex flex-col items-center text-center space-y-2">
                                        <School className="h-8 w-8 text-primary mb-2" />
                                        <p className="text-2xl font-bold">
                                            15+
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Colleges represented
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <div className="space-y-16 flex flex-col justify-between">
                        <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
                            <div className="lg:flex-1">
                                <div className="aspect-video">
                                    <iframe
                                        className="w-full h-full rounded-lg"
                                        src="https://www.youtube.com/embed/svrHjZ98clg"
                                        title="SHE GOT BUCKETS ORIGINAL SERIES"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                                <p className="text-sm text-center mt-2 text-muted-foreground">
                                    Asian women age 5-71 answering &ldquo;Why
                                    basketball?&rdquo;
                                </p>
                            </div>
                            <div className="absolute inset-0 bg-primary/10 pointer-events-none" />
                        </div>
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="text-xl font-semibold mb-2">
                                    Our Story in Motion
                                </h3>
                                <p className="text-muted-foreground mb-4">
                                    Watch how She Got Buckets is changing the
                                    game for Asian women in basketball.
                                </p>
                                <Link href="https://www.youtube.com/channel/UCRop7F7123gr14AS-5oFLWA">
                                    <Button variant="default">
                                        Learn More About In Our Chanel
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};
