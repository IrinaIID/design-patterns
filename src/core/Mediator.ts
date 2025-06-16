import { GAME_COMPLEXITY } from '../types';
import { GameState } from './GameState';
import { LevelStrategyFactory } from './LevelStrategyFactory';

export class GameMediator {
  private gameState: GameState | null = null;

  private onMessage: (msg: string) => void;
  private onUpdateAttempts: (attempts: number) => void;
  private onGameWin: (target: number) => void;

  constructor(
    onMessage: (msg: string) => void,
    onUpdateAttempts: (attempts: number) => void,
    onGameWin: (target: number) => void
  ) {
    this.onMessage = onMessage;
    this.onUpdateAttempts = onUpdateAttempts;
    this.onGameWin = onGameWin;
  }

  setLevel(level: GAME_COMPLEXITY) {
    let maxNumber = 10;
    let maxAttempts = 5;

    if (level === GAME_COMPLEXITY.Medium) {
      maxNumber = 50;
      maxAttempts = 10;
    } else if (level === GAME_COMPLEXITY.Hard) {
      maxNumber = 100;
      maxAttempts = 15;
    }

    function getRandomInt(min: number, max: number): number {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    const strategy = LevelStrategyFactory.create(level);
    const targetNumber = getRandomInt(strategy.min, strategy.max);
    this.gameState = new GameState(targetNumber);

    this.onMessage(`Игра началась! Угадайте число от 1 до ${maxNumber}`);
    this.onUpdateAttempts(0);
  }

  guess(num: number) {
    if (!this.gameState) return;

    const result = this.gameState.guess(num);
    this.onUpdateAttempts(this.gameState.getAttempts());

    if (result.correct) {
      this.onMessage('Correct guess!');
      this.onGameWin(this.gameState.getTargetNumber());
    } else {
      this.onMessage(result.hint || 'Try again!');
    }
  }
}
