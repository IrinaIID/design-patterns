import path from "path";
import { parseShapesFromFile } from "./utils/parser";
import { EllipseEntity, CubeEntity } from "./entities/shape-entities";
import { Ellipse } from "./shapes/ellipse";
import { Cube } from "./shapes/cube";
import { logger } from "./utils/logger";

const filePath = path.join(__dirname, "data/shapes.txt");

async function main(): Promise<void> {
  try {
    const shapes = await parseShapesFromFile(filePath);

    console.log('----------------------------------');

    shapes.forEach((shape) => {
      logger.info(`Shape: ${shape.getName()}, ID: ${shape.getId()}`);

      if (shape instanceof EllipseEntity) {
        const ellipse = new Ellipse(shape.getPoint1(), shape.getPoint2(), shape.getName());

        logger.info(` - isEllipse: ${ellipse.isEllipse()}`);
        logger.info(` - isCircle: ${ellipse.isCircle()}`);
        logger.info(` - Area: ${ellipse.area().toFixed(2)}`);
        logger.info(` - Perimeter: ${ellipse.perimeter().toFixed(2)}`);
        logger.info(` - Crosses one axis (dist=2): ${ellipse.crossesOnlyOneAxis(2)}`);

      } else if (shape instanceof CubeEntity) {
        const cube = new Cube(shape.getStartPoint(), shape.getSideLength(), shape.getName());
        
        logger.info(` - isCube: ${cube.isCube()}`);
        logger.info(` - Surface Area: ${cube.surfaceArea()}`);
        logger.info(` - Volume: ${cube.volume()}`);
        logger.info(` - Base on coordinate plane: ${cube.isBaseOnCoordinatePlane()}`);
        logger.info(` - Volume ratio after slice: ${cube.volumeRatioAfterSlice().toFixed(2)}`);
      } else {
        logger.warn(`Unknown shape type for shape: ${shape.getName()}`);
      }
    });
  } catch (err) {
    logger.error(`Error: ${(err as Error).message}`);
  }
}

main();
