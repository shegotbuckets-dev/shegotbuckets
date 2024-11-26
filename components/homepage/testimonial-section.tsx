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

import { useEffect, useState } from "react";

export const TestimonialSection = () => {
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
            quote: "Once we play on the court, we immediately become a family.",
            author: "Lexi",
            age: 24,
            avatar: "/placeholder.svg?height=40&width=40",
        },
        {
            quote: "We’ve shared not only the thrill of the games but also the joy of this journey, and it’s been such a fun and rewarding experience.",
            author: "Team Xiaolongbao",
            age: 20,
            avatar: "/placeholder.svg?height=40&width=40",
        },
        {
            quote: "Through She Got Buckets, I got the chance to reach out and connect with more girls who love basketball.",
            author: "Miro",
            age: 25,
            avatar: "/placeholder.svg?height=40&width=40",
        },
        {
            quote: "There is no such thing as an overrated team or player. There are only ordinary people with perseverance and passion who are underrated and overlooked.",
            author: "Chione",
            age: 25,
            avatar: "/placeholder.svg?height=40&width=40",
        },
        {
            quote: "When the whistle blows and the ball hits the ground, that's the moment I return to the basketball court as my true self.",
            author: "Ellen",
            age: 25,
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
                            <iframe
                                className="w-full h-full rounded-lg"
                                src="https://www.youtube.com/embed/MEwtLELK0DM"
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
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
                                                        {/* <AvatarImage
                                                            src={
                                                                testimonial.avatar
                                                            }
                                                            alt={
                                                                testimonial.author
                                                            }
                                                        /> */}
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
};
