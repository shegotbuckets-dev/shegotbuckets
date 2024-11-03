import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
    ArrowRight,
    BriefcaseBusiness,
    HandshakeIcon,
    Heart,
    Users,
} from "lucide-react";

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
            "All of your donations will go straight into the funding for our basketball events and programs.",
        action: "Donate Here",
    },
    {
        icon: <Users className="w-12 h-12" />,
        title: "Be a Volunteer",
        description:
            "We are a 100% volunteer-based nonprofit organization and our events are supported by our volunteers.",
        action: "Join Us",
    },
    {
        icon: <HandshakeIcon className="w-12 h-12" />,
        title: "Corporate Partner",
        description:
            "By sponsoring us, you provide foundational support for our growth and powerful journey.",
        action: "Partner Up",
    },
    {
        icon: <BriefcaseBusiness className="w-12 h-12" />,
        title: "Employer Matching Program",
        description:
            "We welcome and encourage anyone who is interested in supporting us through their employer matching program.",
        action: "Contact Us",
    },
];

export default function GetInvolvedSection() {
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
                            className="flex flex-col items-center text-center"
                        >
                            <div className="text-gray-800 dark:text-white mb-6">
                                {option.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                                {option.title}
                            </h3>
                            <p className="text-gray-800 dark:text-white mb-6">
                                {option.description}
                            </p>
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
