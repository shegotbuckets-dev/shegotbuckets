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
                {
                    content:
                        "https://www.ncaapublications.com/productdownloads/WBR24_20240826.pdf",
                },
            ],
        },
    ],
};

export const RULE_BOOK_DATA_CHINESE: RuleBookData = {
    title: "She Got Buckets Official Rulebook [比赛通则]",
    lastUpdateDate:
        "April 2, 2024 (Version 2.0): 增加了体育运动精神，及英文版。",
    introduction: "中文版（Chinese Version）",
    sections: [
        {
            title: "比赛人数:",
            detail: [
                {
                    content:
                        "在比赛开始前，当球队到场人数大于等于4人时，比赛将按照预定开始时间进行。在预定的开始时间球队不到场或到场人数少于4人时， 少人的球队需要等到第4人到达场地为止方可进行比赛。期间比赛时间仍按照原定时间开始计时，每迟到一分钟，比赛对手得1分，上半场结束时， 若球队人数不能达到4人，该球队按0:20的比分判负",
                },
                {
                    content:
                        "在比赛中，如果某队因球员受伤等原因在场上准备比赛的队员少于5名但是大于等于2名，比赛继续。如少于2名，该队因缺少队员应使比赛告负。此时如判获胜的队领先，则在比赛停止时的比分应有效。如判获胜的队不领先，则比分应记录为 2:0，对该队有利。",
                },
                {
                    content:
                        "退赛：若有球队临时退出比赛，其对手球队均按20:0的比分获胜。",
                },
            ],
        },
        {
            title: "犯规及罚则:",
            detail: [
                {
                    content:
                        "个人犯规：球员单场累计达5次犯规，或2次技术犯规，或2次恶意犯规，或1次技术犯规和1次恶意犯规后将被罚出场。 ",
                },
                {
                    content: "全队犯规：",
                    subContent: [
                        "15分钟+15分钟：每队单节第5个被犯规及以后将获得1-on-1罚球，第7个被犯规及以后将获得两次罚球。",
                        "4节，每节10分钟：每队单节第5个被犯规及以后将获得两次罚球。",
                    ],
                },
                {
                    content:
                        "普通犯规，技术犯规，恶意犯规，均计入个人及全队犯规。进攻犯规不计入团队犯规，只计入个人犯规。",
                },
                {
                    content:
                        "技术犯规：一次罚球，教练员指定罚球队员，罚球后球权归属不变。",
                },
                {
                    content: "一级恶意犯规：两罚一掷，由被犯规的队员执行罚球。",
                },
                {
                    content:
                        "二级恶意犯规：由裁判观看比赛回放确认是否为二级恶意犯规，如经确认，犯规队员立即被罚出场，并判给对方两罚一掷，由被犯规的队员执行罚球。",
                },
                {
                    content:
                        "为最大限度地保护球员人身安全，SGB对于恶意犯规将进行赛后记分及停赛的追加处罚。具体规则如下：",
                    subContent: [
                        "SGB对于恶意犯规将采用积分制，球员被判一次一级恶意犯规，将会获得1点的恶犯积分，被判一次二级恶意犯规，将会获得2点的恶犯积分。",
                        "在单场比赛结束后，恶犯积分在0-1分区间，将不会自动禁赛；",
                        "当恶犯积分达到2分时，将自动禁赛一场",
                        "当恶犯积分达到3分时，将自动禁赛两场；",
                        "当恶犯积分达到4分时，取消本次联赛的剩余参赛资格；",
                        "当恶犯积分达到5分及以上时，永久取消SGB所有联赛的参赛资格。",
                        "如裁判没有当场判罚，球队可以赛后向SGB申诉，经至少两名裁判视频裁定为恶意犯规后，SGB会对犯规球员进行追加恶意犯规和对应的记分处罚，但是对于比赛，比分以及个人得分的结果不变。",
                        "恶意犯规积分为永久积分，不予清零。",
                    ],
                },
                {
                    content:
                        "罚球时限制区两侧最多可以站6名争抢篮板的队员（4防2攻）。罚球需要在10秒内完成。",
                },
            ],
        },
        {
            title: "体育运动精神：",
            detail: [
                {
                    content:
                        "为了促进良好的比赛氛围和参与者之间的尊重与合作，自2024年4月1日起，SGB增加体育运动精神相关的规定。体育不仅仅是比赛和竞争，更是一种文化和价值观的传承。通过制定这些规定，我们可以教育和引导参与者在比赛中展现出体育精神，包括尊重对手、裁判和观众，合作配合，以及接受胜负。这不仅有助于保持比赛的公平性和秩序，也有助于培养参与者的团队合作能力、自我约束力和道德观念，从而使体育运动成为一个积极、健康和令人愉悦的体验。在每场比赛结束后，我们会请裁判为球队进行体育运动精神的评分，评分将会记录在技术统计表上。如果球队的平均体育运动精神评分过低（< 3分），我们将会给予一次警告。如果评分持续过低，球队可能会被做禁赛处理",
                },
                {
                    content:
                        "在全国赛中，若球队评分低于3分，球队会被禁止参加后续的淘汰赛/排位赛。",
                    subContent: [
                        "5 - 优秀的行为和体育精神：参与者完全配合裁判和对手队员。如有必要，队长会就规则解释、犯规、违例和比赛控制与裁判平静地交谈。队长能够充分控制队友和观众（亲友团）。",
                        "4 - 良好的行为和体育精神：参与者通常对裁判和对手队员显示良好的体育精神，没有明显的不良体育行为。参与者口头上可能对裁判做出一些抱怨，这可能会受到裁判或技术台工作人员的警告。队长能够控制队友和观众（亲友团）",
                        "3 - 一般的行为和体育精神：参与者对裁判和对手队员显示出一些不良体育行为。参与者坚持质疑裁判的规则解释和判断。队伍已受到警告，可能或可能没有因不文明行为而受到犯规处罚。队长能够部分控制队友和观众（亲友团）。",
                        "2 - 低于平均水平的行为和体育精神：参与者不断展现出对裁判和对手队员的不良体育行为。参与者不断抱怨规则解释和判断。队伍已多次受到警告，并因不文明行为而受到多次犯规处罚。队长对队友、观众（亲友团）或自己的行为控制不力。",
                        "1 - 不良的行为和体育精神：参与者的行为完全不合作，对裁判和对手队员没有尊重。一个或多个参与者因不文明行为而多次受到犯规处罚。队长无法控制队员的行为。队伍的行为需要因任何原因而停赛。明显与该队有关的参与者和观众（亲友团）参与违反大学行为准则的混乱行为。",
                    ],
                },
            ],
        },
        {
            title: "声明:",
            detail: [
                {
                    content:
                        "具体判罚请以裁判判罚为准，SGB对上述规则拥有最终解释权",
                },
                {
                    content:
                        "根据不同的比赛性质，SGB会对某些点进行调整，我们会提前准备好队长须知和工作人员须知对部分规则进行强调。",
                },
                {
                    content: "其余没有列明的规则将遵守最新NCAA女篮规则：",
                },
                {
                    content:
                        "https://www.ncaapublications.com/productdownloads/WBR24_20240826.pdf",
                },
            ],
        },
    ],
};
