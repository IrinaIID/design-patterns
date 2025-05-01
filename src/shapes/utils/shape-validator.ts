// export class ShapeValidator {
//   static isValidEllipseInput(data: number[]): boolean {
//     if (data.length < 4) return false;
//     return data.every(n => typeof n === 'number' && !isNaN(n));
//   }

//   static isValidCubeInput(data: number[]): boolean {
//     if (data.length < 4) return false;
//     const side = data[3];
//     return data.every(n => typeof n === 'number' && !isNaN(n)) && side > 0;
//   }
// }


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