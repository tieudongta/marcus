export class Encounter {
    constructor({
        id = '',
        name = '', 
        description = '', 
        type = 'combat', 
        race = 'human', 
        timeOfDay = ['Night'], 
        difficulty = 'easy',
        region = ['town'],
        handler = () => {}
    }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.race = race;
        this.timeOfDay = timeOfDay;
        this.difficulty = difficulty;
        this.region = region;
        this.handler = handler;
    }
}