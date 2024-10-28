import Link from "next/link";
import { Instagram } from "lucide-react";

const TeamItem = ({ team }: { team: Team }) => {
    const baseClasses =
        "flex items-center rounded-md p-4 text-lg tracking-wide whitespace-nowrap text-white font-light";

    if (team.instagramLink) {
        return (
            <Link
                href={team.instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`${baseClasses} hover:bg-white/10 cursor-pointer`}
                aria-label={`${team.name}'s Instagram`}
            >
                <span className="mr-4 truncate">{team.name}</span>
                <Instagram size={24} className="text-white" />
            </Link>
        );
    }

    return (
        <div className={baseClasses}>
            <span className="truncate">{team.name}</span>
        </div>
    );
};

export default function TeamMarquee() {
    return (
        <div className="w-full h-20 overflow-hidden">
            <div className="w-full h-full inline-flex flex-nowrap gap-6 animate-marquee">
                {/* First set of items */}
                {Teams.map((team, index) => (
                    <div
                        key={`first-${index}`}
                        className="h-full w-fit flex items-center gap-6"
                    >
                        <TeamItem team={team} />
                    </div>
                ))}
                {/* Duplicate set of items to guarantee continuous animation */}
                {Teams.map((team, index) => (
                    <div
                        key={`second-${index}`}
                        className="h-full w-fit flex items-center gap-6"
                    >
                        <TeamItem team={team} />
                    </div>
                ))}
            </div>
        </div>
    );
}

interface Team {
    name: string;
    instagramLink?: string;
    image?: string;
}

const Teams: Team[] = [
    {
        name: "NYUCWB Violets",
        instagramLink: "https://www.instagram.com/nyucwb/",
    },
    {
        name: "UNCCWB",
        instagramLink: "https://www.instagram.com/unccwbl/",
    },
    { name: "JHUCWB Hopkins" },
    {
        name: "UCONNCWB",
        instagramLink: "https://www.instagram.com/uconncwb/",
    },
    {
        name: "WFU Asian WBB",
        instagramLink: "https://www.instagram.com/wakeasianwbb/",
    },
    {
        name: "GWUCWB Evil Colonials",
        instagramLink: "https://www.instagram.com/evilcolonials_gwu/",
    },
    { name: "UIUCCWB" },
    { name: "HARVARDCWB" },
    {
        name: "OSUCWB Vulcans",
        instagramLink: "https://www.instagram.com/osu_cwbc/",
    },
    { name: "ColumbiaCWB" },
    { name: "RochesterCWB" },
    { name: "NEUCWB" },
    { name: "UMichCWB Wolves" },
    {
        name: "USCCWB",
        instagramLink: "https://www.instagram.com/usccwb/",
    },
];
