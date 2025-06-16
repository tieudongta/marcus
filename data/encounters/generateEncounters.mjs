// Random utility helpers
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomPick = (arr, count = 1) =>
  [...arr].sort(() => 0.5 - Math.random()).slice(0, count);

// Configuration pools
const types = ['combat', 'social', 'moral', 'resource', 'lore', 'environment', 'random'];
const regions = ['forest', 'mountains', 'river', 'desert', 'road', 'village', 'capital', 'ruins', 'swamp', 'town', 'hills'];
const times = ['Morning', 'Afternoon', 'Evening', 'Night', 'Any'];
const races = ['Human', 'Elf', 'Dwarf', 'Orc', 'Halfling', 'Beast', 'Any'];
const difficulties = ['easy', 'medium', 'hard'];

const names = {
  combat: ['Goblin Raid', 'Wild Beast', 'Bandit Patrol'],
  social: ['Kind Merchant', 'Traveling Jester', 'Pilgrim'],
  moral: ['Starving Stranger', 'Injured Rival', 'Stolen Goods'],
  resource: ['Abandoned Crate', 'Healing Mushrooms', 'Lost Supplies'],
  lore: ['Ancient Inscription', 'Cursed Totem', 'Forgotten Diary'],
  environment: ['Flooded Trail', 'Rockfall', 'Collapsed Tunnel'],
  random: ['Flickering Light', 'Lucky Charm', 'Mysterious Whisper'],
};

const descriptions = {
  combat: 'You are suddenly attacked!',
  social: 'A stranger approaches with an offer.',
  moral: 'You must make a difficult ethical choice.',
  resource: 'You discover something useful.',
  lore: 'There are secrets to be found here.',
  environment: 'Nature presents a challenge.',
  random: 'Something strange and unexpected occurs.',
};

// Generator function
export function generateEncounterTemplates(count = 10) {
  const encounters = [];

  for (let i = 0; i < count; i++) {
    const type = random(types);
    const id = `${type}_${i}`;
    const name = random(names[type]);
    const description = descriptions[type];

    const encounter = {
      id,
      name,
      type,
      description,
      race: random(races),
      region: randomPick(regions, 2),
      timeOfDay: randomPick(times, 2),
      difficulty: random(difficulties),
      handler: async (player) => {
        console.log(`🧭 Encounter triggered: ${name}`);
      },
    };

    encounters.push(encounter);
  }

  return encounters;
}
