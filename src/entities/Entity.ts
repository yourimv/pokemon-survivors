import Component from "../components/Component";

export default abstract class Entity {
    components: Component[] = [];

    addComponent(component: Component): void {
        this.components.push(component);
    }

    getComponent<T extends Component>(type: new (...args: any[]) => T): T {
        return this.components.find(c => c instanceof type) as T;
    }

    update(dt: number): void {
        this.components.forEach(c => c.update(dt));
    }

    destroy(): void {
        this.components = [];
    }

    abstract getGameObject(): Phaser.GameObjects.GameObject;
}