export interface HouseInfo {
  number: number;
  name: string;
  traditionalName: string;
  archetype: string;
  naturalSign: string;
  naturalRuler: string;
  keywords: string[];
  overview: string;
  lifeAreas: string[];
  psychologicalMeaning: string;
  planetsInHouseMeaning: string;
  emptyHouseExplanation: string;
  examplePlacement: string;
}

export const HOUSES_DATA: HouseInfo[] = [
  {
    number: 1,
    name: "1st House",
    traditionalName: "House of Self (Ascendant)",
    archetype: "Identity, Presence & First Impressions",
    naturalSign: "Aries",
    naturalRuler: "Mars",
    keywords: [
      "Self",
      "Appearance",
      "Confidence",
      "First Impression",
      "Personal Style",
    ],
    overview:
      "This is the part of your life that people notice first. It has a lot to do with how you carry yourself, the version of you that comes out naturally around others, and the impression you tend to leave without even trying.",
    lifeAreas: [
      "Your appearance and personal style",
      "How you come across when people first meet you",
      "Your natural confidence and body language",
      "How you approach new situations",
      "The version of yourself you show the outside world",
    ],
    psychologicalMeaning:
      "This can show the difference between how you feel inside and how people assume you feel from the outside. Sometimes you may look confident, distant, intense, playful, or easygoing even when there is much more going on underneath.",
    planetsInHouseMeaning:
      "A planet here can make a certain part of your personality very obvious. You may naturally lead with that energy, and other people can often pick up on it before they really know you.",
    emptyHouseExplanation:
      "Having nothing here does not mean something is missing. It simply means this part of your personality tends to be shaped more by the sign involved and the rest of your chart rather than one strong influence.",
    examplePlacement:
      "Mars here can make you come across bold, direct, energetic, or hard to ignore. You may be the kind of person who would rather make the first move than sit around waiting.",
  },

  {
    number: 2,
    name: "2nd House",
    traditionalName: "House of Value & Possessions",
    archetype: "Money, Self-Worth & Personal Values",
    naturalSign: "Taurus",
    naturalRuler: "Venus",
    keywords: [
      "Money",
      "Self-Worth",
      "Possessions",
      "Values",
      "Security",
    ],
    overview:
      "This area is closely tied to money, comfort, stability, and the things that make you feel secure. It can also reveal what you need in order to feel like you are doing well in life — not just financially, but personally.",
    lifeAreas: [
      "How you earn and spend money",
      "Your relationship with comfort and security",
      "What you consider genuinely valuable",
      "Your confidence in your own abilities",
      "Talents or skills that could become useful or profitable",
    ],
    psychologicalMeaning:
      "There can be a strong connection between money and self-confidence here. When you feel secure in yourself, you may handle practical matters much more easily. When your confidence drops, you may become more protective about money, possessions, or stability.",
    planetsInHouseMeaning:
      "A planet here can show what makes you feel safe, what you are willing to invest your time or money into, and sometimes what you have a hard time letting go of.",
    emptyHouseExplanation:
      "An empty house here does not mean money problems or a lack of stability. Your financial habits and sense of value can still be understood through the sign involved and the rest of your chart.",
    examplePlacement:
      "Jupiter here can make you optimistic about money and opportunities. You may be generous with people you care about, and you may naturally look for ways to turn your skills or knowledge into something bigger.",
  },

  {
    number: 3,
    name: "3rd House",
    traditionalName: "House of Communication & Local Environment",
    archetype: "Communication, Curiosity & Everyday Connections",
    naturalSign: "Gemini",
    naturalRuler: "Mercury",
    keywords: [
      "Communication",
      "Learning",
      "Curiosity",
      "Siblings",
      "Daily Connections",
    ],
    overview:
      "This is where your everyday mind shows up — how you talk, text, learn, ask questions, notice details, and connect with the people around you. It can also say a lot about the way you process little things throughout the day.",
    lifeAreas: [
      "Talking, texting, writing, and messaging",
      "Learning new things quickly",
      "Relationships with siblings, cousins, and peers",
      "Short trips and your everyday surroundings",
      "The information you naturally consume",
    ],
    psychologicalMeaning:
      "Your mind may need a certain amount of stimulation to feel settled. When you are curious, you feel engaged. When things become repetitive or mentally empty, you may start looking for something new to think about.",
    planetsInHouseMeaning:
      "A planet here can strongly affect how you communicate and process information. It can influence whether you think before speaking, talk things out immediately, overthink messages, or constantly need new information.",
    emptyHouseExplanation:
      "An empty house here does not mean you are bad at communicating. Your communication style can still be read through the sign involved and other parts of your chart.",
    examplePlacement:
      "Mercury here can make your mind quick and curious. You may be the person who asks ten questions, notices tiny details, and somehow ends up knowing what everyone is talking about.",
  },

  {
    number: 4,
    name: "4th House",
    traditionalName: "House of Home & Family (Imum Coeli / IC)",
    archetype: "Home, Family & Emotional Security",
    naturalSign: "Cancer",
    naturalRuler: "Moon",
    keywords: [
      "Home",
      "Family",
      "Roots",
      "Privacy",
      "Emotional Security",
    ],
    overview:
      "This is the private side of you — the version that comes out when nobody is watching. It is connected to home, family, childhood experiences, and the kind of environment you need when you just want to switch off and feel safe.",
    lifeAreas: [
      "Home and living environment",
      "Family and childhood experiences",
      "Your private emotional world",
      "The way you recharge when you are alone",
      "What makes a place feel like home",
    ],
    psychologicalMeaning:
      "There can be a big difference between the person you show everyone and the person you become behind closed doors. This area can reveal what you need emotionally before you can genuinely relax.",
    planetsInHouseMeaning:
      "A planet here can make home and family a particularly important part of your emotional life. It may also explain why certain memories, family dynamics, or your living environment affect your mood more than you let people see.",
    emptyHouseExplanation:
      "An empty house here does not mean you will lack a close family life or a sense of home. It simply means these themes are not being emphasized by a planet in this particular area.",
    examplePlacement:
      "The Moon here can make you very affected by your surroundings. You may need a peaceful, comfortable space to properly reset, and when home feels unsettled, your mood may notice it immediately.",
  },

  {
    number: 5,
    name: "5th House",
    traditionalName: "House of Pleasure & Creation",
    archetype: "Romance, Creativity & Fun",
    naturalSign: "Leo",
    naturalRuler: "Sun",
    keywords: [
      "Romance",
      "Dating",
      "Creativity",
      "Fun",
      "Self-Expression",
    ],
    overview:
      "This is the part of your life that wants to have fun. It is connected to flirting, dating, creativity, hobbies, attention, playfulness, and the things you do simply because they make you happy.",
    lifeAreas: [
      "Dating, flirting, and romantic chemistry",
      "Creative hobbies and personal projects",
      "Fun, entertainment, and going out",
      "How you express yourself when you are comfortable",
      "The things that make you feel excited and alive",
    ],
    psychologicalMeaning:
      "You need some space in life where you are not trying to be productive or responsible. This area can show what brings your playful side out and what makes you feel naturally confident.",
    planetsInHouseMeaning:
      "A planet here can strongly influence your dating style, creativity, and the way you enjoy yourself. It can also show what kind of attention makes you feel appreciated.",
    emptyHouseExplanation:
      "An empty house here does not mean you will have a boring love life or lack creativity. These things can still be very active through the sign involved and other parts of your chart.",
    examplePlacement:
      "Venus here can make you naturally charming and romantic. You may enjoy flirting, thoughtful gestures, dressing up, creative experiences, and relationships that actually feel fun.",
  },

  {
    number: 6,
    name: "6th House",
    traditionalName: "House of Health & Daily Service",
    archetype: "Routine, Work Habits & Everyday Life",
    naturalSign: "Virgo",
    naturalRuler: "Mercury",
    keywords: [
      "Routine",
      "Work",
      "Habits",
      "Organization",
      "Wellness",
    ],
    overview:
      "This is the everyday version of your life — your routines, work habits, responsibilities, organization, and the little things you repeatedly do without thinking much about them.",
    lifeAreas: [
      "Daily routines and habits",
      "Work style and everyday responsibilities",
      "Organization and time management",
      "How you take care of yourself",
      "Helping, supporting, or working with others",
    ],
    psychologicalMeaning:
      "Your mood can be surprisingly connected to how your everyday life is going. When your routine feels manageable, you may feel more in control. When everything becomes messy or unpredictable, your mind may feel it quickly.",
    planetsInHouseMeaning:
      "A planet here can show what your daily life tends to revolve around. It may influence your work habits, perfectionism, productivity, or the way you respond when your routine gets disrupted.",
    emptyHouseExplanation:
      "An empty house here does not mean you will struggle with routine, work, or wellness. It simply means these themes are not being strongly emphasized by a planet here.",
    examplePlacement:
      "Saturn here can make you very serious about getting things done. You may build yourself through consistency, although you can sometimes expect more from yourself than you need to.",
  },

  {
    number: 7,
    name: "7th House",
    traditionalName: "House of Partnership (Descendant)",
    archetype: "Relationships, Commitment & One-to-One Connection",
    naturalSign: "Libra",
    naturalRuler: "Venus",
    keywords: [
      "Relationships",
      "Marriage",
      "Partnership",
      "Commitment",
      "One-to-One",
    ],
    overview:
      "This is one of the biggest relationship areas in your chart. It can say a lot about the people you are drawn to, what you expect from a serious connection, and the kind of dynamic you naturally create with another person.",
    lifeAreas: [
      "Serious romantic relationships",
      "Marriage and long-term commitment",
      "One-to-one friendships and connections",
      "Business partnerships",
      "The qualities you tend to look for in another person",
    ],
    psychologicalMeaning:
      "Relationships can show you sides of yourself that are difficult to notice when you are alone. You may repeatedly be drawn toward certain personalities because they bring out something in you that wants attention.",
    planetsInHouseMeaning:
      "A planet here can strongly affect your relationship patterns. It may influence who catches your attention, what you need from a partner, and how you behave once you actually care about someone.",
    emptyHouseExplanation:
      "An empty house here does not mean you will not have a relationship or get married. It simply means your partnership patterns need to be understood through the sign involved and the rest of your chart.",
    examplePlacement:
      "Venus here can make partnership feel especially important to you. You may want a relationship where there is affection, effort, attraction, and a genuine sense that both people are choosing each other.",
  },

  {
    number: 8,
    name: "8th House",
    traditionalName: "House of Intimacy & Shared Resources",
    archetype: "Trust, Vulnerability & Deep Change",
    naturalSign: "Scorpio",
    naturalRuler: "Pluto (Mars)",
    keywords: [
      "Intimacy",
      "Trust",
      "Vulnerability",
      "Shared Resources",
      "Transformation",
    ],
    overview:
      "This is where things get deeper. It is connected to trust, emotional vulnerability, shared money, intense attachments, secrets, and the moments in life that completely change how you see yourself or another person.",
    lifeAreas: [
      "Deep emotional intimacy",
      "Trust and vulnerability",
      "Shared finances and resources",
      "Major endings and new beginnings",
      "The parts of life you do not easily talk about",
    ],
    psychologicalMeaning:
      "You may not be satisfied with connections that stay on the surface. Once you genuinely trust someone, things can become much more intense — and losing that trust can affect you just as deeply.",
    planetsInHouseMeaning:
      "A planet here can make you experience certain parts of life very intensely. It can influence how easily you trust, how strongly you attach, and how you handle situations where you cannot stay emotionally detached.",
    emptyHouseExplanation:
      "An empty house here does not mean you will avoid intimacy, difficult changes, or deep relationships. These themes can still appear through the sign involved and other parts of your chart.",
    examplePlacement:
      "Pluto here can give you a very strong instinct for what is happening beneath the surface. You may notice emotional shifts in people quickly and find that major experiences tend to change you rather than simply pass you by.",
  },

  {
    number: 9,
    name: "9th House",
    traditionalName: "House of Higher Learning & New Horizons",
    archetype: "Travel, Education & Expanding Your World",
    naturalSign: "Sagittarius",
    naturalRuler: "Jupiter",
    keywords: [
      "Travel",
      "Higher Education",
      "Beliefs",
      "Exploration",
      "New Perspectives",
    ],
    overview:
      "This is the part of your life that wants to see more. It is connected to travel, higher education, new cultures, bigger ideas, and experiences that make you question what you thought you already knew.",
    lifeAreas: [
      "University and higher education",
      "Long-distance and international travel",
      "Exploring different cultures",
      "Personal beliefs and worldview",
      "Learning through real-life experiences",
    ],
    psychologicalMeaning:
      "You may feel most alive when your world is expanding. Staying in the exact same mindset for too long can feel limiting, especially when you know there is more to discover.",
    planetsInHouseMeaning:
      "A planet here can influence what makes you curious about the bigger picture. It may show what kind of experiences, subjects, people, or places push you outside your usual way of thinking.",
    emptyHouseExplanation:
      "An empty house here does not mean you will not travel, study, or explore. These experiences can still become important through the sign involved and other parts of your chart.",
    examplePlacement:
      "The Sun here can make growth and exploration a major part of your identity. You may feel especially confident when you are learning, travelling, meeting different kinds of people, or stepping outside what is familiar.",
  },

  {
    number: 10,
    name: "10th House",
    traditionalName: "House of Career & Public Life (Midheaven / MC)",
    archetype: "Career, Reputation & Long-Term Goals",
    naturalSign: "Capricorn",
    naturalRuler: "Saturn",
    keywords: [
      "Career",
      "Reputation",
      "Success",
      "Leadership",
      "Long-Term Goals",
    ],
    overview:
      "This is the part of your life people can actually see from the outside — your career, achievements, reputation, and the direction you are trying to build for yourself over time.",
    lifeAreas: [
      "Career and professional direction",
      "Public reputation",
      "Leadership and responsibility",
      "Long-term achievements",
      "The kind of success you want to be known for",
    ],
    psychologicalMeaning:
      "There can be a strong need here to feel that your life is going somewhere. You may care more about building something lasting than simply having short-term success.",
    planetsInHouseMeaning:
      "A planet here can make career or recognition a particularly noticeable part of your life. It can influence how ambitious you are, how others see you professionally, and what kind of success actually feels meaningful to you.",
    emptyHouseExplanation:
      "An empty house here does not mean you will struggle in your career or lack ambition. Your professional direction is still shaped by the sign involved and the rest of your chart.",
    examplePlacement:
      "The Sun here can make achievement and visibility important to you. You may naturally want to take responsibility, be recognized for what you do, or eventually build a career where your name carries some weight.",
  },

  {
    number: 11,
    name: "11th House",
    traditionalName: "House of Friends & Future Goals",
    archetype: "Friendships, Community & Future Plans",
    naturalSign: "Aquarius",
    naturalRuler: "Uranus (Saturn)",
    keywords: [
      "Friends",
      "Community",
      "Social Circle",
      "Future Goals",
      "Connections",
    ],
    overview:
      "This is your social world — friends, groups, communities, networking, and the future you are slowly building toward. It can also show the kinds of people who make you feel like you belong.",
    lifeAreas: [
      "Friendships and social circles",
      "Online communities and groups",
      "Networking and professional connections",
      "Long-term hopes and goals",
      "People who support your future plans",
    ],
    psychologicalMeaning:
      "The people around you can have a bigger effect on your future than you realize. You may grow quickly when you are surrounded by people who encourage the version of yourself you are trying to become.",
    planetsInHouseMeaning:
      "A planet here can influence your friendships, social habits, and future goals. It may also explain why you naturally connect with certain types of groups or people.",
    emptyHouseExplanation:
      "An empty house here does not mean you will have few friends or lack a social life. Your friendships and long-term goals can still be understood through the sign involved and the rest of your chart.",
    examplePlacement:
      "Jupiter here can make your social world feel expansive. You may meet helpful people through friends, communities, work, or online spaces, and some connections may unexpectedly open doors for you.",
  },

  {
    number: 12,
    name: "12th House",
    traditionalName: "House of the Unconscious & Solitude",
    archetype: "Private Thoughts, Hidden Patterns & Rest",
    naturalSign: "Pisces",
    naturalRuler: "Neptune (Jupiter)",
    keywords: [
      "Subconscious",
      "Solitude",
      "Dreams",
      "Private Emotions",
      "Inner World",
    ],
    overview:
      "This is the part of you that other people do not always get to see. It is connected to private thoughts, dreams, emotional patterns, alone time, and the things you may process internally before anyone else even realizes something is going on.",
    lifeAreas: [
      "Private thoughts and emotions",
      "Dreams and imagination",
      "Time spent alone",
      "Patterns you may not consciously notice",
      "Rest, retreat, and emotional recovery",
    ],
    psychologicalMeaning:
      "You may have feelings or thoughts that take time to understand. Sometimes you need distance from everyone else just to figure out what you actually feel, especially when life becomes emotionally overwhelming.",
    planetsInHouseMeaning:
      "A planet here can make certain parts of your personality more private. You may not immediately understand why you react a certain way, and some of your strongest qualities may only become obvious when you spend time alone.",
    emptyHouseExplanation:
      "An empty house here does not mean you are disconnected from your inner world. Everyone has private thoughts, emotions, and patterns; this simply means they are not being strongly emphasized by a planet here.",
    examplePlacement:
      "Saturn here can make you very private with your worries. You may carry things quietly and try to figure everything out yourself before letting anyone know that something is bothering you.",
  },
];