export interface LifePathNumberInfo {
  number: number | string;
  name: string;
  archetype: string;
  keywords: string[];
  overview: string;
  strengths: string[];
  challenges: string[];
  career: string;
  love: string;
  lifeLesson: string;
}

export function calculateLifePath(birthDateStr: string): number {
  if (!birthDateStr) return 7;

  const digits = birthDateStr.replace(/\D/g, "");

  if (!digits) return 7;

  let sum = digits
    .split("")
    .reduce((acc, d) => acc + parseInt(d, 10), 0);

  // Reduce until 1-9 or Master Numbers 11, 22, 33
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum
      .toString()
      .split("")
      .reduce((acc, d) => acc + parseInt(d, 10), 0);
  }

  return sum;
}

export const NUMEROLOGY_DATA: Record<string, LifePathNumberInfo> = {
  "1": {
    number: 1,
    name: "Life Path 1",
    archetype: "The Independent One",
    keywords: [
      "Independence",
      "Leadership",
      "Confidence",
      "Originality",
      "Initiative",
    ],
    overview:
      "You probably do not like being told exactly how to do things. There is a strong independent streak here — you want to figure things out in your own way and feel like you are moving somewhere because you chose to, not because someone pushed you. You can come across confident and self-sufficient, even when you are still figuring things out underneath.",

    strengths: [
      "You can motivate yourself without needing constant encouragement.",
      "You are usually comfortable taking the first step when others are still hesitating.",
      "You tend to think of your own solutions instead of simply following what everyone else is doing.",
    ],

    challenges: [
      "You may get impatient when people move much slower than you.",
      "Asking for help can sometimes feel harder than simply doing everything yourself.",
      "When you care strongly about an outcome, you may become more controlling than you realize.",
    ],

    career:
      "You are likely to do best when you have some freedom to make decisions, take ownership, or build something of your own. Leadership, entrepreneurship, technology, creative work, management, or independent projects can suit you especially well.",

    love:
      "You need someone who has their own life, opinions, and confidence. Too much control can make you pull away quickly. You may love deeply, but you still need to feel like yourself inside the relationship.",

    lifeLesson:
      "You do not have to do everything alone to prove that you are capable. Letting the right people support you does not take away your independence.",
  },

  "2": {
    number: 2,
    name: "Life Path 2",
    archetype: "The Sensitive Connector",
    keywords: [
      "Emotional Intelligence",
      "Connection",
      "Diplomacy",
      "Intuition",
      "Loyalty",
    ],
    overview:
      "You probably notice changes in people's moods faster than they expect you to. You tend to pick up on tone, distance, awkwardness, and the little things people do not say directly. You may be naturally gentle and understanding, but that can also mean you sometimes put everyone else's feelings ahead of your own.",

    strengths: [
      "You are naturally good at understanding different sides of a situation.",
      "People may feel comfortable opening up to you.",
      "Once you genuinely care about someone, your loyalty tends to run deep.",
    ],

    challenges: [
      "You may overthink small changes in someone's behaviour.",
      "Saying no can feel uncomfortable when you are worried about disappointing someone.",
      "You may avoid difficult conversations for too long and then become quietly frustrated.",
    ],

    career:
      "You tend to work well where communication, cooperation, patience, or emotional awareness actually matter. Counseling, HR, teamwork, design, communication, customer relationships, teaching, and creative collaboration can be good fits.",

    love:
      "You usually want emotional consistency more than dramatic romance. If someone becomes distant or unpredictable, you may notice it immediately and start wondering what changed. You need reassurance, honesty, and someone who does not make you guess where you stand.",

    lifeLesson:
      "Being understanding does not mean you have to tolerate everything. Your feelings deserve the same consideration you naturally give everyone else.",
  },

  "3": {
    number: 3,
    name: "Life Path 3",
    archetype: "The Expressive One",
    keywords: [
      "Creativity",
      "Communication",
      "Humor",
      "Charm",
      "Self-Expression",
    ],
    overview:
      "You probably have a naturally expressive side that comes out through talking, humour, creativity, or the way you interact with people. You can make things feel lighter when everyone else is taking them too seriously. But there may also be a more sensitive side that you do not always show because it is easier to joke than explain how deeply something affected you.",

    strengths: [
      "You can make people feel comfortable quickly.",
      "You have a natural ability to express ideas in an engaging way.",
      "Your creativity can become one of your strongest ways of dealing with difficult emotions.",
    ],

    challenges: [
      "You may start many things when inspiration is high and lose interest once the excitement disappears.",
      "You can hide insecurity behind humour or a positive attitude.",
      "When you feel misunderstood, you may withdraw instead of explaining what actually hurt.",
    ],

    career:
      "You are likely to enjoy work where communication and creativity are useful rather than restricted. Writing, content, design, marketing, media, public speaking, entertainment, teaching, and creative technology can all give you room to express yourself.",

    love:
      "You need conversation, teasing, laughter, and a relationship that still feels fun after the initial excitement settles. You may be attracted to people who make you feel comfortable enough to be silly around them.",

    lifeLesson:
      "You do not always have to make your feelings look lighter than they really are. Being honest about the difficult parts can make your expression even more powerful.",
  },

  "4": {
    number: 4,
    name: "Life Path 4",
    archetype: "The Reliable Builder",
    keywords: [
      "Stability",
      "Discipline",
      "Reliability",
      "Practicality",
      "Consistency",
    ],
    overview:
      "You probably feel better when things make sense and you know what you are working toward. You may naturally create routines, plans, systems, or backup plans because uncertainty can be more tiring for you than hard work itself. Once you commit to something, you are usually willing to keep going long after other people have lost patience.",

    strengths: [
      "You are dependable when things get difficult.",
      "You are good at turning vague ideas into practical steps.",
      "People can usually trust you to follow through once you have given your word.",
    ],

    challenges: [
      "Unexpected changes may frustrate you more than you let people see.",
      "You can become overly focused on doing things correctly.",
      "You may work through exhaustion instead of admitting that you need a break.",
    ],

    career:
      "You tend to thrive where consistency, planning, structure, and responsibility matter. Technology, engineering, finance, operations, project management, administration, architecture, and systems-based work can suit you.",

    love:
      "You usually show love through consistency rather than dramatic gestures. You want someone who means what they say and follows through. Unpredictable behaviour can make you lose trust faster than you may admit.",

    lifeLesson:
      "Not everything needs to be planned before you experience it. Sometimes leaving room for change can make life feel lighter without taking away your stability.",
  },

  "5": {
    number: 5,
    name: "Life Path 5",
    archetype: "The Freedom Seeker",
    keywords: [
      "Freedom",
      "Adventure",
      "Curiosity",
      "Change",
      "Independence",
    ],
    overview:
      "You probably get restless when life starts feeling too repetitive. You like having options, trying new things, meeting different people, and feeling like you can change direction when you want to. The tricky part is that something can feel exciting at first and suddenly feel restrictive once it becomes a responsibility.",

    strengths: [
      "You adapt quickly when plans change.",
      "You can learn through experience instead of needing everything explained first.",
      "You bring curiosity and energy into situations that other people may find boring.",
    ],

    challenges: [
      "You may lose interest once something becomes predictable.",
      "Too many options can sometimes make commitment difficult.",
      "You may confuse needing space with needing to completely walk away.",
    ],

    career:
      "You are likely to enjoy careers that give you variety, movement, learning, or freedom. Marketing, technology, sales, travel, media, consulting, entrepreneurship, communication, and fast-changing environments can keep you engaged.",

    love:
      "You need closeness without feeling trapped. You may really like someone and still need personal space. The healthiest relationships for you usually feel like a choice rather than an obligation.",

    lifeLesson:
      "Freedom does not always mean keeping every door open. Sometimes choosing one thing deeply can create a different kind of freedom.",
  },

  "6": {
    number: 6,
    name: "Life Path 6",
    archetype: "The Caring One",
    keywords: [
      "Care",
      "Responsibility",
      "Loyalty",
      "Family",
      "Harmony",
    ],
    overview:
      "You probably care about people more than you openly admit. When someone you love is struggling, your instinct may be to fix things, help, protect, or simply stay close. You can create a very comforting presence for other people, but sometimes you take responsibility for problems that were never really yours to carry.",

    strengths: [
      "You are deeply loyal to the people you care about.",
      "You naturally notice what others need.",
      "You are good at creating warmth, comfort, and stability around you.",
    ],

    challenges: [
      "You may give too much and then feel unappreciated.",
      "You can become controlling when you genuinely believe you are helping.",
      "You may expect yourself to handle everything perfectly.",
    ],

    career:
      "You tend to enjoy work where your effort has a visible impact on people. Education, design, healthcare, people-focused technology, counseling, hospitality, social work, management, and creative work can suit this side of you.",

    love:
      "You usually love through effort — checking in, remembering details, helping, and being there when things get difficult. You need someone who appreciates that care without taking advantage of it.",

    lifeLesson:
      "You are allowed to care without taking responsibility for everyone's happiness. Helping someone and carrying them are not the same thing.",
  },

  "7": {
    number: 7,
    name: "Life Path 7",
    archetype: "The Deep Thinker",
    keywords: [
      "Introspection",
      "Analysis",
      "Curiosity",
      "Privacy",
      "Intuition",
    ],
    overview:
      "You probably do not accept things at face value. You like understanding what is actually going on, why people behave the way they do, and what sits underneath the obvious answer. You may be social when you feel comfortable, but you also need a surprising amount of time alone to get your head clear.",

    strengths: [
      "You notice patterns and details other people can miss.",
      "You can become extremely knowledgeable when something genuinely interests you.",
      "You usually prefer understanding the truth over simply hearing what sounds good.",
    ],

    challenges: [
      "You may overthink someone's words or behaviour long after the moment has passed.",
      "Trust can take time, especially when someone's actions do not match their words.",
      "When overwhelmed, you may disappear into your own head instead of explaining what is happening.",
    ],

    career:
      "You tend to do well where research, analysis, problem-solving, technology, investigation, psychology, writing, science, or deep concentration are valuable. You usually need enough independence to think without constant interruption.",

    love:
      "You may take time to genuinely open up, but once someone gets through your walls, the connection can become very meaningful. You need mental depth and enough personal space to remain comfortable.",

    lifeLesson:
      "You cannot always think your way into certainty. Sometimes you have to trust what you feel and let another person see the less guarded version of you.",
  },

  "8": {
    number: 8,
    name: "Life Path 8",
    archetype: "The Ambitious One",
    keywords: [
      "Ambition",
      "Confidence",
      "Achievement",
      "Leadership",
      "Strategy",
    ],
    overview:
      "You probably have a strong instinct to build something meaningful and be taken seriously for what you do. You may naturally think about results, progress, money, independence, or how to get from where you are now to where you want to be. The pressure you put on yourself can sometimes be much higher than what anyone else expects from you.",

    strengths: [
      "You can stay focused when there is a clear goal in front of you.",
      "You tend to think strategically rather than only reacting to the moment.",
      "You can recover from setbacks and use them as motivation to become stronger.",
    ],

    challenges: [
      "You may tie your self-worth too closely to achievement.",
      "Letting other people take control can feel uncomfortable.",
      "Work or ambition can sometimes become easier to focus on than emotional vulnerability.",
    ],

    career:
      "You tend to thrive when there is room for responsibility, leadership, strategy, business, technology, management, finance, entrepreneurship, or building something that can grow over time.",

    love:
      "You respect people who are confident and have goals of their own. You may want a relationship where both people support each other's ambitions rather than one person becoming dependent on the other.",

    lifeLesson:
      "You do not have to constantly prove that you are successful to deserve respect, love, or rest.",
  },

  "9": {
    number: 9,
    name: "Life Path 9",
    archetype: "The Big-Hearted One",
    keywords: [
      "Compassion",
      "Wisdom",
      "Empathy",
      "Growth",
      "Letting Go",
    ],
    overview:
      "You may feel things deeply, even when you do not always show it. You tend to understand people from more than one angle, which can make you forgiving — sometimes even when someone has given you enough reasons to walk away. There is often a strong desire here to turn difficult experiences into something meaningful.",

    strengths: [
      "You can understand people without immediately judging them.",
      "You tend to see the bigger picture when emotions are running high.",
      "Your experiences can give you a level of emotional maturity that comes with time.",
    ],

    challenges: [
      "You may hold onto old situations because part of you still wants closure.",
      "You can give people too many chances.",
      "Asking for help may feel strange when you are used to being the understanding one.",
    ],

    career:
      "You may be happiest when your work feels meaningful rather than purely transactional. Creative work, education, social impact, communication, psychology, design, humanitarian work, and people-focused careers can appeal strongly.",

    love:
      "You tend to love with a lot of understanding and emotional generosity. The challenge is making sure you are not doing all the forgiving, understanding, and adjusting while the other person simply receives it.",

    lifeLesson:
      "Not every ending needs a perfect explanation. Sometimes closure is simply accepting that something has finished and allowing yourself to move forward.",
  },

  "11": {
    number: 11,
    name: "Life Path 11",
    archetype: "The Highly Intuitive One",
    keywords: [
      "Intuition",
      "Sensitivity",
      "Inspiration",
      "Creativity",
      "Vision",
    ],
    overview:
      "You may pick up on things before you can logically explain how you know them. People, moods, environments, and subtle changes can affect you more strongly than they seem to affect others. You can have big ideas and strong instincts, but that same sensitivity can sometimes make you question yourself more than necessary.",

    strengths: [
      "You can be highly perceptive about people and situations.",
      "You may have a strong creative or imaginative side.",
      "Your sensitivity can help you understand experiences from a deeper perspective.",
    ],

    challenges: [
      "You may become mentally overwhelmed when there is too much happening around you.",
      "You can doubt yourself even when your first instinct was right.",
      "Big expectations can make you feel like you should already have everything figured out.",
    ],

    career:
      "You tend to do well where intuition, creativity, communication, technology, design, psychology, teaching, writing, or original thinking can actually be used. You need work that feels meaningful enough to keep your mind engaged.",

    love:
      "You may notice tiny shifts in someone's tone or behaviour and immediately wonder what they mean. You need emotional honesty and a partner who communicates clearly rather than making you decode everything.",

    lifeLesson:
      "You do not need to understand every feeling immediately. Give yourself time to process without turning every uncertainty into a problem you have to solve.",
  },

  "22": {
    number: 22,
    name: "Life Path 22",
    archetype: "The Big-Picture Builder",
    keywords: [
      "Vision",
      "Ambition",
      "Building",
      "Leadership",
      "Long-Term Goals",
    ],
    overview:
      "You may think much bigger than the situation immediately in front of you. Instead of only asking 'What can I do right now?', you may naturally think about what something could eventually become. That can make you ambitious and capable, but it can also create a lot of pressure because you may constantly feel that you should be doing more.",

    strengths: [
      "You can combine big ideas with practical execution.",
      "You are capable of staying focused on long-term goals.",
      "You may naturally see opportunities to improve or scale something.",
    ],

    challenges: [
      "You may put enormous pressure on yourself to live up to your potential.",
      "A project can feel overwhelming when you focus too much on the final result.",
      "You may struggle to slow down when you believe there is still more to accomplish.",
    ],

    career:
      "You tend to suit work where you can build, organize, lead, or grow something over time. Technology, entrepreneurship, product development, management, architecture, operations, large-scale projects, and systems thinking can be especially natural.",

    love:
      "You need someone who understands that your goals matter to you but also reminds you that the relationship itself deserves attention. A supportive partner can help you slow down without making you feel like you are losing momentum.",

    lifeLesson:
      "You do not have to build the whole future today. Focus on the next useful step instead of carrying the weight of the entire vision at once.",
  },

  "33": {
    number: 33,
    name: "Life Path 33",
    archetype: "The Deeply Caring Teacher",
    keywords: [
      "Compassion",
      "Guidance",
      "Care",
      "Creativity",
      "Emotional Wisdom",
    ],
    overview:
      "You may naturally become the person people come to when they need advice, comfort, or perspective. You can care deeply about the people around you and often notice what someone needs before they ask. The difficult part is remembering that being the strong or understanding one does not mean you have to keep giving when you are already exhausted.",

    strengths: [
      "You can make people feel understood and supported.",
      "You often have a natural ability to guide people through difficult situations.",
      "Your creativity and emotional understanding can work together in powerful ways.",
    ],

    challenges: [
      "You may take on other people's problems too personally.",
      "You can expect yourself to handle situations perfectly.",
      "You may ignore your own needs until you are completely drained.",
    ],

    career:
      "You tend to thrive where your ability to guide, teach, create, support, or improve people's lives can be used. Education, counseling, design, leadership, communication, healthcare, creative work, and people-focused technology can all be meaningful.",

    love:
      "You may love very generously and naturally want to make your partner's life easier. Just be careful not to turn the relationship into a situation where you are constantly fixing, giving, or emotionally carrying the other person.",

    lifeLesson:
      "You do not have to save everyone you love. Sometimes the healthiest thing you can do for someone is care about them while still allowing them to handle their own life.",
  },
};