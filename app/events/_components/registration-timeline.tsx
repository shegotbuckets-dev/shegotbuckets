import {
    Timeline,
    TimelineDescription,
    TimelineHeader,
    TimelineItem,
    TimelineTime,
    TimelineTitle,
} from "@/components/common/timeline";

type RegistrationStepType = {
    id: number;
    title: string;
    description: React.ReactNode;
    time: string;
};

const registrationData: RegistrationStepType[] = [
    {
        id: 1,
        title: "Official Registration Opens!",
        description: (
            <>
                Welcome all Asian women basketball enthusiasts in North America
                to register and participate in this tournament.
                <br />
                <br />
                The tournament is open to all age groups of Asian women residing
                in North America and welcomes players of all skill levels to
                form teams. All players must be of at least{" "}
                <span className="font-semibold text-primary">
                    25% Asian descent (Asian descent ≥ 25%)
                </span>{" "}
                to be considered eligible.
                <br />
                <br />
                Teams must submit a complete roster during the registration
                phase. SGB reserves the final right to approve tournament
                participation.
            </>
        ),
        time: "July 1st",
    },
    {
        id: 2,
        title: "Early Bird Registration",
        description: (
            <div className="space-y-4">
                <div>
                    <span className="font-semibold text-primary">
                        📍 July 15 – Early Bird Pre-Registration Deadline
                    </span>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Submit: Pre-Registration Form</li>
                        <li>Pay: $100 registration deposit</li>
                    </ul>
                    <p className="mt-2 text-sm">
                        Note: Early bird teams must submit the form and deposit
                        to receive a discount code for official registration.
                        The code is used on the official website during
                        registration. The official registration link and details
                        will be provided later via email.
                    </p>
                </div>
                <div>
                    <span className="font-semibold text-primary">
                        📍 August 10 – Early Bird Official Registration Deadline
                    </span>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Submit: Team Roster</li>
                        <li>Sign: Waiver Form (all players)</li>
                        <li>Fee: $720/team</li>
                    </ul>
                    <p className="mt-2 text-sm">
                        Teams must complete registration via the website by
                        submitting the roster, paying the registration fee, and
                        signing the waiver.
                    </p>
                </div>
            </div>
        ),
        time: "July 1 - 15",
    },
    {
        id: 3,
        title: "Regular Registration",
        description: (
            <div className="space-y-4">
                <div>
                    <span className="font-semibold text-primary">
                        📍 August 15 – Regular Pre-Registration Deadline
                    </span>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Submit: Pre-Registration Form</li>
                        <li>Pay: $100 deposit</li>
                    </ul>
                    <p className="mt-2 text-sm">
                        Only teams with the Pre-Registration done can officially
                        register for the game. Once the pre-registration form
                        and deposit are received, we will send a confirmation
                        email for successful pre-registration along with the
                        official registration guide.
                    </p>
                </div>
                <div>
                    <span className="font-semibold text-primary">
                        📍 August 30 – Regular Final Registration Deadline
                    </span>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Submit: Team Roster</li>
                        <li>Sign: Waiver Form (all players)</li>
                        <li>Fee: $750/team</li>
                    </ul>
                    <p className="mt-2 text-sm">
                        Teams must complete registration online by submitting
                        the roster, paying the registration fee, and signing the
                        waiver.
                    </p>
                </div>
            </div>
        ),
        time: "July 15 - August 15",
    },
    {
        id: 4,
        title: "Roster Revision Deadline",
        description: (
            <>
                <span className="font-semibold text-primary">
                    📍 August 30 – Roster Revision Deadline
                </span>
                <br />
                <br />
                Each team has one free revision opportunity before August 30.
                <br />
                <br />
                For any additional or late changes, a fee of{" "}
                <span className="font-semibold text-primary">
                    $15/player
                </span>{" "}
                will apply.
                <br />
                <br />
                No changes will be accepted after the deadline. Team captains
                should confirm all player info in advance.
            </>
        ),
        time: "August 30",
    },
    {
        id: 5,
        title: "Schedule Announcement",
        description: (
            <>
                <span className="font-semibold text-primary">
                    September 1–2:
                </span>{" "}
                Group draw
                <br />
                <br />
                <span className="font-semibold text-primary">
                    September 5:
                </span>{" "}
                Schedule confirmation and release
            </>
        ),
        time: "September 1–2",
    },
    {
        id: 6,
        title: "Official Tournament Dates",
        description: (
            <>
                <span className="font-semibold text-primary">
                    📅 Date: October 4–5, 2025
                </span>
                <br />
                <br />
                <span className="font-semibold text-primary">
                    Saturday:
                </span>{" "}
                9:30 AM – 5:30 PM
                <br />
                <br />
                <span className="font-semibold text-primary">Sunday:</span> 9:00
                AM – 3:00 PM
            </>
        ),
        time: "October 4–5",
    },
];

export const RegistrationTimeline = () => {
    return (
        <section className="py-16">
            <div className="container max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row items-start gap-12">
                    {/* Content Side - 30% */}
                    <div className="w-full md:w-[30%]">
                        <div className="sticky top-8">
                            <h2 className="text-4xl font-bold mb-6">
                                Registration Timeline
                            </h2>
                            <p className="text-muted-foreground">
                                Follow the registration timeline to ensure your
                                team is properly registered for the tournament.
                                Early bird registration offers discounted rates.
                            </p>
                        </div>
                    </div>

                    {/* Timeline Side - 70% */}
                    <div className="w-full md:w-[70%]">
                        <Timeline>
                            {registrationData.map((item) => (
                                <TimelineItem key={item.id}>
                                    <TimelineHeader>
                                        <TimelineTime>{item.time}</TimelineTime>
                                        <TimelineTitle>
                                            {item.title}
                                        </TimelineTitle>
                                    </TimelineHeader>
                                    <TimelineDescription>
                                        {item.description}
                                    </TimelineDescription>
                                </TimelineItem>
                            ))}
                        </Timeline>
                    </div>
                </div>
            </div>
        </section>
    );
};
