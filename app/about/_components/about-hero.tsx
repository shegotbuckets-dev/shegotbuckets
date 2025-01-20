import Image from "next/image";

export function AboutHero() {
    return (
        <section
            className="relative h-[55vh] w-full overflow-hidden flex items-center"
            id="heroCard-about"
        >
            <div className="absolute inset-0">
                <Image
                    src="/images/sgb-about-us.png"
                    alt="Basketball players on court"
                    fill
                    className="object-cover"
                    priority
                />
            </div>
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative text-white px-4 sm:px-6 lg:px-8 w-full text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-16 mb-4 leading-tight">
                        ONCE WE PLAY ON THE COURT, WE IMMEDIATELY BECAME A
                        FAMILY
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-200 mb-4 text-right">
                        - SGB Player
                    </p>
                </div>
            </div>
        </section>
    );
}
