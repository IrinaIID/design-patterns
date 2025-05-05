import fs from "fs/promises";
import { ShapeFactory } from "../shapes/shape-factory";
import { InputValidator } from "../shapes/utils/shape-validator";
import { Shape } from "../entities/main-entities";
import { logger } from "./logger";

export async function parseShapesFromFile(filePath: string): Promise<Shape[]> {
  const shapes: Shape[] = [];

  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    const lines = fileContent.split(/\r?\n/);

    for (const line of lines) {
      if (!line.trim()) continue;

      const parts = line.trim().split(/\s+/);
      const [typeRaw, name, ...coordStrings] = parts;

      if (!typeRaw || !name || coordStrings.length === 0) {
        logger.info(`Skipped line (not enough data): "${line}"`);
        continue;
      }

      const type = typeRaw.toLowerCase();
      const coords = coordStrings.map((s) => Number(s));

      if (coordStrings.some((s) => isNaN(Number(s)))) {
        logger.warn(`Failed to parse numbers in line: "${line}"`);
        continue;
      }

      let isValid = false;

      switch (type) {
        case "ellipse":
          isValid = InputValidator.validateEllipseInput(coords);
          break;
        case "cube":
          isValid = InputValidator.validateCubeInput(coords);
          break;
        default:
          logger.warn(`Unknown shape type: "${type}" in line: "${line}"`);
          continue;
      }

      if (!isValid) {
        logger.warn(`Invalid coordinates for ${type}: "${line}"`);
        continue;
      }

      const shape = ShapeFactory.createShape(typeRaw, coords, name);
      shapes.push(shape);

    }
  } catch (err) {
    logger.error(`Failed to read file: ${filePath}. Error: ${(err as Error).message}`);
  }

  return shapes;
}
