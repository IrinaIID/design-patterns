import { Point } from "../entities/main-entities";
import { CubeEntity } from "../entities/shape-entities";


export class Cube extends CubeEntity {
  constructor(startPoint: Point, sideLength: number, name: string) {
    super(startPoint, sideLength, name);
  }

  isCube(): boolean {
    return this.getSideLength() > 0;
  }

  surfaceArea(): number {
    const sideLength = this.getSideLength();
    return 6 * sideLength * sideLength;
  }

  volume(): number {
    const sideLength = this.getSideLength();
    return  Math.pow(sideLength, 3);
  }

  isBaseOnCoordinatePlane(): boolean {
    const point = this.getStartPoint();
    const sideLength = this.getSideLength();
    return (
      point.getX() === 0 ||
      point.getY() === 0 ||
      point.getZ() === 0 ||
      point.getX() + sideLength === 0 ||
      point.getY() + sideLength === 0 || 
      point.getZ() + sideLength === 0
    );
  }

  volumeRatioAfterSlice(): number {
    const point = this.getStartPoint();
    const sideLength = this.getSideLength();
    const bottom = point.getZ();
    const top = point.getZ() + sideLength;

    if (bottom < 0 && top > 0) {
      const totalVolume = Math.pow(sideLength, 3);
      const below = Math.abs(bottom);
      const volumeBelow = sideLength * sideLength * below;
      return volumeBelow / totalVolume;
    }

    return 0;
  }
}
