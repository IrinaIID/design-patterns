import { Observer, TaskComponent } from "./interfaces";

export class Developer implements Observer {
  constructor(public name: string, private logFn: (msg: string) => void) {}

  update(subject: TaskComponent, event: string): void {
    if (subject.getName()) {
      this.logFn(`[Notification] Developer ${this.name} notified about "${event}" in task "${(subject as TaskComponent).getName()}"`);
    }
  }
}
