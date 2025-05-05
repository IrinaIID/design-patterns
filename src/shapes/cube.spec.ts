import { Point } from "../entities/main-entities";
import { Cube } from "./cube";

describe("Cube Tests", () => {
  const startPoint = new Point(1, 1, 1);
  const sideLength = 3;

  it("should return true if the shape is a cube with a positive side length", () => {
    const cube = new Cube(startPoint, sideLength, "Cube1");

    expect(cube.isCube()).toBe(true);
  });

  it("should return 0 for cube not intersecting the Z-axis", () => {
    const startPoint = new Point(1, 1, 3);
    const cube = new Cube(startPoint, sideLength, "Cube1");

    expect(cube.volumeRatioAfterSlice()).toBe(0);
  });

  it("should correctly calculate surface area of the cube", () => {
    const cube = new Cube(startPoint, sideLength, "Cube1");

    expect(cube.surfaceArea()).toBe(54);
  });

  it("should correctly calculate volume of the cube", () => {
    const cube = new Cube(startPoint, sideLength, "Cube1");

    expect(cube.volume()).toBe(27);
  });

  it("should return true if cube's base is on the coordinate plane", () => {
    const startPoint = new Point(0, 3, 3);
    const cube = new Cube(startPoint, sideLength, "CubeOnX");

    expect(cube.isBaseOnCoordinatePlane()).toBe(true);
  });

  it("should return false if cube's base is not on the coordinate plane", () => {
    const startPoint = new Point(2, 3, 4);
    const cube = new Cube(startPoint, sideLength, "CubeNotOnPlane");

    expect(cube.isBaseOnCoordinatePlane()).toBe(false);
  });

  it("should return volume ratio for cube crossing Z-axis", () => {
    const startPoint = new Point(-1, -1, -1);
    const cube = new Cube(startPoint, sideLength, "CubeCrossesZ");
  
    expect(cube.volumeRatioAfterSlice()).toBeCloseTo(0.3333, 3);
  });
});
