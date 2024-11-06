export interface BasketballEvent {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    description: string;
    date: string;
    location: string;
    price: string;
}

export type EventsData = {
    [key: string]: BasketballEvent;
};

export const BASKETBALL_EVENTS: EventsData = {
    event1: {
        id: "event1",
        title: "College Basketball League",
        subtitle: "Spring 2024 Season",
        image: "/images/court.png",
        description: `Join our competitive college basketball league starting this spring. 
      Teams will compete in a round-robin format followed by playoffs. 
      Perfect for college students looking to play organized basketball.`,
        date: "Starts March 15, 2024",
        location: "Main Campus Arena",
        price: "$250 per team",
    },
    event2: {
        id: "event2",
        title: "Summer Skills Camp",
        subtitle: "Elite Training Program",
        image: "/images/league.png",
        description: `Intensive basketball skills development camp led by professional coaches. 
      Focus on fundamentals, advanced techniques, and game strategy. 
      Limited spots available for serious players looking to improve their game.`,
        date: "July 10-24, 2024",
        location: "SGB Training Facility",
        price: "$450 per player",
    },
    event3: {
        id: "event3",
        title: "National Tournament",
        subtitle: "Championship Series",
        image: "/images/league.png",
        description: `Annual national tournament bringing together top teams from across the country. 
      Compete against the best talent and showcase your skills. 
      Tournament includes division brackets for different skill levels.`,
        date: "August 15-20, 2024",
        location: "National Sports Complex",
        price: "$600 per team",
    },
};

export interface NavItem {
    id: string;
    label: string;
}

export const ANCHOR_NAV_ITEMS: readonly NavItem[] = [
    { id: "heroCard-event", label: "HeroCard" },
    { id: "hallRecord-event", label: "Record" },
    { id: "aboutInfor-event", label: "AboutInfor" },
    { id: "ruleBook-event", label: "RuleBook" },
    { id: "registration-event", label: "Registration" },
] as const;

export const SUPABASE_STORAGE = {
    EVENTS_BUCKET_URL_TEST:
        "https://gdzjjimhuijepuaqyybd.supabase.co/storage/v1/object/public/events/",
} as const;
