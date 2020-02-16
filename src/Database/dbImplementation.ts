import "reflect-metadata";
import DbInterface from "./dbInterface";
import { Connection, createConnection } from "typeorm";
import { injectable } from "inversify";

@injectable()
export default class DbImplementation implements DbInterface {
  private conn: Connection;
  public async init(): Promise<void> {
    try {
      this.conn = await createConnection();
      console.log("connection with database done");
    } catch (error) {
      throw new Error(`Database connection failed ${error}`);
    }
  }

  public async close(): Promise<void> {
    try {
      if (this.conn) {
        return await this.conn.close();
      }
    } catch (error) {
      throw new Error(`Error in closing database connection ${error}`);
    }
  }

  public getConnection(): Connection {
    return this.conn;
  }
}
