export type ConferenceData = {
    [key: string]: ConferenceInfor;
};

export type ConferenceInfor = {
    description: string;
    location: string;
    price: string;
    duration: string;
    gameTimes: string;
};

export interface RuleSection {
    title: string;
    content: string[];
    description?: string;
}

export interface RuleBookData {
    title: string;
    introduction: string;
    sections: RuleSection[];
}

export const leagueData: ConferenceData = {
    "Southern Conference": {
        description:
            "Catch up on our exciting event of the Southern Conference for the National Chinese Women’s College Basketball League! This tournament brought together college basketball clubs and players of all levels from universities across the southern United States. While registration has closed, you can still explore the highlights and event details by clicking Event Details below.",
        location: "Various cities in the North",
        price: "$500 (additional $100 for Team 2 tournament)",
        duration: "2 days",
        gameTimes: "2024/11/02 - 2024/11/03",
    },
    "Northern Conference": {
        description:
            "Join our exciting season of women’s college basketball as we kick off the Northern Conference of the National Chinese Women’s College Basketball League! This tournament unites Chinese college basketball clubs and players of all skill levels from universities across the northern United States. Each team may join the conference tournament by clicking the “Register now” ",
        location: "Southern metropolitan areas",
        price: "$500 (additional $100 for Team 2 tournament)",
        duration: "2 days",
        gameTimes: "2024/12/07-2024/12/08",
    },
    "National Finals": {
        description:
            "Get ready for the pinnacle of competition in the National Chinese Women’s College Basketball League! The National Finals bring together top college basketball teams and players from universities across the United States to compete for the championship title in this exhilarating season finale. Each team may join the final tournament by clicking the “Register now” below.",
        location: " D.C. or Maryland Area",
        price: " TBD",
        duration: "TBD",
        gameTimes: "TBD",
    },
};

export interface Anchor {
    id: string;
    label: string;
}

export const ANCHORS: readonly Anchor[] = [
    { id: "heroCard-event", label: "HeroCard" },
    { id: "aboutInfor-event", label: "AboutInfor" },
    { id: "ruleBook-event", label: "RuleBook" },
    { id: "hallRecord-event", label: "Record" },
    { id: "registration-event", label: "Registration" },
] as const;

export type ConferenceOption = {
    id: string;
    conference: string;
};

export const CONFERENCE_OPTIOS: ConferenceOption[] = [
    {
        id: "2c780393-953c-46d0-a677-69ff052796ea",
        conference: "Southern Conference",
    },
    {
        id: "458ace00-d2dc-4227-a1e5-94ba42021cd0",
        conference: "Northern Conference",
    },
    {
        id: "79fe96c0-b10d-4ac5-a7fb-8afadcc29c97",
        conference: "National Finals",
    },
];

export const RULE_BOOK_DATA_ENGLISH: RuleBookData = {
    title: "SGB Tournaments Introduce New Format",
    introduction:
        "To enhance everyone's participation experience, the 2023-24 SGB Tournament will introduce a new format!",
    sections: [
        {
            title: "Tournament Structure",
            content: [
                "The 2023-24 SGB Tournaments will be divided into two phases: the Fall Divisional Games and the Spring Finals.",
                "In the fall of 2023, we will hold divisional games in the North and South to promote interaction between teams and increase competition experience. The award ceremony for the divisional champions and MVP will be held at the opening of the finals in April 2024.",
                "The seed teams for the finals will be selected based on the scores from the divisional games and previous competitions. We aim to use a more reasonable group division method instead of the past random draws, to enhance the competition experience for all teams.",
                "For teams participating in the SGB Competition for the first time—previous competition scores will only affect the groupings on the first day of the finals and will not affect qualification for the competition! We welcome everyone to sign up for the divisional games/finals, start your team's first battle, and join in the joy of basketball!",
            ],
        },
        {
            title: "Finals Grouping Specific Rules",
            content: [
                "The number of seed teams will be determined based on the number of teams registered for the finals. For example, if 12 teams are registered, it is expected to be divided into 4 groups, with the 1st to 4th ranked in points as the first-round seeds, the 5th to 8th as the second-round seeds, and the 9th to 12th as the final-round seeds.",
                "Seeds in the same group will be randomly drawn and assigned to groups. For instance, the four first-round seed teams will be randomly assigned to four different groups through a draw, and the teams from the second and final rounds will also be drawn and assigned to groups respectively.",
            ],
        },
        {
            title: "Scoring Rules",
            description:
                "The SGB Competition ranking points are calculated based on the team's single-event points, which consider the team's rank, the weight of the event, and the total number of participating teams.",
            content: [
                "The SGB Competition ranking points are calculated based on the team's single-event points, which consider the team's rank, the weight of the event, and the total number of participating teams.",
                "Single-event team points: These points consist of two parts, participation points (10 points regardless of rank) and ranking points. The ranking points are as follows: 50, 40, 30, 20, 15, 13, 9, 7, 5, 3, 1 points according to rank. For ranks 12th and beyond, the ranking points are 1 point each. If not participating, the event score for that edition is 0.",
                "Weighted event points: Weighted event points = Event weight * (1 + number of teams / 10) * Event points. The weighting factor represents the scale, overall strength/level of the event.",
            ],
        },
    ],
};

export const RULE_BOOK_DATA_CHINESE: RuleBookData = {
    title: "SGB锦标赛引入新形式",
    introduction:
        "为了更好的提升大家的参赛体验，23-24赛季的SGB北美高校赛将开启全新赛制！",
    sections: [
        {
            title: "Tournament Structure",
            content: [
                "23-24赛季北美高校赛将分为两个赛段：秋季的分区赛和春季的总决赛。",
                "2023年秋季，我们将展开南北分区赛，促进球队之间的交流和增加比赛经验。分区赛冠军以及MVP的颁奖典礼将在2024年4月总决赛开场进行。",
                "总决赛的种子球队将根据分区赛以及往届比赛的积分来排名选取，我们希望使用更合理的小组分组方式代替过往的随机抽签，增强各队伍的比赛体验。",
                "对于第一次参加SGB高校赛的球队们——往届比赛积分仅影响总决赛第一个比赛日的分组情况，不会影响比赛资格！欢迎大家报名参加分区赛/总决赛，开启球队的第一战，一起参与感受篮球的快乐！",
            ],
        },
        {
            title: "总决赛分组具体规则",
            content: [
                "根据总决赛的报名球队数量来确定种子球队的数量。例如，若报名球队数量为12支队伍，预计分为4组，那么积分排名的第1-4名为首轮种子，第5-8名为次轮种子，第9-12名为末轮种子",
                "同组种子将进行随机抽签分配到各组。例如，首轮的4名种子队伍，将进行抽签随机分配到4个不同小组，次轮和末轮的球队也将分别进行抽签分配到各组，最终目标为每个小组分别由一支来自于首轮、次轮、和末轮的球队组成，从而避免产生死亡小组，增强比赛体验！",
                "SGB官网将根据报名情况，后续公布二队比赛规则以及小组赛过后的半决赛/决赛规则。",
            ],
        },
        {
            title: "Scoring Rules",
            description:
                "SGB北美高校赛排名积分是由球队单届赛事的积分由该球队所得的排名、参加赛事的比重、该赛事参赛球队的总数加权计算而成。具体计算方式如下：",
            content: [
                "球队单届赛事积分：该积分由两部分组成，参与分10分（不论名次）与排名分。排名分按照名次依次是：50、40、30、20、15、13、9、7、5、3、1分。单届排名在第12名及以后，排名分均为1分。未参赛则该届赛事积分为0。",
                "加权后的赛事积分：加权后的赛事积分=赛事比重*（1+球队数量/10）*赛事积分。加权系数代表了该赛事的规模、总体实力/级别等。赛事级别越高，赛事比重越高。参赛的球队数量越多，说明该赛事的规模越大，加权系数也就越高。往届三次赛事积分的比重分别固定为：上届分区赛（0.15），上届总决赛（0.3），当届分区赛（0.55）。",
                "年度赛事积分为三届赛事的加权积分的总和。",
            ],
        },
    ],
};
