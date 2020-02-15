import Todo from '../todo/todo-entity'

export default interface dbRepository{
    find() :Promise<Todo[]>;
    findById(id:number): Promise<Todo>
    create(todo:Todo): Promise<Todo>
    delete(id:number): Promise<any>
    complete(id:number): Promise<any>
}