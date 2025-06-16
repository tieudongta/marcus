import { locations } from "../data/world/locationPresets.mjs";

export class Location {
    constructor({
        name = "",
        description = "",
        type = "town",
        race = "human",
        connections = [],
        region = "forest",
        shops = [],
    }) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.race = race;
        this.connections = connections;
        this.region = region;
        this.shops = shops;
    }
    moveTo(destination) {
        if (!(destination instanceof Location)) return 0;
        const route = this.connections.find(location => location.name === destination.name);
        return route ? route.duration : 0;
    }
    static fromName(name) {
        const raw = Object.values(locations).find(loc => loc.name.toLowerCase() === name.toLowerCase());
        return raw ? new Location(raw) : null;
    }
}