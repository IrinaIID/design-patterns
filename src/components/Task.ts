import { TaskComponent, Observer } from "./interfaces";

export enum TASK_STATUS {
  Open = 'open',
  InProgress = 'in progress',
  Done = 'done'
}

export abstract class TaskComponentBase implements TaskComponent {
  private observers: Observer[] = [];

  abstract getName(): string;
  abstract getStatus(): string;
  abstract setStatus(status: string): void;

  attach(observer: Observer): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  detach(observer: Observer): void {
    this.observers = this.observers.filter(observerInList => observerInList !== observer);
  }

  notify(event: string): void {
    this.observers.forEach(observer => observer.update(this, event));
  }
}

export class Task extends TaskComponentBase {
  private status: TASK_STATUS = TASK_STATUS.Open;

  constructor(private name: string) {
    super();
  }

  getName(): string {
    return this.name;
  }

  getStatus(): TASK_STATUS {
    return this.status;
  }

  setStatus(status: TASK_STATUS): void {
    this.status = status;
    this.notify(`Status changed to ${status}`);
  }
}
