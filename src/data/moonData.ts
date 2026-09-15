export interface MoonPhaseDetail {
  id: string;
  name: string;
  fraction: string;
  illumination: string;
  theme: string;
  psychologicalMeaning: string;
  actionGuidance: string;
  ritualPractice: string;
  personalImpactPrompt: string;
}

export const MOON_PHASES_DATA: MoonPhaseDetail[] = [
  {
    id: "newmoon",

    name: "New Moon",

    fraction: "0%",

    illumination: "0% — Dark Moon",

    theme: "A Fresh Start, Quiet Intentions & New Possibilities",

    psychologicalMeaning:
      "You may feel like something is changing, even if you cannot fully explain what it is yet. This can be a quieter phase where you naturally pull back, think about what you actually want, and start imagining what could come next. You do not need to have everything figured out right now.",

    actionGuidance:
      "Give yourself some quiet time. Think about what you genuinely want to change, start, or experience next instead of worrying about what everyone else expects from you.",

    ritualPractice:
      "Take 10 quiet minutes for yourself and write down three things you would genuinely like to bring into your life over the next few weeks. Keep them simple and personal.",

    personalImpactPrompt:
      "Is there something you have been quietly wanting to start, change, or try but have not said out loud yet?",
  },

  {
    id: "waxingcrescent",

    name: "Waxing Crescent",

    fraction: "1% - 49%",

    illumination: "25% — A Little More Clarity",

    theme: "Small Steps, Courage & Building Momentum",

    psychologicalMeaning:
      "You may be starting to feel a little more motivated after a period of uncertainty. You probably do not have the full picture yet, but there is enough of a feeling to know where you want to move next. The important thing here is not doing everything at once — it is finally doing something.",

    actionGuidance:
      "Pick one thing you have been putting off and take the smallest realistic step toward it. You do not need a perfect plan before you begin.",

    ritualPractice:
      "Write down three small things you can realistically finish this week. Choose one and do it before you start overthinking it.",

    personalImpactPrompt:
      "What is one thing you already know you want to move toward, even if you are still unsure how it will turn out?",
  },

  {
    id: "firstquarter",

    name: "First Quarter Moon",

    fraction: "50%",

    illumination: "50% — A Moment to Decide",

    theme: "Decisions, Resistance & Moving Forward",

    psychologicalMeaning:
      "This can be the point where reality starts testing the idea you had in your head. Something may feel harder than expected, someone may not be responding the way you hoped, or you may suddenly start questioning whether you should continue. That does not automatically mean you are on the wrong path. Sometimes you simply need to change how you are approaching it.",

    actionGuidance:
      "Look at what is actually getting in your way instead of immediately giving up. Decide what needs to change and make one practical adjustment.",

    ritualPractice:
      "Write down the biggest thing currently frustrating you. Under it, write one thing you can control and one thing you need to stop trying to control.",

    personalImpactPrompt:
      "What has recently made you question something you were previously sure about?",
  },

  {
    id: "waxinggibbous",

    name: "Waxing Gibbous",

    fraction: "51% - 99%",

    illumination: "75% — Almost There",

    theme: "Refinement, Patience & Getting Things Right",

    psychologicalMeaning:
      "You may be closer to something than you realize, but instead of feeling excited, you might be noticing every little thing that is still wrong. This is the kind of phase where perfectionism can sneak in. You have already made progress — now it is about improving what you have rather than constantly starting over.",

    actionGuidance:
      "Look at what is already working and improve that. Do not throw away your progress just because everything is not perfect yet.",

    ritualPractice:
      "Choose one area of your life or one project that matters to you. Spend some time making one thoughtful improvement instead of trying to fix everything.",

    personalImpactPrompt:
      "What are you being unnecessarily hard on yourself about right now?",
  },

  {
    id: "fullmoon",

    name: "Full Moon",

    fraction: "100%",

    illumination: "100% — Everything Feels More Obvious",

    theme: "Clarity, Emotions & Realizations",

    psychologicalMeaning:
      "Something may feel impossible to ignore right now. A feeling you have been pushing aside, a relationship that has been confusing you, or a decision you have been avoiding may suddenly seem much clearer. You might also feel more emotional than usual — not necessarily because something is wrong, but because it is harder to pretend you do not care.",

    actionGuidance:
      "Pay attention to what keeps coming back to your mind. Let yourself acknowledge what you actually feel before deciding what you want to do about it.",

    ritualPractice:
      "Write down one thing you have recently realized about yourself, another person, or your current situation. Then write what you want to do differently because of that realization.",

    personalImpactPrompt:
      "What has become harder to ignore lately — especially when it comes to your feelings or relationships?",
  },

  {
    id: "waninggibbous",

    name: "Waning Gibbous (Disseminating)",

    fraction: "99% - 51%",

    illumination: "75% — Understanding What Happened",

    theme: "Reflection, Gratitude & Making Sense of Things",

    psychologicalMeaning:
      "You may be looking back at something that recently happened and finally understanding it differently. Maybe you handled a situation better than you expected, learned something about someone, or realized that what you wanted a few weeks ago is not what you want anymore. This is less about chasing the next thing and more about understanding what the last chapter taught you.",

    actionGuidance:
      "Take a step back and look at what you have learned. Notice which people, habits, and choices actually helped you and which ones drained you.",

    ritualPractice:
      "Write down three things you are grateful for from the last few weeks and one lesson you do not want to repeat.",

    personalImpactPrompt:
      "Looking back, what situation has taught you more about yourself than you expected?",
  },

  {
    id: "lastquarter",

    name: "Last Quarter Moon",

    fraction: "50%",

    illumination: "50% — Time to Let Something Go",

    theme: "Release, Re-evaluation & Closing Loops",

    psychologicalMeaning:
      "You may be realizing that something you keep holding onto is no longer giving you what it used to. This could be a habit, expectation, friendship, relationship, old version of yourself, or simply the pressure to make something work when it clearly is not. Letting go does not always mean you stopped caring. Sometimes it means you finally stopped forcing it.",

    actionGuidance:
      "Look honestly at what has been taking more from you than it gives back. You do not have to make a dramatic decision — even creating some distance can be enough.",

    ritualPractice:
      "Clean one small physical or digital space while thinking about one thing you are ready to stop carrying emotionally.",

    personalImpactPrompt:
      "What are you still holding onto even though a part of you already knows it is time to move on?",
  },

  {
    id: "waningcrescent",

    name: "Waning Crescent (Balsamic)",

    fraction: "49% - 1%",

    illumination: "20% — Slow Down",

    theme: "Rest, Quiet, Reflection & Emotional Reset",

    psychologicalMeaning:
      "You may simply be tired — mentally, emotionally, or both. This is not necessarily the time to push yourself into making big decisions. You might notice yourself wanting less noise, fewer conversations, more sleep, or some distance from people who normally take up a lot of your attention. Give yourself permission to slow down without feeling guilty about it.",

    actionGuidance:
      "Rest more than usual if you can. Put unnecessary decisions on pause and give yourself some space to process what has happened before jumping into the next thing.",

    ritualPractice:
      "Put your phone away for a little while, take a warm shower or bath, listen to something calming, and let yourself have an evening where you do not need to accomplish anything.",

    personalImpactPrompt:
      "If you stopped trying to be productive for a moment, what do you think you would actually need right now?",
  },
];