import { Shape } from "../entities/main-entities";
import { Cube } from "../shapes/cube";
import { Ellipse } from "../shapes/ellipse";

export enum CompareStrategy {
  ID = "ID",
  NAME = "NAME",
  FIRST_POINT_X = "FIRST_POINT_X",
  FIRST_POINT_Y = "FIRST_POINT_Y",
}

export class ShapeComparator {
  static compare(strategy: CompareStrategy, a: Shape, b: Shape): number {
    switch (strategy) {
      case CompareStrategy.ID:
        if (a.getId() === b.getId()) return 0;
        return a.getId() > b.getId() ? 1 : -1;

      case CompareStrategy.NAME:
        if (a.getName() === b.getName()) return 0;
        return a.getName() > b.getName() ? 1 : -1;

      case CompareStrategy.FIRST_POINT_X:
        return ShapeComparator.getFirstX(a) - ShapeComparator.getFirstX(b);

      case CompareStrategy.FIRST_POINT_Y:
        return ShapeComparator.getFirstY(a) - ShapeComparator.getFirstY(b);

      default:
        return 0;
    }
  }

  private static getFirstX(shape: Shape): number {
    if (shape instanceof Cube) {
      return shape.getStartPoint().getX();
    }
    if (shape instanceof Ellipse) {
      return shape.getPoint1().getX();
    }
    return 0;
  }

  private static getFirstY(shape: Shape): number {
    if (shape instanceof Cube) {
      return shape.getStartPoint().getY();
    }
    if (shape instanceof Ellipse) {
      return shape.getPoint1().getY();
    }
    return 0;
  }
}
