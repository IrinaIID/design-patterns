import { GAME_COMPLEXITY } from '../types';
import { type GuessStrategy, EasyStrategy, MediumStrategy, HardStrategy } from './GuessStrategy';

export class LevelStrategyFactory {
  static create(level: GAME_COMPLEXITY): GuessStrategy {
    switch (level) {
      case GAME_COMPLEXITY.Medium:
        return new MediumStrategy();
      case GAME_COMPLEXITY.Hard:
        return new HardStrategy();
      default:
        return new EasyStrategy();
    }
  }
}