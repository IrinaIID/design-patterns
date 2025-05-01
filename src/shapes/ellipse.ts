import { EllipseEntity } from "../entities/shape-entities";

export class Ellipse {
  constructor(private readonly entity: EllipseEntity) {}

  isEllipse(): boolean {
    const p1 = this.entity.getPoint1();
    const p2 = this.entity.getPoint2();
    return p1.getX() !== p2.getX() && p1.getY() !== p2.getY();
  }

  isCircle(): boolean {
    const p1 = this.entity.getPoint1();
    const p2 = this.entity.getPoint2();
    return Math.abs(p1.getX() - p2.getX()) === Math.abs(p1.getY() - p2.getY());
  }

  area(): number {
    const a = Math.abs(this.entity.getPoint1().getX() - this.entity.getPoint2().getX()) / 2;
    const b = Math.abs(this.entity.getPoint1().getY() - this.entity.getPoint2().getY()) / 2;
    return Math.PI * a * b;
  }

  perimeter(): number {
    const a = Math.abs(this.entity.getPoint1().getX() - this.entity.getPoint2().getX()) / 2;
    const b = Math.abs(this.entity.getPoint1().getY() - this.entity.getPoint2().getY()) / 2;
    const h = Math.pow(a - b, 2) / Math.pow(a + b, 2);
    return Math.PI * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));
  }

  crossesOnlyOneAxis(distance: number): boolean {
    const x1 = this.entity.getPoint1().getX();
    const x2 = this.entity.getPoint2().getX();
    const y1 = this.entity.getPoint1().getY();
    const y2 = this.entity.getPoint2().getY();

    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);

    const crossesX = minX <= 0 && maxX >= 0 && (maxX - minX) >= distance;
    const crossesY = minY <= 0 && maxY >= 0 && (maxY - minY) >= distance;

    return (crossesX && !crossesY) || (!crossesX && crossesY);
  }
}
