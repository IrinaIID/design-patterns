import { Point } from "../entities/main-entities";
import { EllipseEntity, CubeEntity } from "../entities/shape-entities";

export class ShapeFactory {
  static createShape(type: string, coords: number[], name: string): EllipseEntity | CubeEntity {
    switch (type.toLowerCase()) {
      case 'ellipse':
        return this.createEllipse(name, coords);
      case 'cube':
        return this.createCube(name, coords);
      default:
        throw new Error(`Unknown shape type: ${type}`);
    }
  }

  private static createEllipse(name: string, coords: number[]): EllipseEntity {
    if (coords.length !== 4) {
      throw new Error('Invalid number of coordinates for Ellipse');
    }
    const [x1, y1, x2, y2] = coords;
    return new EllipseEntity(new Point(x1, y1), new Point(x2, y2), name);
  }

  private static createCube(name: string, coords: number[]): CubeEntity {
    if (coords.length !== 4) {
      throw new Error('Invalid number of coordinates for Cube');
    }
    const [x, y, z, sideLength] = coords;
    if (sideLength <= 0) {
      throw new Error('Cube side length must be positive');
    }
    return new CubeEntity(new Point(x, y, z), sideLength, name);
  }
}