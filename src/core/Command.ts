export interface ICommand {
  execute(): void;
  undo(): void;
}

export class GuessCommand implements ICommand {
  private readonly guess: number;
  private readonly onExecute: (guess: number) => void;
  private readonly onUndo: () => void;

  constructor(
    guess: number,
    onExecute: (guess: number) => void,
    onUndo: () => void
  ) {
    this.guess = guess;
    this.onExecute = onExecute;
    this.onUndo = onUndo;
  }

  execute() {
    this.onExecute(this.guess);
  }

  undo() {
    this.onUndo();
  }
}
