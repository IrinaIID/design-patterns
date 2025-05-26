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

export interface Observer {
  updateMetrics(shape: Shape): void;
}

export interface Subject {
  addObserver(observer: Observer): void;
  removeObserver(observer: Observer): void;
  notifyObservers(): void;
}

export class Shape implements Subject {
  private name: string;
  private id: string;
  private observers: Observer[] = [];

  constructor(name: string) {
    this.name = name;
    this.id = uuidv4();
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
    this.notifyObservers();
  }

  getId(): string {
    return this.id;
  }

  addObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer): void {
    this.observers = this.observers.filter(observerInList => observerInList !== observer);
  }

  notifyObservers(): void {
    this.observers.forEach(observerInList => observerInList.updateMetrics(this));
  }
}
