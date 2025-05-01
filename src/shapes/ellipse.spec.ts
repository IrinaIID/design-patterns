import { EllipseEntity } from "../entities/shape-entities";
import { Point } from "../entities/main-entities";
import { Ellipse } from "./ellipse";

describe('Ellipse isEllipse() Tests', () => {
  it('should return true if the points are not aligned along the x or y axis', () => {
    const point1 = new Point(0, 0);
    const point2 = new Point(4, 5);
    const ellipseEntity = new EllipseEntity(point1, point2, 'Ellipse1');
    const ellipse = new Ellipse(ellipseEntity);

    expect(ellipse.isEllipse()).toBe(true);
  });

  it('should return true if the ellipse is a circle (equal radius in x and y directions)', () => {
    const point1 = new Point(0, 0);
    const point2 = new Point(4, 4);
    const ellipseEntity = new EllipseEntity(point1, point2, 'Circle1');
    const ellipse = new Ellipse(ellipseEntity);

    expect(ellipse.isCircle()).toBe(true);
  });

  it('should correctly calculate the area of the ellipse', () => {
    const point1 = new Point(0, 0);
    const point2 = new Point(4, 5);
    const ellipseEntity = new EllipseEntity(point1, point2, 'Ellipse1');
    const ellipse = new Ellipse(ellipseEntity);

    expect(ellipse.area()).toBeCloseTo(15.708, 3);
  });
});
