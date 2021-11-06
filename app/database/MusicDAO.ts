import { Album } from "../models/Album";
import { Artist } from "../models/Artist";
import { Track } from "../models/Track";
import * as mysql from "mysql";
import * as util from "util";

export class MusicDAO {
  private host: string;
  private username: string;
  private password: string;
  private schema: string;
  private pool: any;

  constructor() {
    this.host = "us-cdbr-east-04.cleardb.com";
    this.username = "ba82035eec0682";
    this.password = "6dee523b";
    this.schema = "heroku_11dd3af44eab17c";
    this.pool = this.initDbConnection();
  }

  private initDbConnection(): any {
    return mysql.createPool({
      host: this.host,
      port: this.port,
      user: this.username,
      password: this.password,
      database: this.schema,
      connectionLimit: 10,
    });
  }

  public createAlbum(album: Album, callback: any) {
    this.pool.getConnection(async (err: any, connection: any) => {
      connection.release();
      if (err) throw err;

      let albumId: number;

      await connection.query(
        `INSERT INTO ALBUM (TITLE, ARTIST, YEAR, IMAGE_NAME, DESCRIPTION) VALUES ("${album.title}", "${album.artist}", ${album.year}, "1.jpg", "${album.description}")`,
        (err: any, result: any) => {
          if (err) throw err;
          albumId = result.insertId;
          album.tracks.map(async (track: any) => {
            connection.query(
              `INSERT INTO TRACK (ALBUM_ID, TITLE, NUMBER, VIDEO_URL, LYRICS) VALUES ("${albumId}", "${track.title}", "${track.number}", "https://video123456.com", "${track.lyrics}")`,
              (err: any, result: any) => {
                if (err) throw err;
              }
            );
          });
          callback(albumId);
        }
      );
    });
  }

  public readAlbumById(albumId: string, callback: any) {
    this.pool.getConnection(async function (err: any, connection: any) {
      connection.release();
      if (err) throw err;

      connection.query = util.promisify(connection.query);

      let resultTracks = await connection.query(
        "SELECT * FROM TRACK WHERE ALBUM_ID = ?",
        [albumId]
      );

      let tracks: Track[] = [];
      resultTracks.map(async (track: any) => {
        tracks.push(
          new Track(track.ID, track.TITLE, track.NUMBER, track.LYRICS)
        );
      });

      let resultAlbum = await connection.query(
        "SELECT * FROM ALBUM WHERE ID = ? LIMIT 1",
        [albumId]
      );

      const album: Album = new Album(
        resultAlbum[0].ID,
        resultAlbum[0].TITLE,
        resultAlbum[0].ARTIST,
        resultAlbum[0].DESCRIPTION,
        resultAlbum[0].YEAR,
        tracks
      );
      callback(album);
    });
  }

  public readAlbumsByArtist(artist: string, callback: any) {
    let albums: Album[] = [];

    this.pool.getConnection(async function (err: any, connection: any) {
      connection.release();
      if (err) throw err;
      connection.query = util.promisify(connection.query);

      let resultAlbums = await connection.query(
        "SELECT * FROM ALBUM WHERE ARTIST = ?",
        [artist]
      );

      const promise = Promise.all(
        resultAlbums.map(async (album: any) => {
          let resultTracks = await connection.query(
            "SELECT * FROM TRACK WHERE ALBUM_ID = ?",
            [album.ID]
          );
          let tracks: Track[] = [];
          resultTracks.map(async (track: any) => {
            tracks.push(
              new Track(track.ID, track.TITLE, track.NUMBER, track.LYRICS)
            );
          });
          albums.push(
            new Album(
              album.ID,
              album.TITLE,
              album.ARTIST,
              album.DESCRIPTION,
              album.YEAR,
              tracks
            )
          );
        })
      );
      await promise;
      callback(albums);
    });
  }

  public readAlbumsByDescription(description: string, callback: any) {
    let albums: Album[] = [];

    this.pool.getConnection(async function (err: any, connection: any) {
      connection.release();
      if (err) throw err;
      connection.query = util.promisify(connection.query);

      let resultAlbums = await connection.query(
        "SELECT * FROM ALBUM WHERE DESCRIPTION = ?",
        [description]
      );

      const promise = Promise.all(
        resultAlbums.map(async (album: any) => {
          let resultTracks = await connection.query(
            "SELECT * FROM TRACK WHERE ALBUM_ID = ?",
            [album.ID]
          );
          let tracks: Track[] = [];
          resultTracks.map(async (track: any) => {
            tracks.push(
              new Track(track.ID, track.TITLE, track.NUMBER, track.LYRICS)
            );
          });
          albums.push(
            new Album(
              album.ID,
              album.TITLE,
              album.ARTIST,
              album.DESCRIPTION,
              album.YEAR,
              tracks
            )
          );
        })
      );
      await promise;
      callback(albums);
    });
  }

  public readAllAlbums(callback: any) {
    let albums: Album[] = [];

    this.pool.getConnection(async function (err: any, connection: any) {
      connection.release();
      if (err) throw err;
      connection.query = util.promisify(connection.query);

      let resultAlbums = await connection.query("SELECT * FROM ALBUM");

      const promise = Promise.all(
        resultAlbums.map(async (album: any) => {
          let resultTracks = await connection.query(
            "SELECT * FROM TRACK WHERE ALBUM_ID = ?",
            [album.ID]
          );
          let tracks: Track[] = [];
          resultTracks.map(async (track: any) => {
            tracks.push(
              new Track(track.ID, track.TITLE, track.NUMBER, track.LYRICS)
            );
          });
          albums.push(
            new Album(
              album.ID,
              album.TITLE,
              album.ARTIST,
              album.DESCRIPTION,
              album.YEAR,
              tracks
            )
          );
        })
      );
      await promise;
      callback(albums);
    });
  }

  public readAllArtists(callback: any) {
    let artists: Artist[] = [];

    this.pool.getConnection(function (err: any, connection: any) {
      if (err) throw err;

      connection.query(
        "SELECT DISTINCT ARTIST FROM ALBUM",
        function (err: any, rows: any, fields: any) {
          connection.release();
          if (err) throw err;

          for (let i = 0; i < rows.length; ++i) {
            artists.push(new Artist(i, rows[i].ARTIST));
          }
          callback(artists);
        }
      );
    });
  }

  public updateAlbum(album: Album, callback: any) {
    this.pool.getConnection(async (err: any, connection: any) => {
      connection.release();
      if (err) throw err;

      await connection.query(
        `UPDATE ALBUM SET TITLE = "${album.title}", ARTIST = "${album.artist}", YEAR = "${album.year}", IMAGE_NAME = "1.png", DESCRIPTION = "${album.description}" WHERE ID = "${album.id}"`,
        (err: any, result: any) => {
          if (err) throw err;
          album.tracks.map(async (track: any) => {
            connection.query(
              `UPDATE TRACK SET TITLE = "${track.title}", NUMBER = "${track.number}", VIDEO_URL = "https://video54321.com", LYRICS = "${track.lyrics}" WHERE ID = "${track.id}"`,
              (err: any, result: any) => {
                if (err) throw err;
              }
            );
          });
          callback(result.affectedRows);
        }
      );
    });
  }

  public deleteAlbum(albumId: number, callback: any) {
    this.pool.getConnection(async function (err: any, connection: any) {
      connection.release();
      if (err) throw err;
      connection.query = util.promisify(connection.query);

      connection.query(
        "DELETE FROM TRACK WHERE ALBUM_ID = ?",
        [albumId],
        (err: any, result: any) => {
          if (err) throw err;
        }
      );

      connection.query(
        "DELETE FROM ALBUM WHERE ID = ?",
        [albumId],
        (err: any, result: any) => {
          if (err) throw err;
          callback(result.affectedRows);
        }
      );
    });
  }
}
