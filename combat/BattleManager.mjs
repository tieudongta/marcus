import chalk from 'chalk';

export class BattleManager {
    constructor(characterA, characterB) {
        this.combatants = [characterA, characterB];
        this.currentTurnIndex = 0;
        this.isBattleOver = false;
        this.battleLog = [];
    }

    async startBattle() {
        this.logBattleEvent('start');
        while (!this.isBattleOver) {
            await this.takeTurn();
            await this.delay(500);
        }
        this.logBattleEvent('end');
    }

    async takeTurn() {
        const attacker = this.getCombatant(this.currentTurnIndex);
        const defender = this.getCombatant(1 - this.currentTurnIndex);

        this.logBattleEvent('info', { message: `\n${attacker.name}'s turn...` });

        const attackResult = attacker.calculateDamageTo(defender);
        console.error("hello");
        this.applyAttackResult(attacker, defender, attackResult);

        if (!defender.isAlive) {
            this.isBattleOver = true;
            this.logBattleEvent('death', { character: defender.name });

            this.declareWinner(attacker, defender);

            const loot = typeof defender.dropLoot === 'function' ? defender.dropLoot() : [];
            for (const item of loot) {
                if (attacker.inventory?.addItem) {
                    attacker.inventory.addItem(item);
                    this.logBattleEvent('info', { message: `${attacker.name} picked up ${item.name}!` });
                }
            }

            return;
        }

        this.switchTurn();
    }

    // resolveAttack(attacker, defender) {
    //     try {
    //         const strength = attacker.strength || 0;
    //         const intelligence = attacker.intelligence || 0;
    //         const weaponBonus = attacker.equippedWeapon?.attackPower || 0;
    //         let totalDamage = strength + weaponBonus;

    //         const dodged = this.calculateDodge(defender);
    //         if (dodged) {
    //             return { damage: 0, dodged: true, critical: false };
    //         }

    //         const critical = this.calculateCrit(attacker);
    //         let damage = totalDamage;

    //         if (critical) {
    //             const critMultiplier = 1.5 + intelligence * 0.05;
    //             damage = Math.floor(damage * critMultiplier);
    //         } else {
    //             damage = Math.max(1, Math.floor(damage));
    //         }

    //         return { damage, dodged: false, critical };
    //     } catch (err) {
    //         console.error("ERROR in attack:", err);
    //         return { damage: 1, dodged: false, critical: false };
    //     }
    // }

    applyAttackResult(attacker, defender, { damage, dodged, critical }) {
        if (dodged) {
            this.logBattleEvent('status', { character: defender.name, status: 'dodged the attack' });
            return;
        }

        if (critical) {
            this.logBattleEvent('info', { message: `⚡ Critical hit! ⚡` });
        }

        this.logBattleEvent('attack', { attacker: attacker.name, target: defender.name, damage });
        console.error(`Damage: ${damage} XP: ${attacker.xp}`);
        console.error(attacker.isPlayer);
        if (attacker.isPlayer) {
            this.logBattleEvent('info', {message: `${attacker.name} gained ${damage} XP.`})
            attacker.gainXp(damage); // XP now rewarded only once
        }
        if (typeof defender.takeDamage === 'function') {
            defender.takeDamage(damage);
        } else {
            defender.health = (defender.health || 0) - damage;
            if (defender.health < 0) defender.health = 0;
        }
    }

    // calculateDodge(defender) {
    //     const agility = defender.agility || 0;
    //     const baseDodgeChance = 5;
    //     const agilityFactor = agility * 0.4;
    //     const dodgeChance = Math.min(baseDodgeChance + agilityFactor, 90);
    //     return Math.random() * 100 < dodgeChance;
    // }

    // calculateCrit(attacker) {
    //     const intelligence = attacker.intelligence || 0;
    //     return Math.random() * 100 < intelligence * 0.5;
    // }

    declareWinner(winner, loser) {
        this.logBattleEvent('info', { message: `${winner.name} wins! ${loser.name} is defeated.` });
    }

    switchTurn() {
        this.currentTurnIndex = 1 - this.currentTurnIndex;
        const next = this.getCombatant(this.currentTurnIndex);
        this.logBattleEvent('info', { message: `🔄 Next turn: ${next.name}` });
    }

    getCombatant(index) {
        return this.combatants[index];
    }

    log(message) {
        this.battleLog.push(message);
        console.log(message);
    }

    getLog() {
        return this.battleLog;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    logBattleEvent(eventType, details) {
        switch (eventType) {
            case 'start':
                console.log(chalk.bgWhite.black.bold('⚔️  Battle Start! Prepare your heroes!'));
                break;
            case 'attack':
                console.log(chalk.red.bold(`💥 ${details.attacker} hits ${details.target} for ${details.damage} damage!`));
                break;
            case 'heal':
                console.log(chalk.green.bold(`✨ ${details.healer} heals ${details.target} for ${details.amount} HP!`));
                break;
            case 'status':
                console.log(chalk.yellow.bold(`⚠️  ${details.character} is now ${details.status}!`));
                break;
            case 'death':
                console.log(chalk.redBright.bold(`☠️  ${details.character} has been defeated!`));
                break;
            case 'info':
                console.log(chalk.cyan(`🔍 ${details.message}`));
                break;
            case 'end':
                console.log(chalk.bgWhite.black.bold('🏆 Battle Ended! Well fought!'));
                break;
            default:
                console.log(details.message);
        }
    }
}
