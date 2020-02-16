import { Connection } from "typeorm";

export default interface DbInterface{
    init():Promise<void>;
    close():Promise<void>;
    getConnection(): Connection | any;
}