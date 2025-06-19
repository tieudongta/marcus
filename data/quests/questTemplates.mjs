export const questPresets = [
  {
    id: "deliver_101",
    type: "deliver",
    name: "Urgent Delivery to the Capital",
    description: "Deliver this sealed scroll to officials in the capital.",
    reward: {
      gold: 150,
      xp: 100,
    },
    trigger: {
      conditions: [
        { type: "player_level", operator: ">", value: 0 },
        { type: "currentLocationType", value: "town" },
      ],
    },
    stages: [
      {
        name: "Receive Quest",
        description: "Receive the sealed scroll.",
        objectives: [
          { type: "item", item: "sealed_scroll" }
        ]
      },
      {
        name: "Execute Quest",
        description: "Travel to the capital.",
        objectives: [
          { type: "location", location: "Gor'mok" }
        ]
      },
      {
        name: "Deliver Quest",
        description: "Deliver the scroll to officials.",
        objectives: [
          { type: "time", deadlineHours: 48 }
        ]
      }
    ]
  }
  ,
  {
    id: "deliver_letter_1",
    type: "deliver",
    name: "Deliver a Letter to Location B",
    description: "Deliver this letter to Location B.",
    target: {
      location: "Location B",
      item: "letter_1",
      timeOffset: 48,
    },
    reward: {
      gold: 150,
      xp: 100,
    },
    trigger: {
      conditions: [
        { type: "player_level", operator: ">", value: 1 },
        { type: "currentLocation", value: "Location A" },
        { type: "has_completed", value: "deliver_101" },
      ],
    },
    stages: [
      { name: "Receive Quest", description: "Receive the letter." },
      { name: "Travel to Destination", description: "Go to Location B." },
      { name: "Deliver Package", description: "Hand over the letter." },
      { name: "Complete Quest", description: "Finalize the delivery." },
    ],
  },
  {
    id: "deliver",
    type: "deliver",
    name: "Delivery Order",
    description: "Deliver a package from Location A to Location B.",
    npcLevel: 3,
    reward: {
      baseGold: 100,
      baseXp: 100,
    },
    target: {
      location: "Location B",
      item: "package",
      timeOffset: 48,
    },
    stages: [
      { name: "Receive Quest", description: "Get the package from the NPC." },
      { name: "Travel to Destination", description: "Reach Location B with the package." },
      { name: "Deliver Package", description: "Give the package to the recipient." },
      { name: "Complete Quest", description: "Conclude the delivery process." },
    ],
  },
  {
    id: "kill_rat",
    type: "deliver",
    name: "Kill the rats",
    description: "Recently the rat population has grown out suspiciously. They begin to attack people. Your mission: kill 10 rats.",
    npcLevel: 3,
    reward: {
      baseGold: 100,
      baseXp: 100,
    },
    target: {
      enemy: "rat",
      number: 10,
      timeOffset: 240,
    },
    stages: [
      { name: "Receive Quest", description: "Get the order from the NPC." },
      { name: "Begin the killing", description: "Start killing rats." },
      { name: "Finish the killing", description: "Killed rats reach 10." },
      { name: "Complete Quest", description: "Bring 10 rats body to the NPC." },
    ],
    trigger: {
      conditions: [
        { type: "player_level", operator: ">", value: 2 },
        { type: "has_killed", value: "rat" },
      ],
    },
  }
];
