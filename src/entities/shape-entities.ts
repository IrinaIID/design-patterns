import { Point, Shape } from "./main-entities";

export class EllipseEntity extends Shape {
  private point1: Point;
  private point2: Point;

  constructor(point1: Point, point2: Point, name: string) {
    super(name);
    this.point1 = point1;
    this.point2 = point2;
  }

  getPoint1(): Point {
    return this.point1;
  }

  getPoint2(): Point {
    return this.point2;
  }

  setPoint1(newPoint: Point): void {
    this.point1 = newPoint;
    this.notifyObservers();
  }

  setPoint2(newPoint: Point): void {
    this.point2 = newPoint;
    this.notifyObservers();
  }
}

export class CubeEntity extends Shape {
  private start: Point;
  private sideLength: number;

  constructor(start: Point, sideLength: number, name: string) {
    super(name);
    this.start = start;
    this.sideLength = sideLength;
  }

  getStartPoint(): Point {
    return this.start;
  }

  getSideLength(): number {
    return this.sideLength;
  }

  setSideLength(length: number): void {
    if (length > 0) {
      this.sideLength = length;
      this.notifyObservers();
    }
  }

  setStartPoint(point: Point): void {
    this.start = point;
    this.notifyObservers();
  }
}
