import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Award, Globe, Shield, Target, Users, Users2 } from "lucide-react";

export function AboutWhoWeAre() {
    return (
        <section className="pt-16">
            <div className="container px-0">
                <div className="max-w-3xl mx-auto relative">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold mb-4">Who We Are</h2>
                    </div>
                    <Card className="backdrop-blur-sm bg-card/95 mb-8">
                        <CardContent className="p-8">
                            <div className="prose prose-gray dark:prose-invert mx-auto">
                                <div className="space-y-6 text-center">
                                    <p className="text-lg leading-relaxed">
                                        She Got Buckets is a 501(c)3 non-profit
                                        organization. We aim to create an open
                                        platform for all Asian Women to enhance
                                        their recreational skills and confidence
                                        through basketball tournaments,
                                        competitive leagues, and training
                                        events.
                                    </p>
                                    <p className="text-lg leading-relaxed">
                                        Our community is open for women across
                                        all recreational level, providing a safe
                                        environment for every Asian woman to
                                        pursue their passion in sports and
                                        basketball.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid lg:grid-cols-2 gap-12 bg-gray-200/25 py-10 px-5">
                    <div className="space-y-6">
                        <Card className="border-2 border-primary/10">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                                    <Target className="h-6 w-6 text-primary" />
                                    Our Mission
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <p className="text-lg text-muted-foreground min-h-[10rem]">
                                    We&apos;re here to expand our community
                                    influence, empowering every Asian woman to
                                    break barriers and make powerful
                                    connections, and thrive through the game of
                                    basketball.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        { icon: Users, text: "Leadership" },
                                        { icon: Award, text: "Empowerment" },
                                        {
                                            icon: Shield,
                                            text: "Breaking Barriers",
                                        },
                                    ].map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col items-center p-4 bg-primary/5 rounded-lg"
                                        >
                                            <item.icon className="h-8 w-8 text-primary mb-2" />
                                            <span className="font-medium">
                                                {item.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card className="border-2 border-primary/10">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                                    <Globe className="h-6 w-6 text-primary" />
                                    Our Vision
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <p className="text-lg text-muted-foreground min-h-[10rem]">
                                    Our vision is to create a global basketball
                                    community for Asian women, open to all ages,
                                    income levels, and recreational levels. We
                                    strive to break barriers, build strength,
                                    and provide resources to enable Asian female
                                    worldwide in accessing recreational
                                    resources and inspire future generations.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        { icon: Users2, text: "Teamwork" },
                                        { icon: Award, text: "Confidence" },
                                        { icon: Users, text: "All Ages" },
                                    ].map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col items-center p-4 bg-primary/5 rounded-lg"
                                        >
                                            <item.icon className="h-8 w-8 text-primary mb-2" />
                                            <span className="font-medium">
                                                {item.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
