export interface Observer {
  update(subject: Subject, event: string): void;
}

export interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(event: string): void;
}

export interface TaskComponent extends Subject {
  getName(): string;
  getStatus(): string;
  setStatus(status: string): void;
  add?(task: TaskComponent): void;
  remove?(task: TaskComponent): void;
  getChild?(index: number): TaskComponent | undefined;
}
