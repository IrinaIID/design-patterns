export interface GuessStrategy {
  min: number;
  max: number;
  checkGuess(guess: number, secret: number): boolean;
}

export class EasyStrategy implements GuessStrategy {
  min = 1;
  max = 10;

  checkGuess(guess: number, secret: number): boolean {
    if (guess === secret) return true;
    return false
  }
}

export class MediumStrategy implements GuessStrategy {
  min = 1;
  max = 50;

  checkGuess(guess: number, secret: number): boolean {
    if (guess === secret) return true;
    return false
  }
}

export class HardStrategy implements GuessStrategy {
  min = 1;
  max = 100;

  checkGuess(guess: number, secret: number): boolean {
    if (guess === secret) return true;
    return false
  }
}
