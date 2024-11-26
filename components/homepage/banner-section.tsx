import Link from "next/link";

export const BannerSection = () => {
    const stats = [
        {
            value: "14%",
            description:
                "Women student athletes take up 14% less than male student athletes in NCAA ",
        },
        {
            value: "10%",
            description: "Less than 10% NCAA student Asian female athletes",
        },
        {
            value: "2%",
            description: "ONLY 2% of NCAA student athletes are Asian",
        },
        {
            value: "1.4%",
            description: "ONLY 1.4% of WNBA players are Asian",
        },
    ];

    return (
        <section className="w-4/5 mx-8 my-12 text-center relative">
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
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-8 text-right italic">
                Source:{" "}
                <Link
                    href="https://www.ncaa.org/sports/2018/12/13/ncaa-demographics-database.aspx"
                    className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    NCAA Demographics Database
                </Link>{" "}
                and{" "}
                <Link
                    href="https://www.statista.com/statistics/1375205/wnba-players-ethnicity/"
                    className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Statista
                </Link>
            </p>
        </section>
    );
};
