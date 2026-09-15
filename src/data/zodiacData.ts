export interface ZodiacSignInfo {
  id: string;

  name: string;

  symbol: string;

  dates: string;

  // Internal astrology data.
  element: "Fire" | "Earth" | "Air" | "Water";

  modality: "Cardinal" | "Fixed" | "Mutable";

  rulingPlanet: string;

  keywords: string[];

  // User-facing content.
  // These should feel like a personal conversation,
  // not an astrology textbook.
  overview: string;

  personality: string;

  strengths: string[];

  challenges: string[];

  love: string;

  career: string;

  communication: string;

  emotionalTendencies: string;

  misconceptions: string;

  placementBehavior: {
    asSun: string;
    asMoon: string;
    asRising: string;
    asVenus: string;
    asMars: string;
  };
}

export const ZODIAC_SIGNS_DATA: ZodiacSignInfo[] = [
  {
    id: "aries",
    name: "Aries",
    symbol: "♈",
    dates: "March 21 – April 19",

    element: "Fire",
    modality: "Cardinal",
    rulingPlanet: "Mars",

    keywords: [
      "Initiative",
      "Courage",
      "Independence",
      "Vitality",
      "Pioneering",
    ],

    overview:
      "You tend to feel best when something is actually happening. Sitting around waiting for the perfect moment can be more frustrating for you than taking a slightly messy first step. There's a very direct quality to the way you experience life — when you want something, you usually know it, and when you don't, it's difficult to pretend.",

    personality:
      "You're naturally drawn toward movement, challenge, and experiences that make you feel alive. You can walk into a situation with surprisingly little fear because your instinct is often, 'I'll figure it out once I'm there.' The upside is incredible courage and momentum. The downside? You can get impatient when life moves slower than your mind does. You may also lose interest once the exciting beginning turns into repetitive maintenance.",

    strengths: [
      "You are usually the person willing to make the first move.",
      "You can act decisively when everyone else is still overthinking.",
      "People often find your honesty refreshing because they don't have to guess what you mean.",
      "You tend to recover quickly once you've had time to process a setback.",
    ],

    challenges: [
      "Waiting can make you feel trapped even when waiting is actually the smarter move.",
      "You can put too much pressure on yourself to fix everything immediately.",
      "Something can lose its appeal once the excitement disappears.",
      "You may sometimes see compromise as giving up more than you're comfortable with.",
    ],

    love:
      "You want chemistry, honesty, and a relationship that still lets you feel like yourself. You don't enjoy guessing games for very long. You can be intensely interested when someone excites you, but you also need a partner who has their own life instead of making the relationship their entire world. For you, attraction becomes much stronger when there is both closeness and freedom.",

    career:
      "You tend to do well when you can actually make decisions, solve problems, and see something moving because of your effort. Being micromanaged or stuck in endless approval loops can drain you quickly. You may be happiest when you're building, leading, experimenting, competing, or starting something that wasn't there before.",

    communication:
      "You usually prefer people to just say what they mean. Long explanations, passive hints, and unnecessary drama can lose your attention quickly. When you're comfortable, your communication can be energetic, funny, blunt, and refreshingly honest.",

    emotionalTendencies:
      "Your feelings can arrive quickly and intensely. You might be furious one moment and surprisingly fine later once you've had a chance to release the emotion. What tends to bother you most is feeling stuck with something unresolved. Movement, honest conversation, or simply doing something physical can help you feel like yourself again.",

    misconceptions:
      "People can mistake your directness for aggression. A lot of the time, you're not trying to dominate anyone — you simply don't see the point in pretending you feel something you don't.",

    placementBehavior: {
      asSun:
        "You build your identity through independence, taking chances, and proving to yourself that you can start things without waiting for permission.",

      asMoon:
        "Your emotions can come on fast. When you're upset, you usually need somewhere for that feeling to go rather than being told to quietly sit with it.",

      asRising:
        "You can come across as confident, energetic, and difficult to ignore. People may feel that you already know where you're going even when you're figuring it out as you move.",

      asVenus:
        "You fall for people who make you feel alive. You like clear attraction, playful tension, direct effort, and someone who can match your energy without trying to control it.",

      asMars:
        "Once you want something, you can become extremely difficult to stop. Your biggest advantage is your ability to start; your biggest lesson is knowing what deserves your continued energy.",
    },
  },

  {
    id: "taurus",
    name: "Taurus",
    symbol: "♉",
    dates: "April 20 – May 20",

    element: "Earth",
    modality: "Fixed",
    rulingPlanet: "Venus",

    keywords: [
      "Stability",
      "Sensuality",
      "Resourcefulness",
      "Patience",
      "Groundedness",
    ],

    overview:
      "You don't necessarily need life to be exciting all the time. You need it to feel good, stable, and worth investing your energy into. Once something feels right, you tend to build around it slowly and seriously. You'd often rather have a few things you genuinely trust than a hundred temporary experiences.",

    personality:
      "There's usually more going on beneath your calm exterior than people realize. You observe, take your time, and decide whether something is actually worth your effort. You can be incredibly patient when you believe in something, but once you've decided that a situation isn't working, getting you to change direction can be another story entirely.",

    strengths: [
      "People can rely on you when things become chaotic.",
      "You know how to build something slowly instead of needing instant results.",
      "You tend to have a strong sense of quality and what feels genuinely worth your time.",
      "Your loyalty becomes especially powerful once someone has earned your trust.",
    ],

    challenges: [
      "You can stay in familiar situations longer than you should simply because they're familiar.",
      "Comfort can sometimes become an excuse for avoiding necessary change.",
      "You may hold onto people, routines, or plans even after you've emotionally outgrown them.",
      "Once your mind is made up, outside opinions can have very little effect.",
    ],

    love:
      "You usually don't want a relationship that constantly keeps you guessing. You like consistency, affection, physical closeness, and the feeling that someone is actually there when it matters. You may take your time opening up, but once you feel safe, your attachment can run much deeper than people initially expect.",

    career:
      "You tend to thrive when you can build something tangible over time. Work that rewards patience, quality, reliability, creativity, or long-term thinking can suit you well. Constantly changing priorities without a clear reason can be much more exhausting for you than genuinely hard work.",

    communication:
      "You usually don't need to fill every silence. You prefer conversations that feel calm, useful, and genuine. When you finally say something strongly, people often realize you've probably been thinking about it for much longer than they knew.",

    emotionalTendencies:
      "You often process feelings slowly. You may not immediately know what you're feeling, but once something settles inside you, it can stay there for a long time. You tend to feel safest when your environment and relationships are predictable enough for you to relax.",

    misconceptions:
      "Being slow to change doesn't automatically mean you're lazy or stubborn for no reason. You usually want to know that the new thing is actually better before abandoning something that already works.",

    placementBehavior: {
      asSun:
        "You build your sense of self through stability, self-respect, and creating a life that feels genuinely comfortable rather than impressive from the outside.",

      asMoon:
        "You need emotional consistency. When your surroundings feel peaceful and your relationships feel dependable, your mind can finally switch off.",

      asRising:
        "You may appear calm, composed, and difficult to rush. People often feel that you have a steady presence even when you haven't said much.",

      asVenus:
        "You tend to fall in love through consistency, affection, comfort, and small things that prove someone is actually paying attention.",

      asMars:
        "You may take longer to start, but once you're committed, your stamina can be impressive. You don't always move quickly — you just keep going.",
    },
  },

  {
    id: "gemini",
    name: "Gemini",
    symbol: "♊",
    dates: "May 21 – June 20",

    element: "Air",
    modality: "Mutable",
    rulingPlanet: "Mercury",

    keywords: [
      "Curiosity",
      "Versatility",
      "Intellect",
      "Connection",
      "Adaptability",
    ],

    overview:
      "Your mind likes movement. You can become fascinated by a person, idea, conversation, place, or random question and suddenly want to know everything about it. You need mental stimulation more than you may realize, and when life becomes repetitive for too long, your attention naturally starts looking for somewhere more interesting to go.",

    personality:
      "You're usually curious about people as much as you're curious about information. You notice connections, pick up on little details, and can move between completely different topics without feeling like you've changed subjects at all. The same flexibility that makes you adaptable can sometimes make it difficult to know which of your many interests deserves your full attention.",

    strengths: [
      "You can understand new ideas quickly and explain them in a way other people actually understand.",
      "You adapt well when circumstances suddenly change.",
      "You naturally connect people, ideas, and conversations that wouldn't normally meet.",
      "Your curiosity keeps you learning long after other people have stopped asking questions.",
    ],

    challenges: [
      "Too many interesting options can make commitment difficult.",
      "You may think your way around an emotion instead of actually sitting with it.",
      "Constant information can leave you mentally exhausted without you noticing.",
      "When your interest changes, other people may interpret it as inconsistency.",
    ],

    love:
      "For you, attraction often starts in the mind. A great conversation can be more exciting than a perfect first impression. You need someone who can make you laugh, challenge your thinking, and keep discovering things with you. The relationship becomes difficult when every conversation starts feeling predictable.",

    career:
      "You tend to shine where there is variety, communication, problem-solving, learning, or room to move between different types of work. Repetition isn't necessarily bad, but you usually need to understand why you're doing something or have something new to explore alongside it.",

    communication:
      "You are naturally conversational and associative. One thought can lead to another, and suddenly you're somewhere completely different. You often communicate best when the other person is curious enough to follow the journey.",

    emotionalTendencies:
      "When something hurts, your first instinct may be to understand it. You might replay the conversation, analyze what happened, talk about it, or try to find another explanation. The challenge is remembering that not every feeling needs to be solved like a puzzle.",

    misconceptions:
      "People can call you inconsistent when you're actually responding honestly to changing information. Your mind changes because you keep noticing new things.",

    placementBehavior: {
      asSun:
        "You discover who you are through curiosity, conversations, experiences, and constantly updating your understanding of the world.",

      asMoon:
        "You need somewhere to put your thoughts when emotions become overwhelming. Talking, writing, learning, or simply being around stimulating people can help.",

      asRising:
        "You may come across as youthful, curious, expressive, and mentally quick. People often feel like there's always another thought happening behind your eyes.",

      asVenus:
        "You can fall for someone's mind before you fall for anything else. Banter, humour, curiosity, and effortless conversation are huge parts of attraction.",

      asMars:
        "Your motivation gets stronger when something interests your mind. You can be incredibly strategic when you have a problem worth solving.",
    },
  },

  {
    id: "cancer",
    name: "Cancer",
    symbol: "♋",
    dates: "June 21 – July 22",

    element: "Water",
    modality: "Cardinal",
    rulingPlanet: "Moon",

    keywords: [
      "Nurture",
      "Intuition",
      "Memory",
      "Protection",
      "Emotional Depth",
    ],

    overview:
      "You probably remember how something felt long after you've forgotten the exact details. People, places, conversations, songs, and tiny moments can carry emotional meaning for you that other people don't immediately understand. You may seem composed on the outside while quietly noticing much more than you're saying.",

    personality:
      "You tend to be protective of the people and spaces you care about. Once someone feels like 'your person', your loyalty can become extremely strong. But because you feel things deeply, you may also need more time than people realize to feel safe enough to show what is actually happening inside you.",

    strengths: [
      "You notice emotional shifts that other people often miss.",
      "You naturally make people feel cared for and remembered.",
      "Your loyalty can be incredibly strong once trust has been established.",
      "You have a powerful memory for people, feelings, and meaningful moments.",
    ],

    challenges: [
      "You may withdraw instead of explaining that you've been hurt.",
      "The past can sometimes feel emotionally closer than it actually is.",
      "You can take responsibility for feelings that aren't yours to carry.",
      "Protecting yourself can sometimes become shutting people out completely.",
    ],

    love:
      "You want to feel emotionally safe, not just wanted. Small things matter to you — remembering details, checking in, noticing your mood, making space for you. You can love very deeply, but you need to know that your softer side isn't going to be used against you.",

    career:
      "You tend to do well where emotional intelligence, care, memory, creativity, or understanding people matters. You can also be surprisingly strong in leadership when you genuinely care about what you're protecting or building.",

    communication:
      "You often communicate through tone as much as words. You notice what someone didn't say, how quickly they replied, whether their energy changed, and whether something feels slightly off.",

    emotionalTendencies:
      "Your emotions can come in waves. You may feel completely fine and then suddenly realize something has been sitting with you for days. You usually need emotional safety before you can fully process what you feel.",

    misconceptions:
      "Sensitivity isn't weakness. You can be extremely strong and still be affected deeply by things. In fact, your emotional awareness can become one of your biggest strengths when you learn not to absorb everything around you.",

    placementBehavior: {
      asSun:
        "You build your identity around meaningful relationships, emotional belonging, and creating places where you genuinely feel at home.",

      asMoon:
        "You feel everything personally and deeply. You need emotional safety, familiarity, and people you can completely relax around.",

      asRising:
        "You may come across as gentle, observant, and slightly guarded at first. People may sense that you notice more than you're saying.",

      asVenus:
        "You tend to love through care. Remembering little things, checking in, creating comfort, and being emotionally present can mean more to you than grand romantic gestures.",

      asMars:
        "You become incredibly determined when something or someone you love needs protecting. Your motivation is strongest when your heart is involved.",
    },
  },

  {
    id: "leo",
    name: "Leo",
    symbol: "♌",
    dates: "July 23 – August 22",

    element: "Fire",
    modality: "Fixed",
    rulingPlanet: "Sun",

    keywords: [
      "Creativity",
      "Radiance",
      "Generosity",
      "Sovereignty",
      "Heart",
    ],

    overview:
      "You want your life to feel like it actually belongs to you. Being seen matters, but usually not just for attention — you want your effort, personality, creativity, and heart to mean something. When you care about something, you can bring an almost contagious amount of warmth to it.",

    personality:
      "You can be naturally expressive, playful, loyal, and protective of the people you love. You enjoy making moments feel special. At the same time, being ignored or made to feel replaceable can hit harder than you let people see. You may act confident even while privately wondering whether you're actually appreciated.",

    strengths: [
      "You naturally bring warmth and energy into rooms and relationships.",
      "You can make people feel important when you genuinely care about them.",
      "You have strong creative instincts and aren't afraid to express them.",
      "Your loyalty becomes fierce once someone is part of your inner circle.",
    ],

    challenges: [
      "You may sometimes look for external validation when you're already enough without it.",
      "Criticism can feel more personal than it was intended.",
      "You can struggle when you feel overlooked or undervalued.",
      "Pride can make vulnerability harder than it needs to be.",
    ],

    love:
      "You want to feel chosen, appreciated, and genuinely admired. You don't necessarily need constant attention, but you do need affection to feel alive. You give a lot when you're in love, and you usually want someone who isn't embarrassed to show that they're proud to have you in their life.",

    career:
      "You tend to do well where creativity, visibility, leadership, performance, or personal expression is involved. You can work extremely hard when you feel ownership over what you're building.",

    communication:
      "You're usually expressive and emotionally clear when you trust someone. You can tell stories well and often use humour, exaggeration, or personality to make a point memorable.",

    emotionalTendencies:
      "You can look completely fine while privately feeling hurt by something that made you feel unimportant. You often need time to move past pride and admit that you actually wanted reassurance.",

    misconceptions:
      "Wanting to shine doesn't automatically mean you want everyone else to disappear. At your best, you actually enjoy making other people shine too.",

    placementBehavior: {
      asSun:
        "You discover yourself through creativity, confidence, leadership, and allowing yourself to be visible without constantly apologizing for it.",

      asMoon:
        "You need warmth and genuine appreciation to feel emotionally secure. Being ignored can affect you much more than you show.",

      asRising:
        "You can have a noticeable presence even when you're not trying. People may remember you simply because of the way you carry yourself.",

      asVenus:
        "You tend to love generously and romantically. You like affection that is obvious, playful, proud, and impossible to mistake for indifference.",

      asMars:
        "When you care, you go all in. Your motivation becomes strongest when there is something meaningful you can be proud of at the end.",
    },
  },

  {
    id: "virgo",
    name: "Virgo",
    symbol: "♍",
    dates: "August 23 – September 22",

    element: "Earth",
    modality: "Mutable",
    rulingPlanet: "Mercury",

    keywords: [
      "Discernment",
      "Service",
      "Craft",
      "Precision",
      "Optimization",
    ],

    overview:
      "You notice things. Small inconsistencies, changes in someone's tone, a detail everyone else missed, something that could work better — your brain naturally picks these things up. You often show care by trying to improve things, even when nobody explicitly asked you to.",

    personality:
      "You're usually more observant than expressive. You may spend a lot of time thinking about how something could be done better before you ever mention it. This can make you incredibly capable, but it can also create a situation where you're constantly measuring yourself against an imaginary version of perfection.",

    strengths: [
      "You catch details that other people overlook.",
      "You can turn complicated problems into manageable steps.",
      "You tend to show care through practical actions rather than empty promises.",
      "You have the patience to improve something little by little until it becomes genuinely good.",
    ],

    challenges: [
      "Your inner critic can be much harsher than you would ever be toward someone else.",
      "You may overthink decisions because you want to make the 'right' one.",
      "You can struggle to relax when there is still something you could improve.",
      "You may offer solutions when someone actually just wanted emotional support.",
    ],

    love:
      "You often show love through the details. Remembering what someone likes, helping with something stressful, checking whether they're okay, fixing a problem before they ask — that's affection for you. You may not always be the loudest romantic, but your care can be extremely consistent.",

    career:
      "You tend to thrive where precision, analysis, systems, problem-solving, research, design, writing, or improvement matters. You can become exceptionally good at something when you're given enough time to understand how all the pieces work.",

    communication:
      "You generally prefer clarity over vague reassurance. You may ask specific questions because you genuinely want to understand what someone means, not because you're trying to argue.",

    emotionalTendencies:
      "You can analyze a feeling until it becomes another problem to solve. Sometimes your mind wants an explanation when what you actually need is permission to simply feel tired, hurt, disappointed, or overwhelmed.",

    misconceptions:
      "Being detail-oriented doesn't mean you enjoy criticizing everyone. Often, you notice flaws because you care enough to imagine how something could be better.",

    placementBehavior: {
      asSun:
        "You build confidence by becoming good at things that matter to you. Mastery and competence can become an important part of your identity.",

      asMoon:
        "You feel safer when life has some structure. Having a routine, clean space, or practical plan can make emotional chaos feel much easier to handle.",

      asRising:
        "You may appear composed, observant, and quietly analytical. You often notice your surroundings before deciding how much of yourself to show.",

      asVenus:
        "You tend to fall in love through consistency and thoughtful details. Someone remembering the little things can mean more than a dramatic declaration.",

      asMars:
        "Your energy works best when you have something concrete to improve. You can be incredibly persistent when you know exactly what needs fixing.",
    },
  },

  {
    id: "libra",
    name: "Libra",
    symbol: "♎",
    dates: "September 23 – October 22",

    element: "Air",
    modality: "Cardinal",
    rulingPlanet: "Venus",

    keywords: [
      "Harmony",
      "Justice",
      "Aesthetics",
      "Partnership",
      "Diplomacy",
    ],

    overview:
      "You notice the atmosphere around you. You can usually tell when something feels awkward, unfair, tense, or simply off. You naturally look for a way to make things smoother, but that can sometimes mean you're so busy keeping everyone comfortable that you forget to ask what *you* actually want.",

    personality:
      "You tend to see multiple sides of a situation, which makes you thoughtful and diplomatic. The difficult part is that seeing every side can make choosing one side feel uncomfortable. You may delay a decision not because you don't know what you want, but because you can immediately see what you'll lose by choosing it.",

    strengths: [
      "You naturally understand different perspectives.",
      "You can make difficult conversations feel less hostile.",
      "You often have a strong instinct for aesthetics, presentation, and atmosphere.",
      "You care deeply about fairness in relationships.",
    ],

    challenges: [
      "You may avoid necessary conflict because peace feels easier in the moment.",
      "Other people's opinions can become louder than your own.",
      "You can spend too long comparing options.",
      "You may say 'it's fine' when it actually isn't.",
    ],

    love:
      "You want partnership, not emotional chaos disguised as chemistry. You enjoy romance, beautiful experiences, thoughtful conversation, and feeling like the relationship is genuinely mutual. You can give a lot to keep a connection peaceful, so one of your biggest lessons is making sure peace isn't coming entirely at your expense.",

    career:
      "You can do well wherever communication, people, design, negotiation, aesthetics, fairness, or collaboration matter. You're often strongest when you can connect different viewpoints rather than being forced into an unnecessarily aggressive environment.",

    communication:
      "You usually soften difficult things before saying them. You care about how words land, not just whether they're technically correct.",

    emotionalTendencies:
      "Conflict can stay in your head long after the conversation ends. You may replay what you said, what they said, and what you should have said instead. Emotional peace often returns once you know where you actually stand.",

    misconceptions:
      "Indecision isn't always lack of intelligence or confidence. Sometimes you simply understand too many consequences at once.",

    placementBehavior: {
      asSun:
        "You discover yourself through relationships, fairness, aesthetics, and learning how to balance your needs with the needs of others.",

      asMoon:
        "You need emotional peace around you. Constant conflict or tension can affect you more deeply than people realize.",

      asRising:
        "You may come across as approachable, polished, and easy to talk to. People often feel comfortable around you quickly.",

      asVenus:
        "You are naturally romantic. You want mutual effort, attraction, good conversation, and the feeling that both people are equally invested.",

      asMars:
        "You tend to act after considering the consequences. You're often strongest when you can use strategy and timing instead of rushing into confrontation.",
    },
  },

  {
    id: "scorpio",
    name: "Scorpio",
    symbol: "♏",
    dates: "October 23 – November 21",

    element: "Water",
    modality: "Fixed",
    rulingPlanet: "Pluto (traditionally Mars)",

    keywords: [
      "Depth",
      "Transformation",
      "Intimacy",
      "Intensity",
      "Truth",
    ],

    overview:
      "You rarely experience people at surface level. You notice inconsistencies, hidden emotions, changes in behaviour, and things people don't say. You may not always ask about them directly, but you usually notice. Trust matters enormously to you because once you let someone in, you don't do it halfway.",

    personality:
      "You can be private, intense, observant, and surprisingly emotionally sensitive underneath a controlled exterior. You don't need everyone to understand you. In fact, you may prefer being misunderstood by most people if it means the few people you trust actually know the real you.",

    strengths: [
      "You can read emotional situations with remarkable depth.",
      "You stay loyal when other people might walk away.",
      "You have a strong ability to rebuild yourself after difficult experiences.",
      "You are rarely satisfied with fake answers when the real truth is available.",
    ],

    challenges: [
      "Trust can take a long time once someone has given you a reason to doubt them.",
      "You may hold onto emotional situations long after the practical situation has ended.",
      "You can become hyper-aware of small changes in someone's behaviour.",
      "Protecting yourself can sometimes turn into testing people instead of simply telling them what you need.",
    ],

    love:
      "You don't really want a connection that stays emotionally shallow. You want to know someone completely and be known in return. When you trust someone, your loyalty can be intense. But because you feel deeply, uncertainty can become especially difficult — you may want reassurance while simultaneously being afraid to ask for it.",

    career:
      "You tend to be good at work that requires research, investigation, strategy, psychology, crisis management, problem-solving, or understanding what lies beneath the obvious answer.",

    communication:
      "You may say less than you know. You listen, observe, and notice patterns before deciding what to reveal. When you finally speak honestly, it can carry more weight because you've usually thought about it for a while.",

    emotionalTendencies:
      "You don't always experience emotions lightly. A small event can connect to a much deeper memory or fear. You may need privacy before you can understand what you're actually feeling.",

    misconceptions:
      "Intensity isn't automatically manipulation. A lot of your guardedness comes from wanting to protect something genuinely vulnerable underneath.",

    placementBehavior: {
      asSun:
        "You grow through deep experiences, emotional honesty, transformation, and learning that you can survive the endings you once feared.",

      asMoon:
        "Your emotional world can be extremely deep. You need trust and privacy before you can fully relax with someone.",

      asRising:
        "You may appear mysterious, composed, or difficult to read. People can sense that you're observing more than you're revealing.",

      asVenus:
        "You tend to love intensely. Emotional loyalty, honesty, attraction, and trust matter much more to you than keeping things casual for the sake of it.",

      asMars:
        "Once you've decided something matters, your determination can be extreme. You may work quietly for a long time before anyone realizes how committed you are.",
    },
  },

  {
    id: "sagittarius",
    name: "Sagittarius",
    symbol: "♐",
    dates: "November 22 – December 21",

    element: "Fire",
    modality: "Mutable",
    rulingPlanet: "Jupiter",

    keywords: [
      "Freedom",
      "Expansion",
      "Adventure",
      "Optimism",
      "Meaning",
    ],

    overview:
      "You need room to grow. The moment life starts feeling too small, repetitive, or controlled, some part of you starts looking toward the next thing. You are usually happiest when you're learning, exploring, meeting different kinds of people, or chasing something that makes you feel like there's more to discover.",

    personality:
      "You can be optimistic, funny, spontaneous, and surprisingly philosophical. You tend to look for the bigger meaning behind experiences, especially difficult ones. Sometimes that helps you move forward quickly. Other times, you can jump to the next chapter before you've actually processed the current one.",

    strengths: [
      "You can bring optimism into situations that feel heavy.",
      "You are naturally open to different people, ideas, and experiences.",
      "You tend to recover by finding a reason to keep moving.",
      "You can see possibilities when other people only see limitations.",
    ],

    challenges: [
      "Too much routine can make you restless.",
      "You may promise more than your schedule can realistically handle.",
      "Blunt honesty can sometimes land harder than you intended.",
      "You can mistake needing freedom for needing to leave everything behind.",
    ],

    love:
      "You need a relationship that doesn't feel like a cage. You want someone who can be your partner and your friend, someone who is curious about life and doesn't try to shrink you. You can be deeply loyal when you genuinely choose someone, but you need the relationship to keep evolving.",

    career:
      "You tend to enjoy work that gives you learning, movement, variety, independence, travel, communication, or a bigger purpose. You may struggle in environments where every day looks exactly like the last one.",

    communication:
      "You usually speak openly and enthusiastically. You can make serious conversations lighter with humour, but sometimes your honesty arrives before your filter does.",

    emotionalTendencies:
      "You often cope by looking forward. When something hurts, you may want to understand the lesson, change your environment, travel, work, laugh, or find something new to focus on.",

    misconceptions:
      "Wanting freedom doesn't mean you don't care. You can commit deeply — you just don't want commitment to require losing your individuality.",

    placementBehavior: {
      asSun:
        "You discover yourself through exploration, freedom, learning, and experiences that make your world feel larger.",

      asMoon:
        "You need emotional breathing room. When you're overwhelmed, changing your surroundings or getting a fresh perspective can help more than sitting in the same environment.",

      asRising:
        "You may come across as open, energetic, humorous, and approachable. People often feel like you're going somewhere even when you haven't decided exactly where.",

      asVenus:
        "You are attracted to people who make life feel bigger. Humour, honesty, independence, travel, and shared experiences can matter enormously to you.",

      asMars:
        "You become highly motivated when something feels meaningful. You don't just want to achieve — you want to know why the achievement matters.",
    },
  },

  {
    id: "capricorn",
    name: "Capricorn",
    symbol: "♑",
    dates: "December 22 – January 19",

    element: "Earth",
    modality: "Cardinal",
    rulingPlanet: "Saturn",

    keywords: [
      "Mastery",
      "Discipline",
      "Integrity",
      "Ambition",
      "Endurance",
    ],

    overview:
      "You tend to take your future seriously. Even when you're relaxing, some part of your mind may still be thinking about what needs to happen next. You don't necessarily need instant success — you want something solid enough that you can look back later and know you actually built it.",

    personality:
      "You can appear composed and practical even when you're carrying a lot internally. You tend to respect competence and people who actually follow through. You may be harder on yourself than anyone else realizes because you often measure your worth by how much you can handle.",

    strengths: [
      "You can stay focused long after the initial excitement disappears.",
      "You take commitments seriously.",
      "You are often calm when other people start panicking.",
      "You have strong potential for building things that last.",
    ],

    challenges: [
      "You may feel guilty when you're resting even though rest is necessary.",
      "You can put unrealistic expectations on yourself.",
      "Achievement can sometimes become tied too closely to self-worth.",
      "You may hide vulnerability because you don't want to become someone else's responsibility.",
    ],

    love:
      "You usually don't want something that exists only for the excitement of the moment. You want consistency, trust, respect, and someone whose actions match their words. You may take time to open up, but once you're serious, you tend to think in terms of long-term partnership.",

    career:
      "You can thrive in environments where responsibility, strategy, leadership, systems, business, planning, or long-term growth matter. You tend to respect work that produces something real.",

    communication:
      "You usually prefer useful conversations over unnecessary emotional theatre. When you speak seriously, people tend to listen because you don't waste words.",

    emotionalTendencies:
      "You may process difficult emotions privately. Instead of talking immediately, you might work harder, organize something, make a plan, or convince yourself you'll deal with the feeling later.",

    misconceptions:
      "Being reserved doesn't mean you don't care. You may simply show care by taking responsibility, staying dependable, and making sure things are handled.",

    placementBehavior: {
      asSun:
        "You build confidence by becoming capable, independent, and proud of what you've managed to create over time.",

      asMoon:
        "You often feel safer when you know what you're doing and where you're going. Emotional uncertainty can be harder for you than practical difficulty.",

      asRising:
        "You may come across as composed, mature, and difficult to impress. People often assume you have more control than you actually feel you do internally.",

      asVenus:
        "You take love seriously. Consistency, reliability, respect, and someone who is willing to build alongside you can be more attractive than dramatic chemistry.",

      asMars:
        "Your strength is endurance. You may not be the loudest person in the room, but once you commit to an outcome, you can keep working long after other people have stopped.",
    },
  },

  {
    id: "aquarius",
    name: "Aquarius",
    symbol: "♒",
    dates: "January 20 – February 18",

    element: "Air",
    modality: "Fixed",
    rulingPlanet: "Uranus (traditionally Saturn)",

    keywords: [
      "Originality",
      "Innovation",
      "Freedom",
      "Perspective",
      "Vision",
    ],

    overview:
      "You usually need to understand something for yourself before accepting that it's simply 'the way things are'. You may naturally question routines, expectations, and social rules that other people don't even think twice about. Being different isn't necessarily something you perform — sometimes it just happens because your mind went somewhere everyone else's didn't.",

    personality:
      "You can be independent, curious, unconventional, and surprisingly stubborn about your ideas. You care about people, but you may express that care differently from someone who is highly emotionally demonstrative. Sometimes you need distance before you can understand what you're actually feeling.",

    strengths: [
      "You naturally see alternative solutions.",
      "You can think independently even when everyone around you agrees.",
      "You are often comfortable being different when something feels authentic to you.",
      "You can look at complicated systems from a surprisingly objective angle.",
    ],

    challenges: [
      "You may detach when a situation becomes emotionally overwhelming.",
      "Being intellectually certain can make changing your mind difficult.",
      "You can feel misunderstood even when people genuinely want to understand you.",
      "You may understand everyone's problems while struggling to explain your own feelings.",
    ],

    love:
      "You usually need friendship and mental connection before romance feels sustainable. You want someone who respects your independence rather than trying to monitor or manage you. The strongest connections for you often feel like two complete people choosing each other, not two people becoming dependent on each other.",

    career:
      "You tend to enjoy technology, innovation, research, creative problem-solving, social ideas, systems, or work where you're allowed to question the obvious solution.",

    communication:
      "You can be logical, unconventional, and unexpectedly funny. You may jump straight to the bigger idea while other people are still discussing the details.",

    emotionalTendencies:
      "When emotions become intense, you may need distance before you can talk about them. That doesn't necessarily mean you don't care. Your brain often needs to understand the feeling before you know how to communicate it.",

    misconceptions:
      "Being emotionally independent isn't the same as being emotionless. You can care deeply without expressing it in the most obvious way.",

    placementBehavior: {
      asSun:
        "You discover yourself by questioning assumptions, following your own ideas, and refusing to build your identity entirely around other people's expectations.",

      asMoon:
        "You often need mental space when emotions become overwhelming. Understanding what you're feeling can help you feel safer actually expressing it.",

      asRising:
        "You may come across as independent, slightly unpredictable, and difficult to categorize. People often sense that you have your own way of seeing things.",

      asVenus:
        "You tend to fall for minds before appearances. Friendship, humour, individuality, and intellectual freedom can make attraction much stronger.",

      asMars:
        "You become motivated when you believe there is a better way to do something. You're often willing to challenge an entire system rather than accept an inefficient answer.",
    },
  },

  {
    id: "pisces",
    name: "Pisces",
    symbol: "♓",
    dates: "February 19 – March 20",

    element: "Water",
    modality: "Mutable",
    rulingPlanet: "Neptune (traditionally Jupiter)",

    keywords: [
      "Empathy",
      "Imagination",
      "Intuition",
      "Sensitivity",
      "Dreams",
    ],

    overview:
      "You can pick up on feelings that haven't been spoken out loud. A room can feel different to you depending on who's in it, and certain people can affect your mood without doing anything obvious. Your imagination is a big part of how you understand life, which can be beautiful — but it also means you need to know when something is intuition and when your mind is filling in the blanks.",

    personality:
      "You're often compassionate, imaginative, emotionally receptive, and capable of seeing beauty where other people don't look for it. You may understand people's pain very easily, sometimes so easily that their emotions start feeling like your own. Boundaries become especially important when you care deeply.",

    strengths: [
      "You can understand emotions without needing everything explained.",
      "You have a strong imaginative and creative side.",
      "You can be remarkably compassionate toward people others have already judged.",
      "You often find meaning in experiences that initially felt confusing or painful.",
    ],

    challenges: [
      "You can absorb the emotional atmosphere around you.",
      "You may idealize people and then feel disappointed when reality catches up.",
      "Escaping into imagination can feel easier than dealing with something directly.",
      "You may give too much to people who haven't shown they can hold that care responsibly.",
    ],

    love:
      "You tend to want a connection that feels emotionally meaningful, not simply convenient. You can romanticize someone's potential and sometimes fall in love with what a relationship *could become*. Your happiest relationships are the ones where tenderness exists alongside honesty and grounded reality.",

    career:
      "You can thrive where imagination, creativity, empathy, storytelling, art, people, healing, design, or meaningful purpose are involved. You may struggle when work feels completely disconnected from human meaning.",

    communication:
      "You often communicate through feeling, tone, imagery, and implication. Sometimes you know what you mean emotionally before you know how to put it into exact words.",

    emotionalTendencies:
      "Your emotional boundaries can be soft. A difficult conversation, someone's mood, a memory, or even a piece of music can stay with you longer than people realize. Quiet time helps you figure out which feelings are actually yours.",

    misconceptions:
      "Being sensitive doesn't mean being incapable of handling reality. You can be extremely resilient — you just experience the world through a much more emotionally receptive filter.",

    placementBehavior: {
      asSun:
        "You discover yourself through creativity, empathy, imagination, and learning how to trust your sensitivity without letting it control every decision.",

      asMoon:
        "You can feel emotions extremely deeply. You need quiet, emotional safety, and enough space to separate your own feelings from everyone else's.",

      asRising:
        "You may come across as gentle, dreamy, intuitive, or slightly difficult to read. People can feel unusually comfortable telling you things.",

      asVenus:
        "You tend to love romantically and deeply. Emotional softness, imagination, tenderness, and the feeling of being truly understood can matter enormously.",

      asMars:
        "Your motivation often comes from feeling rather than force. When something genuinely matters to your heart, you can become far more determined than people expect.",
    },
  },
];