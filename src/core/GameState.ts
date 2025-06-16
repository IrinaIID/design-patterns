export class GameState {
  private attempts = 0;
  private targetNumber: number;

  constructor(targetNumber: number) {
    this.targetNumber = targetNumber;
  }

  guess(num: number): { correct: boolean; hint?: string } {
    this.attempts++;

    if (num === this.targetNumber) {
      return { correct: true };
    }

    return {
      correct: false,
      hint: num < this.targetNumber ? 'More!' : 'Less!',
    };
  }

  getAttempts(): number {
    return this.attempts;
  }

  getTargetNumber(): number {
    return this.targetNumber;
  }
}