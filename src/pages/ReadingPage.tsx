import { useState } from "react";
import {
  SunSymbol,
  MoonSymbol,
  MarsSymbol,
  VenusSymbol,
  SaturnSymbol,
  ZodiacIcon,
} from "../components/icons/CelestialIcons";
import { useApp } from "../context/AppContext";

interface ReadingPageProps {
  onNavigate: (page: string) => void;
}

interface SectionInterpretation {
  id: string;
  label: string;
  planetName: string;
  sign: string;
  house: number;
  icon: React.ReactNode;
  accent: string;
  headline: string;
  highlight: string;
  celestialMechanism: string;
  pastRoots: string;
  presentLoveAndFriendship: string;
  emotionalAngerAndBlindspot: string;
  futureShiftAndThinking: string;
  consultationPrompt: string;
}

export default function ReadingPage({ onNavigate }: ReadingPageProps) {
  const { user, liveTransits, isMembershipActive, toggleMembership } = useApp();
  const [activeSection, setActiveSection] = useState("emotional");

  const sunP = user.placements.find((p) => p.planet === "Sun") || user.placements[0] || { sign: user.sunSign, house: 10 };
  const moonP = user.placements.find((p) => p.planet === "Moon") || user.placements[1] || { sign: user.moonSign, house: 6 };
  const venusP = user.placements.find((p) => p.planet === "Venus") || user.placements[3] || { sign: "Cancer", house: 9 };
  const marsP = user.placements.find((p) => p.planet === "Mars") || user.placements[4] || { sign: "Aries", house: 1 };
  const saturnP = user.placements.find((p) => p.planet === "Saturn") || user.placements[6] || { sign: "Capricorn", house: 12 };

  // Dynamic Generator for in-depth psychological interpretations
  const buildSectionData = (): SectionInterpretation[] => {
    return [
      {
        id: "core",
        label: "Core Energy",
        planetName: "Sun",
        sign: sunP.sign,
        house: sunP.house,
        icon: <SunSymbol size={18} className="text-[#f0c870]" />,
        accent: "#f0c870",
        headline: `Your ${sunP.sign} Sun in the ${sunP.house}th House: The Sovereign Fire & Creative Authorship`,
        highlight: `With your Sun in ${sunP.sign}, suppressing your authentic truth is what actually makes you exhausted.`,
        celestialMechanism: `Your Sun in ${sunP.sign} located in the ${sunP.house}th House is the primary solar furnace of your consciousness. The ${sunP.house}th House represents where you are demanded to take sovereign ownership of your life rather than simply complying with expectations. When your ${sunP.sign} fire is allowed to burn without social censorship, you exude a natural gravitational authority that attracts genuine respect. However, when forced to perform or compromise your core dignity, your entire vital energy begins to drain.`,
        pastRoots: `In your earlier years and childhood conditioning, you often felt that praise was tied to performance rather than pure existence. You learned that to be safe or respected, you had to be the capable one, the one who didn't cause trouble, or the one who solved problems before anyone noticed. This forged an unconscious belief that if you let down your guard or showed weakness, you would lose your standing or be abandoned.`,
        presentLoveAndFriendship: `Today, in romantic relationships and friendships, this manifests as an oscillation between intense warmth and sudden protective detachment. In love, you want a partner who admires your intellect and strength, but you secretly test them to see if they can hold space for your fatigue when you stop performing. In friendships, you are often the reliable pillar whom everyone comes to for guidance, yet you rarely reveal when you feel empty or unsupported.`,
        emotionalAngerAndBlindspot: `Your subconscious blind spot is over-functioning: you take control of situations not out of arrogance, but out of anxiety that if you don't orchestrate things, they will crumble. When feeling unseen or disrespected, your anger doesn't always erupt loudly; instead, it curdles into cold silence, quiet withdrawal of affection, or feeling like nobody understands the weight you carry.`,
        futureShiftAndThinking: `As your thinking pattern matures, you will stop confusing exhaustion with nobility. The coming planetary cycles are pushing you to stop auditioning for belonging. You will discover that your true power doesn't come from being invulnerable or flawless, but from declaring what you will no longer tolerate. Your future thinking will shift from 'How do I fix this for everyone?' to 'What aligns with my sovereign peace?'`,
        consultationPrompt: `Explain my Sun in ${sunP.sign} in the ${sunP.house}th House: Where am I still suppressing my true authority to keep others comfortable, what subconscious blind spots am I ignoring in my relationships, and how will my thinking pattern evolve in the coming year?`,
      },
      {
        id: "emotional",
        label: "Emotional Patterns",
        planetName: "Moon",
        sign: moonP.sign,
        house: moonP.house,
        icon: <MoonSymbol size={18} className="text-[#bfb7aa]" />,
        accent: "#bfb7aa",
        headline: `Your ${moonP.sign} Moon in the ${moonP.house}th House: Somatic Nervous System, Anger & Sanctuary`,
        highlight: `Your ${moonP.sign} Moon in the ${moonP.house}th House treats emotions like urgent emergencies—learning to pause is your greatest medicine.`,
        celestialMechanism: `Your Moon represents your visceral subconscious, your nervous system, and your private definition of safety. Placed in ${moonP.sign} inside the ${moonP.house}th House, there is an intense friction between raw instinct and daily duty. ${moonP.sign === "Aries" ? "Aries is a cardinal fire sign ruled by Mars: your emotional tempo is swift, hot, and fiercely protective. Anger or frustration flares instantaneously when you feel cornered, disrespected, or slowed down." : `The ${moonP.sign} nature gives your feelings a profound depth, but placing it in the ${moonP.house}th House causes your emotional weather to manifest directly in your somatic body.`} In the ${moonP.house}th House—the ancient realm of bodily health, daily labor, and the nervous system—you tend to treat your emotional pain as a 'task' or a 'defect' that must be solved immediately rather than felt.`,
        pastRoots: `How did this emotional pattern form? In your past and early home life, vulnerability was rarely rewarded with patient softness. You quickly learned that crying or displaying helplessness either made other people anxious, invited unsolicited criticism, or left you exposed to emotional hurt. Consequently, your nervous system built a rapid-response defense: stay busy, fix the problem yourself, swallow the ache, or erupt in sharp self-defense before anyone can pierce your heart.`,
        presentLoveAndFriendship: `What you experience today: In relationships and love, you carry a fierce soft corner for those who have seen your true self, yet you are terrified of becoming emotionally dependent. If you feel misunderstood or criticized, your reflex is to snap in sudden anger or abruptly lean back behind an impenetrable wall of silence. In friendships, you are loyal to the bone, but you secretly feel that no one checks on your heart with the same tenderness you offer others. When you feel lonely, you clean, work, or obsessively overthink rather than reaching out.`,
        emotionalAngerAndBlindspot: `What you are not noticing: Your body is absorbing what your pride refuses to speak. When you swallow irritation, it translates into physical somatic symptoms—tightness in the jaw, digestive knots, tension in the shoulders, and restless insomnia. Your subconscious blindspot is assuming that because you understand why people hurt you, you are obligated to forgive them immediately. You hold onto guilt for having normal human anger.`,
        futureShiftAndThinking: `How your thinking pattern will evolve ahead: You are stepping out of the cycle of chronic emergency. You will realize that having a soft corner does not require leaving your front door unlocked for those who repeatedly hurt you. Ahead, your mind will learn to de-escalate the panic: anger will transform from an explosive reactive defense into a clear, quiet, unbreakable boundary. You will discover the somatic peace of saying 'I don't have to fix this today.'`,
        consultationPrompt: `Deep Natal Inquiry: My Moon is in ${moonP.sign} in the ${moonP.house}th House. Why do I experience visceral emotional overwhelm and sudden anger or shutdown? What unconscious childhood conditioning drives this, why do I feel lonely in friendships, and what future shifts are coming in my emotional thinking pattern?`,
      },
      {
        id: "relationships",
        label: "Relationships & Love",
        planetName: "Venus",
        sign: venusP.sign,
        house: venusP.house,
        icon: <VenusSymbol size={18} className="text-[#f4acb7]" />,
        accent: "#f4acb7",
        headline: `Venus in ${venusP.sign} in the ${venusP.house}th House: The Architecture of Devotion & Betrayal Boundaries`,
        highlight: `You don't fall in love with words; you fall in love with emotional safety and private consistency.`,
        celestialMechanism: `Venus governs your romantic blueprint, your aesthetic values, and the exact terms under which you permit intimacy. In ${venusP.sign} inside your ${venusP.house}th House, shallow charm or casual small talk repels you. You crave relationships that possess intellectual weight, emotional depth, and unshakeable mutual respect. For you, love is a sacred territory where two sovereign lives choose to witness one another without coercion.`,
        pastRoots: `Your past relationship history is marked by deep investments in potential. You often saw who people *could* be, fell in love with their wounded brilliance, and took on the unspoken role of their emotional sanctuary. When they failed to meet you with equal devotion or betrayed your trust, the heartbreak cut directly into your sense of justice. Even now, you may still hold an unexamined soft corner for someone from your past, not because you want them back, but because your heart refuses to deny what was real.`,
        presentLoveAndFriendship: `Today, your relational radar is hyper-vigilant. In romance, you test consistency: you notice if their actions match their promises, and the moment you sense duplicity, you withdraw your warmth before you can be wounded again. In friendships, you curate a very small inner circle; you have zero patience for gossip or fair-weather acquaintances. However, your fear of betrayal sometimes keeps you from experiencing the effortless, messy affection you secretly crave.`,
        emotionalAngerAndBlindspot: `Your relational blindspot is the tendency to silently build a dossier of micro-disappointments without speaking up, until one minor incident triggers complete emotional disconnection. You expect partners to intuitively read your quiet needs because you read theirs so effortlessly. When they fail, you feel profoundly misunderstood and alone.`,
        futureShiftAndThinking: `Your romantic trajectory is shifting from rescue missions to reciprocal partnership. Upcoming celestial shifts are dismantling your pattern of auditioning for affection. You will learn to state your needs plainly without guilt or fear of driving the other person away. Your future love life will be characterized by ease, shared laughter, and a partner whose nervous system brings yours into calm stillness.`,
        consultationPrompt: `Inquire on Venus in ${venusP.sign} in House ${venusP.house}: Why do I still hold a soft corner for past betrayal, why do I test partners before opening up, and what is the cosmic timing of my true reciprocal relationship?`,
      },
      {
        id: "career",
        label: "Career & Momentum",
        planetName: "Mars",
        sign: marsP.sign,
        house: marsP.house,
        icon: <MarsSymbol size={18} className="text-[#e07070]" />,
        accent: "#e07070",
        headline: `Mars in ${marsP.sign} in the ${marsP.house}th House: Sovereign Will, Ambition & The Courage to Execute`,
        highlight: `You work best from deep conviction—meaningless obligation drains your life force faster than hard work.`,
        celestialMechanism: `Mars represents your drive, your ambition, your stamina, and how you assert yourself in the material world. In ${marsP.sign} in the ${marsP.house}th House, you possess an exceptional engine for execution when a project resonates with your personal standards. You detest being micromanaged by people whose competence you do not respect. You are meant to build, innovate, and lead with distinct personal agency.`,
        pastRoots: `Earlier in your career or education, you frequently encountered authority figures whose rigid rules felt arbitrary and suffocating. You may have experienced periods where your ambition was stifled, causing you to doubt whether your bold ideas were realistic. Out of survival, you learned to play it safe, masking your true velocity to avoid triggering other people's insecurities.`,
        presentLoveAndFriendship: `In your current professional life, this creates an underlying tension: you feel a persistent restlessness, knowing you are operating far below your true ceiling. Routine tasks and repetitive bureaucracy induce deep cognitive fatigue. In collaborative settings and workplace friendships, you end up doing the work of three people because relying on others often results in disappointing compromises.`,
        emotionalAngerAndBlindspot: `Your blind spot is burnout disguised as self-reliance. You tell yourself 'It's faster if I just do it myself,' which creates quiet resentment toward colleagues and collaborators. When work stalls, your frustration turns inward as anxiety or irritability, rather than using your anger strategically to renegotiate your role.`,
        futureShiftAndThinking: `A major professional shift is brewing. As you align your Mars drive with disciplined boundaries, you will step out of executor mode into strategic visionary mode. You will stop asking for permission to lead. The thinking pattern shift ahead will see you taking calculated entrepreneurial risks, saying 'No' to mediocre compromises, and stepping into the public recognition your craftsmanship deserves.`,
        consultationPrompt: `Inquire on Mars in ${marsP.sign} in House ${marsP.house}: What is blocking my career breakthrough, where am I settling for safe mediocrity, and how do I channel my drive into sovereign financial and creative success?`,
      },
      {
        id: "challenges",
        label: "Karmic Challenges",
        planetName: "Saturn",
        sign: saturnP.sign,
        house: saturnP.house,
        icon: <SaturnSymbol size={18} className="text-[#8aabcc]" />,
        accent: "#8aabcc",
        headline: `Saturn in ${saturnP.sign} in the ${saturnP.house}th House: The Crucible of Self-Trust & Enduring Mastery`,
        highlight: `What feels like your heaviest burden in youth becomes your greatest, unshakeable superpower in maturity.`,
        celestialMechanism: `Saturn is the cosmic taskmaster, representing the area of your life where you face recurring feelings of deficit, heavy responsibility, and severe self-criticism. In ${saturnP.sign} inside the ${saturnP.house}th House, Saturn tests your endurance. It demands that you build self-worth from internal integrity rather than external applause. There are no shortcuts here—only patient, quiet craftsmanship that outlasts the noise of the world.`,
        pastRoots: `From a young age, Saturn placed an invisible weight on your shoulders. You felt an unspoken expectation to be mature, responsible, and self-contained long before your peers. You may have experienced moments of feeling fundamentally defective or fearing that if you made a single mistake, everything you built would unravel. This bred a chronic habit of self-editing and hesitation.`,
        presentLoveAndFriendship: `Presently, this Saturn placement manifests as an inner judge that rarely celebrates your victories. When you achieve something significant, you dismiss it as 'just what was expected' and immediately worry about the next obstacle. In relationships, it makes you fear being a burden, causing you to suffer in complete silence rather than asking for help.`,
        emotionalAngerAndBlindspot: `The subconscious trap is perfectionism as a shield against criticism. You delay launching projects, expressing love, or making major changes until conditions are '100% flawless,' which is simply fear disguised as prudence. You hold yourself to standards that you would consider cruel if imposed on someone else.`,
        futureShiftAndThinking: `The beautiful promise of Saturn is that its gifts are permanent. As you move through your current cycles, this heavy self-criticism is softening into profound, quiet self-trust. You will stop fearing failure because you will realize that nothing can take away the resilience you have forged. Your future mindset will be grounded in steady peace: you will do your best without carrying the emotional weight of the entire universe.`,
        consultationPrompt: `Inquire on Saturn in ${saturnP.sign} in House ${saturnP.house}: What karmic test is currently reaching its resolution in my chart, how do I dismantle my chronic inner critic, and what enduring gift am I mastering?`,
      },
      {
        id: "current",
        label: "Current Sky & Shifts",
        planetName: "Transits",
        sign: liveTransits.moonPhase?.sign || "Active",
        house: 1,
        icon: <ZodiacIcon sign="aquarius" size={18} className="text-[#ee5d34]" />,
        accent: "#ee5d34",
        headline: `The Current Celestial Sky: Active Transits & Retrogrades Triggering Your Chart`,
        highlight: `The current planetary transits are spotlighting the exact boundary between holding on and letting go.`,
        celestialMechanism: `Astrology is never static: the planets in the sky right now are constantly forming dynamic angles to your birth coordinates. Today, with the Moon in ${liveTransits.moonPhase?.sign || "the sky"} (${liveTransits.moonPhase?.phaseName || "Active Phase"}) and ${(liveTransits.retrogrades || []).length} retrogrades (${(liveTransits.retrogrades || []).join(", ") || "Direct Motion"}), the sky is exerting a clarifying gravitational pull on your emotional and relational axes.`,
        pastRoots: `The emotional friction you have experienced over the last few weeks is not a setback; it is the reactivation of old, unresolved threshold questions from earlier in your life. The sky is asking you to observe how your past instinct to shut down or take blame is no longer working in your present reality.`,
        presentLoveAndFriendship: `Right now, in your daily life, love, and friendships, you are feeling a heightened intolerance for pretense. Conversations that lack genuine substance feel draining. You may find yourself naturally stepping back from one-sided dynamics where you do all the emotional outreach. Trust this instinct—it is your chart clearing space for aligned kinship.`,
        emotionalAngerAndBlindspot: `Beware of projecting internal pressure onto those around you. With retrogrades active, communications can easily be misinterpreted through the lens of past betrayals. If an old wound surfaces, do not assume history is repeating itself; recognize that your soul is finally strong enough to process and release it permanently.`,
        futureShiftAndThinking: `The threshold ahead: Over the coming lunar and planetary shifts, a window of decisive clarity will open. You will feel an unmistakable surge of resolve to close chapters that have been lingering in ambiguity. Your thinking pattern is stabilizing into sovereign certainty.`,
        consultationPrompt: `Inquire on Current Transits: How are today's active planetary shifts and retrogrades affecting my natal Sun, Moon, and Rising right now, and what specific action should I take this week?`,
      },
    ];
  };

  const sections = buildSectionData();
  const current = sections.find((s) => s.id === activeSection) || sections[1]; // Default to Emotional Patterns

  const handleLaunchConsultation = (promptText: string) => {
    try {
      localStorage.setItem("astrofindings_pending_inquiry", promptText);
    } catch (e) {
      console.error(e);
    }
    onNavigate("askai");
  };

  return (
    <div className="min-h-screen bg-[#0e0a17] text-[#eee5d3] selection:bg-[#ee5d34] selection:text-[#0e0a17]">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 45% 60% at 80% 25%, rgba(50,25,110,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 border-b border-[rgba(238,93,52,0.15)] pb-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <p className="text-[11px] font-mono text-[#ee5d34] tracking-widest uppercase">
              ✦ Deep Psychological Chart Reading · Whole-Sign Ephemeris
            </p>
            <button
              onClick={() => onNavigate("chart")}
              className="text-xs font-mono text-[#bfb7aa] hover:text-[#eee5d3] cursor-pointer"
            >
              ← Inspect Planetary Wheel
            </button>
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-light text-[#eee5d3] mb-2 leading-tight">
            {user.name ? `${user.name}'s Soul Architecture` : "Your Deep Natal Reading"}
          </h1>
          <p className="text-xs sm:text-sm text-[#bfb7aa] max-w-2xl leading-relaxed">
            Sun in {user.sunSign} · Moon in {user.moonSign} · {user.risingSign} Rising. A comprehensive examination of your emotional patterns, early roots, love and friendships, unconscious blind spots, and future thinking shifts.
          </p>
        </div>

        {/* Free vs Paid Banner */}
        <div className="flex flex-wrap items-center justify-between p-3.5 border border-[rgba(238,93,52,0.2)] bg-[rgba(31,24,48,0.7)] rounded-sm mb-6 gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#ee5d34]">✦</span>
            <span className="text-xs font-mono text-[#bfb7aa]">
              {isMembershipActive
                ? "PREMIUM ACTIVE: All 6 Deep Psychological Chapters Unlocked"
                : "FREE TIER: Core Energy & Emotional Patterns Unlocked · Chapters 3–6 Require Access"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleMembership}
              className="text-xs font-mono px-2.5 py-1 bg-[rgba(238,93,52,0.15)] border border-[#ee5d34] text-[#eee5d3] hover:bg-[#ee5d34] hover:text-[#0e0a17] transition-all rounded-sm cursor-pointer"
            >
              {isMembershipActive ? "Switch to Free View" : "Simulate Premium Unlock ✦"}
            </button>
            <button
              onClick={() => onNavigate("askai")}
              className="text-xs text-[#ee5d34] font-mono hover:underline cursor-pointer"
            >
              Ask AI about your chart →
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Navigation sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-1.5 sticky top-8">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#bfb7aa] block mb-2 px-2">
                Reading Domains
              </span>

              {sections.map((section) => {
                const isSectionLocked = ["relationships", "career", "challenges", "current"].includes(section.id) && !isMembershipActive;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-sm text-left transition-all duration-200 cursor-pointer border ${
                      activeSection === section.id
                        ? "bg-[rgba(238,93,52,0.12)] border-[#ee5d34] text-[#eee5d3] shadow-md"
                        : "border-transparent text-[#bfb7aa] hover:text-[#eee5d3] hover:bg-[rgba(31,24,48,0.5)]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={activeSection === section.id ? "opacity-100" : "opacity-60"}>
                        {section.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-serif font-medium">{section.label}</span>
                          <span className={`text-[9px] font-mono px-1 rounded-sm ${
                            isSectionLocked
                              ? "bg-[rgba(238,93,52,0.2)] text-[#ee5d34]"
                              : "bg-[rgba(100,180,100,0.15)] text-[rgba(140,210,140,0.9)]"
                          }`}>
                            {isSectionLocked ? "PAID 🔒" : "FREE"}
                          </span>
                        </div>
                        <div className="text-[10px] font-mono text-[#bfb7aa]">
                          {section.planetName === "Transits" ? "Live Sky" : `${section.sign} · H${section.house}`}
                        </div>
                      </div>
                    </div>
                    {activeSection === section.id && (
                      <span className="text-xs text-[#ee5d34] font-mono">✦</span>
                    )}
                  </button>
                );
              })}

              <div className="h-px bg-[rgba(238,93,52,0.12)] my-4" />

              <button
                onClick={() => handleLaunchConsultation(current.consultationPrompt)}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-sm bg-[rgba(238,93,52,0.15)] border border-[#ee5d34] text-xs font-mono text-[#eee5d3] hover:bg-[#ee5d34] hover:text-[#0e0a17] transition-colors cursor-pointer text-center"
              >
                <span>Ask AstroFindings on this →</span>
              </button>
            </div>
          </div>

          {/* Reading Content */}
          <div className="lg:col-span-3 space-y-8">
            <div className="border border-[rgba(238,93,52,0.22)] bg-[radial-gradient(ellipse_at_top,rgba(31,24,48,0.9),rgba(14,10,23,0.95))] p-6 sm:p-8 rounded-sm shadow-xl space-y-8">
              {/* Header Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[rgba(238,93,52,0.12)] pb-4">
                <div className="flex items-center gap-2.5">
                  {current.icon}
                  <span
                    className="text-xs font-mono tracking-widest uppercase font-semibold"
                    style={{ color: current.accent }}
                  >
                    {current.label} · {current.planetName} in {current.sign} ({current.house}th House)
                  </span>
                </div>
                <button
                  onClick={() => handleLaunchConsultation(current.consultationPrompt)}
                  className="text-xs font-mono text-[#ee5d34] hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>✦ Inscribe to Ask AstroFindings</span>
                  <span>→</span>
                </button>
              </div>

              {/* Headline */}
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#eee5d3] leading-snug">
                {current.headline}
              </h2>

              {/* Highlight Insight Banner */}
              <div
                className="border-l-2 p-4 bg-[rgba(238,93,52,0.05)] rounded-r-sm"
                style={{ borderColor: current.accent }}
              >
                <p
                  className="font-serif italic text-base sm:text-lg font-light leading-relaxed"
                  style={{ color: current.accent }}
                >
                  “{current.highlight}”
                </p>
              </div>

              {/* 1. Celestial Mechanism */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#ee5d34]">
                  <span>01</span>
                  <span>✦ The Celestial Mechanism & Sign Architecture</span>
                </div>
                <p className="text-xs sm:text-sm text-[#eee5d3] leading-relaxed font-light font-serif">
                  {current.celestialMechanism}
                </p>
              </div>

              {/* Free vs Paid Gate for Chapters 02–05 */}
              {["relationships", "career", "challenges", "current"].includes(current.id) && !isMembershipActive ? (
                <div className="relative mt-8 pt-8 border-t border-[rgba(238,93,52,0.15)] min-h-[380px]">
                  {/* Blurred preview background */}
                  <div className="space-y-6 filter blur-[5px] select-none opacity-30 pointer-events-none">
                    <div className="space-y-2">
                      <span className="text-xs font-mono uppercase text-[#ee5d34]">02 ✦ Past Roots & Childhood Pattern</span>
                      <p className="text-xs text-[#bfb7aa] leading-relaxed font-serif">{current.pastRoots}</p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-xs font-mono uppercase text-[#ee5d34]">03 ✦ Present Reality in Love & Friendship</span>
                      <p className="text-xs text-[#bfb7aa] leading-relaxed font-serif">{current.presentLoveAndFriendship}</p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-xs font-mono uppercase text-[#ee5d34]">04 ✦ Somatic Anger & Subconscious Blindspots</span>
                      <p className="text-xs text-[#bfb7aa] leading-relaxed font-serif">{current.emotionalAngerAndBlindspot}</p>
                    </div>
                  </div>

                  {/* Floating Competitor-Style Paywall Box */}
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <div className="w-full max-w-xl border-2 border-dashed border-[#ee5d34] bg-[rgba(14,10,23,0.97)] p-6 md:p-8 rounded-sm text-center space-y-4 shadow-2xl backdrop-blur-md">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-[rgba(238,93,52,0.15)] border border-[#ee5d34] text-[10px] font-mono text-[#ee5d34] uppercase tracking-widest rounded-sm">
                        <span>🔒 PREMIUM CHAPTER · PAID DOSSIER REQUIRED</span>
                      </div>
                      <h3 className="font-serif text-2xl md:text-3xl text-[#eee5d3]">
                        Unlock The Complete {current.label} Synthesis
                      </h3>
                      <p className="text-xs text-[#bfb7aa] max-w-md mx-auto leading-relaxed">
                        Free tier covers your Core Energy and Emotional Foundation. This chapter reveals 
                        <strong> why you still hold a soft corner, what makes you suppress yourself, your subconscious blind spots</strong>, and how upcoming planetary shifts will reshape your thinking pattern.
                      </p>

                      <div className="grid grid-cols-2 gap-2 text-left pt-2 pb-1">
                        <div className="border border-[rgba(238,93,52,0.15)] bg-[rgba(31,24,48,0.7)] p-2.5 rounded-sm">
                          <span className="text-[10px] font-mono text-[#ee5d34] block">✦ Chapter 02–03</span>
                          <p className="text-[11px] text-[#eee5d3] font-medium">Past Roots & Love Dynamics</p>
                        </div>
                        <div className="border border-[rgba(238,93,52,0.15)] bg-[rgba(238,93,52,0.15)] bg-[rgba(31,24,48,0.7)] p-2.5 rounded-sm">
                          <span className="text-[10px] font-mono text-[#f0c870] block">✦ Chapter 04–05</span>
                          <p className="text-[11px] text-[#eee5d3] font-medium">Blind Spots & Breakthroughs</p>
                        </div>
                      </div>

                      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <button
                          onClick={toggleMembership}
                          className="w-full sm:w-auto py-3 px-6 bg-[#ee5d34] text-[#0e0a17] text-xs font-mono uppercase tracking-widest font-semibold hover:bg-[#f58a6b] transition-all rounded-sm cursor-pointer shadow-lg"
                        >
                          Unlock Full Reading ($19 / Full Access) →
                        </button>
                        <button
                          onClick={() => handleLaunchConsultation(current.consultationPrompt)}
                          className="text-xs font-mono text-[#bfb7aa] hover:text-[#eee5d3] cursor-pointer"
                        >
                          Ask AI on this placement →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* 2. Past Roots & Childhood Pattern */}
                  <div className="space-y-2 border-t border-[rgba(238,93,52,0.1)] pt-6">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#ee5d34]">
                      <span>02</span>
                      <span>✦ Past Roots: How This Defense Formed </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#bfb7aa] leading-relaxed font-light font-serif">
                      {current.pastRoots}
                    </p>
                  </div>

                  {/* 3. Present Love & Friendships */}
                  <div className="space-y-2 border-t border-[rgba(238,93,52,0.1)] pt-6">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#ee5d34]">
                      <span>03</span>
                      <span>✦ Present Reality: In Love, Friendships & Daily Life</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#bfb7aa] leading-relaxed font-light font-serif">
                      {current.presentLoveAndFriendship}
                    </p>
                  </div>

                  {/* 4. Emotional Anger & Subconscious Blindspots */}
                  <div className="space-y-2 border-t border-[rgba(238,93,52,0.1)] pt-6">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#ee5d34]">
                      <span>04</span>
                      <span>✦ Emotional Anger & Somatic Blindspots</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#bfb7aa] leading-relaxed font-light font-serif">
                      {current.emotionalAngerAndBlindspot}
                    </p>
                  </div>

                  {/* 5. Future Shift & Thinking Pattern Evolution */}
                  <div className="space-y-2 border-t border-[rgba(238,93,52,0.1)] pt-6">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#d4af37]">
                      <span>05</span>
                      <span>✦ Future Evolution: Upcoming Shifts & Thinking Pattern Transformation</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#eee5d3] leading-relaxed font-light font-serif">
                      {current.futureShiftAndThinking}
                    </p>
                  </div>
                </>
              )}

              {/* Bottom Consultation Banner */}
              <div className="p-5 border border-[#ee5d34] bg-[rgba(238,93,52,0.08)] rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#ee5d34] block">
                    ✦ Have Specific Questions On This Placement?
                  </span>
                  <p className="text-xs text-[#eee5d3] mt-0.5">
                    Consult Ask AstroFindings directly to examine real-time aspects, synastry, and deeper timing for {current.label}.
                  </p>
                </div>
                <button
                  onClick={() => handleLaunchConsultation(current.consultationPrompt)}
                  className="button-primary cursor-pointer text-xs py-2.5 px-5 whitespace-nowrap"
                >
                  Consult Ask AstroFindings →
                </button>
              </div>

              {/* Navigation Footer for Sections */}
              <div className="flex items-center justify-between pt-6 border-t border-[rgba(238,93,52,0.12)]">
                {sections.findIndex((s) => s.id === activeSection) > 0 ? (
                  <button
                    onClick={() => {
                      const idx = sections.findIndex((s) => s.id === activeSection);
                      setActiveSection(sections[idx - 1].id);
                    }}
                    className="text-xs font-mono text-[#bfb7aa] hover:text-[#eee5d3] cursor-pointer"
                  >
                    ← Previous: {sections[sections.findIndex((s) => s.id === activeSection) - 1].label}
                  </button>
                ) : <div />}

                {sections.findIndex((s) => s.id === activeSection) < sections.length - 1 && (
                  <button
                    onClick={() => {
                      const idx = sections.findIndex((s) => s.id === activeSection);
                      setActiveSection(sections[idx + 1].id);
                    }}
                    className="text-xs font-mono text-[#ee5d34] hover:underline cursor-pointer"
                  >
                    Next: {sections[sections.findIndex((s) => s.id === activeSection) + 1].label} →
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
