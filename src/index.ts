import path from "path";
import { parseShapesFromFile } from "./utils/parser";
import { EllipseEntity, CubeEntity } from "./entities/shape-entities";
import { Ellipse } from "./shapes/ellipse";
import { Cube } from "./shapes/cube";
import { logger } from "./utils/logger";
import { ShapeRepository } from "./task-2/shape-repository";
import { Warehouse } from "./task-2/warehouse";
import { ShapeComparator, CompareStrategy } from "./task-2/comparator";

const filePath = path.join(__dirname, "data/shapes.txt");

async function main(): Promise<void> {
  try {
    const shapes = await parseShapesFromFile(filePath);
    const repo = new ShapeRepository();
    const warehouse = Warehouse.getInstance();

    shapes.forEach((shape) => {
      let currentShape;

      if (shape instanceof EllipseEntity) {
        currentShape = new Ellipse(shape.getPoint1(), shape.getPoint2(), shape.getName());
      } else if (shape instanceof CubeEntity) {
        currentShape = new Cube(shape.getStartPoint(), shape.getSideLength(), shape.getName());
      } else {
        logger.warn(`Unknown shape type: ${shape.getName()}`);
        return;
      }

      currentShape.addObserver(warehouse);
      repo.add(currentShape);
      warehouse.updateMetrics(currentShape);

      logger.info(`Shape: ${currentShape.getName()}, ID: ${currentShape.getId()}`);

      // if (currentShape instanceof Ellipse) {
      //   logger.info(` - isEllipse: ${currentShape.isEllipse()}`);
      //   logger.info(` - isCircle: ${currentShape.isCircle()}`);
      //   logger.info(` - Area: ${currentShape.area().toFixed(2)}`);
      //   logger.info(` - Perimeter: ${currentShape.perimeter().toFixed(2)}`);
      //   logger.info(` - Crosses one axis (dist=2): ${currentShape.crossesOnlyOneAxis(2)}`);
      // } else if (currentShape instanceof Cube) {
      //   logger.info(` - isCube: ${currentShape.isCube()}`);
      //   logger.info(` - Surface Area: ${currentShape.surfaceArea()}`);
      //   logger.info(` - Volume: ${currentShape.volume()}`);
      //   logger.info(` - Base on coordinate plane: ${currentShape.isBaseOnCoordinatePlane()}`);
      //   logger.info(` - Volume ratio after slice: ${currentShape.volumeRatioAfterSlice().toFixed(2)}`);
      // }

      logger.info(` - Metrics in warehouse: ${JSON.stringify(warehouse.getMetrics(currentShape.getId()))}`);
    });


    // ******* Here there is a test of sorting: ***********

    const allShapes = repo.getAll();

    logger.info("------ All shapes without sorting ------");
    allShapes.forEach(shape => {
      logger.info(`Shape: ${shape.getName()}, ID: ${shape.getId()}`);
    });

    allShapes.sort((a, b) => ShapeComparator.compare(CompareStrategy.NAME, a, b));

    logger.info("------ All shapes sorted by name ------");
    allShapes.forEach(shape => {
      logger.info(`Shape: ${shape.getName()}, ID: ${shape.getId()}`);
    });

    allShapes.sort((a, b) => ShapeComparator.compare(CompareStrategy.ID, a, b));

    logger.info("------ All shapes sorted by ID ------");
    allShapes.forEach(shape => {
      logger.info(`Shape: ${shape.getName()}, ID: ${shape.getId()}`);
    });



    // ******* Here there is a test of shape modification: ***********

    logger.info("------ ****** Show Shape modifications ***** ------");

    const cube1 = repo.findByName("cube1")[0];
    
    if (cube1 && cube1 instanceof Cube) {
      logger.info(`Old metrics cube1: ${JSON.stringify(warehouse.getMetrics(cube1.getId()))}`);
      cube1.setSideLength(5);
      logger.info(`New metrics cube1: ${JSON.stringify(warehouse.getMetrics(cube1.getId()))}`);
    }

  } catch (err) {
    logger.error(`Error: ${(err as Error).message}`);
  }
}

main();
