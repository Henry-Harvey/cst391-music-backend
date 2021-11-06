export class Track {
  id: number = -1;
  number: number = -1;
  title: string = "";
  lyrics: string = "";

  constructor(id: number, title: string, number: number, lyrics: string) {
    this.id = id;
    this.number = number;
    this.title = title;
    this.lyrics = lyrics;
  }
}
