import {
    Timeline,
    TimelineDescription,
    TimelineHeader,
    TimelineItem,
    TimelineTime,
    TimelineTitle,
} from "@/components/common/timeline";

type JourneyItemType = {
    id: number;
    title: string;
    description: React.ReactNode;
    time: string;
};

const journeyData: JourneyItemType[] = [
    {
        id: 1,
        title: "Where It All Started",
        description: (
            <>
                Girls at She Got Buckets shared similar stories growing up. Our
                passion for basketball has not only helped us excel in their
                lives but also helped us find
                <span className="font-semibold text-primary">
                    {" "}
                    TRUE CONNECTIONS{" "}
                </span>
                with people who share the same love for sports. This sense of
                <span className="font-semibold text-primary"> UNITY </span>
                inspired the founders of She Got Buckets to establish a
                non-profit basketball league for Asian women.
            </>
        ),
        time: "The Beginning",
    },
    {
        id: 2,
        title: "Facing the Challenge",
        description: (
            <>
                However, our journeys have not always been so easy. The
                <span className="font-semibold text-primary"> ABSENCE </span>
                of an inclusive Asian women&apos;s basketball community has held
                us back from pursuing our enthusiasm toward basketball. There
                were too few opportunities for Asian girls who wanted to
                participate in basketball on the court, and it is difficult for
                an Asian woman to find a platform that supports their basketball
                journey.
            </>
        ),
        time: "The Challenge",
    },
    {
        id: 3,
        title: "First Steps",
        description:
            "In summer 2018, we commenced our journey on promoting the celebration of inclusion and diversity of basketball. We began as a student club that organized regional tournaments and invited female players from schools to join.",
        time: "Summer 2018",
    },
    {
        id: 4,
        title: "Official Launch",
        description:
            "She Got Buckets was officially born, and now we are here to make a change.",
        time: "2021",
    },
    {
        id: 5,
        title: "Where We Are Today",
        description: (
            <div>
                <p>
                    <span className="font-semibold text-primary">
                        4 Countries:
                    </span>{" "}
                    US, UK, China, Japan
                </p>
                <p>
                    <span className="font-semibold text-primary">500+</span>{" "}
                    participants across the global
                </p>
                <p>
                    <span className="font-semibold text-primary">15+</span>{" "}
                    colleges
                </p>
            </div>
        ),
        time: "Present",
    },
];

export const AboutJourney = () => {
    return (
        <section className="py-16">
            <div className="container max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row items-start gap-12">
                    {/* Content Side - 30% */}
                    <div className="w-full md:w-[30%]">
                        <div className="sticky top-8">
                            <h2 className="text-4xl font-bold mb-6">
                                Our Journey
                            </h2>
                        </div>
                    </div>

                    {/* Timeline Side - 70% */}
                    <div className="w-full md:w-[70%]">
                        <Timeline>
                            {journeyData.map((item) => (
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
