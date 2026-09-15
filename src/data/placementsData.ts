import { ZODIAC_SIGNS_DATA } from "./zodiacData";
import { PLANETS_DATA } from "./planetsData";
import { HOUSES_DATA } from "./housesData";

export interface PlacementSynthesis {
  planetId: string;
  signId: string;
  houseNumber: number;

  opening: string;
  personality: string;
  emotionalPattern: string;
  lovePattern: string;
  realLifeExpression: string;
  shadowSide: string;
  currentEnergy: string;
  advice: string;

  strengths: string[];
  challenges: string[];
  conversationStarters: string[];
}

/**
 * Conversational astrology interpretation engine.
 *
 * IMPORTANT:
 * The astrology data is used internally to build the interpretation.
 * The user should experience this as personal insight, not as an
 * astrology lesson.
 *
 * Avoid:
 * - "Astrologically..."
 * - "This placement means..."
 * - "The planet represents..."
 * - "The house governs..."
 * - "Cosmic energy..."
 * - "Your soul..."
 * - "Your cosmic blueprint..."
 *
 * Prefer:
 * - "You may..."
 * - "You probably..."
 * - "This can show up as..."
 * - "You might notice..."
 * - "If someone is on your mind..."
 * - "The interesting part is..."
 * - "Honestly..."
 * - "This could explain why..."
 */

function cleanText(text = ""): string {
  return text
    .replace(/\*\*/g, "")
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function firstItem(items: string[] = [], fallback = ""): string {
  return cleanText(items[0] || fallback);
}

function secondItem(items: string[] = [], fallback = ""): string {
  return cleanText(items[1] || fallback);
}

function thirdItem(items: string[] = [], fallback = ""): string {
  return cleanText(items[2] || fallback);
}

export function generatePlacementSynthesis(
  planetId: string,
  signId: string,
  houseNumber: number,
  userName = "you"
): PlacementSynthesis {
  const planet =
    PLANETS_DATA.find((p) => p.id === planetId) || PLANETS_DATA[0];

  const sign =
    ZODIAC_SIGNS_DATA.find((s) => s.id === signId) ||
    ZODIAC_SIGNS_DATA[0];

  const house =
    HOUSES_DATA.find((h) => h.number === houseNumber) ||
    HOUSES_DATA[0];

  const planetName = cleanText(planet.name);
  const signName = cleanText(sign.name);
  const houseName = cleanText(house.name);

  const planetKeyword1 = cleanText(planet.keywords?.[0] || "drive");
  const planetKeyword2 = cleanText(planet.keywords?.[1] || "expression");

  const signKeyword1 = cleanText(sign.keywords?.[0] || "independence");
  const signKeyword2 = cleanText(sign.keywords?.[1] || "confidence");

  const houseArea1 = cleanText(
    house.lifeAreas?.[0] || "an important part of your life"
  );

  const houseArea2 = cleanText(
    house.lifeAreas?.[1] || "your everyday experiences"
  );

  const houseKeyword1 = cleanText(
    house.keywords?.[0] || "personal experiences"
  );

  const planetPositiveExpression = cleanText(
    planet.positiveExpression || `express yourself through ${planetKeyword1}`
  );

  const planetDifficultExpression = cleanText(
    planet.difficultExpression ||
      `become too focused on ${planetKeyword1}`
  );

  const signStrength = firstItem(
    sign.strengths,
    `your natural ${signKeyword1}`
  );

  const signChallenge = firstItem(
    sign.challenges,
    `getting caught up in ${signKeyword1}`
  );

  const planetLoveRole = cleanText(
    planet.loveRole ||
      `You may take connection and attraction quite seriously.`
  );

  const planetEmotionalRole = cleanText(
    planet.emotionalRole ||
      `You may process your feelings through ${planetKeyword1}.`
  );

  const planetCareerRole = cleanText(
    planet.careerRole ||
      `You may want work that gives you room to use your natural strengths.`
  );

  const housePsychologicalMeaning = cleanText(
    house.psychologicalMeaning ||
      `This part of life can affect you more deeply than you usually show.`
  );

  const housePlanetsMeaning = cleanText(
    house.planetsInHouseMeaning ||
      `This can make ${houseArea1} more noticeable in your life.`
  );

  /*
   * ------------------------------------------------------------
   * 1. OPENING
   * ------------------------------------------------------------
   *
   * This replaces the old "Educational Framework" section.
   * The first sentence should feel like a personal observation.
   */

  const opening = `
Okay, this actually explains a lot, ${userName}.
You may naturally come across as someone who is ${signKeyword1.toLowerCase()} and ${signKeyword2.toLowerCase()}, especially when ${houseArea1.toLowerCase()} comes into the picture.
There is something quite noticeable about the way you handle ${planetKeyword1.toLowerCase()} — you probably have a very specific way of dealing with it, even if you have never really thought about why.
  `.trim();

  /*
   * ------------------------------------------------------------
   * 2. PERSONALITY
   * ------------------------------------------------------------
   */

  const personality = `
You are likely to express your ${planetKeyword1.toLowerCase()} in a ${signName.toLowerCase()} kind of way — more ${signKeyword1.toLowerCase()} than passive, and more ${signKeyword2.toLowerCase()} than you may realise.
People can sometimes see this side of you before they properly know you.
You may especially notice it when you are dealing with ${houseArea1.toLowerCase()}, because that is where this part of your personality tends to become much more obvious.

The interesting part is that ${planetName} does not necessarily make you loud or obvious all the time.
It can simply make you very particular about how you handle ${planetKeyword1.toLowerCase()} and ${planetKeyword2.toLowerCase()}.
  `.trim();

  /*
   * ------------------------------------------------------------
   * 3. EMOTIONAL PATTERN
   * ------------------------------------------------------------
   */

  const emotionalPattern = `
Emotionally, ${planetEmotionalRole.toLowerCase()}
You may not always react immediately.
Sometimes you might first observe what is happening, replay it in your head, and only later realise how much it actually affected you.

${housePsychologicalMeaning}

This can also explain why ${houseArea2.toLowerCase()} may influence your mood more than other people realise.
When this part of life feels settled, you may feel much more like yourself.
When it feels uncertain, you may become noticeably more ${signKeyword1.toLowerCase()} or withdrawn.
  `.trim();

  /*
   * ------------------------------------------------------------
   * 4. LOVE / RELATIONSHIP PATTERN
   * ------------------------------------------------------------
   *
   * This section intentionally speaks directly about situations
   * users commonly care about.
   */

  const lovePattern = `
If there is someone on your mind right now, this is probably where you will notice this pattern the most.

${planetLoveRole}

You may want clarity, but that does not necessarily mean you want to chase someone for it.
If the other person becomes inconsistent, distant, confusing, or difficult to read, you may start paying very close attention to every little change.

You could end up doing that thing where you tell yourself you are not bothered...
while quietly noticing absolutely everything.

And once you feel like you have given enough chances, your ${signKeyword1.toLowerCase()} side may suddenly take over and make you think,
"Okay, if you want distance, I can give you distance too."

The tricky part is that you may still care even after you have decided to step back.
  `.trim();

  /*
   * ------------------------------------------------------------
   * 5. REAL LIFE EXPRESSION
   * ------------------------------------------------------------
   */

  const realLifeExpression = `
In everyday life, this can show up through ${houseArea1.toLowerCase()} and ${houseArea2.toLowerCase()}.

${housePlanetsMeaning}

You may notice that you naturally ${planetPositiveExpression.toLowerCase()} when you feel comfortable and confident.
There can be a strong "I'll handle it myself" quality here, especially when you feel that depending on someone else could make things more complicated.

In work or practical situations, ${planetCareerRole.toLowerCase()}
  `.trim();

  /*
   * ------------------------------------------------------------
   * 6. SHADOW SIDE
   * ------------------------------------------------------------
   */

  const shadowSide = `
The less comfortable side of this can appear when you are stressed or emotionally unsure.

You may ${planetDifficultExpression.toLowerCase()}.
At the same time, you may become more protective of your ${signKeyword1.toLowerCase()} and less willing to explain yourself.

One thing to watch is ${signChallenge.toLowerCase()}.

You might sometimes pull away before the other person has even realised there was a problem.
Or you may convince yourself that you do not care because admitting that you care would make you feel too exposed.

That does not mean you are cold.
It usually means you do not like feeling emotionally powerless.
  `.trim();

  /*
   * ------------------------------------------------------------
   * 7. CURRENT ENERGY
   * ------------------------------------------------------------
   *
   * This is deliberately written as a possibility rather than
   * making absolute predictions.
   */

  const currentEnergy = `
Right now, this combination can feel like a push-and-pull between wanting ${planetKeyword1.toLowerCase()} and wanting to protect your ${signKeyword1.toLowerCase()}.

You may be at a point where you are asking yourself:

"Do I actually want this, or do I just want clarity?"

That question can become especially strong around ${houseArea1.toLowerCase()}.

If there is a person, decision, or situation you keep returning to mentally, there is probably something about it that has not fully settled for you yet.

You do not necessarily need to force an answer immediately.
Sometimes the clearest answer comes after you stop trying to get one from someone else.
  `.trim();

  /*
   * ------------------------------------------------------------
   * 8. ADVICE
   * ------------------------------------------------------------
   */

  const advice = `
Your biggest strength here is ${signStrength.toLowerCase()}.

Use that without letting it turn into emotional self-protection.

You do not need to chase people.
You also do not need to disappear just to prove that you can live without them.

The healthier middle ground is being honest about what you want, noticing what the other person is actually giving you, and then deciding from there.

Most importantly, do not confuse being independent with having to handle every feeling by yourself.
  `.trim();

  /*
   * ------------------------------------------------------------
   * 9. STRENGTHS
   * ------------------------------------------------------------
   */

  const strengths = [
    `${capitalizeFirst(signStrength)} when dealing with ${houseArea1.toLowerCase()}.`,

    `A natural instinct for ${planetKeyword1.toLowerCase()} and ${planetKeyword2.toLowerCase()}.`,

    `You can ${planetPositiveExpression.toLowerCase()} when you trust yourself.`,

    `You tend to become more capable when you are given real responsibility instead of being micromanaged.`,

    `Strong potential to turn difficult experiences into practical self-understanding.`,
  ];

  /*
   * ------------------------------------------------------------
   * 10. CHALLENGES
   * ------------------------------------------------------------
   */

  const challenges = [
    `You may ${signChallenge.toLowerCase()} when you feel emotionally pressured.`,

    `You can become overly focused on ${planetKeyword1.toLowerCase()} when you are uncertain.`,

    `You may pull back instead of explaining what actually bothered you.`,

    `There can be tension between wanting ${signKeyword1.toLowerCase()} and still wanting emotional reassurance.`,

    `You may expect yourself to already know what you want before giving yourself enough time to figure it out.`,
  ];

  /*
   * ------------------------------------------------------------
   * 11. CONVERSATION STARTERS
   * ------------------------------------------------------------
   *
   * These can be used as clickable UI prompts.
   */

  const conversationStarters = [
    `What does this say about my love life right now?`,

    `Is there someone on my mind for a reason?`,

    `Why do I keep overthinking this person?`,

    `What kind of person am I actually attracted to?`,

    `Am I better off waiting or making the first move?`,

    `Why do I pull away when I start caring?`,

    `What is this trying to teach me about myself?`,
  ];

  return {
    planetId,
    signId,
    houseNumber,

    opening,
    personality,
    emotionalPattern,
    lovePattern,
    realLifeExpression,
    shadowSide,
    currentEnergy,
    advice,

    strengths,
    challenges,
    conversationStarters,
  };
}

function capitalizeFirst(value: string): string {
  if (!value) return value;

  return value.charAt(0).toUpperCase() + value.slice(1);
}