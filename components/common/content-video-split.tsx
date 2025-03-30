import { Button } from "@/components/ui/button";

import { ExternalLink } from "lucide-react";
import Link from "next/link";

interface ContentVideoSplitProps {
    title: string;
    description: React.ReactNode;
    buttonText: string;
    buttonLink: string;
    videoSrc: string;
    videoTitle: string;
}

export const ContentVideoSplit = ({
    title,
    description,
    buttonText,
    buttonLink,
    videoSrc,
    videoTitle,
}: ContentVideoSplitProps) => {
    return (
        <section className="py-16">
            <div className="container max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row items-start gap-12">
                    {/* Content Side - 30% */}
                    <div className="w-full md:w-[30%]">
                        <div className="sticky top-8">
                            <h2 className="text-4xl font-bold mb-6">{title}</h2>
                            {typeof description === "string" ? (
                                <p className="text-muted-foreground mb-4">
                                    {description}
                                </p>
                            ) : (
                                description
                            )}
                            <Link
                                href={buttonLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button className="flex items-center justify-center gap-2">
                                    <ExternalLink className="h-4 w-4" />
                                    {buttonText}
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Video Side - 70% */}
                    <div className="w-full md:w-[70%]">
                        <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
                            <div className="lg:flex-1">
                                <div className="aspect-video">
                                    <iframe
                                        className="w-full h-full rounded-lg"
                                        src={videoSrc}
                                        title={videoTitle}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-primary/10 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
