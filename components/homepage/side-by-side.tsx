import { getVercelBlobUrl } from "@/utils/helpers";

import Image from "next/image";

export default function SideBySide() {
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
                                organization focused on creating an inclusive
                                basketball community for Asian women, offering
                                leagues and tournaments in a supportive,
                                empowering environment.
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
                                Our vision is to create a global basketball
                                community for Asian women, open to{" "}
                                <strong className="font-semibold">
                                    all ages, income levels, and skill levels
                                </strong>
                                . We strive to break barriers, build strength,
                                and provide resources and support that empower
                                every player to pursue their passion and inspire
                                future generations.
                            </p>
                        </div>
                    </div>
                    {/* Image container - Add order-1 for mobile, order-2 for md+ */}
                    <div className="relative h-[400px] md:h-full order-1 md:order-2">
                        <Image
                            src={getVercelBlobUrl(
                                "home/SGBSidebySide-WC7u3aNIUVCmTj1hDWtJYymTE8QsDz.png"
                            )}
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
}
