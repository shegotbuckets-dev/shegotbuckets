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
        title: "Pre-Registration Opens!",
        description: (
            <div className="space-y-4">
                <p>To begin, all teams must:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>
                        Fill out the{" "}
                        <a
                            href="https://forms.gle/Wwun7YqybpHiw52p8"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline font-semibold"
                        >
                            Pre-Registration Form
                        </a>
                    </li>
                    <li>
                        Submit a $100 deposit via Zelle to{" "}
                        <span className="font-semibold text-primary">
                            admin@shegotbuckets.org
                        </span>
                        . Please include your Team Name in the payment note
                        (e.g., Bay Area Warriors)
                    </li>
                </ul>
                <p>
                    This deposit will be fully refunded after the tournament,
                    provided the team has no rule violations or misconduct.
                </p>
                <p>
                    Once both the form and deposit are received, your team will
                    get a confirmation email along with the Official
                    Registration Guide.
                </p>
            </div>
        ),
        time: "July 1st",
    },
    {
        id: 2,
        title: "Early Bird Pre-Registration Deadline",
        description: (
            <p>
                Submit both the Pre-Registration Form and $100 deposit by this
                date to receive a{" "}
                <span className="font-semibold text-primary">
                    $30 discount code
                </span>{" "}
                for official registration.
            </p>
        ),
        time: "July 15",
    },
    {
        id: 3,
        title: "Early Bird Official Registration Deadline",
        description: (
            <div className="space-y-4">
                <p>To complete Official Registration, teams must:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Register the team on our website</li>
                    <li>Upload Team Roster</li>
                    <li>
                        Pay the Early Bird Fee:{" "}
                        <span className="font-semibold text-primary">$720</span>
                    </li>
                    <li>Each player must individually sign the Waiver Form</li>
                </ul>
                <p>
                    Only one player (typically the captain) can register the
                    team and track team status. Team managers or non-players may
                    not register the team.
                </p>
            </div>
        ),
        time: "August 10",
    },
    {
        id: 4,
        title: "Regular Pre-Registration Deadline",
        description: (
            <p>
                Submit Pre-Registration Form and $100 deposit if you missed the
                early bird period. No discount code will be provided after this
                deadline.
            </p>
        ),
        time: "August 15",
    },
    {
        id: 5,
        title: "Regular Official Registration Deadline",
        description: (
            <ul className="list-disc pl-5 space-y-2">
                <li>Register your team & upload roster</li>
                <li>
                    Pay the Regular Fee:{" "}
                    <span className="font-semibold text-primary">$750</span>
                </li>
                <li>Ensure all players sign the Waiver Form individually</li>
            </ul>
        ),
        time: "August 30",
    },
    {
        id: 6,
        title: "Roster Revision Deadline",
        description: (
            <div className="space-y-4">
                <ul className="list-disc pl-5 space-y-2">
                    <li>
                        Each team gets one free roster change before this date
                    </li>
                    <li>
                        After that:{" "}
                        <span className="font-semibold text-primary">
                            $15 per change request
                        </span>
                    </li>
                    <li>No changes accepted after August 30</li>
                </ul>
                <p>
                    Team captains are responsible for confirming all player
                    information before submission.
                </p>
            </div>
        ),
        time: "August 30",
    },
    {
        id: 7,
        title: "Schedule Announcement",
        description: (
            <div className="space-y-3">
                <p>
                    <span className="font-semibold text-primary">
                        September 1–2:
                    </span>{" "}
                    Group draw
                </p>
                <p>
                    <span className="font-semibold text-primary">
                        September 5:
                    </span>{" "}
                    Schedule finalized and released
                </p>
            </div>
        ),
        time: "September 1–2",
    },
    {
        id: 8,
        title: "Official Tournament Dates",
        description: (
            <div className="space-y-3">
                <p>
                    <span className="font-semibold text-primary">
                        📍 Location: 115 Torne Valley Rd, Hillburn, NY 10931
                    </span>
                </p>
                <p>
                    <span className="font-semibold text-primary">
                        📅 Date: October 4–5, 2025
                    </span>
                </p>
                <p>
                    <span className="font-semibold text-primary">
                        Saturday:
                    </span>{" "}
                    9:30 AM – 5:30 PM
                </p>
                <p>
                    <span className="font-semibold text-primary">Sunday:</span>{" "}
                    9:00 AM – 3:00 PM
                </p>
            </div>
        ),
        time: "October 4–5",
    },
];

export const RegistrationTimeline = () => {
    return (
        <div>
            <div className="max-w-4xl mx-auto p-6 space-y-8">
                <h2 className="text-2xl font-bold">REGISTRATION TIMELINE</h2>

                <div className="prose prose-blue max-w-none space-y-6">
                    <p>
                        <span className="font-medium text-orange-500">
                            All teams must complete both Pre-Registration and
                            Official Registration to secure a spot in the
                            tournament.
                        </span>
                    </p>

                    <div className="border-2"></div>

                    {/* Timeline */}
                    <div className="w-full">
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
        </div>
    );
};
