export interface TarotCard {
  id: string;
  name: string;
  arcana: "Major" | "Minor";
  suit?: "Wands" | "Cups" | "Swords" | "Pentacles";
  number: number;
  keywords: string[];
  uprightMeaning: string;
  reversedMeaning: string;
  loveMeaning: string;
  careerMeaning: string;
  symbolism: string;
  reflectionPrompt: string;
}

export const TAROT_DECK: TarotCard[] = [
  // =========================================================
  // MAJOR ARCANA
  // =========================================================

  {
    id: "0-the-fool",
    name: "0. The Fool",
    arcana: "Major",
    number: 0,
    keywords: [
      "New Beginning",
      "Taking a Chance",
      "Freedom",
      "Spontaneity",
      "Fresh Start",
    ],

    uprightMeaning:
      "Okay, this feels like a fresh chapter. You may be standing at the edge of something new and wondering whether you should actually go for it. Part of you is excited, while another part keeps asking, 'What if this goes wrong?' The message here is not to have every detail figured out before you begin. Sometimes you only know the next step, not the whole journey.",

    reversedMeaning:
      "You may be rushing into something because you are excited, or holding yourself back because you are scared of making the wrong choice. Either way, there is a need to slow down and check whether you are following genuine excitement or simply reacting to the moment.",

    loveMeaning:
      "There may be a new romantic beginning, an unexpected attraction, or a sudden urge to take a chance on someone. If you already have someone on your mind, you may be tempted to stop overthinking and simply see where things go. Just make sure you are not ignoring obvious red flags because the chemistry feels exciting.",

    careerMeaning:
      "A new opportunity, career change, project, or completely different direction may be opening up. You may not feel fully ready yet, but that does not necessarily mean you are not capable. Start small, learn as you go, and let yourself be a beginner.",

    symbolism:
      "The cliff represents the unknown, while the small dog reflects instinct and awareness. The white rose points to approaching something with an open mind and genuine intention.",

    reflectionPrompt:
      "If you stopped worrying about having everything figured out, what would you finally allow yourself to try?",
  },

  {
    id: "1-the-magician",
    name: "I. The Magician",
    arcana: "Major",
    number: 1,
    keywords: [
      "Confidence",
      "Ability",
      "Action",
      "Communication",
      "Making Things Happen",
    ],

    uprightMeaning:
      "You probably have more control over this situation than you think. The Magician is a strong 'you already have what you need' message. You may have been waiting for the perfect timing, more confidence, or someone else to make the first move. But honestly, you may be the person who needs to start something moving.",

    reversedMeaning:
      "Something may look more promising than it actually is. Be careful with people who say exactly what you want to hear but do not follow it up with action. This can also show up when you know you are capable but keep second-guessing yourself.",

    loveMeaning:
      "There can be strong chemistry and a lot of potential here, especially when communication is open. If someone is on your mind, one of you may be trying to create a connection rather than simply waiting for it to happen. But pay attention to actions, not just charming words.",

    careerMeaning:
      "You may be in a much stronger position professionally than you realize. This is a good time to speak up, pitch an idea, apply for something, build a project, or finally use a skill you have been sitting on.",

    symbolism:
      "The four tools represent different ways of approaching a situation: thinking clearly, feeling honestly, taking action, and dealing with practical reality.",

    reflectionPrompt:
      "What could you make happen if you stopped waiting for someone else to give you permission?",
  },

  {
    id: "2-the-high-priestess",
    name: "II. The High Priestess",
    arcana: "Major",
    number: 2,
    keywords: [
      "Intuition",
      "Secrets",
      "Observation",
      "Inner Knowing",
      "Things Unsaid",
    ],

    uprightMeaning:
      "There is probably more going on here than what you can currently see. You may already have a feeling about the situation, but your mind keeps trying to talk you out of it. This card says to observe before reacting. Not everything needs an immediate answer.",

    reversedMeaning:
      "You may be ignoring something you already know deep down. Mixed messages, gossip, hidden information, or too much overthinking could be making it difficult to hear your own judgment clearly.",

    loveMeaning:
      "If someone is on your mind, there may be feelings or thoughts that have not been spoken openly yet. This can be a quiet connection where both people are observing each other rather than saying exactly what they feel.",

    careerMeaning:
      "You may benefit from staying behind the scenes for a little longer. Watch how people behave, gather information, and avoid revealing everything before you understand the situation.",

    symbolism:
      "The two pillars represent opposite sides of a situation, while the curtain suggests that some information is still hidden from view.",

    reflectionPrompt:
      "What do you already know about this situation that you keep trying to explain away?",
  },

  {
    id: "3-the-empress",
    name: "III. The Empress",
    arcana: "Major",
    number: 3,
    keywords: [
      "Growth",
      "Care",
      "Attraction",
      "Comfort",
      "Abundance",
    ],

    uprightMeaning:
      "Something you have been giving time, attention, or care to may finally be starting to grow. This card has a very warm feeling around it. You may be entering a phase where you do not need to force everything. The more you take care of yourself and what matters to you, the more naturally things can develop.",

    reversedMeaning:
      "You may be giving too much and quietly running out of energy. This can happen when you keep taking care of everyone else while ignoring what you actually need.",

    loveMeaning:
      "There is warmth, attraction, affection, and emotional closeness here. If you are thinking about someone, there may be a desire for something more comfortable and emotionally secure rather than a connection based only on excitement.",

    careerMeaning:
      "Creative work, personal projects, and things that require patience can grow well under this energy. You may also benefit from improving your environment instead of constantly pushing yourself harder.",

    symbolism:
      "The garden, flowing water, and wheat represent growth, comfort, and the results that come from consistently taking care of something.",

    reflectionPrompt:
      "What in your life deserves more care instead of more pressure?",
  },

  {
    id: "4-the-emperor",
    name: "IV. The Emperor",
    arcana: "Major",
    number: 4,
    keywords: [
      "Stability",
      "Boundaries",
      "Control",
      "Leadership",
      "Security",
    ],

    uprightMeaning:
      "You may be craving something more stable right now. This card is about knowing what you will and will not accept. You do not necessarily need to be more emotional about the situation — you may simply need clearer boundaries and a plan.",

    reversedMeaning:
      "Someone may be trying to control the situation too much, or you may be holding on so tightly that nothing can naturally develop. There can also be frustration with someone who refuses to compromise.",

    loveMeaning:
      "This can point toward someone who values stability and commitment but may not always be comfortable expressing emotions openly. If you are dealing with a confusing person, look at whether their behaviour actually provides the security they claim to want.",

    careerMeaning:
      "Structure, responsibility, leadership, and planning are highlighted. You may be ready to take more control of your career rather than waiting for other people to decide what happens next.",

    symbolism:
      "The stone throne and armor suggest stability, boundaries, responsibility, and the need to protect what matters.",

    reflectionPrompt:
      "Where do you need stronger boundaries instead of more explanations?",
  },

  {
    id: "5-the-hierophant",
    name: "V. The Hierophant",
    arcana: "Major",
    number: 5,
    keywords: [
      "Tradition",
      "Guidance",
      "Commitment",
      "Learning",
      "Shared Values",
    ],

    uprightMeaning:
      "This card brings a more serious tone. You may be realizing that something cannot stay casual forever. There may be a need for guidance, commitment, or simply understanding what you genuinely believe before making your next move.",

    reversedMeaning:
      "You may be questioning rules that no longer make sense to you. Something could feel restrictive simply because you are being expected to follow someone else's idea of how things 'should' be.",

    loveMeaning:
      "For relationships, this can point toward commitment, shared values, or wanting something that feels official and secure. If someone is on your mind, ask yourself whether what you actually want matches what this person is offering.",

    careerMeaning:
      "Learning from someone experienced, formal training, established organizations, or following a proven process can be helpful right now.",

    symbolism:
      "The keys and formal setting suggest knowledge passed down through experience, guidance, and established ways of doing things.",

    reflectionPrompt:
      "Are you following a path because it genuinely suits you, or simply because you were told it was the right one?",
  },

  {
    id: "6-the-lovers",
    name: "VI. The Lovers",
    arcana: "Major",
    number: 6,
    keywords: [
      "Connection",
      "Choice",
      "Chemistry",
      "Honesty",
      "Alignment",
    ],

    uprightMeaning:
      "Okay, this is a strong connection card — but it is also a choice card. Something may feel emotionally important right now, and you may be wondering whether to move closer or protect yourself. The real question is not just 'Do I want this?' It is 'Does this actually fit the life I want?'",

    reversedMeaning:
      "There may be attraction without enough compatibility, or feelings that are making it harder to see the situation clearly. You may also be compromising too much just to keep a connection alive.",

    loveMeaning:
      "If someone is on your mind, there can be genuine chemistry and emotional significance here. But this card does not automatically promise a relationship. It asks whether both people are willing to choose each other honestly.",

    careerMeaning:
      "A meaningful decision may be approaching. You could be choosing between two paths, partnerships, or opportunities. The better option is likely the one that feels aligned with your actual priorities rather than simply impressive from the outside.",

    symbolism:
      "The two figures represent connection and choice. The surrounding landscape reflects the consequences of choosing one direction over another.",

    reflectionPrompt:
      "What choice would you make if you stopped choosing based on fear of losing someone or something?",
  },

  {
    id: "7-the-chariot",
    name: "VII. The Chariot",
    arcana: "Major",
    number: 7,
    keywords: [
      "Momentum",
      "Determination",
      "Progress",
      "Control",
      "Victory",
    ],

    uprightMeaning:
      "You are being pushed toward movement. If you have been stuck in your head, this is the point where doing something may be more useful than thinking about it for another week. You do not need perfect certainty — you need direction.",

    reversedMeaning:
      "You may be trying to force something that is not moving naturally. Frustration can build when you want an answer immediately but the situation keeps pulling in different directions.",

    loveMeaning:
      "There may be movement after a period of uncertainty. If someone is on your mind, one of you may eventually feel the need to take action or make the situation clearer. Just avoid turning the connection into a competition over who cares less.",

    careerMeaning:
      "Strong progress is possible when you focus on one clear goal. This is good for interviews, launches, deadlines, competitive situations, and pushing through something that has been delayed.",

    symbolism:
      "The two opposing figures pulling in different directions reflect competing emotions or priorities that need to be brought under control.",

    reflectionPrompt:
      "Where would your life move faster if you stopped splitting your attention?",
  },

  {
    id: "8-strength",
    name: "VIII. Strength",
    arcana: "Major",
    number: 8,
    keywords: [
      "Inner Strength",
      "Patience",
      "Confidence",
      "Self-Control",
      "Compassion",
    ],

    uprightMeaning:
      "You may be stronger than you currently feel. This card is less about forcing an outcome and more about staying calm when your emotions are loud. You do not have to react to everything immediately.",

    reversedMeaning:
      "Self-doubt may be making a situation feel bigger than it really is. You could also be trying to appear completely fine while privately feeling overwhelmed.",

    loveMeaning:
      "There can be strong feelings here, but patience matters. If someone is on your mind, the connection may need softness rather than pressure. Sometimes giving someone room tells you more than constantly asking for reassurance.",

    careerMeaning:
      "You may be dealing with pressure, difficult people, or a demanding workload. Your ability to remain composed and keep going can become one of your biggest strengths.",

    symbolism:
      "The woman and lion show that calmness and patience can be more powerful than trying to overpower a difficult situation.",

    reflectionPrompt:
      "What would change if you trusted yourself enough not to react immediately?",
  },

  {
    id: "9-the-hermit",
    name: "IX. The Hermit",
    arcana: "Major",
    number: 9,
    keywords: [
      "Distance",
      "Reflection",
      "Solitude",
      "Clarity",
      "Inner Understanding",
    ],

    uprightMeaning:
      "You may need some distance from the noise around you. This does not necessarily mean something is wrong. Sometimes you simply need enough space to figure out what you actually think without everyone else's opinions getting mixed into it.",

    reversedMeaning:
      "You may have withdrawn for too long or be using isolation to avoid dealing with something. There is a difference between taking space and disappearing from your own life.",

    loveMeaning:
      "If someone is on your mind, there may currently be distance, silence, or a need for space. This does not automatically mean the connection is over. It may simply mean someone is trying to understand what they really want.",

    careerMeaning:
      "Independent work, research, learning, and developing a specialist skill can be especially useful. You may also be questioning whether your current direction still feels meaningful.",

    symbolism:
      "The lantern represents clarity that comes one step at a time. The mountain reflects the effort required to understand yourself honestly.",

    reflectionPrompt:
      "What would you hear clearly if you stopped asking everyone else what you should do?",
  },

  {
    id: "10-wheel-of-fortune",
    name: "X. Wheel of Fortune",
    arcana: "Major",
    number: 10,
    keywords: [
      "Change",
      "Turning Point",
      "Timing",
      "Unexpected Events",
      "New Cycle",
    ],

    uprightMeaning:
      "Something may be changing whether you planned for it or not. The interesting part is that this card often appears when a situation is about to move out of its current pattern. A stuck situation may suddenly start behaving differently.",

    reversedMeaning:
      "You may feel like the same situation keeps repeating. The lesson may not be about waiting for luck to change — it may be about changing the part of the pattern that you keep participating in.",

    loveMeaning:
      "If someone is on your mind, the connection may be entering a different phase. An unexpected message, meeting, change in circumstances, or shift in someone's behaviour is possible, but the exact outcome depends on what both people do with the opportunity.",

    careerMeaning:
      "Unexpected opportunities, changes in responsibilities, a new job direction, or sudden movement can appear. Stay flexible rather than assuming everything has to happen according to the original plan.",

    symbolism:
      "The wheel represents changing circumstances and repeating cycles — periods of movement, pauses, endings, and fresh starts.",

    reflectionPrompt:
      "What pattern in your life feels ready to change?",
  },

  {
    id: "11-justice",
    name: "XI. Justice",
    arcana: "Major",
    number: 11,
    keywords: [
      "Truth",
      "Fairness",
      "Clarity",
      "Consequences",
      "Accountability",
    ],

    uprightMeaning:
      "This card asks you to look at the situation exactly as it is, not exactly as you wish it were. Something may become clearer once you separate facts from assumptions. You may already know more than you are admitting to yourself.",

    reversedMeaning:
      "There may be unfairness, missing information, or someone avoiding responsibility. Be careful about blaming yourself for something that was never completely in your control.",

    loveMeaning:
      "If someone is on your mind, honesty becomes more important than chemistry. Ask whether the effort is mutual. A connection cannot stay healthy when one person keeps explaining away the other's lack of effort.",

    careerMeaning:
      "Contracts, decisions, evaluations, negotiations, and situations where fairness matters can come into focus. Keep records and make decisions based on evidence.",

    symbolism:
      "The scales reflect balance and fairness, while the sword represents clear decisions based on what is actually known.",

    reflectionPrompt:
      "What would you decide if you looked only at the facts?",
  },

  {
    id: "12-the-hanged-man",
    name: "XII. The Hanged Man",
    arcana: "Major",
    number: 12,
    keywords: [
      "Pause",
      "Waiting",
      "New Perspective",
      "Release",
      "Patience",
    ],

    uprightMeaning:
      "This is a 'stop pushing for the answer' card. Something may need more time before it becomes clear. You may be frustrated because you want movement, but forcing it could actually make things harder.",

    reversedMeaning:
      "You may be stuck in a waiting pattern without learning anything from it. There is a difference between giving something time and putting your life on hold for it.",

    loveMeaning:
      "If you are waiting for someone to make a move, this card suggests not chasing the answer. The silence itself may be giving you useful information. Step back and see what happens when you stop doing all the emotional work.",

    careerMeaning:
      "A delay does not necessarily mean failure. A project may need another approach, more information, or a different perspective before moving forward.",

    symbolism:
      "The unusual position represents looking at a familiar situation from a completely different angle instead of immediately trying to fix it.",

    reflectionPrompt:
      "What changes when you stop trying to control the timing?",
  },

  {
    id: "13-death",
    name: "XIII. Death",
    arcana: "Major",
    number: 13,
    keywords: [
      "Ending",
      "Transformation",
      "Release",
      "Closure",
      "New Chapter",
    ],

    uprightMeaning:
      "Do not panic at this card. It usually speaks about an ending, not literal death. Something may have reached the point where it cannot continue in the same form. And honestly, part of you may already know that.",

    reversedMeaning:
      "You may be holding onto something because ending it feels more frightening than staying unhappy. The longer you resist a necessary change, the heavier it can feel.",

    loveMeaning:
      "A relationship pattern may be coming to an end. That could mean ending a connection, but it can also mean leaving behind old habits, resentment, chasing, or uncertainty so the relationship can change into something healthier.",

    careerMeaning:
      "A role, workplace, project, or professional identity may be ready to change. Something ending can create space for a direction that fits you better.",

    symbolism:
      "The changing landscape and rising sun suggest that an ending creates room for a different beginning.",

    reflectionPrompt:
      "What are you still holding onto even though you already know it has changed?",
  },

  {
    id: "14-temperance",
    name: "XIV. Temperance",
    arcana: "Major",
    number: 14,
    keywords: [
      "Balance",
      "Patience",
      "Healing",
      "Compromise",
      "Steady Progress",
    ],

    uprightMeaning:
      "Things do not need to happen all at once. You may be learning how to find a middle ground between what you want and what is realistically possible. Slow progress is still progress.",

    reversedMeaning:
      "You may be swinging between extremes — caring too much, then shutting down; working nonstop, then completely burning out; wanting someone badly, then deciding you never cared.",

    loveMeaning:
      "A connection can become healthier through patience, honest communication, and less emotional reacting. If someone is on your mind, neither chasing nor completely disappearing is likely to give you the clarity you want.",

    careerMeaning:
      "Collaboration, balancing multiple responsibilities, and creating a sustainable routine are highlighted. Avoid making decisions from temporary frustration.",

    symbolism:
      "The two cups show different parts of life being brought together gradually rather than forced into immediate perfection.",

    reflectionPrompt:
      "Where have you been living at an extreme when a middle ground might actually feel better?",
  },

  {
    id: "15-the-devil",
    name: "XV. The Devil",
    arcana: "Major",
    number: 15,
    keywords: [
      "Attachment",
      "Obsession",
      "Temptation",
      "Patterns",
      "Breaking Free",
    ],

    uprightMeaning:
      "This card gets intense, but it is not automatically negative. It often appears when you know something is not good for you and still find yourself pulled toward it. A person, habit, situation, or thought may have more control over your attention than you would like to admit.",

    reversedMeaning:
      "You may finally be noticing the pattern clearly enough to break it. Something that once felt impossible to leave may be losing its grip on you.",

    loveMeaning:
      "There can be very strong attraction here, but intensity and healthy compatibility are not the same thing. If someone is on your mind constantly, ask whether you genuinely want the relationship or simply want relief from the uncertainty around it.",

    careerMeaning:
      "You may feel stuck because of money, fear, comfort, status, or the belief that you have no other option. Look carefully at what is actually keeping you there.",

    symbolism:
      "The loose chains around the figures suggest that what feels impossible to escape may not be as permanent as it first appears.",

    reflectionPrompt:
      "What has been taking up too much of your mental and emotional space lately?",
  },

  {
    id: "16-the-tower",
    name: "XVI. The Tower",
    arcana: "Major",
    number: 16,
    keywords: [
      "Sudden Change",
      "Truth",
      "Shock",
      "Breakthrough",
      "Reset",
    ],

    uprightMeaning:
      "Something you believed was stable may suddenly be questioned. This can feel uncomfortable because it removes the illusion that everything is fine. But sometimes the truth arriving suddenly is better than staying inside something that was already unstable.",

    reversedMeaning:
      "You may sense that a change is coming but keep trying to prevent it. There may also be a situation where you are quietly rebuilding after something already shook your confidence.",

    loveMeaning:
      "A sudden message, truth, argument, realization, or change in someone's behaviour could shift the entire dynamic. If the connection has been built on assumptions, those assumptions may not survive the truth.",

    careerMeaning:
      "Unexpected changes at work, sudden restructuring, a failed plan, or a surprising opportunity may force you to rethink your direction.",

    symbolism:
      "The lightning strike represents sudden information or change. The falling tower reflects structures that looked secure but were not built on solid ground.",

    reflectionPrompt:
      "What truth have you been avoiding because you are afraid of what it might change?",
  },

  {
    id: "17-the-star",
    name: "XVII. The Star",
    arcana: "Major",
    number: 17,
    keywords: [
      "Hope",
      "Healing",
      "Renewal",
      "Peace",
      "Optimism",
    ],

    uprightMeaning:
      "This feels like a quiet exhale after a difficult period. You may not have everything figured out yet, but you are starting to believe that things can get better. The Star is a reminder that healing does not always arrive dramatically — sometimes you simply notice that something hurts less than it used to.",

    reversedMeaning:
      "You may be struggling to believe that things can improve. Disappointment may have made you more cynical than usual, even about things you once felt hopeful about.",

    loveMeaning:
      "If someone is on your mind, this can show emotional healing and renewed hope. A past disappointment may still matter, but you may be becoming ready to experience love without carrying every old fear into it.",

    careerMeaning:
      "A creative idea, long-term goal, or professional direction may begin feeling meaningful again. Keep going even if the results are not immediate.",

    symbolism:
      "The open water and stars create a sense of renewal, calm, and hope after a difficult period.",

    reflectionPrompt:
      "What small sign is reminding you that things are not as hopeless as they once felt?",
  },

  {
    id: "18-the-moon",
    name: "XVIII. The Moon",
    arcana: "Major",
    number: 18,
    keywords: [
      "Uncertainty",
      "Hidden Feelings",
      "Confusion",
      "Dreams",
      "Intuition",
    ],

    uprightMeaning:
      "There is something you do not have the full picture on yet. You may be trying to read between the lines, especially when someone's behaviour has been confusing. But this card is basically saying: do not make a permanent decision based on information you do not fully have.",

    reversedMeaning:
      "Confusion may slowly be lifting. Something that has been difficult to understand could finally become clearer, especially once fear stops filling in the missing pieces.",

    loveMeaning:
      "If someone is on your mind, there may be feelings here, but clarity is still missing. You could be picking up on real signals while also adding your own assumptions to them. Give the situation enough time to reveal itself.",

    careerMeaning:
      "Avoid making major professional decisions based on rumours or incomplete information. Double-check details and trust evidence alongside your instincts.",

    symbolism:
      "The winding path represents uncertainty. The dog and wolf show the difference between what feels familiar and what feels instinctively threatening.",

    reflectionPrompt:
      "What do you actually know, and what are you filling in because you are afraid of not knowing?",
  },

  {
    id: "19-the-sun",
    name: "XIX. The Sun",
    arcana: "Major",
    number: 19,
    keywords: [
      "Happiness",
      "Clarity",
      "Success",
      "Confidence",
      "Good News",
    ],

    uprightMeaning:
      "This is one of those cards that makes you breathe a little easier. Something can become much clearer and lighter than it has felt recently. You may finally get an answer, see a result, or simply realize that you were worrying more than necessary.",

    reversedMeaning:
      "The good thing may still be there, but you are struggling to fully enjoy it. Stress, self-doubt, or unrealistic expectations could be getting in the way of something that is actually going well.",

    loveMeaning:
      "Warmth, honesty, attraction, and genuine happiness are highlighted. If someone is on your mind, there is potential for a much clearer and more open connection. This is one of the better cards for positive relationship movement.",

    careerMeaning:
      "Recognition, successful results, confidence, and good news are possible. Your work may finally receive the attention it deserves.",

    symbolism:
      "The bright sun and open landscape reflect visibility, confidence, warmth, and the removal of confusion.",

    reflectionPrompt:
      "What would you enjoy more if you stopped waiting for something to go wrong?",
  },

  {
    id: "20-judgement",
    name: "XX. Judgement",
    arcana: "Major",
    number: 20,
    keywords: [
      "Realization",
      "Second Chance",
      "Awakening",
      "Closure",
      "Decision",
    ],

    uprightMeaning:
      "You may be reaching a point where you cannot keep pretending you do not know what you know. Something from the past may come back into your thoughts, or you may finally see an old situation differently. This is about making a clear decision after understanding what the experience taught you.",

    reversedMeaning:
      "You may be judging yourself too harshly for something that already happened. Regret can keep you stuck if you keep replaying what you should have done differently.",

    loveMeaning:
      "A past relationship, old feelings, or unfinished conversation may come back into focus. If someone is on your mind, there could be an opportunity for closure or a second chance — but only if both people are willing to address what went wrong before.",

    careerMeaning:
      "A major professional realization or decision may be approaching. You may be ready to stop repeating an old career pattern and choose differently this time.",

    symbolism:
      "The figures rising represent a moment of realization — seeing the past clearly enough to decide what happens next.",

    reflectionPrompt:
      "What have you learned from the past that you are finally ready to act on?",
  },

  {
    id: "21-the-world",
    name: "XXI. The World",
    arcana: "Major",
    number: 21,
    keywords: [
      "Completion",
      "Achievement",
      "Closure",
      "Growth",
      "New Chapter",
    ],

    uprightMeaning:
      "Something is coming full circle. You may be closer to finishing a chapter than you realize. This does not always mean everything is perfect — it means you have grown enough that you no longer need to be the same person you were when this journey started.",

    reversedMeaning:
      "You may be very close to completion but keep delaying the final step. There could be unfinished business, hesitation, or a feeling that you need one more piece before allowing yourself to move on.",

    loveMeaning:
      "A relationship can reach a more mature stage, or you may finally find closure around an old connection. If someone is on your mind, ask whether this person belongs in your next chapter or simply played an important role in the previous one.",

    careerMeaning:
      "Completion, graduation, reaching a major milestone, finishing a long project, or expanding into a wider opportunity can be highlighted.",

    symbolism:
      "The circle around the figure represents completion and the end of one cycle before another begins.",

    reflectionPrompt:
      "What chapter are you ready to stop reopening?",
  },

  // =========================================================
  // CUPS
  // =========================================================

  {
    id: "ace-of-cups",
    name: "Ace of Cups",
    arcana: "Minor",
    suit: "Cups",
    number: 1,
    keywords: [
      "New Feelings",
      "Love",
      "Emotional Opening",
      "Healing",
      "Vulnerability",
    ],

    uprightMeaning:
      "Something is opening emotionally. You may be ready to feel again after keeping your guard up, or a new connection may be bringing out feelings you did not expect.",

    reversedMeaning:
      "You may be emotionally drained or holding back because you are afraid of getting hurt again. There may be feelings that need acknowledging before you can move forward.",

    loveMeaning:
      "A beautiful card for new feelings, emotional renewal, and romantic openness. If someone is on your mind, there may be genuine emotional potential, but allow the connection to develop naturally.",

    careerMeaning:
      "A project or opportunity may bring you genuine satisfaction rather than simply money or status. Follow the work that makes you feel involved and inspired.",

    symbolism:
      "The overflowing cup represents emotions that are ready to be acknowledged, shared, and received.",

    reflectionPrompt:
      "What feeling have you been trying not to admit?",
  },

  {
    id: "two-of-cups",
    name: "Two of Cups",
    arcana: "Minor",
    suit: "Cups",
    number: 2,
    keywords: [
      "Mutual Feelings",
      "Connection",
      "Chemistry",
      "Partnership",
      "Reciprocity",
    ],

    uprightMeaning:
      "This is a very mutual card. Something may feel easier when both people are actually meeting each other halfway. If you have been wondering whether a connection is one-sided, this card leans toward genuine reciprocity.",

    reversedMeaning:
      "Feelings may exist, but timing, communication, or effort may not be matching. Attraction alone cannot carry a relationship if the two people are not moving in the same direction.",

    loveMeaning:
      "Strong romantic potential, mutual attraction, emotional understanding, and a connection where both people are choosing each other.",

    careerMeaning:
      "A productive partnership or collaboration may be important. The right person can make a difficult project feel much easier.",

    symbolism:
      "The two cups being exchanged represent emotional reciprocity and two people meeting each other halfway.",

    reflectionPrompt:
      "Where in your life are you looking for mutual effort rather than doing everything yourself?",
  },

  {
    id: "three-of-cups",
    name: "Three of Cups",
    arcana: "Minor",
    suit: "Cups",
    number: 3,
    keywords: [
      "Friends",
      "Celebration",
      "Social Life",
      "Support",
      "Good Times",
    ],

    uprightMeaning:
      "You may need people around you more than you realize. This card brings lighter energy — conversations, plans, friendship, laughter, and finally having a reason to get out of your own head.",

    reversedMeaning:
      "There may be gossip, feeling left out, or spending too much energy worrying about what other people are doing.",

    loveMeaning:
      "A relationship may become more social and playful. If you are single, meeting someone through friends or social plans is possible.",

    careerMeaning:
      "Teamwork, celebration, successful collaboration, and supportive colleagues are highlighted.",

    symbolism:
      "The three people celebrating together reflect friendship, shared happiness, and emotional support.",

    reflectionPrompt:
      "Who makes you feel like yourself again when you are around them?",
  },

  {
    id: "four-of-cups",
    name: "Four of Cups",
    arcana: "Minor",
    suit: "Cups",
    number: 4,
    keywords: [
      "Boredom",
      "Withdrawal",
      "Missed Opportunity",
      "Emotional Distance",
      "Reconsideration",
    ],

    uprightMeaning:
      "You may be emotionally checked out right now. Something may be available to you, but because you are focused on what did not happen, you are not really noticing what is happening.",

    reversedMeaning:
      "You may finally be ready to come out of that withdrawn phase. Something that previously did not interest you could suddenly look different.",

    loveMeaning:
      "If someone is on your mind, you may be disappointed by the way things have gone and therefore not notice a new possibility. Give yourself permission to see the situation from a fresh angle.",

    careerMeaning:
      "Work may feel repetitive or uninspiring. Before making a drastic move, check whether you actually need a new environment or simply a new challenge.",

    symbolism:
      "The offered cup represents an opportunity that can be missed when attention is completely focused elsewhere.",

    reflectionPrompt:
      "What possibility are you overlooking because you are still focused on what you wanted instead?",
  },

  {
    id: "five-of-cups",
    name: "Five of Cups",
    arcana: "Minor",
    suit: "Cups",
    number: 5,
    keywords: [
      "Disappointment",
      "Regret",
      "Loss",
      "Healing",
      "Moving Forward",
    ],

    uprightMeaning:
      "Something may still be hurting more than you admit. You may keep replaying what went wrong, what someone said, or what could have happened differently. This card does not ask you to pretend it did not hurt — it asks you to notice what is still standing.",

    reversedMeaning:
      "You may finally be ready to stop living inside an old disappointment. The memory may still exist, but it does not have to control what happens next.",

    loveMeaning:
      "Heartbreak, regret, or disappointment may be influencing how you see a current connection. If someone is on your mind, make sure you are responding to who they are now rather than what someone else did to you before.",

    careerMeaning:
      "A professional disappointment may have affected your confidence. One rejection or failed attempt does not define your ability.",

    symbolism:
      "The spilled cups represent disappointment, while the cups still standing behind the figure suggest that not everything has been lost.",

    reflectionPrompt:
      "What is still available to you that you have not fully noticed yet?",
  },

  {
    id: "six-of-cups",
    name: "Six of Cups",
    arcana: "Minor",
    suit: "Cups",
    number: 6,
    keywords: [
      "Past",
      "Nostalgia",
      "Memories",
      "Reconnection",
      "Familiar Feelings",
    ],

    uprightMeaning:
      "Someone or something from the past may be taking up space in your thoughts again. This card often appears when an old memory still carries emotional weight.",

    reversedMeaning:
      "You may be romanticizing the past. Remembering the good parts can be comforting, but it does not necessarily mean going back would give you the same experience.",

    loveMeaning:
      "If someone from your past is on your mind, this card can point toward nostalgia, remembering each other, or even a possible reconnection. But remembering someone is not automatically the same as being ready to rebuild the relationship.",

    careerMeaning:
      "An old skill, previous contact, past project, or familiar environment may become useful again.",

    symbolism:
      "The cups filled with flowers represent memories and emotional experiences that continue to stay with you.",

    reflectionPrompt:
      "Do you miss the person or situation itself, or do you miss how you felt back then?",
  },

  {
    id: "seven-of-cups",
    name: "Seven of Cups",
    arcana: "Minor",
    suit: "Cups",
    number: 7,
    keywords: [
      "Choices",
      "Fantasy",
      "Confusion",
      "Possibilities",
      "Overthinking",
    ],

    uprightMeaning:
      "You may have too many possibilities in your head right now. The problem is not a lack of options — it is knowing which one is actually real and worth your energy.",

    reversedMeaning:
      "The fog may finally be clearing. You are becoming more realistic about what you want and what is actually possible.",

    loveMeaning:
      "If someone is on your mind, you may be imagining several possible outcomes because you do not have enough clarity. Try not to turn one small signal into an entire story.",

    careerMeaning:
      "You may be considering multiple jobs, projects, or directions. Narrow the list down using practical factors rather than choosing purely based on excitement.",

    symbolism:
      "The different cups represent different possibilities, some attractive and some deceptive, showing how difficult it can be to separate desire from reality.",

    reflectionPrompt:
      "Which option is actually real, rather than simply exciting to imagine?",
  },

  {
    id: "eight-of-cups",
    name: "Eight of Cups",
    arcana: "Minor",
    suit: "Cups",
    number: 8,
    keywords: [
      "Walking Away",
      "Emotional Distance",
      "Letting Go",
      "Searching",
      "Moving On",
    ],

    uprightMeaning:
      "You may be reaching the point where something no longer feels worth the emotional cost. Walking away does not always mean you stopped caring. Sometimes it means you finally started caring about yourself too.",

    reversedMeaning:
      "Part of you may know it is time to move on, but another part keeps looking back. You may be afraid that leaving means giving up on the possibility of things changing.",

    loveMeaning:
      "If someone is on your mind, there may be emotional distance or a decision to stop chasing clarity. This can be painful, but it can also be the beginning of getting your emotional balance back.",

    careerMeaning:
      "A job or professional path may no longer feel emotionally satisfying even if it looks fine from the outside.",

    symbolism:
      "The figure walking away from the cups represents leaving behind something familiar because it no longer feels emotionally complete.",

    reflectionPrompt:
      "What are you staying in simply because leaving feels scary?",
  },

  {
    id: "nine-of-cups",
    name: "Nine of Cups",
    arcana: "Minor",
    suit: "Cups",
    number: 9,
    keywords: [
      "Wish",
      "Satisfaction",
      "Confidence",
      "Enjoyment",
      "Emotional Fulfillment",
    ],

    uprightMeaning:
      "Something you have wanted may be closer than you think. This card is about finally allowing yourself to enjoy what is already good instead of immediately searching for the next thing to fix.",

    reversedMeaning:
      "You may get what you thought you wanted and still feel strangely unsatisfied. Check whether the goal itself is yours or something you believed would make you happy.",

    loveMeaning:
      "Romantic confidence, attraction, and emotional satisfaction are highlighted. If someone is on your mind, there is a sense of enjoying the connection rather than constantly worrying about where it is going.",

    careerMeaning:
      "A personal goal may pay off. You may also be in a position to enjoy the results of work you have already done.",

    symbolism:
      "The row of cups reflects emotional satisfaction and having enough to appreciate what is already present.",

    reflectionPrompt:
      "What if you allowed yourself to enjoy what you already have?",
  },

  {
    id: "ten-of-cups",
    name: "Ten of Cups",
    arcana: "Minor",
    suit: "Cups",
    number: 10,
    keywords: [
      "Emotional Happiness",
      "Family",
      "Commitment",
      "Harmony",
      "Long-Term Love",
    ],

    uprightMeaning:
      "This is the kind of energy that feels emotionally safe. You may be thinking less about temporary excitement and more about who genuinely fits into your life for the long run.",

    reversedMeaning:
      "The outside picture may look happy while something emotionally important is being ignored underneath. Do not confuse appearances with genuine closeness.",

    loveMeaning:
      "One of the strongest cards for emotional fulfillment, long-term partnership, family happiness, and feeling at home with someone.",

    careerMeaning:
      "A supportive work environment or career path that allows you to have a healthier life outside work may become increasingly important.",

    symbolism:
      "The rainbow and family scene represent emotional harmony, belonging, and shared happiness.",

    reflectionPrompt:
      "What does a genuinely happy life look like to you when nobody else gets to define it?",
  },

  // =========================================================
  // WANDS
  // =========================================================

  {
    id: "ace-of-wands",
    name: "Ace of Wands",
    arcana: "Minor",
    suit: "Wands",
    number: 1,
    keywords: [
      "Spark",
      "Passion",
      "Motivation",
      "New Idea",
      "Action",
    ],

    uprightMeaning:
      "Something has sparked your interest. You may suddenly feel motivated to start something, message someone, change direction, or finally act on an idea you have been sitting with.",

    reversedMeaning:
      "The desire may be there, but the energy is inconsistent. You could be excited one day and completely uninterested the next.",

    loveMeaning:
      "Strong attraction and chemistry can appear quickly. If someone is on your mind, there may be a sudden urge to make a move or see where the connection goes.",

    careerMeaning:
      "A new project, idea, business opportunity, or creative direction can give you a much-needed burst of motivation.",

    symbolism:
      "The budding wand represents the first spark of an idea or desire that can become much bigger if acted upon.",

    reflectionPrompt:
      "What idea keeps coming back because part of you knows you should try it?",
  },

  {
    id: "two-of-wands",
    name: "Two of Wands",
    arcana: "Minor",
    suit: "Wands",
    number: 2,
    keywords: [
      "Planning",
      "Future",
      "Decision",
      "Expansion",
      "Possibility",
    ],

    uprightMeaning:
      "You may be looking beyond your current situation and wondering what else is possible. There is a desire for more, but now you need to decide which direction is actually worth pursuing.",

    reversedMeaning:
      "Fear of leaving your comfort zone may be keeping you from exploring an option you already know interests you.",

    loveMeaning:
      "If someone is on your mind, you may be thinking about what this connection could become rather than what it is right now. There is potential, but someone still needs to decide what they want.",

    careerMeaning:
      "Planning a move, applying elsewhere, expanding your skills, or considering a bigger opportunity can be highlighted.",

    symbolism:
      "The figure looking outward represents planning beyond the current situation and imagining a wider future.",

    reflectionPrompt:
      "What future are you quietly considering but have not admitted you want?",
  },

  {
    id: "three-of-wands",
    name: "Three of Wands",
    arcana: "Minor",
    suit: "Wands",
    number: 3,
    keywords: [
      "Progress",
      "Expansion",
      "Waiting",
      "Opportunity",
      "Results",
    ],

    uprightMeaning:
      "You have already done the first part. Now you are waiting to see what comes back. This can be a good sign if you have recently applied, reached out, launched something, or taken a risk.",

    reversedMeaning:
      "Delays or poor planning may be slowing things down. You may need to adjust your expectations rather than assuming nothing is happening.",

    loveMeaning:
      "If someone is on your mind, there may be distance or waiting involved. Something can develop, but it may require patience rather than constant checking for signs.",

    careerMeaning:
      "Projects can start expanding beyond the initial stage. Opportunities connected to travel, new markets, or wider exposure may appear.",

    symbolism:
      "The ships in the distance represent results and opportunities that are still making their way toward you.",

    reflectionPrompt:
      "What have you already started that now needs patience rather than more pushing?",
  },

  {
    id: "four-of-wands",
    name: "Four of Wands",
    arcana: "Minor",
    suit: "Wands",
    number: 4,
    keywords: [
      "Celebration",
      "Stability",
      "Home",
      "Milestone",
      "Togetherness",
    ],

    uprightMeaning:
      "There is something worth celebrating here. You may be reaching a point where things feel more settled, whether that means a relationship becoming stable, a project finishing, or simply feeling more comfortable with where life is heading.",

    reversedMeaning:
      "Something that should feel stable may still have tension underneath. A celebration or milestone may also be delayed.",

    loveMeaning:
      "A positive card for commitment, relationship milestones, meeting families, moving in together, or simply feeling secure with someone.",

    careerMeaning:
      "A successful project, team milestone, new workplace, or achievement worth celebrating may be approaching.",

    symbolism:
      "The decorated structure represents stability, celebration, and having a safe place to return to.",

    reflectionPrompt:
      "What progress deserves to be celebrated instead of immediately being replaced by the next goal?",
  },

  {
    id: "five-of-wands",
    name: "Five of Wands",
    arcana: "Minor",
    suit: "Wands",
    number: 5,
    keywords: [
      "Competition",
      "Conflict",
      "Ego",
      "Tension",
      "Challenge",
    ],

    uprightMeaning:
      "There may be too many people trying to be heard at once. This can show up as competition, arguments, workplace tension, or simply too many opinions around one situation.",

    reversedMeaning:
      "The conflict may be calming down, or you may finally realize that some arguments are not worth your energy.",

    loveMeaning:
      "If someone is on your mind, there may be mixed signals, ego clashes, or competition for attention. Attraction can exist while communication remains messy.",

    careerMeaning:
      "Competition and disagreements may be present. Do not let someone else's urgency pull you into unnecessary drama.",

    symbolism:
      "The crossed wands represent competing ideas, ambitions, and people trying to move in different directions.",

    reflectionPrompt:
      "Which conflict actually matters, and which one is simply draining you?",
  },

  {
    id: "six-of-wands",
    name: "Six of Wands",
    arcana: "Minor",
    suit: "Wands",
    number: 6,
    keywords: [
      "Recognition",
      "Success",
      "Confidence",
      "Victory",
      "Attention",
    ],

    uprightMeaning:
      "You may finally get recognition for something you have been working hard on. This card has a very clear 'people are noticing you' feeling.",

    reversedMeaning:
      "You may be doing more than people realize, or relying too much on outside validation to feel successful.",

    loveMeaning:
      "If someone is on your mind, they may notice you more than you realize. There can be admiration, attraction, or a desire to feel chosen and appreciated.",

    careerMeaning:
      "Recognition, praise, promotion, successful interviews, or positive feedback can appear.",

    symbolism:
      "The raised wand and laurel represent recognition after effort and persistence.",

    reflectionPrompt:
      "Can you be proud of yourself even before someone else applauds you?",
  },

  {
    id: "seven-of-wands",
    name: "Seven of Wands",
    arcana: "Minor",
    suit: "Wands",
    number: 7,
    keywords: [
      "Standing Your Ground",
      "Boundaries",
      "Pressure",
      "Courage",
      "Defending Yourself",
    ],

    uprightMeaning:
      "You may feel like you have to defend your position lately. This card says you do not need everyone to agree with you for your decision to be valid.",

    reversedMeaning:
      "You may be exhausted from constantly defending yourself. Sometimes stepping away is healthier than proving your point again.",

    loveMeaning:
      "If someone is on your mind, boundaries matter. You may care about them while still deciding what behaviour you will not accept.",

    careerMeaning:
      "Competition or pressure may increase, but you have a stronger position than you think. Stand behind your work.",

    symbolism:
      "The person standing above the others represents protecting a position even when there is pressure from multiple directions.",

    reflectionPrompt:
      "What boundary are you tired of explaining?",
  },

  {
    id: "eight-of-wands",
    name: "Eight of Wands",
    arcana: "Minor",
    suit: "Wands",
    number: 8,
    keywords: [
      "Fast Movement",
      "Messages",
      "Momentum",
      "News",
      "Quick Change",
    ],

    uprightMeaning:
      "Things may speed up very quickly after feeling slow. A message, decision, invitation, opportunity, or sudden development could arrive sooner than expected.",

    reversedMeaning:
      "There may be delays, crossed messages, or too much happening at once. Slow down enough to make sure you are actually understanding what is being said.",

    loveMeaning:
      "If someone is on your mind, this is one of the cards that can point toward communication or sudden movement. A message or conversation may break a period of silence.",

    careerMeaning:
      "Fast-moving projects, emails, interviews, decisions, travel, or sudden opportunities are possible.",

    symbolism:
      "The flying wands represent movement, speed, and events that are already in motion.",

    reflectionPrompt:
      "What are you waiting for that may actually be closer than you think?",
  },

  {
    id: "nine-of-wands",
    name: "Nine of Wands",
    arcana: "Minor",
    suit: "Wands",
    number: 9,
    keywords: [
      "Resilience",
      "Guarded",
      "Persistence",
      "Caution",
      "Last Push",
    ],

    uprightMeaning:
      "You have been through enough to become cautious. That caution makes sense, but do not let past experiences convince you that every new situation will end the same way.",

    reversedMeaning:
      "You may be exhausted from constantly being on guard. Your walls may be protecting you, but they may also be keeping good things out.",

    loveMeaning:
      "If someone is on your mind, one or both of you may be emotionally guarded because of previous experiences. Feelings can exist alongside fear.",

    careerMeaning:
      "You may be close to finishing something demanding. Keep going, but also recognize when rest is necessary.",

    symbolism:
      "The figure's guarded posture reflects resilience after difficult experiences and the instinct to protect yourself.",

    reflectionPrompt:
      "Are your boundaries protecting you, or are they preventing you from being open to something better?",
  },

  {
    id: "ten-of-wands",
    name: "Ten of Wands",
    arcana: "Minor",
    suit: "Wands",
    number: 10,
    keywords: [
      "Burden",
      "Overwork",
      "Responsibility",
      "Pressure",
      "Letting Go",
    ],

    uprightMeaning:
      "You may be carrying way too much. This card is basically asking: why are you trying to handle everything alone? Something needs to be delegated, dropped, or simplified.",

    reversedMeaning:
      "You may finally be realizing that not every responsibility belongs to you. Letting something go could feel uncomfortable but necessary.",

    loveMeaning:
      "If someone is on your mind, emotional exhaustion may be affecting the connection. You may be doing too much of the emotional work and quietly resenting it.",

    careerMeaning:
      "Heavy workload, burnout, too many responsibilities, or difficulty saying no can be highlighted.",

    symbolism:
      "The figure carrying the entire bundle represents taking on more responsibility than one person realistically needs to carry.",

    reflectionPrompt:
      "What are you carrying simply because you have become used to carrying it?",
  },

  // =========================================================
  // SWORDS
  // =========================================================

  {
    id: "ace-of-swords",
    name: "Ace of Swords",
    arcana: "Minor",
    suit: "Swords",
    number: 1,
    keywords: [
      "Truth",
      "Clarity",
      "Decision",
      "Breakthrough",
      "Honest Conversation",
    ],

    uprightMeaning:
      "Something becomes clear. You may finally understand what someone meant, realize what you actually want, or stop confusing yourself with endless possibilities. The answer may be simpler than you expected.",

    reversedMeaning:
      "Mental fog, misinformation, or harsh words may be making things harder. Do not make a major decision while you are emotionally overwhelmed.",

    loveMeaning:
      "If someone is on your mind, an honest conversation may be needed. This card prefers clarity over guessing games.",

    careerMeaning:
      "A breakthrough, important decision, contract, interview, or new idea can bring clarity to your professional direction.",

    symbolism:
      "The sword represents cutting through confusion and getting directly to what is true.",

    reflectionPrompt:
      "What truth would make your next decision much easier?",
  },

  {
    id: "two-of-swords",
    name: "Two of Swords",
    arcana: "Minor",
    suit: "Swords",
    number: 2,
    keywords: [
      "Indecision",
      "Avoidance",
      "Silence",
      "Choice",
      "Emotional Protection",
    ],

    uprightMeaning:
      "You may already know there is a decision to make, but neither option feels comfortable. Staying undecided can feel safer for a while, but eventually the situation will ask you to choose.",

    reversedMeaning:
      "The decision you have been avoiding may become impossible to ignore. You may finally be ready to admit what you actually want.",

    loveMeaning:
      "If someone is on your mind, there may be silence or emotional avoidance between you. Someone may care but still be unwilling to make a clear move.",

    careerMeaning:
      "Two opportunities, paths, or decisions may be competing. Gather enough information to decide, but do not wait for absolute certainty.",

    symbolism:
      "The blindfold represents not wanting to see something clearly because the truth may require a difficult choice.",

    reflectionPrompt:
      "What decision are you delaying because both options feel uncomfortable?",
  },

  {
    id: "three-of-swords",
    name: "Three of Swords",
    arcana: "Minor",
    suit: "Swords",
    number: 3,
    keywords: [
      "Heartbreak",
      "Truth",
      "Pain",
      "Disappointment",
      "Emotional Release",
    ],

    uprightMeaning:
      "Something may hurt because it matters. This card can bring disappointment, rejection, separation, or a truth that you did not want to hear. Do not rush yourself into pretending you are fine.",

    reversedMeaning:
      "You may be slowly healing from something that once felt impossible to move past. The pain may still be there, but it is no longer controlling every decision.",

    loveMeaning:
      "If someone is on your mind, there may be heartbreak, disappointment, separation, or a painful truth involved. This card asks for honesty rather than romanticizing what happened.",

    careerMeaning:
      "A rejection, criticism, workplace conflict, or disappointment may affect your confidence temporarily.",

    symbolism:
      "The heart and swords represent emotional pain caused by difficult truths, words, or separation.",

    reflectionPrompt:
      "What hurt do you need to acknowledge instead of pretending it did not affect you?",
  },

  {
    id: "four-of-swords",
    name: "Four of Swords",
    arcana: "Minor",
    suit: "Swords",
    number: 4,
    keywords: [
      "Rest",
      "Recovery",
      "Pause",
      "Mental Reset",
      "Peace",
    ],

    uprightMeaning:
      "You need a break. Not another productivity hack, not another plan — actual rest. Your mind may be asking for quiet because you have been processing too much.",

    reversedMeaning:
      "You may know you need rest but keep filling every quiet moment with distractions, work, or overthinking.",

    loveMeaning:
      "If someone is on your mind, space may be useful. A pause does not always mean rejection. Sometimes people need time to understand what they actually feel.",

    careerMeaning:
      "Take a step back before burnout becomes the problem. Rest can make your decisions better, not slower.",

    symbolism:
      "The resting figure represents recovery after mental or emotional strain.",

    reflectionPrompt:
      "When was the last time you truly allowed yourself to stop?",
  },

  {
    id: "five-of-swords",
    name: "Five of Swords",
    arcana: "Minor",
    suit: "Swords",
    number: 5,
    keywords: [
      "Conflict",
      "Ego",
      "Winning",
      "Arguments",
      "Walking Away",
    ],

    uprightMeaning:
      "Someone may be more interested in winning than understanding. This card asks whether being right is actually worth the emotional cost.",

    reversedMeaning:
      "A conflict may be ending, or you may finally decide that continuing the argument is not worth it.",

    loveMeaning:
      "If someone is on your mind, ego, defensiveness, or unresolved arguments may be getting in the way. Sometimes both people can care and still hurt each other.",

    careerMeaning:
      "Workplace politics or competition may be present. Choose your battles carefully.",

    symbolism:
      "The abandoned swords represent the emotional cost of conflict after someone has technically 'won.'",

    reflectionPrompt:
      "What argument would you rather have peace than win?",
  },

  {
    id: "six-of-swords",
    name: "Six of Swords",
    arcana: "Minor",
    suit: "Swords",
    number: 6,
    keywords: [
      "Moving On",
      "Transition",
      "Healing",
      "Distance",
      "Calmer Times",
    ],

    uprightMeaning:
      "You are moving away from something mentally exhausting. It may not feel completely peaceful yet, but it is better than where you were.",

    reversedMeaning:
      "You may physically move forward while emotionally carrying the same old situation with you.",

    loveMeaning:
      "If someone is on your mind, this can show emotional distance, moving on from conflict, or trying to leave an unhealthy pattern behind.",

    careerMeaning:
      "A job change, relocation, different team, or transition toward a calmer professional environment can be highlighted.",

    symbolism:
      "The boat moving across rough water toward calmer surroundings represents gradual movement away from difficulty.",

    reflectionPrompt:
      "What are you ready to stop carrying into your next chapter?",
  },

  {
    id: "seven-of-swords",
    name: "Seven of Swords",
    arcana: "Minor",
    suit: "Swords",
    number: 7,
    keywords: [
      "Avoidance",
      "Secrets",
      "Strategy",
      "Hidden Motives",
      "Independence",
    ],

    uprightMeaning:
      "Something may not be being said directly. Someone could be avoiding a conversation, keeping information private, or choosing a quieter strategy instead of being completely open.",

    reversedMeaning:
      "Something hidden may come to light. You may also be tired of avoiding a conversation that needs to happen.",

    loveMeaning:
      "If someone is on your mind, be careful about assuming silence means one specific thing. There may be avoidance or hidden feelings, but only honest communication can tell you what is actually happening.",

    careerMeaning:
      "Be strategic with sensitive information. Double-check who you trust and do not assume everyone has the same intentions as you.",

    symbolism:
      "The figure moving away with the swords reflects secrecy, strategy, and choosing an indirect approach.",

    reflectionPrompt:
      "What conversation are you avoiding because you already know it needs to happen?",
  },

  {
    id: "eight-of-swords",
    name: "Eight of Swords",
    arcana: "Minor",
    suit: "Swords",
    number: 8,
    keywords: [
      "Feeling Stuck",
      "Fear",
      "Overthinking",
      "Self-Limitation",
      "Mental Pressure",
    ],

    uprightMeaning:
      "You may feel trapped, but part of the trap is happening inside your own head. Fear is making the available options look smaller than they actually are.",

    reversedMeaning:
      "You may be starting to see a way out. Confidence can return once you stop treating every possible mistake like a disaster.",

    loveMeaning:
      "If someone is on your mind, you may be overanalyzing every message, delay, or change in behaviour. The uncertainty itself may be making the connection feel more intense than it actually is.",

    careerMeaning:
      "You may feel stuck in a job or situation because you believe you have no alternatives. Start exploring quietly before assuming there is no way forward.",

    symbolism:
      "The surrounding swords represent mental restrictions and fear. The open space around the figure suggests that the situation may not be as impossible as it feels.",

    reflectionPrompt:
      "What would you do differently if you stopped assuming the worst outcome?",
  },

  {
    id: "nine-of-swords",
    name: "Nine of Swords",
    arcana: "Minor",
    suit: "Swords",
    number: 9,
    keywords: [
      "Anxiety",
      "Overthinking",
      "Worry",
      "Sleeplessness",
      "Fear",
    ],

    uprightMeaning:
      "Your mind may be making the situation feel much bigger at night than it does during the day. You may be replaying conversations, imagining outcomes, or worrying about something you cannot control.",

    reversedMeaning:
      "You may be beginning to break the cycle of overthinking. The worry is still there, but it is losing some of its power.",

    loveMeaning:
      "If someone is on your mind, you may be thinking about them far more than the actual situation warrants. Do not mistake anxiety for intuition.",

    careerMeaning:
      "Stress about work, performance, money, or the future may be affecting your peace more than you realize.",

    symbolism:
      "The figure sitting awake represents thoughts that become louder when there is no outside distraction.",

    reflectionPrompt:
      "What are you afraid will happen, and how much evidence do you actually have for it?",
  },

  {
    id: "ten-of-swords",
    name: "Ten of Swords",
    arcana: "Minor",
    suit: "Swords",
    number: 10,
    keywords: [
      "Ending",
      "Rock Bottom",
      "Closure",
      "Release",
      "Final Chapter",
    ],

    uprightMeaning:
      "Something may have reached its absolute limit. It can hurt to admit that, but there is also relief in no longer trying to save something that has already run its course.",

    reversedMeaning:
      "You may be recovering from a painful ending. The situation may not be completely forgotten, but the worst part is beginning to pass.",

    loveMeaning:
      "A painful relationship cycle may be ending. If someone is on your mind, this card can suggest accepting what happened rather than repeatedly reopening the same wound.",

    careerMeaning:
      "A difficult job situation, project, or professional chapter may finally be coming to an end, creating space for a reset.",

    symbolism:
      "The sunrise in the background is important: even after a difficult ending, a new day begins.",

    reflectionPrompt:
      "What would become possible if you accepted that this chapter is over?",
  },

  // =========================================================
  // PENTACLES
  // =========================================================

  {
    id: "ace-of-pentacles",
    name: "Ace of Pentacles",
    arcana: "Minor",
    suit: "Pentacles",
    number: 1,
    keywords: [
      "Opportunity",
      "Money",
      "Stability",
      "Career",
      "Fresh Start",
    ],

    uprightMeaning:
      "A practical opportunity may be opening up. This is not just about dreaming — there is something tangible here that could actually improve your situation if you take care of it.",

    reversedMeaning:
      "An opportunity may be delayed, overlooked, or poorly planned. Do not rush simply because something looks financially attractive.",

    loveMeaning:
      "A connection can become more stable and grounded. If someone is on your mind, this suggests looking at whether the relationship can work in real life, not just emotionally.",

    careerMeaning:
      "A job offer, financial opportunity, new project, or practical beginning can be highlighted.",

    symbolism:
      "The single pentacle represents a real-world opportunity that needs consistent effort to grow.",

    reflectionPrompt:
      "What practical opportunity deserves more attention right now?",
  },

  {
    id: "two-of-pentacles",
    name: "Two of Pentacles",
    arcana: "Minor",
    suit: "Pentacles",
    number: 2,
    keywords: [
      "Balance",
      "Time",
      "Multiple Priorities",
      "Adaptability",
      "Juggling",
    ],

    uprightMeaning:
      "You have a lot going on at once. The challenge is not necessarily that any one thing is impossible — it is that everything wants your attention at the same time.",

    reversedMeaning:
      "You may be taking on more than your schedule can realistically handle. Something needs to be simplified.",

    loveMeaning:
      "If someone is on your mind, timing or competing priorities may be affecting the connection. Feelings can exist while life is still messy.",

    careerMeaning:
      "Multiple projects, deadlines, financial decisions, or changing responsibilities may need careful organization.",

    symbolism:
      "The two pentacles being balanced represent managing changing priorities without losing your footing.",

    reflectionPrompt:
      "What could you simplify instead of trying to balance everything perfectly?",
  },

  {
    id: "three-of-pentacles",
    name: "Three of Pentacles",
    arcana: "Minor",
    suit: "Pentacles",
    number: 3,
    keywords: [
      "Teamwork",
      "Skill",
      "Learning",
      "Collaboration",
      "Recognition",
    ],

    uprightMeaning:
      "Your skills are becoming more visible. You may benefit from working with people who know something you do not yet know rather than trying to figure everything out alone.",

    reversedMeaning:
      "Poor communication or lack of teamwork may be slowing down progress. You may also feel like your contribution is being overlooked.",

    loveMeaning:
      "A relationship grows through actual effort, not just feelings. If someone is on your mind, watch whether they are willing to build something with you.",

    careerMeaning:
      "Excellent card for learning, mentorship, teamwork, project work, and recognition of your skills.",

    symbolism:
      "The people working together represent different skills coming together to create something stronger.",

    reflectionPrompt:
      "Who could help you become better at something you are trying to build?",
  },

  {
    id: "four-of-pentacles",
    name: "Four of Pentacles",
    arcana: "Minor",
    suit: "Pentacles",
    number: 4,
    keywords: [
      "Security",
      "Holding On",
      "Control",
      "Possessiveness",
      "Fear of Loss",
    ],

    uprightMeaning:
      "You may be holding onto something because losing it feels worse than staying uncomfortable. This can be money, a relationship, a job, or simply an old sense of security.",

    reversedMeaning:
      "You may finally be ready to loosen your grip. Letting go does not always mean losing — sometimes it means making room.",

    loveMeaning:
      "If someone is on your mind, one of you may be holding back emotionally because vulnerability feels risky. Possessiveness or fear of losing someone can also become an issue.",

    careerMeaning:
      "Financial security matters right now. Save wisely, but do not let fear stop you from investing in your growth.",

    symbolism:
      "The figure holding the pentacles tightly reflects fear of losing control or security.",

    reflectionPrompt:
      "What are you holding onto because you are afraid of what happens if you let go?",
  },

  {
    id: "five-of-pentacles",
    name: "Five of Pentacles",
    arcana: "Minor",
    suit: "Pentacles",
    number: 5,
    keywords: [
      "Financial Stress",
      "Isolation",
      "Insecurity",
      "Support",
      "Hard Times",
    ],

    uprightMeaning:
      "You may be feeling left out, unsupported, or worried about practical stability. But this card also asks you to notice the help that may be available instead of assuming you have to handle everything alone.",

    reversedMeaning:
      "Things can gradually improve. Support, financial stability, or emotional confidence may begin returning after a difficult period.",

    loveMeaning:
      "If someone is on your mind, one of you may be feeling emotionally excluded or unsure of where you stand. Do not assume distance automatically means lack of care.",

    careerMeaning:
      "Financial pressure, job insecurity, or feeling undervalued can be highlighted. Ask for help where necessary.",

    symbolism:
      "The figures outside in the cold represent hardship and isolation, while the nearby light suggests support may be closer than they realize.",

    reflectionPrompt:
      "Where are you assuming you are alone when support may actually be available?",
  },

  {
    id: "six-of-pentacles",
    name: "Six of Pentacles",
    arcana: "Minor",
    suit: "Pentacles",
    number: 6,
    keywords: [
      "Giving",
      "Receiving",
      "Support",
      "Fairness",
      "Reciprocity",
    ],

    uprightMeaning:
      "Help, support, or an opportunity may come through another person. This card is also about balance — you should not always be the person giving while someone else simply receives.",

    reversedMeaning:
      "The exchange may be uneven. Someone could be giving with expectations attached, or you may be giving far more than you are receiving.",

    loveMeaning:
      "If someone is on your mind, look at the effort between you. Healthy love needs some level of reciprocity.",

    careerMeaning:
      "Financial assistance, mentorship, fair compensation, or support from someone more experienced may appear.",

    symbolism:
      "The exchange of coins represents giving and receiving, and whether that exchange is genuinely balanced.",

    reflectionPrompt:
      "Where in your life is the effort becoming one-sided?",
  },

  {
    id: "seven-of-pentacles",
    name: "Seven of Pentacles",
    arcana: "Minor",
    suit: "Pentacles",
    number: 7,
    keywords: [
      "Patience",
      "Investment",
      "Waiting",
      "Progress",
      "Long-Term Results",
    ],

    uprightMeaning:
      "You may be wondering whether all the effort is actually worth it. This card says to look at progress rather than demanding instant results. Some things need time before you can judge them fairly.",

    reversedMeaning:
      "You may be spending too much time waiting for a result that is not developing the way you hoped. Reassess instead of blindly continuing.",

    loveMeaning:
      "If someone is on your mind, you may be wondering whether the connection is worth continuing to invest in. Look at what has actually grown, not only what you hope could grow.",

    careerMeaning:
      "Long-term projects, investments, learning, and slow career growth are highlighted.",

    symbolism:
      "The growing pentacles represent results that require patience and consistent effort.",

    reflectionPrompt:
      "Is this actually growing, or are you only hoping it will?",
  },

  {
    id: "eight-of-pentacles",
    name: "Eight of Pentacles",
    arcana: "Minor",
    suit: "Pentacles",
    number: 8,
    keywords: [
      "Practice",
      "Skill",
      "Work",
      "Improvement",
      "Consistency",
    ],

    uprightMeaning:
      "You are getting better through repetition. This may not feel dramatic, but every small improvement is adding up. Keep practicing instead of waiting until you feel naturally talented.",

    reversedMeaning:
      "You may be putting in effort without enough focus, or doing something repeatedly without actually learning from the mistakes.",

    loveMeaning:
      "If someone is on your mind, relationships improve through consistent actions. Small effort matters more than occasional intense gestures.",

    careerMeaning:
      "Excellent card for learning technical skills, building experience, training, and becoming genuinely good at your craft.",

    symbolism:
      "The repeated pentacles represent practice and gradual improvement through consistent work.",

    reflectionPrompt:
      "What would improve dramatically if you simply stayed consistent with it?",
  },

  {
    id: "nine-of-pentacles",
    name: "Nine of Pentacles",
    arcana: "Minor",
    suit: "Pentacles",
    number: 9,
    keywords: [
      "Independence",
      "Confidence",
      "Comfort",
      "Self-Worth",
      "Achievement",
    ],

    uprightMeaning:
      "You may be entering a phase where you realize you can create a good life for yourself without waiting for someone else to complete it. There is confidence in being able to stand on your own.",

    reversedMeaning:
      "You may be relying too much on external approval or spending beyond what feels comfortable just to maintain an image.",

    loveMeaning:
      "If someone is on your mind, independence is important. A healthy connection should add to your life rather than become the thing your entire emotional world depends on.",

    careerMeaning:
      "Financial independence, professional confidence, personal achievements, and enjoying the results of your work are highlighted.",

    symbolism:
      "The garden and abundant surroundings reflect the results of patient work and self-reliance.",

    reflectionPrompt:
      "What would your life look like if you stopped waiting for someone else to make it feel complete?",
  },

  {
    id: "ten-of-pentacles",
    name: "Ten of Pentacles",
    arcana: "Minor",
    suit: "Pentacles",
    number: 10,
    keywords: [
      "Long-Term Security",
      "Family",
      "Stability",
      "Legacy",
      "Future",
    ],

    uprightMeaning:
      "This is about building something that lasts. You may be thinking more seriously about financial stability, family, home, or what kind of future you actually want.",

    reversedMeaning:
      "Family expectations, financial disagreements, or pressure to follow a traditional path may be creating stress.",

    loveMeaning:
      "A strong card for long-term relationships, building a home together, family involvement, and wanting something that lasts beyond temporary excitement.",

    careerMeaning:
      "Long-term financial growth, stable employment, building a business, or creating something that continues to benefit you in the future.",

    symbolism:
      "The family setting represents long-term stability, shared resources, and something built to continue beyond one person.",

    reflectionPrompt:
      "What are you building now that you will still be grateful for years from today?",
  },
];