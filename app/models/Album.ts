import { Track } from "./Track";

export class Album {
  id: number = -1;
  title: string = "";
  artist: string = "";
  description: string = "";
  year: number = -1;
  tracks: Track[];

  constructor(
    id: number,
    title: string,
    artist: string,
    description: string,
    year: number,
    tracks: Track[]
  ) {
    this.id = id;
    this.title = title;
    this.artist = artist;
    this.description = description;
    this.year = year;
    this.tracks = tracks;
  }
}
