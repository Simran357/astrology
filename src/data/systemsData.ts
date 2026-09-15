export interface AstrologySystemInfo {
  id: string;
  name: string;
  origin: string;
  zodiacType: string;
  corePhilosophy: string;
  keyConcepts: { title: string; description: string }[];
  distinctiveFeatures: string[];
  howItCompares: string;
}

export const ASTROLOGY_SYSTEMS_DATA: AstrologySystemInfo[] = [
  {
    id: "western",

    name: "Western Astrology",

    origin:
      "Developed through ancient Mesopotamian, Hellenistic Greek, and later European astrological traditions.",

    zodiacType:
      "Tropical Zodiac — based on the seasonal cycle and the relationship between the Earth and the Sun.",

    corePhilosophy:
      "Western astrology is often used as a way to explore personality, behaviour, emotional patterns, relationships, and personal development. It focuses heavily on how different parts of a birth chart work together rather than treating one sign as a complete description of a person.",

    keyConcepts: [
      {
        title: "The Tropical Zodiac",

        description:
          "The zodiac is aligned with the seasonal cycle, beginning with Aries at the Northern Hemisphere's spring equinox. Because it is season-based, its signs do not directly correspond to the current astronomical constellations.",
      },

      {
        title: "The 12 Houses",

        description:
          "The houses divide a chart into different areas of life, such as identity, money, communication, home, relationships, work, friendships, and long-term goals. Different house systems, including Placidus and Whole Sign, can be used.",
      },

      {
        title: "Planetary Aspects",

        description:
          "Aspects describe the angles between planets in a chart. They are commonly used to explore how different parts of a person's personality may work together, support each other, or create internal tension.",
      },

      {
        title: "Personality & Psychological Patterns",

        description:
          "Modern Western astrology is often interpreted through personality and behavioural patterns. Different chart factors can be combined to explore how someone thinks, feels, communicates, handles relationships, and approaches challenges.",
      },
    ],

    distinctiveFeatures: [
      "Strong emphasis on personality, behaviour, self-awareness, and personal development",

      "Uses the Sun, Moon, Ascendant, planets, houses, and aspects together rather than relying only on the Sun sign",

      "Commonly includes the outer planets Uranus, Neptune, and Pluto",

      "Offers multiple house systems, with Placidus and Whole Sign among the commonly used approaches",

      "Often combines individual chart factors into a broader personality interpretation",
    ],

    howItCompares:
      "Western astrology generally places more emphasis on personality and psychological interpretation. Compared with Vedic astrology, it uses the tropical zodiac rather than a sidereal zodiac. Compared with Chinese astrology, it works primarily with zodiac signs, planets, houses, and their relationships rather than the Five Elements and animal-year cycle.",
  },

  {
    id: "vedic",

    name: "Vedic Astrology (Jyotish)",

    origin:
      "A traditional Indian astrological system with roots in ancient Indian texts and a long history of development within Jyotish traditions.",

    zodiacType:
      "Sidereal Zodiac — based on the relationship between the zodiac and the astronomical star background.",

    corePhilosophy:
      "Jyotish traditionally focuses on understanding life patterns, timing, responsibilities, relationships, and personal development through planetary positions and specialised chart techniques. It places particular importance on timing systems and the relationship between different areas of life.",

    keyConcepts: [
      {
        title: "The Sidereal Zodiac",

        description:
          "Vedic astrology generally uses a sidereal zodiac, which takes the astronomical position of the zodiac relative to the stars into account. This means a person's sign can differ from the sign they would receive in a tropical system.",
      },

      {
        title: "The 27 Nakshatras",

        description:
          "The zodiac is divided into 27 lunar sections called Nakshatras. They provide additional detail, particularly when interpreting the Moon and other chart factors.",
      },

      {
        title: "Dasha Periods",

        description:
          "Dashas are timing systems used to divide life into periods associated with different planetary influences. Vimshottari Dasha is one of the most widely used systems and follows a 120-year sequence.",
      },

      {
        title: "Rahu & Ketu",

        description:
          "The lunar nodes are called Rahu and Ketu and receive significant attention in Jyotish. They are commonly interpreted when looking at areas involving desire, attachment, change, and letting go.",
      },
    ],

    distinctiveFeatures: [
      "Uses a sidereal zodiac rather than the tropical zodiac commonly used in Western astrology",

      "Places strong emphasis on the Moon sign and Ascendant (Lagna)",

      "Uses Nakshatras for additional detail, especially around the Moon",

      "Includes specialised timing systems such as Dashas",

      "Uses divisional charts (Vargas) for more detailed analysis of particular life areas",

      "Traditional practitioners may also use remedies such as mantras, charitable actions, or gemstones",
    ],

    howItCompares:
      "Vedic astrology generally places more emphasis on sidereal calculations, lunar patterns, detailed chart techniques, and timing systems. Compared with Western astrology, the zodiac calculation can produce different sign placements. Compared with Chinese astrology, it works primarily through planets, signs, houses, lunar divisions, and planetary timing rather than the Five Elements and animal cycle.",
  },

  {
    id: "chinese",

    name: "Chinese Astrology (BaZi & Shengxiao)",

    origin:
      "Developed through ancient Chinese philosophical, calendrical, and astrological traditions, with strong connections to ideas found in Taoist thought and the I Ching.",

    zodiacType:
      "Lunisolar and sexagenary cycles using the 12 animals, Five Elements, Yin-Yang principles, and seasonal timing.",

    corePhilosophy:
      "Chinese astrology focuses heavily on cycles, balance, timing, and the interaction between the Five Elements. Rather than describing personality through planetary positions, systems such as BaZi examine combinations of time, elements, Yin-Yang qualities, and the 12 Earthly Branches.",

    keyConcepts: [
      {
        title: "The 12 Animal Signs",

        description:
          "The familiar Chinese zodiac uses 12 animals: Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, and Pig. The animal cycle repeats every 12 years, with additional factors creating a larger cycle.",
      },

      {
        title: "The Five Elements",

        description:
          "Wood, Fire, Earth, Metal, and Water are used to describe different qualities and interactions. The element associated with a chart factor can change how its animal or branch is interpreted.",
      },

      {
        title: "Yin & Yang",

        description:
          "Yin and Yang describe complementary qualities such as receptive and active, inward and outward, or quiet and expressive. They are used alongside the Five Elements when analysing a chart.",
      },

      {
        title: "Four Pillars of BaZi",

        description:
          "BaZi uses four pillars based on the year, month, day, and hour of birth. Each pillar contains a Heavenly Stem and Earthly Branch, creating a detailed combination that can be analysed for personality, relationships, work, timing, and life patterns.",
      },
    ],

    distinctiveFeatures: [
      "Uses the 12-animal cycle together with the Five Elements and Yin-Yang",

      "BaZi uses the year, month, day, and hour of birth rather than planetary positions",

      "Strong focus on elemental balance and interactions",

      "Uses seasonal timing as an important part of interpretation",

      "Can be used to examine personality, relationships, work patterns, and longer-term cycles",
    ],

    howItCompares:
      "Chinese astrology differs significantly from Western and Vedic astrology because it does not primarily interpret a person's life through planetary positions. Instead, systems such as BaZi focus on birth-time cycles, the Five Elements, Yin-Yang, and the interaction between the Four Pillars.",
  },
];