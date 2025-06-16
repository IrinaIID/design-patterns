import { GAME_COMPLEXITY } from '../types';
import { GameState } from './GameState';
import { LevelStrategyFactory } from './LevelStrategyFactory';
import type { GuessStrategy } from './GuessStrategy';

export class GameMediator {
  private gameState: GameState | null = null;
  private currentStrategy: GuessStrategy | null = null;
  private readonly onMessage: (msg: string) => void;
  private readonly onUpdateAttempts: (attempts: number) => void;
  private readonly onGameWin: (target: number) => void;

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
    this.currentStrategy = LevelStrategyFactory.create(level);
    const targetNumber = this.getRandomInt(
      this.currentStrategy.min,
      this.currentStrategy.max
    );
    
    this.gameState = new GameState(targetNumber);
    
    this.onMessage(
      `Game started! Guess the number from ${this.currentStrategy.min} to ${this.currentStrategy.max}`
    );
    this.onUpdateAttempts(0);
  }

  guess(num: number) {
    if (!this.gameState || !this.currentStrategy) {
      this.onMessage('Please start the game first!');
      return;
    }

    if (num < this.currentStrategy.min || num > this.currentStrategy.max) {
      this.onMessage(`Please enter a number between ${this.currentStrategy.min} and ${this.currentStrategy.max}`);
      return;
    }

    const result = this.gameState.guess(num);
    this.onUpdateAttempts(this.gameState.getAttempts());

    if (result.correct) {
      this.onGameWin(this.gameState.getTargetNumber());
    } else {
      this.onMessage(result.hint || 'Try again!');
    }
  }

  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}