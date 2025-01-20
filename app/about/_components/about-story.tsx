export const AboutStory = () => {
    return (
        <section className="py-16">
            <div className="container max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row items-start gap-12">
                    {/* Content Side - 30% */}
                    <div className="w-full md:w-[30%]">
                        <div className="sticky top-8">
                            <h2 className="text-4xl font-bold mb-6">
                                Our Story
                            </h2>
                            <p className="text-muted-foreground">
                                Watch how She Got Buckets is changing the game
                                for Asian women in basketball.
                            </p>
                        </div>
                    </div>

                    {/* Video Side - 70% */}
                    <div className="w-full md:w-[70%]">
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
                    </div>
                </div>
            </div>
        </section>
    );
};
