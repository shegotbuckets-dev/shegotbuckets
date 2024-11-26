import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
    ArrowRight,
    BriefcaseBusiness,
    HandshakeIcon,
    Heart,
    Users,
} from "lucide-react";
import Link from "next/link";

interface InvolvementOption {
    icon: React.ReactNode;
    title: string;
    description: string;
    action: string;
}

const involvementOptions: InvolvementOption[] = [
    {
        icon: <Heart className="w-12 h-12" />,
        title: "Donate",
        description:
            "All of your donations will go straight into the funding for our basketball tournaments and training programs. By donating, you’ll be directly supporting our growth and helping us make an even greater impact!",
        action: "Donate Here",
    },
    {
        icon: <Users className="w-12 h-12" />,
        title: "Be a Volunteer",
        description:
            "She Got Buckets is a 100% volunteer-based nonprofit organization supported by our 25 dedicated members along with a team of long-term, active volunteers.",
        action: "Join Us",
    },
    {
        icon: <HandshakeIcon className="w-12 h-12" />,
        title: "Corporate Partner",
        description:
            "We extend our deepest gratitude to all the corporations and organizations that have supported our past events and contributed to our growth. We always welcome new partners to join us in advancing our mission for the Asian female athlete community.",
        action: "Partner Up",
    },
    {
        icon: <BriefcaseBusiness className="w-12 h-12" />,
        title: "Employer Matching Program",
        description:
            "Double Your Impact- Many companies offer employee matching programs, allowing you to increase the power of your donation to support our mission. Check with your HR or corporate giving department to see if your company offers matching gifts and for any details on the process.",
        action: "Contact Us",
    },
];

export const GetInvolvedSection = () => {
    return (
        <section className="w-4/5 mx-auto my-16 bg-gray-50 dark:bg-black">
            <div className="container py-8">
                <h2 className="text-3xl font-bold text-center mb-4 text-gray-800 dark:text-white">
                    Ways to Get Involved
                </h2>
                <Separator className="mb-16 mx-auto w-72" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {involvementOptions.map((option, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center h-full"
                        >
                            <div className="flex flex-col items-center flex-1">
                                <div className="text-gray-800 dark:text-white mb-6">
                                    {option.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                                    {option.title}
                                </h3>
                                <p className="text-gray-800 dark:text-white mb-6 flex-1 line-clamp-4 max-w-[90%] mx-auto">
                                    {option.description}
                                </p>
                            </div>
                            <Link href="/get-involved">
                                <Button
                                    variant="expandIcon"
                                    className="w-full max-w-[130px] flex gap-1 text-gray-800 dark:text-white hover:text-black dark:hover:text-gray-300 text-sm py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                                    Icon={() => (
                                        <ArrowRight
                                            className="w-3.5 h-3.5"
                                            aria-hidden="true"
                                        />
                                    )}
                                    iconPlacement="right"
                                >
                                    {option.action}
                                </Button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
