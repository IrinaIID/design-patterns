import { CubeEntity } from "../entities/shape-entities";

export class Cube {
  constructor(private readonly entity: CubeEntity) {}

  isCube(): boolean {
    return this.entity.getSideLength() > 0;
  }

  surfaceArea(): number {
    const a = this.entity.getSideLength();
    return 6 * a * a;
  }

  volume(): number {
    const a = this.entity.getSideLength();
    return a * a * a;
  }

  isBaseOnCoordinatePlane(): boolean {
    const p = this.entity.getStartPoint();
    const a = this.entity.getSideLength();
    return (
      p.getX() === 0 || p.getY() === 0 || p.getZ() === 0 ||
      p.getX() + a === 0 || p.getY() + a === 0 || p.getZ() + a === 0
    );
  }

  volumeRatioAfterSlice(): number {
    const p = this.entity.getStartPoint();
    const a = this.entity.getSideLength();
    const bottom = p.getZ();  // Нижняя граница куба по оси Z
    const top = p.getZ() + a; // Верхняя граница куба по оси Z
  
    // Проверка, что куб пересекает плоскость Z = 0
    if (bottom < 0 && top > 0) {
      const totalVolume = a * a * a;  // Общий объем куба
  
      // Рассчитываем объем ниже оси Z
      const below = Math.abs(bottom);  // Высота части куба ниже плоскости Z=0
      const above = top;  // Высота части куба выше плоскости Z=0
  
      // Объем ниже оси Z
      const volumeBelow = a * a * below;
      // Объем выше оси Z
      const volumeAbove = a * a * above;
  
      // Возвращаем соотношение объема ниже оси Z к общему объему
      return volumeBelow / totalVolume;
    }
  
    return 0;  // Если куб не пересекает ось Z, возвращаем 0
  }
  
}
