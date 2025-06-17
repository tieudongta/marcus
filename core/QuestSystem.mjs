import chalk from "chalk";
import { getRandomReward } from "../data/configs/rewardConfigs.mjs";
import { questPresets } from "../data/quests/questTemplates.mjs";
import { locations } from "../data/world/locationPresets.mjs";
import { DeliveryQuest } from "../quests/DeliveryQuest.mjs";
import { generateLocation } from "../scripts/utils/generationLocation.mjs";
import { itemPresets } from "../data/items/itemPresets.mjs";

export class QuestSystem {
    constructor(player) {
        this.player = player;
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
        console.error(this.player.timeSystem.totalMinutes + (template.target.timeOffset * 60));
        const [from, to] = generateLocation();
        return new DeliveryQuest({
            ...template,
            id: `deliver_${from.toLowerCase()}_to_${to.toLowerCase()}`,
            name: `${template.name} to ${to}`,
            description: `${template.description.replace('Location A', from).replace('Location B', to)}`,
            from,
            to,
            data: { from, to, progress: 0, route: [] },
            target: {
                Deadline: this.player.timeSystem.totalMinutes + (template.target.timeOffset * 60),
            }
        });
    }
    getQuestStatusText() {
        return this.activeQuests.map(q => {
            const stage = q.getStage()?.name || "No stage";
            const from = q.data?.from || "Unknown start";
            const to = q.data?.to || "Unknown destination";
            const progress = q.data?.progress !== undefined ? q.data.progress : "N/A";
            const totalSteps = q.data?.route?.length ? q.data.route.length - 1 : "N/A";

            // Calculate time left if target time is available and player time is passed in (optional)
            // For example, if you want to pass current player time here, you'd adjust this
            let timeLeft = "N/A";


            if (q.target?.time && typeof q.target.time === "number") {
                const timeLeftMinutes = q.target.time - this.player.timeSystem.totalMinutes;
                const friendlyTimeLeft = this.player.timeSystem.formatTimeLeft(timeLeftMinutes);
                // Assuming you have player or currentTime available as a param or global,
                // For now, just show target time
                timeLeft = friendlyTimeLeft;
            }

            return `📜 ${q.name} — Status: ${q.status} (Stage: ${stage})
    Route: From ${from} to ${to}
    Progress: ${progress} / ${totalSteps}
    Deadline: ${timeLeft}`;
        }).join('\n\n');
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
    generateDeliveryQuest(player) {
        // if (player.level <= 2) return;
        const location = player.currentLocation;
        if (!location || location.type !== 'town') return;

        if (player.getQuestById("deliver_101")) return;

        const capital = Object.values(locations).find(
            loc => loc.race === player.race && loc.type.toLowerCase() === "capital"
        );
        if (!capital || capital.name === location.name) return;
        const template = questPresets.find(q => q.id === "deliver_101");
        if (!template) {
            console.warn("Quest id deliver_101 template not found");
            return;
        }
        console.log("DEBUG time calc:", player.timeSystem.currentTime, template.target?.timeOffset);

        const time = player.timeSystem.currentTime + (template.target.timeOffset * 60);
        const quest = new DeliveryQuest({
            ...template,
            id: "deliver_101",
            name: `${template.name}`,
            description: `${template.description} From ${location.name} to ${capital.name}`,
            from: location.name,
            to: capital.name,
            target: {
                ...template.target,
                location: capital.name,
                time: time
            },
            data: {
                from: location.name,
                to: capital.name,
                progress: 0,
                route: []
            }
        });
        this.addQuest(quest);
        player.addQuest(quest);
        player.inventory.addItem(itemPresets['sealed_scroll']);
        console.log(chalk.magenta(`🧾 New delivery quest added: ${quest.name}`));
        return quest;
    }
}