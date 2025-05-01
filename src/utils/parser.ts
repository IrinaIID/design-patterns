import fs from "fs";
import { ShapeFactory } from "../shapes/shape-factory";
import { InputValidator } from "../shapes/utils/shape-validator";
import pino from "pino";
import { Shape } from "../entities/main-entities";

const logger = pino();

export class InvalidShapeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidShapeError";
  }
}

export function parseShapesFromFile(filePath: string): Shape[] {
  const shapes: Shape[] = [];

  if (!fs.existsSync(filePath)) {
    logger.error(`File not found: ${filePath}`);
    return shapes;
  }

  const lines = fs.readFileSync(filePath, "utf-8").split(/\r?\n/);

  for (const line of lines) {
    if (!line.trim()) continue;

    const parts = line.trim().split(/\s+/);
    const [typeRaw, name, ...coordStrings] = parts;

    if (!typeRaw || !name || coordStrings.length === 0) {
      logger.warn(`Skipped line (not enough data): "${line}"`);
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

    try {
      const shape = ShapeFactory.createShape(typeRaw, coords, name);
      shapes.push(shape);
    } catch (e) {
      logger.error(`Error creating shape from line "${line}": ${(e as Error).message}`);
    }
  }

  return shapes;
}