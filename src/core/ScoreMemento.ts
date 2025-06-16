export interface Score {
  name: string;
  attempts: number;
  date: string;
  level: string;
}

export class ScoreMemento {
  private state: Score[];

  constructor(initial: Score[] = []) {
    this.state = [...initial];
  }

  save(state: Score[]) {
    this.state = [...state];
  }

  getState(): Score[] {
    return [...this.state];
  }
}
