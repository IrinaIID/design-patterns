import { v4 as uuidv4 } from 'uuid';

export class Point {
  private x: number;
  private y: number;
  private z: number;

  constructor(x: number, y: number, z: number = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  
  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  getZ(): number {
    return this.z;
  }

  getPoint(): number[] {
    return [this.x, this.y, this.z];
  }
}

export class Shape {
  private name: string;
  private id: string;

  constructor(name: string) {
    this.name = name;
    this.id = uuidv4();
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getId(): string {
    return this.id;
  }
}