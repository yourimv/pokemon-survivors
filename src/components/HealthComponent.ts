import Entity from "../entities/Entity";
import { AbstractArena } from "../scenes/AbstractArena";
import Component from "./Component";

export class HealthComponent implements Component {
    private entity: Entity;
    private scene: AbstractArena;
    private maxHealth: number;
    private currentHealth: number;

    constructor(entity: Entity, scene: AbstractArena, maxHealth: number) {
        this.maxHealth = maxHealth;
        this.currentHealth = maxHealth;
        this.entity = entity;
        this.scene = scene;
    }

    takeDamage(amount: number): void {
        this.currentHealth -= amount;
        if (this.currentHealth < 0) {
            this.currentHealth = 0;
            this.scene.removeEntity(this.entity);
        }
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