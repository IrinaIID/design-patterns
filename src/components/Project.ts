import { TaskComponent } from "./interfaces";
import { TaskComponentBase } from "./Task";

export class Project extends TaskComponentBase {
  private children: TaskComponent[] = [];

  constructor(private name: string) {
    super();
  }

  getName(): string {
    return this.name;
  }

  getStatus(): string {
    if (this.children.length === 0) return "no tasks";

    const statuses = new Set(this.children.map(task => task.getStatus()));
    if (statuses.size === 1) {
      return [...statuses][0];
    }
    
    return "in progress";
  }

  setStatus(status: string): void {
    this.children.forEach(child => child.setStatus(status));
    this.notify(`Project status set to ${status} for all tasks`);
  }

  add(task: TaskComponent): void {
    this.children.push(task);
    this.notify(`Task "${task.getName()}" added`);
  }

  remove(task: TaskComponent): void {
    this.children = this.children.filter(c => c !== task);
    this.notify(`Task "${task.getName()}" removed`);
  }

  getChild(index: number): TaskComponent | undefined {
    return this.children[index];
  }
}
