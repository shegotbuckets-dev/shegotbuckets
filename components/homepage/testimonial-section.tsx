"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import YouTubePlayer from "@/components/youtube";

import { useEffect, useState } from "react";

export default function TestimonialSection() {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) return;

        const updateCurrent = () => setCurrent(api.selectedScrollSnap());
        setCount(api.scrollSnapList().length);
        updateCurrent();

        api.on("select", updateCurrent);
        return () => {
            api.off("select", updateCurrent);
        };
    }, [api]);

    const testimonials = [
        {
            quote: "SGB has been instrumental in my basketball journey. They provided opportunities I never thought possible.",
            author: "Emily Chen",
            age: 19,
            avatar: "/placeholder.svg?height=40&width=40",
        },
        {
            quote: "Being part of SGB changed my perspective on what Asian athletes can achieve in basketball. The community here is incredible.",
            author: "Mei Wong",
            age: 21,
            avatar: "/placeholder.svg?height=40&width=40",
        },
        {
            quote: "Through SGB, I found the confidence to pursue basketball seriously. They believe in us and push us to be our best.",
            author: "Sarah Kim",
            age: 18,
            avatar: "/placeholder.svg?height=40&width=40",
        },
        {
            quote: "The support from SGB has been amazing. They've helped me grow not just as a player, but as a person too.",
            author: "Lisa Park",
            age: 20,
            avatar: "/placeholder.svg?height=40&width=40",
        },
    ];

    return (
        <section className="w-4/5 mx-auto my-12 md:my-16 lg:my-20">
            <div className="container">
                <h2 className="text-3xl font-bold text-center mb-4">
                    Voices from Asian Women (Age 5-71)
                </h2>
                <Separator className="mb-16 mx-auto w-96" />
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* YouTube Video */}
                    <div className="lg:flex-1">
                        <div className="aspect-video">
                            <YouTubePlayer
                                videoId="MEwtLELK0DM"
                                title="Asian women age 5-71 answering 'Why basketball?'"
                                autoplay={false}
                                muted={false}
                                controls={true}
                                loop={false}
                            />
                        </div>
                        <p className="text-sm text-center mt-2 text-muted-foreground">
                            Asian women age 5-71 answering &ldquo;Why
                            basketball?&rdquo;
                        </p>
                    </div>

                    {/* Testimonials Carousel */}
                    <Carousel
                        setApi={setApi}
                        opts={{ align: "start" }}
                        orientation="vertical"
                        className="lg:flex-1 relative"
                    >
                        <CarouselContent className="-mt-1 h-[400px]">
                            {testimonials.map((testimonial, index) => (
                                <CarouselItem
                                    key={index}
                                    className="pt-1 md:basis-1/2"
                                >
                                    <div className="p-1">
                                        <Card>
                                            <CardContent className="flex flex-col justify-between p-6">
                                                <blockquote className="mb-4 text-lg italic">
                                                    &ldquo;{testimonial.quote}
                                                    &rdquo;
                                                </blockquote>
                                                <div className="flex items-center">
                                                    <Avatar className="h-10 w-10 mr-4">
                                                        <AvatarImage
                                                            src={
                                                                testimonial.avatar
                                                            }
                                                            alt={
                                                                testimonial.author
                                                            }
                                                        />
                                                        <AvatarFallback>
                                                            {testimonial.author
                                                                .split(" ")
                                                                .map(
                                                                    (n) => n[0]
                                                                )
                                                                .join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-semibold">
                                                            {testimonial.author}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            Age{" "}
                                                            {testimonial.age}
                                                        </p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        {current > 0 && (
                            <CarouselPrevious className="absolute left-1/2 -translate-x-1/2 top-2" />
                        )}
                        {current < count - 1 && (
                            <CarouselNext className="absolute left-1/2 -translate-x-1/2 bottom-2" />
                        )}
                    </Carousel>
                </div>
            </div>
        </section>
    );
}
