import Todo from "../todo/todo-entity";

export default interface dbRepository {
  find(): Promise<Todo[]>;
  findById(id: number): Promise<Todo>;
  create(todo: Todo): Promise<void>;
  delete(id: number): Promise<any>;
  complete(id: number): Promise<Todo>;
}
