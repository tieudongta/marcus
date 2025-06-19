import { RACE_TERRAIN_MODIFIERS } from "../data/configs/locationConfigs.mjs";
import { locations } from "../data/world/locationPresets.mjs";
import { Location } from "../world/Location.mjs";

export class TravelSystem {
    constructor(player) {
        this.player = player;
        this.timeSystem = player.timeSystem;
        this.currentLocation = player.currentLocation || null;
    }

    // Basic BFS pathfinder
    findPath(startName, endName) {
        const visited = new Set();
        const queue = [[startName]];

        while (queue.length) {
            const path = queue.shift();
            const current = path.at(-1);
            if (current === endName) return path;

            if (!visited.has(current)) {
                visited.add(current);
                const currentLoc = locations[current];
                for (const conn of currentLoc.connections) {
                    queue.push([...path, conn.name]);
                }
            }
        }

        return null;
    }

    // Energy estimation per route
    estimateEnergy(route) {
        if (!route || route.length < 2) return 0;

        let total = 0;
        for (let i = 0; i < route.length - 1; i++) {
            const from = route[i];
            const to = route[i + 1];
            const connection = from.connections.find(c => c.name === to.name);
            const duration = connection ? connection.duration : 1;

            const bias = from.race === to.race ? 0.8 : 1;
            total += duration * bias;
        }

        return Math.round(total * 10) / 10;
    }

    estimateTravelTime(path, player) {
        if (!path || path.length < 2) return 0;

        let totalTime = 0;
        for (let i = 0; i < path.length - 1; i++) {
            const from = locations[path[i]];
            const to = locations[path[i + 1]];
            const conn = from.connections.find(c => c.name === to.name);
            if (!conn) continue;

            let modifier = 1.0;
            if (player.race === to.race) {
                modifier = RACE_TERRAIN_MODIFIERS[player.race] ?? 0.9;
            } else {
                modifier = RACE_TERRAIN_MODIFIERS.Default;
            }

            if (player.agility > 12) modifier *= 0.9;
            else if (player.agility < 8) modifier *= 1.1;

            totalTime += conn.duration * modifier;
        }

        return Math.ceil(totalTime);
    }

    // Recursive DFS pathfinding
    findAllPaths(startName, endName) {
        const start = Location.fromName(startName);
        const end = Location.fromName(endName);
        if (!start || !end) return [];

        const results = [];
        const visited = new Set();

        const dfs = (node, target, path, timeSum) => {
            if (visited.has(node.name)) return;
            visited.add(node.name);
            path.push(node);

            if (node.name === target.name) {
                const energy = this.estimateEnergy(path);
                results.push({ route: [...path], totalTime: timeSum, totalEnergy: energy });
            } else {
                for (const conn of node.connections) {
                    const next = Location.fromName(conn.name);
                    if (next) {
                        dfs(next, target, path, timeSum + conn.duration);
                    }
                }
            }

            path.pop();
            visited.delete(node.name);
        };

        dfs(start, end, [], 0);
        return results;
    }

    // Suggest optimal routes based on time & energy
    selectRoute(paths) {
        if (!paths.length) return [];

        const sortedByTime = [...paths].sort((a, b) => a.totalTime - b.totalTime);
        const sortedByEnergy = [...paths].sort((a, b) => a.totalEnergy - b.totalEnergy);

        const bestTime = sortedByTime[0];
        const bestEnergy = sortedByEnergy[0];

        const routesEqual = (a, b) => JSON.stringify(a.route.map(l => l.name)) === JSON.stringify(b.route.map(l => l.name));
        const suggestions = [bestTime];

        if (!routesEqual(bestTime, bestEnergy)) {
            suggestions.push(bestEnergy);
        } else {
            const secondTime = sortedByTime.find(p => !routesEqual(p, bestTime));
            const secondEnergy = sortedByEnergy.find(p => !routesEqual(p, bestEnergy));
            const candidates = [secondTime, secondEnergy].filter(Boolean);

            if (candidates.length) {
                candidates.sort((a, b) => (a.totalTime + a.totalEnergy) - (b.totalTime + b.totalEnergy));
                suggestions.push(candidates[0]);
            }
        }

        return suggestions;
    }

    // Display current location map
    showMap() {
        if (!this.currentLocation) {
            console.error("❌ No current location set in TravelSystem.");
            return;
        }

        console.log(`📍 Current Location: ${this.currentLocation.name}`);
        console.log(`🌐 Connections:`);
        for (const conn of this.currentLocation.connections) {
            console.log(`- ${conn.name} (${conn.duration}h)`);
        }
        return `📍 Current Location: ${this.currentLocation.name}\n
                🌐 Connections: ${this.currentLocation.connections.map(conn => `- ${conn.name} (${conn.duration}h)`).join("\n")}`;
    }

    getAvailableDestination() {
        if (!this.currentLocation) {
            console.error("❌ No current location set in TravelSystem.");
            return [];
        }

        return this.currentLocation.connections.map(c => Location.fromName(c.name));
    }

    moveTo(destinationName) {
        const destination = Location.fromName(destinationName);
        const time = this.currentLocation.moveTo(destination);
        if (time <= 0) {
            console.log(`❌ Cannot travel to ${destinationName}. Not connected.`);
            return false;
        }

        this.timeSystem.advanceTime(travelTime);  // ✅ Advance hours
        
        this.player.loseEnergy(time * 5);
        this.player.locationName = destination.name;
        this.currentLocation = destination;

        console.log(`🚶 Traveled to ${destination.name} in ${time}h.`);
        console.log(`🕒 Now: ${this.timeSystem.FullTime}`);
        return true;
    }
}
