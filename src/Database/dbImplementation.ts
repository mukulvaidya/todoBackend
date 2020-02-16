import "reflect-metadata";
import DbInterface from "./dbInterface";
import { Connection, createConnection, getConnectionOptions } from "typeorm";
import { injectable } from "inversify";

@injectable()
export default class DbImplementation implements DbInterface {
  private conn: Connection;
  public async init(): Promise<void> {
    try {
      console.log("Creating tables");
      this.conn = await createConnection();
    } catch (error) {
      console.log(error);
      throw new Error(`Database connection failed`);
    }
  }

  public async close(): Promise<void> {
    try {
      if (this.conn) {
        return await this.conn.close();
      }
    } catch (error) {
      throw new Error(`Error in closing database connection`);
    }
  }

  public getConnection(): Connection {
    return this.conn;
  }
}
