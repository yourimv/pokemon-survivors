import Component from "../components/Component";

export default abstract class Entity {
    private components: Map<Function, Component> = new Map();


    addComponent(component: Component): void {
        this.components.set(component.constructor, component);
    }

    getComponent<T extends Component>(type: new (...args: any[]) => T): T {
        return this.components.get(type) as T;
    }

    update(dt: number): void {
        this.components.forEach(c => c.update(dt));
    }

    destroy(): void {
        this.getGameObject().destroy();
        this.components.clear();
    }

    abstract getGameObject(): Phaser.GameObjects.GameObject;
}