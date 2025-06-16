export interface GuessStrategy {
  min: number;
  max: number;
  maxAttempts: number;
}

export class EasyStrategy implements GuessStrategy {
  min = 1;
  max = 10;
  maxAttempts = 5;
}

export class MediumStrategy implements GuessStrategy {
  min = 1;
  max = 50;
  maxAttempts = 10;
}

export class HardStrategy implements GuessStrategy {
  min = 1;
  max = 100;
  maxAttempts = 15;
}