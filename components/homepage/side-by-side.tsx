import Image from "next/image";

export default function SideBySide() {
    return (
        <section className="py-16 px-4 md:px-6 lg:px-8">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:items-start">
                    <div className="space-y-6 md:pt-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-4">
                                Who We Are
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-6">
                                She Got Buckets is a non-profit organization
                                focused on creating an inclusive basketball
                                community for Asian women, offering leagues and
                                tournaments in a supportive, empowering
                                environment.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-4">
                                Our Mission
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-6">
                                We&apos;re here to empower Asian women to break
                                barriers, make global connections, and thrive
                                through the game of basketball.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-4">
                                Our Vision
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300">
                                To build a league that welcomes Asian women of{" "}
                                <strong>
                                    all ages, income levels, and recreational
                                    levels
                                </strong>
                                , providing the support they need to pursue
                                their passion for basketball.
                            </p>
                        </div>
                    </div>
                    <div className="relative h-full">
                        <Image
                            src="/images/sgb-together.png"
                            alt="Asian women playing basketball"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
