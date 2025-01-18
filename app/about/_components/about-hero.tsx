import Image from "next/image";

export function AboutHero() {
    return (
        <section className="relative h-[60vh] w-full overflow-hidden flex items-center">
            <Image
                src="/images/sgb-about-us.png"
                alt="Basketball players on court"
                layout="fill"
                objectFit="cover"
                priority
                className="z-0"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
            <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center px-4 md:px-0">
                    <blockquote className="max-w-4xl mx-auto">
                        <p className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                            ONCE WE PLAY ON THE COURT, WE IMMEDIATELY BECAME A
                            FAMILY
                        </p>
                        <footer className="text-lg md:text-xl text-white opacity-75">
                            - SGB Player
                        </footer>
                    </blockquote>
                </div>
            </div>
        </section>
    );
}
