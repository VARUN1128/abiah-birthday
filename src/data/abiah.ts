// ============================================================
//  ABIAH'S LITTLE WORLD — Personal Content File
//  Edit this file to personalise the birthday experience.
// ============================================================

export const abiah = {
  // ── Basic Info ────────────────────────────────────────────
  name: "Abiah",
  birthday: "October 14",   // Format: "Month Day"
  age: null,                 // Set to a number if you want to show it

  // ── Memories (Photo Gallery) ──────────────────────────────
  // Replace paths with real photos placed in /public/photos/
  memories: [
    {
      id: "m1",
      src: "/photos/memory_cafe.png",
      caption: "That one café we stayed in for 3 hours 🫶",
      memoryText:
        "Remember when we meant to grab a quick coffee and then accidentally closed the whole place down talking? That's one of my favourite afternoons.",
    },
    {
      id: "m2",
      src: "/photos/memory_cake.png",
      caption: "Birthday vibes (our tradition) 🎂",
      memoryText:
        "Every year, cake before noon. It's a rule. It's sacred. Don't you dare question it.",
    },
    {
      id: "m3",
      src: "/photos/memory_flowers.png",
      caption: "The market haul 🌸",
      memoryText:
        "You absolutely did NOT need twelve stems of dried pampas grass. You bought thirteen. I love you.",
    },
    {
      id: "m4",
      src: "/photos/memory_journal.png",
      caption: "Our journaling Sunday ✍️",
      memoryText:
        "We were supposed to journal for 20 minutes. Three hours later… you were still going. I'm still in awe of you.",
    },
    {
      id: "m5",
      src: "/photos/memory_sunset.png",
      caption: "That golden hour 🌅",
      memoryText:
        "We stood there for so long not saying anything — just watching it. That was one of the most peaceful moments of my year.",
    },
    {
      id: "m6",
      src: "/photos/memory_picnic.png",
      caption: "The Great Picnic Disaster 🧺",
      memoryText:
        "We forgot cups. And forks. And the blanket got attacked by ants. Still the best picnic I've ever had.",
    },
  ],

  // ── Wish Jar ──────────────────────────────────────────────
  wishes: [
    "May every morning greet you like a song you already love.",
    "You deserve every beautiful thing you've ever dreamed of, and more.",
    "I hope this year brings you so much joy it spills out everywhere.",
    "May you always know how deeply you are loved — especially today.",
    "Here's to adventures, late nights, terrible decisions, and the best memories.",
    "You make the world softer just by being in it. Happy birthday, Abiah.",
    "May your year be as wonderful as you are — and you are very, very wonderful.",
    "Wishing you all the things that make your heart feel full.",
    "The world is genuinely better with you in it. I'm so glad you were born.",
    "This year: more of what you love, less of what you don't. You've earned it.",
    "May this birthday be the start of your best chapter yet.",
    "You are such a gift to everyone lucky enough to know you.",
  ],

  // ── Hidden Surprises ──────────────────────────────────────
  hiddenMessages: [
    {
      id: "h1",
      label: "🍒",
      message: "Did you know cherries are your vibe? Little, bright, and always a bit extra. 🍒",
    },
    {
      id: "h2",
      label: "⭐",
      message: "You're the kind of person people remember forever. That's rare. That's you.",
    },
    {
      id: "h3",
      label: "🎀",
      message: "Fun fact: you tie bows on everything — metaphorically. You make every situation better.",
    },
    {
      id: "h4",
      label: "📎",
      message: "Okay, this one is just a paper clip. But you clicked it, which means you're curious AND thorough. I love that about you.",
    },
    {
      id: "h5",
      label: "🌸",
      message: "If kindness were a flower, it would look exactly like you. Soft, lovely, and growing.",
    },
  ],

  // ── Birthday Letter ───────────────────────────────────────
  letter: {
    salutation: "Dear Abiah,",
    body: [
      "I wanted to write you a real letter — not a text, not a voice note, a letter — because you deserve something that takes thought and time. And you deserve a lot of both.",
      "I don't think you always realise what it's like to be on the receiving end of your friendship. It is warm. It is steady. It is one of the best things in my life.",
      "You have this ability to make people feel genuinely seen. Not just heard — seen. Like you look at someone and understand a little more of them than they've said out loud. I don't know if you know you do it. But you do.",
      "This year, I hope you let yourself be looked after a little more. I hope you say yes to the things that light you up and no to the things that don't. I hope you have more of those long afternoons where time goes strange and nothing matters but the conversation.",
      "Thank you for being my friend. Thank you for making ordinary days feel like something worth keeping.",
      "Happy birthday. You are so, so loved.",
    ],
    closing: "With so much warmth,",
    signature: "Your Shalom",
  },

  // ── Music (optional) ─────────────────────────────────────
  music: {
    enabled: false,
    src: "/music/birthday.mp3",   // Place a licensed mp3 here
    label: "Play birthday song",
  },
};

export type Memory = (typeof abiah.memories)[number];
