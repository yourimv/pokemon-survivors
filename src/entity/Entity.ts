import Component from "../component/Component";

export default abstract class Entity {
    private components: Map<Function, Component> = new Map();
    private readonly uuid: string = Phaser.Math.RND.uuid();

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

    getUUID(): string {
        return this.uuid;
    }

    abstract getGameObject(): Phaser.GameObjects.GameObject;
}