import { Point } from "../entities/main-entities";
import { Ellipse } from "./ellipse";

describe("Ellipse class tests", () => {
  it("should return true if the points are not aligned along the x or y axis (isEllipse)", () => {
    const point1 = new Point(0, 0);
    const point2 = new Point(4, 5);
    const ellipse = new Ellipse(point1, point2, "Ellipse1");

    expect(ellipse.isEllipse()).toBe(true);
  });

  it("should return true if the ellipse is a circle (isCircle)", () => {
    const point1 = new Point(0, 0);
    const point2 = new Point(4, 4);
    const ellipse = new Ellipse(point1, point2, "Circle1");

    expect(ellipse.isCircle()).toBe(true);
  });

  it("should correctly calculate the area of the ellipse", () => {
    const point1 = new Point(0, 0);
    const point2 = new Point(4, 5);
    const ellipse = new Ellipse(point1, point2, "Ellipse1");

    expect(ellipse.area()).toBeCloseTo(15.708, 3);
  });

  it("should return false for isEllipse when aligned on one axis", () => {
    const point1 = new Point(0, 0);
    const point2 = new Point(4, 0);
    const ellipse = new Ellipse(point1, point2, "Flat");

    expect(ellipse.isEllipse()).toBe(false);
  });

  it("should return false for isCircle when axes lengths are different", () => {
    const point1 = new Point(0, 0);
    const point2 = new Point(5, 3);
    const ellipse = new Ellipse(point1, point2, "NotCircle");

    expect(ellipse.isCircle()).toBe(false);
  });

  it("should return true when ellipse crosses only one axis", () => {
    const point1 = new Point(-3, 5);
    const point2 = new Point(3, 6);
    const ellipse = new Ellipse(point1, point2, "CrossesX");

    expect(ellipse.crossesOnlyOneAxis(2)).toBe(true);
  });

  it("should return false when ellipse crosses both axes", () => {
    const point1 = new Point(-3, -3);
    const point2 = new Point(3, 3);
    const ellipse = new Ellipse(point1, point2, "CrossesXY");

    expect(ellipse.crossesOnlyOneAxis(2)).toBe(false);
  });
});
