import { Color } from "../models/Color";
import * as mysql from "mysql";
import * as util from "util";

export class ColorDAO {
  private host: string;
  private port: number;
  private username: string;
  private password: string;
  private schema: string;
  private pool: any;

  constructor() {
    this.host = "us-cdbr-east-04.cleardb.com";
    this.port = 3306;
    this.username = "b6edda3ad03e90";
    this.password = "6d063e29";
    this.schema = "heroku_b2065b1afda59db";
    this.pool = this.initDbConnection();
  }

  // Initializes connection to the database
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

  // Creates a color in the database
  public createColor(color: Color, callback: any) {
    this.pool.getConnection(async (err: any, connection: any) => {
      connection.release();
      if (err) throw err;

      await connection.query(
        `INSERT INTO COLORS (NAME, HEX, TIMESTAMP) VALUES ("${color.name}", "${color.hex}", "${color.timestamp}")`,
        (err: any, result: any) => {
          if (err) throw err;
          color.id = result.insertId;
          callback(color);
        }
      );
    });
  }

  // Reads a color from the database
  public readColor(id: string, callback: any) {
    this.pool.getConnection(async function (err: any, connection: any) {
      connection.release();
      if (err) throw err;

      connection.query = util.promisify(connection.query);

      let result = await connection.query(
        "SELECT * FROM COLORS WHERE ID = ? LIMIT 1",
        [id]
      );
      console.log(result[0].id);

      const color: Color = new Color(
        result[0].id,
        result[0].name,
        result[0].hex,
        result[0].timestamp
      );

      callback(color);
    });
  }

  // Reads all of the colors from the database
  public readAllColors(callback: any) {
    this.pool.getConnection(async function (err: any, connection: any) {
      connection.release();
      if (err) throw err;
      connection.query = util.promisify(connection.query);

      let result = await connection.query("SELECT * FROM COLORS");

      let colors: Color[] = [];
      const promise = Promise.all(
        result.map(async (color: any) => {
          colors.push(
            new Color(color.id, color.name, color.hex, color.timestamp)
          );
        })
      );
      await promise;
      callback(colors);
    });
  }

  // Updates a color in the database
  public updateColor(color: Color, callback: any) {
    this.pool.getConnection(async (err: any, connection: any) => {
      connection.release();
      if (err) throw err;

      await connection.query(
        `UPDATE COLORS SET NAME = "${color.name}", HEX = "${color.hex}", TIMESTAMP = "${color.timestamp}" WHERE ID = "${color.id}"`,
        (err: any, result: any) => {
          if (err) throw err;
          console.log(result);
          callback(result.affectedRows);
        }
      );
    });
  }

  // Deletes a color from the database
  public deleteColor(id: string, callback: any) {
    this.pool.getConnection(async function (err: any, connection: any) {
      connection.release();
      if (err) throw err;
      connection.query = util.promisify(connection.query);

      connection.query(
        "DELETE FROM COLORS WHERE ID = ?",
        [id],
        (err: any, result: any) => {
          if (err) throw err;
          callback(result.affectedRows);
        }
      );
    });
  }
}
