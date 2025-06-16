import { type Score, ScoreMemento } from "./ScoreMemento";

export class ScoreHistory {
  private static instance: ScoreHistory;
  private scores: Score[] = [];
  private memento = new ScoreMemento();

  private constructor() {}

  static getInstance(): ScoreHistory {
    if (!ScoreHistory.instance) {
      ScoreHistory.instance = new ScoreHistory();
    }
    return ScoreHistory.instance;
  }

  addScore(score: Score) {
    this.scores.push(score);
    this.memento.save(this.scores);
  }

  getScores(): Score[] {
    return this.memento.getState();
  }
}
