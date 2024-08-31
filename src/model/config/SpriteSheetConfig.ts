import { ActivityState } from '../../state/ActivityState';
export interface SpriteSheetConfig {
    activity: ActivityState;
    texture: string;
    frames: number;
    width: number;
    height: number;
}

