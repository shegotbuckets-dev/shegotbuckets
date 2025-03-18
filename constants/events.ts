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

export const leagueData: ConferenceData = {
    "Southern Conference": {
        description:
            "Catch up on our exciting event of the Southern Conference for the National Chinese Women's College Basketball League! This tournament brought together college basketball clubs and players of all levels from universities across the southern United States. While registration has closed, you can still explore the highlights and event details by clicking Event Details below.",
        location: "Various cities in the North",
        price: "$500 (additional $100 for Team 2 tournament)",
        duration: "2 days",
        gameTimes: "2024/11/02 - 2024/11/03",
    },
    "Northern Conference": {
        description:
            "Join our exciting season of women's college basketball as we kick off the Northern Conference of the National Chinese Women's College Basketball League! This tournament unites Chinese college basketball clubs and players of all skill levels from universities across the northern United States. Each team may join the conference tournament by clicking the \"Register now\"",
        location: "Southern metropolitan areas",
        price: "$500 (additional $100 for Team 2 tournament)",
        duration: "2 days",
        gameTimes: "2024/12/07-2024/12/08",
    },
    "National Finals": {
        description:
            'Get ready for the pinnacle of competition in the National Chinese Women\'s College Basketball League! The National Finals bring together top college basketball teams and players from universities across the United States to compete for the championship title in this exhilarating season finale. Each team may join the final tournament by clicking the "Register now" below.',
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

export interface LeagueInfoDetail {
    content: string;
    subContent?: string[];
    isBold?: boolean;
    hasUrl?: boolean;
}

export interface LeagueInfoSection {
    title: string;
    description?: string;
    detail: LeagueInfoDetail[];
}

export interface TableColumn {
    key: string;
    header: string;
    width?: string;
    align?: "left" | "center" | "right";
    format?: (value: any) => string;
}

export interface TableData {
    title?: string;
    columns: TableColumn[];
    rows: Record<string, any>[];
}

export interface LeagueInfoDialogData {
    title: string;
    lastUpdateDate?: string;
    introduction: string;
    eligibility?: string;
    sections: LeagueInfoSection[];
    tables?: TableData[];
}

export const ELIGIBILITY_DATA_ENGLISH: LeagueInfoDialogData = {
    title: "COLLEGE LEAGUE PARTICIPATION ELIGIBILITY RULES",
    lastUpdateDate: "Last Updated: March 1, 2025",
    introduction:
        "The following rules outline the eligibility requirements for participation in the SGB Chinese Heritage College League.",
    eligibility: "Please review all requirements carefully before registering.",
    sections: [
        {
            title: "Team Requirements",
            detail: [
                {
                    content:
                        "Each participating team must represent one school. Each school can only have one official representative team, and each player can only represent one school's team in the competition for the entire season.",
                },
            ],
        },
        {
            title: "Team Size Requirements",
            detail: [
                {
                    content:
                        "Each team must consist of at least 5 players and no more than 15 players (for Team 1).",
                },
                {
                    content:
                        "Given that the women's basketball event is in its development stage, there are currently no limits on the number of players or the number of graduates on each team. Teams are encouraged to recruit as many qualified players as possible.",
                },
            ],
        },
        {
            title: "Player Eligibility Requirements",
            description:
                "The SGB Chinese Heritage College League is exclusively open to players of Chinese heritage. The eligibility criteria are as follows:",
            detail: [
                {
                    content:
                        "The league is open to all players of direct Chinese descent.",
                },
                {
                    content:
                        "Each player must be at least 25% of Chinese heritage (i.e., at least one grandparent must be 100% Chinese).",
                },
                {
                    content:
                        "Players with eligibility concerns should contact us before the competition.",
                },
                {
                    content:
                        "Eligibility is primarily based on self-verification by the player and their team; no pre-game verification will be conducted by SGB. However, if another team or player raises a challenge, the player must cooperate with SGB for verification. If ineligible, the team's results for that season will be annulled, and additional suspensions may be imposed on both the player and the team. Failure to cooperate will be considered ineligibility.",
                },
            ],
        },
        {
            title: "Eligible Players Must Meet One of the Following Conditions",
            detail: [
                {
                    content: "Students",
                    isBold: true,
                    subContent: [
                        "Definition: Students here means-full-time student, part-time student, in-person exchange student who spends the whole semester in and only in the school he/she wants to register with. To clarify, students here do not include summer school students, visiting students, course exchange students, online exchange students etc.",
                        "For full-time and part-time students, please provide the officer of SGB with your Student ID and the first page of your I-20/VISA page of your passport. For U.S. citizens, you only need to provide your Student ID. You do not need to provide the first page of your I-20/VISA page of your passport.",
                        "For exchange students, you will need to provide the following documents for the officer of SGB to verify your exchange status. You will need to provide: the acceptance letter from the exchange university; your course selection page (can provide screenshot); your Student ID and the first page of your I-20/VISA page of your passport; the name and the link of the program.",
                        "Exchange students can register with and only with one school in a game year, which means exchange students cannot register with the team of exchange university or home university first and then register with another university later.",
                        "Transfer students can register with and only with one school in a game year, which means if a transfer student who has already registered with a prior university and transfers to a new school within a game year, he/she cannot change the registration information to the new school. The new registration application can only be made in the following game year.",
                        "For summer school students, visiting students, course exchange students, online exchange students, etc., you are not allowed to register in the team of your summer school/exchange school. However, we notice that there may be special situations. If you are under this category and wish to register with the team, please notify your situation with the SGB officer. The SGB officer will evaluate the situation and decide. However, the decision of SGB will be final.",
                        "Please note that SGB officers may require further information and documents during registration to better verify your student identity. It is for the best interest of every player and yourself.",
                    ],
                },
                {
                    content: "Alumnus",
                    isBold: true,
                    subContent: [
                        "For alumni, please provide the officer of SGB with your past Student ID and the first page of your past I-20/VISA page of your passport. For U.S. citizens, you only need to provide your past Student ID. You do not need to provide the past first page of your I-20/VISA page of your passport.",
                        "You may be the alumnus of several universities, for example, you may be an undergraduate from X university, receive your master degree from Y university, and pursue your PhD degree in Z university. You can register with X, Y, or Z university with your identity as either an alumnus or a student. However, in one game year, you are only allowed to register with one university. The registration status can only be changed after the game year ends.",
                        "Please note that alumnus will only be allowed to register with your degree-seeking school. For example, you may be an alumnus of X university because you spent an exchange semester in X university. However, you are not allowed to register with the team of X university. Alumnus only means alumnus of your degree-seeking school.",
                    ],
                },
                {
                    content: "Faculty",
                    isBold: true,
                    subContent: [
                        "Faculty here means permanent employee and postdoc. If your identity is a contractor, subcontractor, etc, you shall not register under faculty category.",
                        "Faculty will need to provide the Faculty ID and offer letters with an SGB officer.",
                        "Faculty may be both faculty of X university and Alumnus of Y university. You can register with X with your faculty identity or with Y with your alumni identity. However, you can only register with one university within one game year.",
                        "If you wish to register with your alumni identity, please read the requirement above.",
                    ],
                },
            ],
        },
        {
            title: "Notes",
            detail: [
                {
                    content:
                        "If players have any questions regarding their eligibility, please contact us in advance to avoid disqualification on the competition day.",
                },
                {
                    content: "The following are ineligible:",
                    subContent: [
                        "Students in non-degree programs such as summer schools.",
                        "Staff in temporary, non-permanent positions, such as short-term interns.",
                        "The organizers prioritize the privacy and protection of players' personal information, and all submitted documents will be securely managed and protected.",
                    ],
                },
                {
                    content:
                        "If a player qualifies for multiple teams, they may choose one team to represent. However, they cannot represent multiple schools in the same academic year (season).",
                },
                {
                    content:
                        "No wild card teams are allowed. For exceptional situations, refer to the special rules.",
                },
                {
                    content:
                        "Second Team players should be ranked outside of the team's top 7 core players.",
                },
                {
                    content:
                        "In case of disputes, She Got Buckets reserves the final interpretation of the competition rules.",
                },
            ],
        },
        {
            title: "Special Rules: Tentative Joint Team for Regional Tournament",
            description:
                "To encourage the sustainable development of college teams and maintain fairness in the league, She Got Buckets College League generally does not permit joint teams or multi-school teams. However, under special circumstances, one joint team may be invited to participate in a regional invitational (First Team competition). The specific rules are as follows:",
            detail: [
                {
                    content: "Eligibility Conditions:",
                    isBold: true,
                    subContent: [
                        "A joint team may be permitted if fewer than 5 teams register for a particular regional tournament, ensuring the tournament can proceed successfully.",
                        "Joint teams are only allowed in regional tournaments; they are not permitted in the national tournament.",
                    ],
                },
                {
                    content: "Participation Restrictions:",
                    isBold: true,
                    subContent: [
                        "Results from the invitational do not contribute to regional points or rankings, and regardless of performance, joint teams are not eligible to advance to the national tournament.",
                    ],
                },
                {
                    content: "Team Composition:",
                    isBold: true,
                    subContent: [
                        "Joint team players must come from no more than 3 different schools.",
                        "Each school may contribute no more than 4 players to the joint team.",
                        "All players must meet the league's eligibility requirements.",
                    ],
                },
                {
                    content: "Registration Process:",
                    isBold: true,
                    subContent: [
                        "Interested joint teams must submit a registration form and join the waitlist.",
                        "After the registration deadline, if the conditions for allowing a joint team are met, the first team on the waitlist will be granted eligibility to participate.",
                    ],
                },
            ],
        },
    ],
};

export const ELIGIBILITY_DATA_CHINESE: LeagueInfoDialogData = {
    title: "SGB华裔高校联赛参赛资格说明",
    lastUpdateDate: "最后更新：2025年3月1日",
    introduction: "以下规则概述了SGB华裔高校联赛的参赛资格要求。",
    eligibility: "请在注册前仔细阅读所有要求。",
    sections: [
        {
            title: "参赛球队要求",
            detail: [
                {
                    content:
                        "参赛球队需以学校为单位，每个学校只能有且只有一支官方代表队，每名球员在当赛季也只能代表一个学校的球队参赛。",
                },
            ],
        },
        {
            title: "参赛球队人数要求",
            detail: [
                {
                    content: "每队参赛人数不得少于5人，不得多于15人（一队）",
                },
                {
                    content:
                        "鉴于女篮赛事处于发展阶段，目前暂不对每队人数以及毕业生人数设置上限，鼓励各球队尽可能努力招募符合条件的球员参赛",
                },
            ],
        },
        {
            title: "参赛球员资格要求",
            description: "SGB华裔高校联赛仅限华裔球员参赛，资格要求如下：",
            detail: [
                {
                    content: "SGB华人高校联赛对所有直系华裔球员开放。",
                },
                {
                    content:
                        "参赛球员必须至少有25%的华裔血统（至少一个祖父母必须是100%的华裔）。",
                },
                {
                    content:
                        "参赛球员如对自己的参赛资格有疑问，请于赛前及时联系我们。",
                },
                {
                    content:
                        "原则上以参赛球员及其球队自我认证为主，SGB不做赛前验证。但如有其他球队、球员提出质疑，该球员需配合SGB进行资格验证，如若验证为假，将取消该队在当届比赛的成绩，并保留对球员及其球队追加禁赛处罚的权利。如球队或球员拒绝配合调查，将按验证为假处理。",
                },
            ],
        },
        {
            title: "参赛球员必须属于下列情况之一",
            detail: [
                {
                    content: "学生",
                    isBold: true,
                    subContent: [
                        "定义：学生指全日制学生、非全日制学生以及整学期仅在所注册学校学习的交换生。此处不包括暑期学校学生、访问学生、课程交换学生、线上交换学生等。",
                        "对于全日制和非全日制学生，请向SGB工作人员提供您的学生证以及I-20/VISA首页。对于美国公民，需提供美国护照及学生证，无需I-20/VISA首页。",
                        "对于交换生，需提供以下文件供SGB工作人员验证交换身份：1. 交换大学的录取通知书；2. 课程选择页面（截图）；3. 学生证和I-20/VISA首页；4. 项目名称及链接。",
                        "交换生在一个比赛年度内只能注册一个学校的队伍，不能在交换大学或本校注册后再注册其他大学。",
                        "转学生在一个比赛年度内只能注册一个学校，即若在年度内由前大学转学至新学校，无法更改注册信息，下一比赛年度方可重新申请。",
                        "暑期学校学生、访问学生、课程交换学生、线上交换学生等，不能注册所在暑期/交换学校的队伍。如有特殊情况，需通知SGB工作人员，SGB将评估情况并做出最终决定。",
                        "请注意，SGB工作人员在注册过程中可能会要求提供更多信息和文件，以便更好地验证您的学生身份。这是为了保护每位球员的利益。",
                    ],
                },
                {
                    content: "校友",
                    isBold: true,
                    subContent: [
                        "对于校友，请向SGB工作人员提供过往的学生证和I-20/VISA首页。对于美国公民，需提供美国护照及过往的学生证，无需过往的I-20/VISA首页。",
                        "您可能是多个大学的校友，例如本科就读于X大学，硕士在Y大学，博士在Z大学。您可以作为校友或学生身份注册X、Y或Z大学的队伍，但在一个比赛年度内只能注册一个大学。注册状态仅可在比赛年度结束后更改。",
                        "校友仅限于所获得学位的学校。若因交换而在X大学度过一学期，但未获得学位，不能注册X大学的队伍。",
                    ],
                },
                {
                    content: "教职工",
                    isBold: true,
                    subContent: [
                        "教职工指正式雇员及博士后，合同工、外包人员等不属于教职工类别。",
                        "教职工需向SGB工作人员提供教职员工证及聘用信。",
                        "教职工可能同时是X大学的教职工和Y大学的校友，可选择以教职工身份注册X大学或以校友身份注册Y大学，但在一个比赛年度内只能注册一个大学。",
                    ],
                },
            ],
        },
        {
            title: "注意事项",
            detail: [
                {
                    content:
                        "暑校等 non-degree program 的学生不符合本次高校联赛的参赛资格",
                },
                {
                    content:
                        "短期实习生等非 Permanent 职位的职工不符合本次高校联赛的参赛资格",
                },
                {
                    content:
                        "主办方极其重视参赛球员的隐私和个人信息保护：所有提交的身份证明文件会被妥善管理和保护",
                },
                {
                    content:
                        "当某位球员满足上述多个要求时，球员可选择其中一支球队参赛，且该学年（赛季）内不得代表多个学校参赛",
                },
                {
                    content:
                        "高校赛事不设置外卡球队，如遇特殊情况，详情见特殊规则",
                },
                {
                    content: "二队参赛队员应当排在球队的前7名主力球员之外",
                },
                {
                    content:
                        "如遇到争议，She Got Buckets对赛事规则拥有最终解释权",
                },
            ],
        },
        {
            title: "特殊规则：分区赛外卡邀请赛",
            description:
                "为了鼓励各高校球队的可持续发展并维持联赛的公平性，She Got Buckets 高校联赛原则上不设立任何外卡球队或多校联队。然而，在特殊情况下，将开放一支外卡球队报名参加分区邀请赛（一队比赛）。具体规则如下：",
            detail: [
                {
                    content: "开放条件：",
                    isBold: true,
                    subContent: [
                        "仅当某一分区赛报名球队少于5支时，为确保比赛成功举办，我们会开放一支外卡球队参加邀请赛。",
                        "外卡队仅限分区赛，全国赛不设立外卡队。",
                    ],
                },
                {
                    content: "参赛限制：",
                    isBold: true,
                    subContent: [
                        "邀请赛的成绩不参与分区赛的积分或排名，且不论赛绩如何，外卡队无资格参加全国赛。",
                    ],
                },
                {
                    content: "队伍构成：",
                    isBold: true,
                    subContent: [
                        "外卡队的球员所属高校不得超过3所。",
                        "每所高校的球员人数不得超过4人。",
                        "球员需满足高校联赛的参赛资格。",
                    ],
                },
                {
                    content: "报名流程：",
                    isBold: true,
                    subContent: [
                        "有意参赛的外卡队须先提交报名表，并加入waitlist。",
                        "报名截止后，如分区赛符合开放外卡的条件，waitlist上的第一支球队将成功获得参赛资格。",
                    ],
                },
            ],
        },
    ],
};

export const RULE_BOOK_DATA_ENGLISH: LeagueInfoDialogData = {
    title: "She Got Buckets Chinese Women's College Basketball League Official Rules and Guidelines",
    lastUpdateDate: "Latest Update: April 2, 2024 (Version 2.0)",
    introduction:
        "Please read the following rules and guidelines carefully before participating in your first game. We have a unique set of rules and guidelines for how teams are managed in the SGB Chinese Women's College Basketball League. \n\nIf you have any additional questions after reading the regulations and guidelines below, please email info@shegotbuckets.org",
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
                        "1- Poor Conduct and Sportsmanship: Participants' behavior is completely uncooperative and shows no respect for officials and opposing team members. Multiple fouls are given to a player or players for unsportsmanlike acts. Team captain displays no control over the actions of team members. Team behavior warrants discontinuance of the game for any reason. Participants and spectators clearly related to the team engage in disorderly conduct that violates the university code of conduct.",
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
                        "The remaining rules not listed will comply with the latest NCAA Women's basketball rules: https://www.ncaapublications.com/productdownloads/WBR24_20240826.pdf",
                    hasUrl: true,
                },
            ],
        },
    ],
};

export const RULE_BOOK_DATA_CHINESE: LeagueInfoDialogData = {
    title: "She Got Buckets Official Rulebook [比赛通则]",
    lastUpdateDate: "最后更新： April 2, 2024 (Version 2.0)",
    introduction:
        "在阅读以下规则和指南后，如有任何其他问题，请发送邮件至 info@shegotbuckets.org",
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
                    content:
                        "其余没有列明的规则将遵守最新NCAA女篮规则：https://www.ncaapublications.com/productdownloads/WBR24_20240826.pdf",
                    hasUrl: true,
                },
            ],
        },
    ],
};

export const SEEDING_DATA_ENGLISH: LeagueInfoDialogData = {
    title: "NATIONAL FINALS SEEDING AND BRACKETING",
    introduction: "",
    sections: [
        {
            title: "Overview",
            detail: [
                {
                    content:
                        'She Got Buckets Chinese Women\'s College Basketball League ("SGB College League") includes two phases: conference tournaments and the national finals.',
                },
                {
                    content:
                        "At the national final, the seed teams will be selected based on the results from the conference tournaments and previous competitions. We aim to use a more reasonable group division method instead of past random draws to enhance the competition experience for all teams.",
                },
                {
                    content:
                        "Previous game results will only affect the seeding process on the first day of the finals and will not affect qualification for the competition! We welcome everyone to sign up for the divisional games/finals, start your team's first battle, and join in the joy of basketball!",
                },
                {
                    content:
                        "The number of seed teams will be determined based on the number of teams registered for the finals. For example, if 12 teams are registered, it is expected to be divided into 4 groups, with the 1st to 4th ranked in points as the first-tier seeds, the 5th to 8th as the second-tier seeds, and the 9th to 12th as the last-tier seeds.",
                },
                {
                    content:
                        'Seeds in the same group will be randomly drawn and assigned to groups. For instance, the four first-tier seed teams will be randomly assigned to four different groups through a draw, and the teams from the second and last tiers will also be drawn and assigned to groups respectively. The ultimate goal is for each group to consist of one team from the first, second, and last tiers, thereby avoiding the creation of "groups of death" and enhancing the competition experience!',
                },
            ],
        },
        {
            title: "Current season ranking points (for bracketing only)",
            detail: [
                {
                    content:
                        "The SGB College League ranking points are calculated based on the team's single-event points, which consider the team's rank, the weight of the event, and the total number of participating teams.\n\nThe calculation method is as follows:",
                    subContent: [
                        "Single-event team points: These points consist of two parts, participation points (10 points regardless of rank) and ranking points. The ranking points are as follows: 50, 40, 30, 20, 15, 13, 9, 7, 5, 3, 1 points according to rank. For ranks 12th and beyond, the ranking points are 1 point each. If not participating, the event score for that edition is 0.",
                        "Weighted event points: Weighted event points = Event weight * (1 + number of teams / 10) * Event points. The weighting factor represents the scale, overall strength/level of the event. The higher the event level, the higher the event weight. The more teams participating, the larger the scale of the event, and thus the higher the weighting factor. The weights for the scores from the past three events are fixed as follows: the finals before last (0.15), previous finals (0.3), current divisional game (0.55).",
                        "The annual event points are the total of the weighted points from the three events.",
                    ],
                },
            ],
        },
    ],
    tables: [
        {
            title: "2024-2025 College Finals Standings (Pre-Competition)",
            columns: [
                { key: "team", header: "Team" },
                { key: "points", header: "Points", align: "center" },
                { key: "standing", header: "Standing", align: "center" },
            ],
            rows: [
                { team: "UMich", points: 101.4, standing: 1 },
                { team: "UNC", points: 80, standing: 2 },
                { team: "NYU", points: 68.93, standing: 3 },
                { team: "OSU", points: 68.34, standing: 4 },
                { team: "Harvard", points: 59.7, standing: 5 },
                { team: "NEU", points: 44.56, standing: 6 },
                { team: "Duke", points: 38.5, standing: 7 },
                { team: "Columbia", points: 37.75, standing: 8 },
                { team: "UIUC", points: 33.92, standing: 9 },
                { team: "NWU", points: 26.4, standing: 10 },
                { team: "JHU", points: 22.71, standing: 11 },
                { team: "USC", points: 21.6, standing: 12 },
                { team: "Yale", points: 0, standing: 13 },
                { team: "UCLA", points: 0, standing: 14 },
            ],
        },
    ],
};

export const SEEDING_DATA_CHINESE: LeagueInfoDialogData = {
    title: "全国总决赛种子排位和分组规则",
    introduction: "",
    sections: [
        {
            title: "概述",
            detail: [
                {
                    content:
                        '"She Got Buckets"华裔北美高校联赛包含两个赛段：秋季的分区赛和春季的总决赛。',
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
                        "根据总决赛的报名球队数量来确定种子球队的数量。例如，若报名球队数量为12支队伍，预计分为4组，那么积分排名的第1-4名为首轮种子，第5-8名为次轮种子，第9-12名为末轮种子。",
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
            title: "积分规则",
            detail: [
                {
                    content:
                        "SGB北美高校赛排名积分是由球队单届赛事的积分由该球队所得的排名、参加赛事的比重、该赛事参赛球队的总数加权计算而成。具体计算方式如下：",
                    subContent: [
                        "球队单届赛事积分：该积分由两部分组成，参与分10分（不论名次）与排名分。排名分按照名次依次是：50、40、30、20、15、13、9、7、5、3、1分。单届排名在第12名及以后，排名分均为1分。未参赛则该届赛事积分为0。",
                        "加权后的赛事积分：加权后的赛事积分=赛事比重*（1+球队数量/10）*赛事积分。加权系数代表了该赛事的规模、总体实力/级别等。赛事级别越高，赛事比重越高。参赛的球队数量越多，说明该赛事的规模越大，加权系数也就越高。往届三次赛事积分的比重分别固定为：上上届总决赛（0.15），上届总决赛（0.3），当届分区赛（0.55）。",
                        "年度赛事积分为三届赛事的加权积分的总和。",
                    ],
                },
            ],
        },
    ],
    tables: [
        {
            title: "2024-2025 全国赛积分排名（赛前）",
            columns: [
                { key: "team", header: "球队" },
                { key: "points", header: "积分", align: "center" },
                { key: "standing", header: "排名", align: "center" },
            ],
            rows: [
                { team: "UMich", points: 101.4, standing: 1 },
                { team: "UNC", points: 80, standing: 2 },
                { team: "NYU", points: 68.93, standing: 3 },
                { team: "OSU", points: 68.34, standing: 4 },
                { team: "Harvard", points: 59.7, standing: 5 },
                { team: "NEU", points: 44.56, standing: 6 },
                { team: "Duke", points: 38.5, standing: 7 },
                { team: "Columbia", points: 37.75, standing: 8 },
                { team: "UIUC", points: 33.92, standing: 9 },
                { team: "NWU", points: 26.4, standing: 10 },
                { team: "JHU", points: 22.71, standing: 11 },
                { team: "USC", points: 21.6, standing: 12 },
                { team: "Yale", points: 0, standing: 13 },
                { team: "UCLA", points: 0, standing: 14 },
            ],
        },
    ],
};
