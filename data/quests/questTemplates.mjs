// questPresets.mjs
export const questPresets = [
  {
    id: "deliver_101",
    type: "deliver",
    name: "Urgent Delivery to the Capital",
    description: "Deliver this sealed scroll to officials in the capital.",
    target: {
      item: "sealed_scroll",
      timeOffset: 48, // in hours
    },
    reward: {
      gold: 150,
      xp: 100,
    },
    trigger: {
      conditions: [
        { type: "player_level", operator: ">", value: 0 },
        { type: "currentLocationType", value: "town" }
      ],
    },
    stages: [
      { name: 'Receive Quest', description: 'Receive Quest' },
      { name: 'Travel to Destination', description: 'Travel to Location B with the package.' },
      { name: 'Deliver Package', description: 'Deliver the package to NPC at Location B.' },
      { name: 'Complete Quest', description: 'Quest success or failure check.' },
    ],
  },
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
        { type: "has_completed", value: "deliver_101" }
      ],
    },
  },
  {
    id: 'deliver',
    type: 'deliver',
    name: 'Delivery Order',
    description: 'Deliver a package from Location A to Location B.',
    stages: [
      { name: 'Receive Quest', description: 'Receive the package and quest from NPC.' },
      { name: 'Travel to Destination', description: 'Travel to Location B with the package.' },
      { name: 'Deliver Package', description: 'Deliver the package to NPC at Location B.' },
      { name: 'Complete Quest', description: 'Quest success or failure check.' },
    ],
    npcLevel: 3,
    rewards: { baseGold: 100, baseXp: 100 },
    target: {
      location: "Location B",
      item: "package",
      timeOffset: 48,
    },
  },
];
