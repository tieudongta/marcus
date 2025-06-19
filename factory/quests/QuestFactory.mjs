import { ItemObjective, LocationObjective, TimeObjective } from '../../quests/objectives/Objective.mjs';
import { FetchQuest } from '../../quests/Quest.mjs';
import { Reward } from '../../quests/rewards/Reward.mjs';
import { Location } from '../../world/Location.mjs';

export class QuestFactory {
    
    static create(preset) {
        const stages = preset.stages.map(stage => ({
                        name: stage.name,
                        description: stage.description,
                        objectives: (stage.objectives || []).map(QuestFactory.createObjective)
                    }));
        switch (preset.type) {
            case 'deliver':
                return new FetchQuest({
                    id: preset.id,
                    name: preset.name,
                    type: preset.type,
                    description: preset.description,
                    reward: new Reward(preset.reward.xp, [], preset.reward.gold),
                    stages,
                    trigger: preset.trigger 
                });
            default:
                throw new Error(`Unknown quest type: ${preset.type}`);
        }
    }


    static createObjective(objDef) {
        switch (objDef.type) {
            case 'item': return new ItemObjective(`Deliver item: ${objDef.item}`, objDef.item);
            case 'location': return new LocationObjective(`Arrived at ${objDef.location}`, objDef.location);
            case 'time':
                const deadline = Date.now() + (objDef.deadlineHours * 60 * 60 * 1000);
                return new TimeObjective(`Deliver within time limit`, deadline);
            default: throw new Error("Unknown objective type: " + objDef.type);
        }
    }

}
