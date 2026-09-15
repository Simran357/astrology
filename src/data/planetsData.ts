export interface PlanetInfo {
  id: string;
  name: string;
  symbol: string;
  type: "Luminaries" | "Personal" | "Social" | "Transpersonal" | "Points";
  archetype: string;
  represents: string;
  rulingSign: string;
  orbitalPeriod: string;
  keywords: string[];
  meaning: string;
  personalityRole: string;
  loveRole: string;
  careerRole: string;
  emotionalRole: string;
  positiveExpression: string;
  difficultExpression: string;
  astrologicalInterpretation: string;
  signInfluence: string;
  houseInfluence: string;
  commonMisconceptions: string;
  exampleInterpretation: string;
}

export const PLANETS_DATA: PlanetInfo[] = [
  {
    id: "sun",
    name: "Sun",
    symbol: "☉",
    type: "Luminaries",
    archetype: "The Core Self",
    represents:
      "Your sense of identity, confidence, purpose, vitality, and the part of you that wants to be seen for who you really are.",
    rulingSign: "Leo",
    orbitalPeriod: "365 days (1 year)",
    keywords: [
      "Confidence",
      "Identity",
      "Purpose",
      "Creativity",
      "Self-expression",
      "Recognition",
    ],
    meaning:
      "The Sun is closely connected to the person you are trying to grow into. It shows what makes you feel alive, where you want to feel confident in yourself, and where being able to express who you are matters most. It is less about putting on a perfect image and more about feeling comfortable being yourself.",
    personalityRole:
      "Shows how you naturally express yourself, what gives you confidence, where you want to have some control over your own life, and what makes you feel genuinely proud of yourself.",
    loveRole:
      "In relationships, this can show how important appreciation, respect, attention, and feeling valued are to you. You may want a partner who makes you feel seen rather than someone who constantly makes you question your worth.",
    careerRole:
      "You may do best in situations where you can take ownership, make decisions, create something of your own, or feel that your contribution actually matters.",
    emotionalRole:
      "Your confidence can have a noticeable effect on your emotional state. When you feel appreciated and comfortable with yourself, you may feel much more energetic. When you feel ignored or dismissed, it can hit your confidence harder than you let people see.",
    positiveExpression:
      "Being confident without needing to dominate, expressing yourself honestly, taking responsibility, encouraging others, and being comfortable being noticed.",
    difficultExpression:
      "Taking things personally, needing too much validation, becoming defensive when criticised, trying to control situations, or feeling like you have to prove your importance.",
    astrologicalInterpretation:
      "The Sun helps describe how someone develops confidence, identity, purpose, and authentic self-expression.",
    signInfluence:
      "The sign adds the style in which you express yourself — you may be more direct, practical, social, emotional, independent, or steady depending on it.",
    houseInfluence:
      "The house points toward the area of life where confidence, recognition, self-expression, and personal growth become especially important.",
    commonMisconceptions:
      "Your Sun sign is not your entire personality. It is one important part of a much bigger picture.",
    exampleInterpretation:
      "Sun in Leo in the 10th house: You may feel especially motivated when you are building something visible and meaningful. Being trusted with responsibility can bring out a very confident side of you.",
  },

  {
    id: "moon",
    name: "Moon",
    symbol: "☽",
    type: "Luminaries",
    archetype: "The Emotional Self",
    represents:
      "Your emotional needs, instincts, comfort zone, memories, reactions, and the things that help you feel safe.",
    rulingSign: "Cancer",
    orbitalPeriod: "27.3 days",
    keywords: [
      "Emotions",
      "Safety",
      "Comfort",
      "Intuition",
      "Memory",
      "Attachment",
    ],
    meaning:
      "The Moon is about the side of you that comes out when you stop trying to manage how you look to other people. It is connected to your automatic reactions, emotional habits, comfort needs, and the things you quietly need in order to feel okay.",
    personalityRole:
      "Shows your instinctive reactions, how quickly you process feelings, what makes you feel comfortable, and what you tend to do when you are overwhelmed.",
    loveRole:
      "In relationships, this can show what makes you feel emotionally secure. You may care less about grand romantic gestures and more about consistency, reassurance, attention, and feeling emotionally understood.",
    careerRole:
      "You are likely to function better in work environments where you feel reasonably comfortable, respected, and emotionally settled. Constant tension or unpredictability can drain you faster than you expect.",
    emotionalRole:
      "This is strongly connected to your emotional habits. You may sometimes react from a feeling first and only understand the reason afterward.",
    positiveExpression:
      "Being emotionally aware, caring deeply, noticing what other people need, creating comfort, and trusting your instincts.",
    difficultExpression:
      "Overthinking feelings, becoming overly attached to familiar situations, withdrawing when hurt, taking things personally, or carrying old emotions for longer than necessary.",
    astrologicalInterpretation:
      "The Moon helps describe emotional patterns, comfort needs, instinctive reactions, and the ways someone looks for emotional security.",
    signInfluence:
      "The sign changes how you process and express feelings. Some people need space, some need conversation, some need reassurance, and some need quiet before they can understand what they feel.",
    houseInfluence:
      "The house points toward the part of life that tends to affect your emotional security most strongly.",
    commonMisconceptions:
      "Being emotional does not automatically mean being irrational. Emotional reactions can contain useful information about what matters to you.",
    exampleInterpretation:
      "Moon in Taurus in the 4th house: You may need a peaceful and predictable personal environment to properly recharge. When life becomes chaotic, comfort and familiar routines can become especially important.",
  },

  {
    id: "mercury",
    name: "Mercury",
    symbol: "☿",
    type: "Personal",
    archetype: "The Thinker & Communicator",
    represents:
      "How you think, learn, communicate, process information, ask questions, and make sense of what is happening around you.",
    rulingSign: "Gemini & Virgo",
    orbitalPeriod: "88 days",
    keywords: [
      "Thinking",
      "Communication",
      "Logic",
      "Curiosity",
      "Learning",
      "Observation",
    ],
    meaning:
      "Mercury describes the way your mind works in everyday life. It is connected to how you take in information, explain yourself, solve problems, ask questions, and connect one idea to another.",
    personalityRole:
      "Shows your communication style, learning habits, curiosity, sense of humour, and the way you mentally approach unfamiliar situations.",
    loveRole:
      "Conversation can matter a lot to you in relationships. You may feel closer to someone when you can talk openly, joke around, discuss random things, and actually understand how their mind works.",
    careerRole:
      "This can support areas involving communication, analysis, technology, writing, teaching, research, problem-solving, negotiation, or learning new systems quickly.",
    emotionalRole:
      "You may process emotions by thinking about them. When stressed, this can turn into replaying conversations, analysing messages, looking for hidden meanings, or trying to find a logical explanation for something that simply feels confusing.",
    positiveExpression:
      "Learning quickly, asking useful questions, communicating clearly, adapting to new information, and connecting ideas that other people may miss.",
    difficultExpression:
      "Overthinking, analysing every detail, jumping between too many ideas, becoming overly critical, or talking yourself into problems that were not actually there.",
    astrologicalInterpretation:
      "Mercury helps describe how someone thinks, communicates, learns, and mentally processes everyday experiences.",
    signInfluence:
      "The sign influences your communication style — you may communicate more directly, emotionally, practically, playfully, cautiously, or analytically.",
    houseInfluence:
      "The house points toward the area of life where you spend the most mental energy, communication, learning, or problem-solving.",
    commonMisconceptions:
      "Mercury is not only about intelligence. Two equally intelligent people can process and communicate information in completely different ways.",
    exampleInterpretation:
      "Mercury in Leo in the 10th house: You may naturally communicate with confidence and personality, especially in professional situations. Your voice can become one of your strongest career tools.",
  },

  {
    id: "venus",
    name: "Venus",
    symbol: "♀",
    type: "Personal",
    archetype: "The Lover & Value Seeker",
    represents:
      "What you are attracted to, how you show affection, what you value, how you enjoy connection, and what makes you feel appreciated.",
    rulingSign: "Taurus & Libra",
    orbitalPeriod: "225 days",
    keywords: [
      "Attraction",
      "Affection",
      "Values",
      "Pleasure",
      "Connection",
      "Self-worth",
    ],
    meaning:
      "Venus is about what feels good, meaningful, attractive, and worth investing in. It can tell you a lot about the kind of attention you enjoy, what makes you feel valued, and how you naturally give and receive affection.",
    personalityRole:
      "Shows your social style, aesthetic preferences, relationship with pleasure, and the qualities you naturally find appealing in people and experiences.",
    loveRole:
      "This is one of the strongest indicators of your romantic style. You may have a particular way of showing affection and a particular kind of treatment that makes you feel genuinely wanted.",
    careerRole:
      "You may naturally notice presentation, aesthetics, people skills, branding, design, negotiation, customer relationships, or anything where taste and social awareness matter.",
    emotionalRole:
      "Your sense of being valued can strongly affect how comfortable you feel in relationships. When you feel appreciated, you may become much more giving. When you feel taken for granted, you may quietly start pulling back.",
    positiveExpression:
      "Warm affection, good social judgement, healthy standards, appreciation of beauty, diplomacy, and knowing what genuinely matters to you.",
    difficultExpression:
      "People-pleasing, comparing yourself with others, staying somewhere because you want to be chosen, avoiding difficult conversations, or relying too heavily on external validation.",
    astrologicalInterpretation:
      "Venus helps describe attraction, affection, relationship preferences, personal values, and the things that make someone feel appreciated.",
    signInfluence:
      "The sign changes your romantic and social style — you may want excitement, stability, emotional closeness, conversation, independence, or something more practical.",
    houseInfluence:
      "The house shows the area of life where connection, attraction, enjoyment, creativity, and personal values become especially noticeable.",
    commonMisconceptions:
      "Venus is not only about romance. It also describes your values, preferences, self-worth, social style, and what you consider worth your time.",
    exampleInterpretation:
      "Venus in Cancer in the 9th house: You may be drawn to people who make you feel emotionally safe while also expanding the way you see life. Emotional closeness and meaningful experiences can matter equally.",
  },

  {
    id: "mars",
    name: "Mars",
    symbol: "♂",
    type: "Personal",
    archetype: "The Drive & Action",
    represents:
      "Your ambition, courage, physical drive, boundaries, anger, initiative, and the way you go after what you want.",
    rulingSign: "Aries (traditionally Scorpio)",
    orbitalPeriod: "687 days (~2 years)",
    keywords: [
      "Drive",
      "Action",
      "Courage",
      "Passion",
      "Boundaries",
      "Initiative",
    ],
    meaning:
      "Mars is the part of you that says, 'Okay, what are we actually going to do about this?' It is connected to action, desire, frustration, competition, boundaries, and your ability to move instead of endlessly thinking.",
    personalityRole:
      "Shows how you pursue goals, react when challenged, handle frustration, take initiative, and protect your independence.",
    loveRole:
      "In relationships, this can describe how directly you pursue someone, how you express attraction, what creates chemistry for you, and how you react when you feel rejected or ignored.",
    careerRole:
      "This can show your work drive, competitive side, ability to take initiative, willingness to take risks, and how you respond when something needs to get done quickly.",
    emotionalRole:
      "Mars is closely connected to frustration and boundaries. When something feels unfair, restrictive, or disrespectful, you may feel an immediate urge to act, confront it, or distance yourself.",
    positiveExpression:
      "Taking initiative, standing up for yourself, acting with courage, protecting your boundaries, and turning motivation into real action.",
    difficultExpression:
      "Impatience, reacting too quickly, unnecessary arguments, bottling frustration until it comes out suddenly, or pushing people away when you feel cornered.",
    astrologicalInterpretation:
      "Mars helps describe how someone acts, pursues goals, handles conflict, expresses desire, and protects personal boundaries.",
    signInfluence:
      "The sign changes your action style. You may be more direct, patient, strategic, emotional, spontaneous, analytical, or persistent depending on it.",
    houseInfluence:
      "The house points toward the area of life where you are likely to put the most energy, effort, ambition, or assertiveness.",
    commonMisconceptions:
      "Mars is not simply about anger or aggression. Healthy Mars is also what helps you say no, take action, protect yourself, and go after something you genuinely want.",
    exampleInterpretation:
      "Mars in Sagittarius in the 1st house: You may come across much more confident and spontaneous than you feel inside. Freedom can be extremely important to you, and when something starts feeling restrictive, your first instinct may be to pull away.",
  },

  {
    id: "jupiter",
    name: "Jupiter",
    symbol: "♃",
    type: "Social",
    archetype: "The Expander",
    represents:
      "Growth, confidence, opportunity, learning, optimism, perspective, generosity, and the desire to experience more from life.",
    rulingSign: "Sagittarius (traditionally Pisces)",
    orbitalPeriod: "11.86 years",
    keywords: [
      "Growth",
      "Opportunity",
      "Wisdom",
      "Optimism",
      "Learning",
      "Perspective",
    ],
    meaning:
      "Jupiter is connected to growth and the parts of life that make you think bigger. It can show where you naturally become more confident, curious, generous, or willing to take a chance.",
    personalityRole:
      "Shows your big-picture thinking, optimism, curiosity, generosity, sense of humour, and willingness to explore beyond what you already know.",
    loveRole:
      "You may enjoy relationships that help you grow rather than relationships that make your world smaller. Shared experiences, humour, learning, travel, and having room to be yourself can matter.",
    careerRole:
      "You may thrive when there is room to learn, grow, teach, mentor, take on bigger responsibilities, work with different people, or expand beyond your original role.",
    emotionalRole:
      "Jupiter can give you an instinct to look for the bigger picture when something goes wrong. Even after disappointment, part of you may eventually start asking, 'Okay, what can I learn from this?'",
    positiveExpression:
      "Optimism, generosity, curiosity, confidence, learning from experience, and encouraging other people to grow.",
    difficultExpression:
      "Overpromising, assuming everything will work out without enough preparation, taking unnecessary risks, or becoming too convinced that your way of seeing things is correct.",
    astrologicalInterpretation:
      "Jupiter helps describe where someone tends to seek growth, opportunity, knowledge, confidence, and a broader perspective.",
    signInfluence:
      "The sign influences what kind of experiences make you feel like you are growing and what type of knowledge or possibility excites you.",
    houseInfluence:
      "The house highlights the part of life where growth, opportunities, learning, and bigger experiences may become especially important.",
    commonMisconceptions:
      "Jupiter does not guarantee effortless luck or money. Growth still works best when opportunity is matched with good judgement.",
    exampleInterpretation:
      "Jupiter in Aquarius in the 3rd house: You may learn best through unusual ideas, technology, communities, and conversations. Sharing what you discover with other people can become one of your strengths.",
  },

  {
    id: "saturn",
    name: "Saturn",
    symbol: "♄",
    type: "Social",
    archetype: "The Builder",
    represents:
      "Responsibility, discipline, patience, boundaries, long-term effort, maturity, and the areas where confidence is built slowly.",
    rulingSign: "Capricorn (traditionally Aquarius)",
    orbitalPeriod: "29.5 years",
    keywords: [
      "Discipline",
      "Responsibility",
      "Patience",
      "Boundaries",
      "Maturity",
      "Mastery",
    ],
    meaning:
      "Saturn often shows the areas where you may feel that things take longer than they should. But these are also the areas where consistent effort can eventually make you extremely capable and self-reliant.",
    personalityRole:
      "Shows where you take life seriously, where you may be hard on yourself, and where you prefer earning confidence through actual experience rather than empty reassurance.",
    loveRole:
      "You may take commitment seriously and need time before fully trusting someone. Once you feel secure, you may value consistency and reliability much more than temporary excitement.",
    careerRole:
      "You may be willing to work patiently toward something if you believe it is worth it. Responsibilities that initially feel heavy can eventually become areas where you are trusted because you have proven yourself.",
    emotionalRole:
      "There can be a strong inner critic here. You may sometimes feel that you should already be better, stronger, more successful, or more prepared than you actually need to be.",
    positiveExpression:
      "Reliability, patience, self-discipline, realistic thinking, emotional maturity, and the ability to build something that lasts.",
    difficultExpression:
      "Being too hard on yourself, expecting perfection, fearing failure, becoming overly cautious, or assuming that struggling means you are not good enough.",
    astrologicalInterpretation:
      "Saturn helps describe responsibility, long-term growth, boundaries, maturity, and the areas where confidence develops through experience.",
    signInfluence:
      "The sign changes the way responsibility and discipline are expressed and what kind of maturity you are being pushed toward.",
    houseInfluence:
      "The house points toward the area of life where patience, responsibility, and sustained effort may matter most.",
    commonMisconceptions:
      "Saturn is not simply about punishment or bad luck. Difficult experiences can also become the reason you eventually become very strong in a particular area.",
    exampleInterpretation:
      "Saturn in Libra in the 12th house: You may put a lot of pressure on yourself privately and expect yourself to handle things quietly. Learning that rest and emotional boundaries are also forms of responsibility can be important.",
  },

  {
    id: "uranus",
    name: "Uranus",
    symbol: "♅",
    type: "Transpersonal",
    archetype: "The Rule Breaker",
    represents:
      "Independence, change, originality, sudden shifts, experimentation, and the need to do things differently.",
    rulingSign: "Aquarius",
    orbitalPeriod: "84 years",
    keywords: [
      "Freedom",
      "Change",
      "Innovation",
      "Originality",
      "Independence",
      "Experimentation",
    ],
    meaning:
      "Uranus is connected to the part of life where you may dislike being told that there is only one correct way to do something. It can bring sudden changes, unusual interests, and a strong need for personal freedom.",
    personalityRole:
      "Shows where you are naturally unconventional, where you question established rules, and where too much repetition can make you restless.",
    loveRole:
      "You may need both closeness and breathing room in relationships. If someone becomes too controlling or predictable, you may suddenly feel the need to create distance.",
    careerRole:
      "You may enjoy technology, innovation, unusual problem-solving, independent work, or environments where experimentation is encouraged instead of everything being done exactly the same way.",
    emotionalRole:
      "When you feel trapped, controlled, or bored for too long, you may detach quickly. Sometimes you may not even realise how restless you were until you suddenly decide you need a change.",
    positiveExpression:
      "Original thinking, independence, experimentation, innovation, adaptability, and the courage to question outdated ideas.",
    difficultExpression:
      "Sudden decisions, inconsistency, emotional detachment, rebelling simply because someone told you no, or changing direction before giving something enough time.",
    astrologicalInterpretation:
      "Uranus helps describe independence, unconventional thinking, sudden changes, and the areas where someone strongly needs freedom.",
    signInfluence:
      "The sign adds the style of your originality and the kinds of changes or ideas that naturally attract your attention.",
    houseInfluence:
      "The house points toward the area of life where change, independence, experimentation, and unexpected developments may be especially noticeable.",
    commonMisconceptions:
      "Uranus does not mean that everything will suddenly fall apart. It is more about needing room to evolve instead of staying stuck in something that no longer fits.",
    exampleInterpretation:
      "Uranus in the 11th house: Your friendships, communities, and future plans may change more than expected. You may naturally gravitate toward unusual people or groups that give you space to think differently.",
  },

  {
    id: "neptune",
    name: "Neptune",
    symbol: "♆",
    type: "Transpersonal",
    archetype: "The Dreamer",
    represents:
      "Imagination, sensitivity, dreams, intuition, creativity, idealism, and the tendency to see possibilities beyond what is immediately obvious.",
    rulingSign: "Pisces",
    orbitalPeriod: "165 years",
    keywords: [
      "Imagination",
      "Dreams",
      "Sensitivity",
      "Intuition",
      "Creativity",
      "Idealism",
    ],
    meaning:
      "Neptune is connected to imagination and sensitivity. It can make you highly receptive to moods, ideas, stories, art, and possibilities. The challenge is knowing when you are reading a situation accurately and when you are filling in the missing pieces yourself.",
    personalityRole:
      "Shows where you may be especially imaginative, intuitive, idealistic, emotionally receptive, or drawn toward creative experiences.",
    loveRole:
      "You may be capable of romanticising people or situations, especially when you really want something to work. Emotional connection can feel incredibly meaningful, but clear communication helps prevent assumptions from taking over.",
    careerRole:
      "You may enjoy creative work, visual storytelling, music, writing, design, film, counselling, or roles where imagination and sensitivity are useful.",
    emotionalRole:
      "You may absorb the mood around you more easily than you realise. When things become emotionally overwhelming, escaping into music, imagination, sleep, entertainment, or your own inner world can feel easier than dealing with the situation immediately.",
    positiveExpression:
      "Creativity, empathy, imagination, intuition, emotional sensitivity, and the ability to see possibilities other people overlook.",
    difficultExpression:
      "Idealising people, ignoring red flags, escapism, unclear boundaries, avoiding uncomfortable facts, or confusing what you hope will happen with what is actually happening.",
    astrologicalInterpretation:
      "Neptune helps describe imagination, sensitivity, idealism, intuition, and the areas where clarity and boundaries become especially important.",
    signInfluence:
      "The sign changes the way imagination and sensitivity are expressed and what kinds of dreams or ideals naturally attract you.",
    houseInfluence:
      "The house points toward the area of life where imagination, intuition, idealism, and uncertainty may be especially noticeable.",
    commonMisconceptions:
      "Neptune does not mean someone is automatically unrealistic. It simply suggests that imagination and emotional interpretation may play a stronger role in certain areas of life.",
    exampleInterpretation:
      "Neptune in the 2nd house: You may have an intuitive or creative approach to money and personal values. Having clear practical boundaries can help you turn ideas into something more reliable.",
  },

  {
    id: "pluto",
    name: "Pluto",
    symbol: "♇",
    type: "Transpersonal",
    archetype: "The Transformer",
    represents:
      "Deep change, emotional intensity, control, resilience, psychological patterns, and the parts of life that push you to grow.",
    rulingSign: "Scorpio",
    orbitalPeriod: "248 years",
    keywords: [
      "Transformation",
      "Intensity",
      "Power",
      "Resilience",
      "Depth",
      "Change",
    ],
    meaning:
      "Pluto is connected to experiences that change you deeply. It can show where you are unlikely to stay the same forever, especially after intense experiences that force you to look honestly at yourself, your choices, or your relationships.",
    personalityRole:
      "Shows where you may be intense, private, determined, psychologically observant, or unwilling to accept superficial answers.",
    loveRole:
      "You may want relationships that feel emotionally real rather than casual or surface-level. Trust can become extremely important, and once you care deeply, it may be difficult to stay emotionally neutral.",
    careerRole:
      "You may be good at research, investigation, crisis management, problem-solving, strategy, psychology, technology, or situations where you need to understand what is really happening beneath the surface.",
    emotionalRole:
      "You may feel some experiences much more deeply than you show. When something hurts, you may analyse it repeatedly until you understand what happened and what you need to change.",
    positiveExpression:
      "Resilience, emotional honesty, determination, psychological insight, the ability to rebuild, and strong awareness of underlying patterns.",
    difficultExpression:
      "Obsessing over situations, trying to control outcomes, holding grudges, becoming suspicious, struggling to trust, or feeling that vulnerability automatically means losing power.",
    astrologicalInterpretation:
      "Pluto helps describe deep transformation, intensity, power dynamics, resilience, and psychological patterns that can change over time.",
    signInfluence:
      "The sign adds the style in which deep change and intensity tend to show themselves.",
    houseInfluence:
      "The house points toward the area of life where deeper change, emotional intensity, and personal growth may become especially significant.",
    commonMisconceptions:
      "Pluto does not automatically predict something terrible. Its themes are more about depth, change, resilience, and learning to handle intensity in a healthier way.",
    exampleInterpretation:
      "Pluto in the 1st house: You may have a stronger presence than you realise. People can sometimes sense that you are intense or difficult to read, while you may simply feel like you are protecting a very private part of yourself.",
  },

  {
    id: "chiron",
    name: "Chiron",
    symbol: "⚷",
    type: "Points",
    archetype: "The Vulnerable Teacher",
    represents:
      "Sensitive areas, insecurity, acceptance, healing through experience, and wisdom that develops from difficult personal lessons.",
    rulingSign: "Virgo / Sagittarius (thematic)",
    orbitalPeriod: "50 years",
    keywords: [
      "Healing",
      "Vulnerability",
      "Acceptance",
      "Wisdom",
      "Growth",
    ],
    meaning:
      "Chiron points toward an area where you may be unusually sensitive or self-conscious. Over time, understanding that sensitivity can help you become more compassionate with yourself and often more understanding toward other people going through something similar.",
    personalityRole:
      "Shows where you may question yourself more than necessary, feel different from others, or become particularly sensitive to criticism.",
    loveRole:
      "Relationships can bring certain insecurities to the surface, but they can also help you understand that you do not have to be perfect to be loved or accepted.",
    careerRole:
      "You may eventually become very good at helping others with something you once struggled with yourself. Lived experience can become one of your strongest sources of understanding.",
    emotionalRole:
      "This can point toward an emotional trigger that feels bigger than the situation itself. When activated, you may react from an old insecurity rather than what is actually happening right now.",
    positiveExpression:
      "Self-awareness, empathy, patience with yourself, emotional understanding, and the ability to turn difficult experiences into useful perspective.",
    difficultExpression:
      "Feeling permanently damaged, overcompensating, becoming overly sensitive to criticism, or assuming that one difficult experience defines your entire worth.",
    astrologicalInterpretation:
      "Chiron helps describe sensitive areas that can become sources of self-understanding, empathy, and personal growth over time.",
    signInfluence:
      "The sign adds the style in which insecurity, vulnerability, and healing tend to appear.",
    houseInfluence:
      "The house points toward the part of life where sensitivity may be strongest and where greater self-acceptance can develop.",
    commonMisconceptions:
      "Chiron does not mean you are broken. It is more useful to think of it as an area where self-understanding may take extra time.",
    exampleInterpretation:
      "Chiron in the 7th house: You may be especially sensitive to rejection or feeling unwanted in relationships. Over time, learning that another person's behaviour does not define your worth can become an important shift.",
  },

  {
    id: "northnode",
    name: "North Node",
    symbol: "☊",
    type: "Points",
    archetype: "The Growth Direction",
    represents:
      "New experiences, unfamiliar growth, qualities you are learning to develop, and patterns that encourage you to move beyond your comfort zone.",
    rulingSign: "Points / Nodal Axis",
    orbitalPeriod: "18.6 years",
    keywords: [
      "Growth",
      "Direction",
      "Learning",
      "Courage",
      "Change",
      "Development",
    ],
    meaning:
      "The North Node can be understood as the direction that asks you to try something different from your usual habits. It may initially feel uncomfortable precisely because it is less familiar.",
    personalityRole:
      "Shows qualities you may need to consciously develop instead of relying only on what already feels natural to you.",
    loveRole:
      "Relationships can push you toward becoming more open, honest, independent, communicative, or emotionally mature than you were comfortable being before.",
    careerRole:
      "Your growth may involve taking yourself into unfamiliar professional territory, developing a skill you once avoided, or choosing a path that feels more personally meaningful.",
    emotionalRole:
      "Moving toward unfamiliar growth can feel exciting and uncomfortable at the same time. You may sometimes want to return to what feels predictable even when you know you have outgrown it.",
    positiveExpression:
      "Trying new things, becoming more self-aware, developing unfamiliar strengths, taking healthy risks, and gradually becoming more comfortable outside your usual patterns.",
    difficultExpression:
      "Staying stuck in familiar habits, avoiding opportunities because they feel unfamiliar, overthinking change, or returning to situations simply because they are predictable.",
    astrologicalInterpretation:
      "The North Node helps describe areas of life and personal qualities that can encourage growth beyond familiar patterns.",
    signInfluence:
      "The sign describes the qualities and mindset you may be learning to develop more consciously.",
    houseInfluence:
      "The house points toward the life area where stepping outside your comfort zone may lead to meaningful development.",
    commonMisconceptions:
      "The North Node does not mean there is one fixed destiny you have to follow. It is better understood as a useful direction for personal growth.",
    exampleInterpretation:
      "North Node in Gemini in the 8th house: You may grow through asking more questions, having honest conversations, and becoming comfortable discussing deeper subjects instead of assuming you already know the answer.",
  },
];