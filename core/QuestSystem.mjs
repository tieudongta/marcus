import { getRandomReward } from "../data/configs/rewardConfigs.mjs";
import { questPresets } from "../data/quests/questTemplates.mjs";
import { DeliveryQuest } from "../quests/DeliveryQuest.mjs";
import { generateLocation } from "../scripts/utils/generationLocation.mjs";

export class QuestSystem {
    constructor() {
        this.activeQuests = [];
    }
    addQuest(quest) {
        this.activeQuests = this.activeQuests.filter(q => q.status !== 'completed');
        quest.start();
        this.activeQuests.push(quest);
    }
    grantQuestReward(player, quest) {
        if (quest.status !== 'completed') return;
        const { baseGold = 0, baseXp = 0 } = quest.reward || {};
        const level = quest.npcLevel || 1;
        const gold = baseGold + level * 20;
        const xp = baseXp + level * 20;
        
        player.addGold(gold);
        player.gainXp(xp);
        const item = getRandomReward();
        player.inventory.addItem(item);
        console.log(`🎁 Quest complete! Rewards:`);
        console.log(`💰 Gold: ${gold}, 🧠 XP: ${xp}`);
        console.log(`📦 You received: ${item.name} [${item.rarity}]`);
    }
    createDeliveryQuest(template) {
        const [from, to] = generateLocation();
        return new DeliveryQuest({
            ...template,
            id: `deliver_${from.toLowerCase()}_to_${to.toLowerCase()}`,
            name: `${template.name} to ${to}`,
            description: `${template.description.replace('Location A', from).replace('Location B', to)}`,
            from,
            to,
            data: { from, to, progress: 0, route: [] }
        });
    }
    getQuestStatusText() {
        return this.activeQuests.map(q => {
            return `📜 ${q.name} — ${q.status} (Stage: ${q.getStage()?.name})`;
        }).join('\n');
    }

    createQuestFromTemplate(questId) {
        const template = questPresets.find(q => q.id === questId);
        if (!template) {
            console.error(`Quest template '${questId}' not found.`);
            return null;
        }

        switch (template.id) {
            case 'deliver':
                return this.createDeliveryQuest(template);
            case 'kill_rats':
                return this.createKillEnemyQuest(template);
            default:
                console.log("Invalid quest type.");
                return null;
        }
    }

    updateAll(player, gameState) {
        for (const quest of this.activeQuests) {
            quest.update(player, gameState);
        }
    }
    getQuestLog() {
        return this.activeQuests.map(q => ({
            name: q.name,
            status: q.status,
            currentStage: q.getStage()?.name,
        }));
    }
}