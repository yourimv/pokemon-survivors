import { SpriteSheetConfig } from "../../model/config/SpriteSheetConfig";
import { ActivityState } from "../../state/ActivityState";

export class SpriteSheetConfigBuilder {
    activity: ActivityState;
    texture: string;
    frames: number;
    width?: number;
    height?: number;

    constructor(texture: string) {
        this.texture = texture;
    }

    static builder(texture: string) {
        return new SpriteSheetConfigBuilder(texture);
    }

    withActivity(activity: ActivityState) {
        this.activity = activity;
        return this;
    }

    withFrames(frames: number) {
        this.frames = frames;
        return this;
    }

    withWidth(width: number) {
        this.width = width;
        return this;
    }

    withHeight(height: number) {
        this.height = height;
        return this
    }

    build(): SpriteSheetConfig {
        return {
            activity: this.activity,
            texture: this.texture,
            frames: this.frames,
            width: this.width,
            height: this.height
        };
    }
}