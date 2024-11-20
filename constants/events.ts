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
    detail: {
        content: string;
        subContent?: string[];
    }[];
    description?: string;
}

export interface RuleBookData {
    title: string;
    lastUpdateDate?: string;
    eligibility?: string;
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
    title: "She Got Buckets Chinese Women’s College Basketball League Official Rules and Guidelines",
    lastUpdateDate: "Latest Update: November 10, 2024",
    introduction:
        "To enhance everyone's participation experience, the 2023-24 SGB Tournament will introduce a new format!\n\nIf you have any additional questions after reading the regulations and guidelines below, please email info@shegotbuckets.org",
    eligibility:
        "Please refer to the player eligibility guideline on the event page.",
    sections: [
        {
            title: "Number of Players",
            detail: [
                {
                    content:
                        "Before the start of the match, when the number of players present for a team is equal to or greater than 4, the match will proceed according to the scheduled start time. If at the scheduled start time a team is not present or has fewer than 4 players, the team with fewer players must wait until the fourth player arrives at the venue before the match can proceed. During this period, the match time will still start counting down according to the original schedule. For every minute of delay, the opposing team earns 1 point. If by the end of the first half a team cannot reach 4 players, that team will be judged to have lost with a score of 0:20.",
                },
                {
                    content:
                        "During the match, if a team has fewer than 5 players ready to play on the court due to player injuries or other reasons, but still has 2 or more players, the match will continue. If there are fewer than 2 players, the team should forfeit the match due to insufficient players. If the team judged to be winning at the time of the match's interruption, their score at the moment of interruption shall stand. If the team judged to be winning is not leading, the score shall be recorded as 2:0 in favor of the opposing team.",
                },
                {
                    content:
                        "Withdrawal: If a team withdraws from the match temporarily, their opponent will win with a score of 20:0.",
                },
            ],
        },
        {
            title: "Fouls and Penalties",
            detail: [
                {
                    content:
                        "Personal fouls: A player accumulating 5 personal fouls in a single game, or 2 technical fouls, or 2 flagrant fouls, or 1 technical foul and 1 flagrant foul, shall be ejected from the game",
                },
                {
                    content: "Team fouls:",
                    subContent: [
                        "15min + 15min: From the 5th team foul onwards in each period, the fouled team shall be awarded 1-on-1 free throws, and from the 7th team foul onwards, they shall be awarded two free throws.",
                        "4*10min:  From the 5th team foul onwards in each period, the fouled team shall be awarded two free throws",
                    ],
                },
                {
                    content:
                        "Common fouls, technical fouls, and flagrant fouls are counted as both personal and team fouls. Offensive fouls do not count as team fouls, only as personal fouls.",
                },
                {
                    content:
                        "Technical fouls: Two free throws, the coach designates the shooter, and possession remains unchanged after the free throw.",
                },
                {
                    content: "Flagrant foul:",
                    subContent: [
                        "Level one flagrant foul: Two free throws, to be taken by the fouled player.",
                        "Level two flagrant foul: The referee will review the game footage to confirm if it is a level two flagrant foul. If confirmed, the fouling player shall be immediately ejected from the game, and two free throws shall be awarded to the opposing team, to be taken by the fouled player",
                    ],
                },
                {
                    content:
                        "To maximize player safety, SGB will impose additional penalties for flagrant fouls after the match, including point deductions and suspensions. The specific rules are as follows:",
                    subContent: [
                        "SGB adopts a points system for flagrant fouls. A player receiving a level one flagrant foul will be awarded 1 flagrant point, and a level two flagrant foul will result in 2 flagrant points.",
                        "If the referee does not make an immediate ruling, teams may appeal to SGB after the match. If at least two referees confirm the flagrant foul through video review, the offending player will be subject to additional flagrant foul penalties and corresponding point deductions. However, the results of the match, score, and individual points remain unchanged.",
                        "Flagrant foul points are permanent and will not be reset.",
                    ],
                },
                {
                    content:
                        "During free throws, a maximum of 6 players (4 defending, 2 attacking) are allowed to contest for rebounds on either side of the restricted area. Free throws must be completed within 10 seconds.",
                },
            ],
        },
        {
            title: "Sportsmanship",
            detail: [
                {
                    content:
                        "To promote a positive atmosphere and foster respect and cooperation among participants, as of April 1, 2024, SGB has introduced regulations pertaining to sportsmanship. Sports is not just about competition; it's also about culture and values. By implementing these regulations, we aim to educate and guide participants to demonstrate sportsmanship during matches, including respecting opponents, referees, and spectators, cooperating with teammates, and accepting victory and defeat. This not only helps maintain fairness and order in matches but also cultivates participants' teamwork, self-discipline, and moral values, making sports a positive, healthy, and enjoyable experience.",
                },
                {
                    content:
                        "Following each match, referees will assess the sportsmanship of teams, and these ratings will be recorded in the technical report. If a team's average sportsmanship rating falls below a certain threshold (< 3 points), they will receive a warning. Continued low ratings may result in the team facing suspension.",
                },
                {
                    content:
                        "In the national tournament on April 6-7, 2024, if a team's score is below 3 points, the team will be prohibited from participating in subsequent elimination/placement matches.",
                    subContent: [
                        "5 - Excellent Conduct and Sportsmanship: Participants cooperate fully with the officials and opposing team members. If necessary, the team captain converses calmly with officials about rule interpretations, fouls, violations and game control. Team captains maintain full control of teammates and spectators",
                        "4 - Good Conduct and Sportsmanship: Participants generally display good sportsmanship towards officials and opposing team members, with no blatant displays of poor sportsmanship. Participants verbally complain about a few decisions and calls by officials which may warrant a warning from the Intramural Staff. Team captain maintains control of teammates and spectators.",
                        "3 - Average Conduct and Sportsmanship: Participants display some actions of poor sportsmanship towards officials and opposing team members. Participants persist in questioning officials about rule interpretations and judgment calls. Team has been warned and may or may not have received a foul for an unsporting act. Team captain maintains some control of teammates and spectators.",
                        "2- Below Average Conduct and Sportsmanship: Participants continually display actions of poor sportsmanship towards officials and opposing team members. Participants constantly complain about rule interpretations and judgment calls. Team has been warned multiple times and has received multiple fouls for unsporting acts. Team captain exhibits little control of teammates, spectators or themselves.",
                        "1- Poor Conduct and Sportsmanship: Participants’ behavior is completely uncooperative and shows no respect for officials and opposing team members. Multiple fouls are given to a player or players for unsportsmanlike acts. Team captain displays no control over the actions of team members. Team behavior warrants discontinuance of the game for any reason. Participants and spectators clearly related to the team engage in disorderly conduct that violates the university code of conduct.",
                    ],
                },
            ],
        },
        {
            title: "Seeding and bracketing",
            detail: [
                {
                    content:
                        "Please refer to the seeding and bracketing guideline on the event page.",
                },
            ],
        },
        {
            title: "Disclaimer",
            detail: [
                {
                    content:
                        "Specific rulings shall be subject to referee decisions, SGB reserves the final interpretation rights for the above rules.",
                },
                {
                    content:
                        "Depending on the nature of the match, SGB may make adjustments to certain points. We will prepare the captain's instructions and staff instructions in advance to emphasize certain rules.",
                },
                {
                    content:
                        "The remaining rules not listed will comply with the latest NCAA Women's basketball rules:",
                },
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
            detail: [
                {
                    content:
                        "23-24赛季北美高校赛将分为两个赛段：秋季的分区赛和春季的总决赛。",
                },
                {
                    content:
                        "2023年秋季，我们将展开南北分区赛，促进球队之间的交流和增加比赛经验。分区赛冠军以及MVP的颁奖典礼将在2024年4月总决赛开场进行。",
                },
                {
                    content:
                        "总决赛的种子球队将根据分区赛以及往届比赛的积分来排名选取，我们希望使用更合理的小组分组方式代替过往的随机抽签，增强各队伍的比赛体验。",
                },
                {
                    content:
                        "对于第一次参加SGB高校赛的球队们——往届比赛积分仅影响总决赛第一个比赛日的分组情况，不会影响比赛资格！欢迎大家报名参加分区赛/总决赛，开启球队的第一战，一起参与感受篮球的快乐！",
                },
            ],
        },
        {
            title: "总决赛分组具体规则",
            detail: [
                {
                    content:
                        "根据总决赛的报名球队数量来确定种子球队的数量。例如，若报名球队数量为12支队伍，预计分为4组，那么积分排名的第1-4名为首轮种子，第5-8名为次轮种子，第9-12名为末轮种子",
                },
                {
                    content:
                        "同组种子将进行随机抽签分配到各组。例如，首轮的4名种子队伍，将进行抽签随机分配到4个不同小组，次轮和末轮的球队也将分别进行抽签分配到各组，最终目标为每个小组分别由一支来自于首轮、次轮、和末轮的球队组成，从而避免产生死亡小组，增强比赛体验！",
                },
                {
                    content:
                        "SGB官网将根据报名情况，后续公布二队比赛规则以及小组赛过后的半决赛/决赛规则。",
                },
            ],
        },
        {
            title: "Scoring Rules",
            description:
                "SGB北美高校赛排名积分是由球队单届赛事的积分由该球队所得的排名、参加赛事的比重、该赛事参赛球队的总数加权计算而成。具体计算方式如下：",
            detail: [
                {
                    content:
                        "球队单届赛事积分：该积分由两部分组成，参与分10分（不论名次）与排名分。排名分按照名次依次是：50、40、30、20、15、13、9、7、5、3、1分。单届排名在第12名及以后，排名分均为1分。未参赛则该届赛事积分为0。",
                },
                {
                    content:
                        "加权后的赛事积分：加权后的赛事积分=赛事比重*（1+球队数量/10）*赛事积分。加权系数代表了该赛事的规模、总体实力/级别等。赛事级别越高，赛事比重越高。参赛的球队数量越多，说明该赛事的规模越大，加权系数也就越高。往届三次赛事积分的比重分别固定为：上届分区赛（0.15），上届总决赛（0.3），当届分区赛（0.55）。",
                },
                { content: "年度赛事积分为三届赛事的加权积分的总和。" },
            ],
        },
    ],
};
