export class InputValidator {
  static validateEllipseInput(coords: number[]): boolean {
    if (coords.length !== 4) return false;
    return coords.every(n => typeof n === 'number' && !isNaN(n));
  }

  static validateCubeInput(coords: number[]): boolean {
    if (coords.length !== 4) return false;
    const sideLength = coords[3];
    const isValidNumbers = coords.every(n => typeof n === 'number' && !isNaN(n));
    return isValidNumbers && sideLength > 0;
  }
}