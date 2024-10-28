import Image from "next/image";

export default function SideBySide() {
    return (
        <section className="container mx-auto py-16">
            <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Left content side */}
                <div className="w-full md:w-1/2 flex flex-col justify-between h-full">
                    <div className="mb-8">
                        <h2 className="text-xl md:text-2xl font-bold mb-2">
                            Who We Are
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            She Got Buckets is a 501 (c) 3 non-profit
                            organization focused on creating an inclusive
                            basketball community for Asian women, offering
                            leagues and tournaments in a supportive, empowering
                            environment. We aim to create an inclusive
                            basketball community for All Asian Women to enhance
                            their recreational skills and self-image through
                            basketball tournaments and leagues and provide a
                            safe environment for them to pursue their passion in
                            sports and basketball.
                        </p>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-xl md:text-2xl font-bold mb-2">
                            Our Mission
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            We aim to expand our community influence, empowering
                            every Asian woman to engage in an inclusive and
                            equitable global matrix, through the power of
                            basketball.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold mb-2">
                            Our Vision
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            Our vision is to create a global basketball
                            community for Asian women, open to{" "}
                            <strong className="font-semibold">
                                all ages, income levels, and skill levels
                            </strong>
                            . We strive to break barriers, build strength, and
                            provide resources and support that empower every
                            player to pursue their passion and inspire future
                            generations.
                        </p>
                    </div>
                </div>

                {/* Right image side */}
                <div className="w-full md:w-1/2">
                    <div className="aspect-[16/9] relative w-full">
                        <Image
                            src="/images/sgb-together.png"
                            alt="Asian women playing basketball"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
