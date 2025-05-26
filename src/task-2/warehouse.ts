import { Observer, Shape } from "../entities/main-entities";
import { Cube } from "../shapes/cube";
import { Ellipse } from "../shapes/ellipse";

type Metrics = {
  area?: number;
  perimeter?: number;
  volume?: number;
};

export class Warehouse implements Observer {
  private static instance: Warehouse;
  private metricsMap: Map<string, Metrics> = new Map();

  private constructor() {}

  static getInstance(): Warehouse {
    if (!Warehouse.instance) {
      Warehouse.instance = new Warehouse();
    }
    return Warehouse.instance;
  }

  updateMetrics(shape: Shape): void {
    if (shape instanceof Ellipse) {
      this.metricsMap.set(shape.getId(), {
        area: shape.area(),
        perimeter: shape.perimeter(),
      });
    } else if (shape instanceof Cube) {
      this.metricsMap.set(shape.getId(), {
        area: shape.surfaceArea(),
        volume: shape.volume(),
      });
    }
  }

  getMetrics(shapeId: string): Metrics | undefined {
    return this.metricsMap.get(shapeId);
  }

  removeMetrics(shapeId: string): void {
    this.metricsMap.delete(shapeId);
  }
}
