import { Point } from "../entities/main-entities";
import { CubeEntity } from "../entities/shape-entities";
import { Cube } from "./cybe";


describe('Cube Tests', () => {
  const startPoint = new Point(1, 1, 1);
  const sideLength = 3;

  it('should return true if the shape is a cube with a positive side length', () => {
    const cubeEntity = new CubeEntity(startPoint, sideLength, 'Cube1');
    const cube = new Cube(cubeEntity);

    expect(cube.isCube()).toBe(true);
  });

  it('should return 0 for cube not intersecting the Z-axis', () => {
    const cubeEntity = new CubeEntity(startPoint, sideLength, 'Cube1');
    const cube = new Cube(cubeEntity);

    expect(cube.volumeRatioAfterSlice()).toBe(0);
  });

  it('should correctly calculate surface area of the cube', () => {
    const cubeEntity = new CubeEntity(startPoint, sideLength, 'Cube1');
    const cube = new Cube(cubeEntity);

    expect(cube.surfaceArea()).toBe(54);
  });
});

