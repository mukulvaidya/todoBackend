import "reflect-metadata";
import { getRepository, UpdateQueryBuilder } from "typeorm";
import dbRepository from "./dbrepository";
import { Todo } from "../todo";
import { inject, injectable } from "inversify";
import { response } from "express";

@injectable()
export default class DbRepositoryImpl implements dbRepository {
  private repository = getRepository<Todo>("Todo");
  constructor(@inject("DbRepository") repository: any) {}

  public async find(): Promise<Todo[]> {
    const list1 = await this.repository.find();
    return list1;
  }
  public async findById(id: number): Promise<Todo> {
    const todo = await this.repository.findOne(id);
    return todo;
  }
  public async create(body: Todo): Promise<void> {
    try {
      await this.repository.save(body);
    } catch (err) {
      console.log(err);
    }
  }
  public async delete(id: number): Promise<any> {
    const todoid = await this.repository.delete(id);
    response.send(todoid);
  }
  public async complete(id: number): Promise<Todo> {
    this.repository
      .createQueryBuilder()
      .update(Todo)
      .set({ isComplete: true })
      .where("id = :id", { id });
    return await this.repository.findOne(id);
  }
}
