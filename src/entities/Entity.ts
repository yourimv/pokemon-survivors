import Component from "../components/Component";

export default abstract class Entity {
    components: Component[] = [];

    addComponent(component: Component): void {
        this.components.push(component);
    }

    update(dt: number): void {
        this.components.forEach(c => c.update(dt));
    }

    abstract getGameObject(): Phaser.GameObjects.GameObject;
}