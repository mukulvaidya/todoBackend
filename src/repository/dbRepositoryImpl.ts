import "reflect-metadata";
import { getRepository } from "typeorm";
import dbRepository from "./dbrepository";
import { Todo } from "../todo";
import { injectable } from "inversify";
import { response } from "express";

@injectable()
export default class DbRepositoryImpl implements dbRepository {
  private repository = getRepository<Todo>("Todo");
  public async find(): Promise<Todo[]> {
    try {
      const list = await this.repository.find();
      return list;
    } catch (error) {
      throw new Error(error);
    }
  }
  public async findById(id: number): Promise<Todo> {
    try {
      const todo = await this.repository.findOne(id);
      return todo;
    } catch (error) {
      throw new Error(error);
    }
  }
  public async create(body: Todo): Promise<Todo> {
    try {
      const todo = await this.repository.save(body);
      return todo;
    } catch (error) {
      throw new Error(error);
    }
  }
  public async delete(id: number): Promise<any> {
    try {
      const todoid = await this.repository.delete(id);
      response.send(todoid);
    } catch (error) {
      throw new Error(error);
    }
  }
  public async complete(id: number): Promise<any> {
    try {
      const update = await this.repository
        .createQueryBuilder()
        .update(Todo)
        .set({ status: true })
        .where("id = :id", { id })
        .execute();
      return update.affected;
    } catch (error) {
      throw new Error(error);
    }
  }
}
