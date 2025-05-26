import { Shape } from "../entities/main-entities";


export interface Comparator<T> {
  compare(a: T, b: T): number;
}

export class ShapeRepository {
  private shapes: Shape[] = [];

  add(shape: Shape): void {
    if (!this.shapes.find(s => s.getId() === shape.getId())) {
      this.shapes.push(shape);
    }
  }

  remove(shape: Shape): void {
    this.shapes = this.shapes.filter(s => s.getId() !== shape.getId());
  }

  findById(id: string): Shape | undefined {
    return this.shapes.find(s => s.getId() === id);
  }

  findByName(name: string): Shape[] {
    return this.shapes.filter(s => s.getName() === name);
  }

  getAll(): Shape[] {
    return [...this.shapes];
  }
}
