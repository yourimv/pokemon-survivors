import { ActivityState } from './../states/ActivityState';
export interface SpriteSheetConfig {
    activity: ActivityState;
    texture: string;
    frames: number;
}