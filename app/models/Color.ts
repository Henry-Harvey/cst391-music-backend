export class Color {
  id: number = -1;
  name: string = "";
  hex: string = "";
  timestamp: string = "";

  constructor(id: number, name: string, hex: string, timestamp: string) {
    this.id = id;
    this.name = name;
    this.hex = hex;
    this.timestamp = timestamp;
  }
}
