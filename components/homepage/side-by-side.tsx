import Image from "next/image";

export const SideBySide = () => {
    return (
        <section className="w-4/5 mx-auto my-16">
            <div className="container py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:items-start">
                    {/* Text content - Add order-2 for mobile, order-1 for md+ */}
                    <div className="space-y-6 md:pt-8 order-2 md:order-1">
                        <div>
                            <h2 className="text-2xl font-bold mb-4">
                                Who We Are
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-6">
                                She Got Buckets is a 501 (c) 3 non-profit
                                organization. We aim to create an open platform
                                for all Asian Women to enhance their
                                recreational skills and confidence through
                                basketball tournaments, competitive leagues, and
                                training events.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-4">
                                Our Mission
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-6">
                                We&apos;re here to expand our community
                                influence, empowering every Asian woman to break
                                barriers and make powerful connections, and
                                thrive through the game of basketball.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-4">
                                Our Vision
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300">
                                Our vision is to create a global basketball
                                community for Asian women, open to{" "}
                                <strong className="font-semibold">
                                    all ages, income levels, and recreational
                                    levels.{" "}
                                </strong>
                                We strive to break barriers, build strength, and
                                provide resources to enable Asian females
                                worldwide in accessing recreational resources
                                and inspire future generations.
                            </p>
                        </div>
                    </div>
                    {/* Image container - Add order-1 for mobile, order-2 for md+ */}
                    <div className="relative h-[400px] md:h-full order-1 md:order-2">
                        <Image
                            src={"/images/sgb-together.png"}
                            alt="Asian women playing basketball"
                            fill
                            className="object-cover rounded-lg" // Added rounded corners
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
