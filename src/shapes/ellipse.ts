import { Point } from "../entities/main-entities";
import { EllipseEntity } from "../entities/shape-entities";

export class Ellipse extends EllipseEntity {
  constructor(point1: Point, point2: Point, name: string) {
    super(point1, point2, name);
  }

  isEllipse(): boolean {
    const point1 = this.getPoint1();
    const point2 = this.getPoint2();
    return point1.getX() !== point2.getX() && point1.getY() !== point2.getY();
  }

  isCircle(): boolean {
    const point1 = this.getPoint1();
    const point2 = this.getPoint2();
    return Math.abs(point1.getX() - point2.getX()) === Math.abs(point1.getY() - point2.getY());
  }

  area(): number {
    const point1 = this.getPoint1();
    const point2 = this.getPoint2();
    const a = Math.abs(point1.getX() - point2.getX()) / 2;
    const b = Math.abs(point1.getY() - point2.getY()) / 2;
    return Math.PI * a * b;
  }

  perimeter(): number {
    const point1 = this.getPoint1();
    const point2 = this.getPoint2();
    const a = Math.abs(point1.getX() - point2.getX()) / 2;
    const b = Math.abs(point1.getY() - point2.getY()) / 2;
    const h = Math.pow(a - b, 2) / Math.pow(a + b, 2);
    return Math.PI * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));
  }

  crossesOnlyOneAxis(distance: number): boolean {
    const point1 = this.getPoint1();
    const point2 = this.getPoint2();
    const x1 = point1.getX();
    const x2 = point2.getX();
    const y1 = point1.getY();
    const y2 = point2.getY();

    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);

    const crossesX = minX <= 0 && maxX >= 0 && (maxX - minX) >= distance;
    const crossesY = minY <= 0 && maxY >= 0 && (maxY - minY) >= distance;

    return (crossesX && !crossesY) || (!crossesX && crossesY);
  }
}
