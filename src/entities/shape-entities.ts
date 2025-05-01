import { Point, Shape } from "./main-entities";

export class EllipseEntity extends Shape {
  constructor(
    private point1: Point,
    private point2: Point,
    name: string
  ) {
    super(name);
  }

  getPoint1(): Point {
    return this.point1;
  }

  getPoint2(): Point {
    return this.point2;
  }
}

export class CubeEntity extends Shape {
  constructor(
    private start: Point,
    private sideLength: number,
    name: string
  ) {
    super(name);
  }

  getStartPoint(): Point {
    return this.start;
  }

  getSideLength(): number {
    return this.sideLength;
  }
}
