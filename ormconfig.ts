import { ConnectionOptions } from 'typeorm';
import { Todo } from './src/todo';


const ormConfig: ConnectionOptions = {
  name:"default",
  type: 'postgres',
  host: 'localhost',
  database: 'postgres'  ,
  username: 'postgres',
  password: '123456',
  port: 5433,
  synchronize: true,
  entities: [Todo]
};
export = ormConfig
