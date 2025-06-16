export const questPresets = [
  {
    id: 'deliver',
    name: 'Delivery Order',
    description: 'Deliver a package from Location A to Location B.',
    stages: [
      { name: 'Receive Quest', description: 'Receive the package and quest from NPC.' },
      { name: 'Travel to Destination', description: 'Travel to Location B with the package.' },
      { name: 'Deliver Package', description: 'Deliver the package to NPC at Location B.' },
      { name: 'Complete Quest', description: 'Quest success or failure check.' },
    ],
    npcLevel: 3,
    rewards: { baseGold: 100, baseXp: 100 }
  },
  {
    id: 'kill_rats',
    name: 'Kill rats to protect the harvest',
    description: 'Kill 20 rats within 20 days',
    requiredKills: 20,
    stages: [
      { name: 'Receive Quest', description: 'Receive quest from NPC.' },
      { name: 'Start Quest', description: 'Kill first rat' },
      { name: 'Complete Quest', description: 'Kill 20 rats within 20 days' },
      { name: 'Deliver result', description: 'Talk to the NPC.' },
    ],
    npcLevel: 2,
    rewards: { baseGold: 100, baseXp: 100 }
  }
];
