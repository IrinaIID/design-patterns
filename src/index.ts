import path from "path";
import { parseShapesFromFile } from "./utils/parser";
import { EllipseEntity, CubeEntity } from "./entities/shape-entities";
import { Ellipse } from "./shapes/ellipse";
import { Cube } from "./shapes/cybe";
import pino from "pino";

const filePath = path.join(__dirname, "data/shapes.txt");
const logger = pino();

const shapes = parseShapesFromFile(filePath);

shapes.forEach((shape) => {
  logger.info(`Shape: ${shape.getName()}, ID: ${shape.getId()}`);

  if (shape instanceof EllipseEntity) {
    const ellipse = new Ellipse(shape);
    logger.info(` - isEllipse: ${ellipse.isEllipse()}`);
    logger.info(` - isCircle: ${ellipse.isCircle()}`);
    logger.info(` - Area: ${ellipse.area().toFixed(2)}`);
    logger.info(` - Perimeter: ${ellipse.perimeter().toFixed(2)}`);
    logger.info(` - Crosses one axis (dist=2): ${ellipse.crossesOnlyOneAxis(2)}`);
  }

  if (shape instanceof CubeEntity) {
    const cube = new Cube(shape);
    logger.info(` - isCube: ${cube.isCube()}`);
    logger.info(` - Surface Area: ${cube.surfaceArea()}`);
    logger.info(` - Volume: ${cube.volume()}`);
    logger.info(` - Base on coordinate plane: ${cube.isBaseOnCoordinatePlane()}`);
    logger.info(` - Volume ratio after slice: ${cube.volumeRatioAfterSlice().toFixed(2)}`);
  }
});
