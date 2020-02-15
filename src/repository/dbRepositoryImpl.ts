import "reflect-metadata";
import { getRepository } from "typeorm";
import dbRepository from "./dbrepository";
import { Todo } from "../todo";
import { inject, injectable, unmanaged } from "inversify";
import { response } from "express";

@injectable()
export default class DbRepositoryImpl implements dbRepository {
  private repository = getRepository<Todo>("Todo");
  constructor(
  ) {} //  constructor( @inject('TodoService') private service: TodoService) { }

  public async find(): Promise<Todo[]> {
    const list1 = await this.repository.find();
    return list1;
  }
  public async findById(id: number): Promise<Todo> {
    const todo = await this.repository.findOne(id);
    return todo;
  }
  public async create(body: Todo): Promise<Todo> {
    try {
      const todo = await this.repository.save(body);
      return todo;
    } catch (err) {
      console.log(err);
    }
  }
  public async delete(id: number): Promise<any> {
    const todoid = await this.repository.delete(id);
    response.send(todoid);
  }
  public async complete(id: number): Promise<any> {
    const update = await this.repository
      .createQueryBuilder()
      .update(Todo)
      .set({ status: true })
      .where("id = :id", { id }).execute();
    return update.affected;
  }
}
