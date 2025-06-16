import { Job } from "../jobs/Job.mjs";
import { Character } from "../characters/Character.mjs";
export class Place {
    constructor(name, jobListings = [], npcs = [], lodging = false) {
        this.name = name;
        this.jobListings = jobListings;
        this.npcs = npcs;
        this.lodging = lodging;
    }
    getAvailableJobs() {
        return this.jobListings.filter(job => job.isAvailable());
    }
    canLodgeCharacter() {
        return this.lodging === true || this.lodging?.available === true;
    }
    addJob(job) {
        if( job instanceof Job && !this.jobListings.includes(job)) {
            this.jobListings.push(job);
        }
    }
    addNpc(npc) {
        if (npc instanceof Character && !this.npcs.includes(npc)) {
            this.npcs.push(npc);
        }
    }
    findNpcByName(name) {
        return this.npcs.find(npc => npc.name === name);
    }
}