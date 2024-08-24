import Component from "./Component";

export default class DamageComponent implements Component {

    private damage: number;

    constructor(damage: number) {
        this.damage = damage;
    }

    update(dt: number): void {
        // do nothing
    }

    getDamage(): number {
        return this.damage;
    }

}