export default function BannerSection() {
    const stats = [
        {
            value: "3.7%",
            description:
                "ONLY 3.7% Asian female professional athletes in the US",
        },
        {
            value: "0.7%",
            description:
                "ONLY 0.7% of NCAA D1 women's basketball players is Asian",
        },
        {
            value: "12",
            description: "ONLY 12 players in WNBA is Asian",
        },
        {
            value: "90%",
            description: "90% of our SGB players NEVER participated in NCAA",
        },
    ];

    return (
        <section className="w-4/5 mx-8 my-12 text-center">
            <div className="grid grid-cols-1 gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center w-56 mx-auto"
                    >
                        <div className="font-bold tracking-tight">
                            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black dark:text-white">
                                {stat.value}
                            </span>
                        </div>
                        <p className="mt-8 text-sm sm:text-base md:text-lg lg:text-xl max-w-xs text-gray-700 dark:text-gray-300">
                            {stat.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
