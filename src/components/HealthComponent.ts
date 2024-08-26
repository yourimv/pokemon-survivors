import Component from "./Component";

export class HealthComponent implements Component {
    private maxHealth: number;
    private currentHealth: number;

    constructor(maxHealth: number) {
        this.maxHealth = maxHealth;
        this.currentHealth = maxHealth;
    }

    takeDamage(amount: number): void {
        this.currentHealth -= amount;
    }

    heal(amount: number): void {
        this.currentHealth += amount;
        if (this.currentHealth > this.maxHealth) {
            this.currentHealth = this.maxHealth;
        }
    }

    isAlive(): boolean {
        return this.currentHealth > 0;
    }

    getHealth(): number {
        return this.currentHealth;
    }

    getMaxHealth(): number {
        return this.maxHealth;
    }

    update(dt: number): void {
        // nothing to update
    }
}