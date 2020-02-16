import { Todo } from "../todo";

export default interface TodoService {
  createTodo(body: any): Promise<Todo>;
  getTodo(): Promise<Todo[]>;
  getById(id: number): Promise<Todo>;
  deleteById(id: number): Promise<number>;
  sendMail(list: any): any;
  complete(id: number): Promise<any>;
}
