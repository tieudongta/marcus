import chalk from "chalk";

export class Reward {
    constructor(xp, items = [], gold = 0, player) {
        this.xp = xp;
        this.items = items;
        this.gold = gold;
        this.player = player;
    }
    grant(player) {
        if(this.xp) {
            player.gainXp(this.xp);
            console.log(chalk.magenta(`Reward: ${this.xp} XP`));
        }
        if(this.items) {
            this.items.forEach(item => {
                player.inventory.addItem(item);
                console.log(chalk.magenta(`Reward: ${item.name}`));
            });
        }
        if(this.gold) {
            player.addGold(this.gold);
            console.log(chalk.magenta(`Reward: ${this.gold}g`));
        }
    }
}