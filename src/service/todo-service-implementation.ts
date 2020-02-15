import "reflect-metadata";
import TodoService from "./todo-service";
import dbRepository from "../repository/dbrepository";
import { Todo } from "../todo";
import { inject, injectable } from "inversify";
import { Transactional } from "typeorm-transactional-cls-hooked";
import { GMailService } from "../mail";
import DbRepositoryImpl from "../repository/dbRepositoryImpl";

@injectable()
export default class TodoServiceImpl implements TodoService {
  public dbRepo: dbRepository;

  constructor(
    @inject("dbRepository") factory: (dbEntity: string) => dbRepository
  ) {
    this.dbRepo = factory("Todo");
  }
  @Transactional()
  public async getTodo(): Promise<Todo[]> {
    const list = await this.dbRepo.find();
    return list;
  }

  @Transactional()
  public async getById(id: number): Promise<Todo> {
    const todo = await this.dbRepo.findById(id);
    return todo;
  }

  @Transactional()
  public async createTodo(body: Todo): Promise<Todo> {
    try {
      const todo = await this.dbRepo.create(body);
      return todo;
    } catch (err) {
      console.log(err);
    }
  }

  @Transactional()
  public async deleteById(id: number): Promise<number> {
    try {
      const todo = await this.dbRepo.delete(id);
      return todo;
    } catch (error) {}
  }

  public async sendMail(list: any) {
    let gmailService = new GMailService();
    // let dbRepo = new DbRepositoryImpl(list)
    function convertToIst(): Date {
      const dateIST = new Date();
      dateIST.setHours(dateIST.getHours() + 5);
      dateIST.setMinutes(dateIST.getMinutes() + 30);
      return dateIST;
    }

    let interval = setInterval((dbRepo) => {
      let count = 0;
      const dateIST = convertToIst();
      list.forEach(async function(element) {
        if (
          (count <=5) &&
          (element.dueDate < dateIST )&&
          (!element.status)
        ) {
          await gmailService.sendMail(
            `mukul.vaidya11@gmail.com`,
            `Todo Expired`,
            `Todo with id:${element.id} Expired`
          );
          await dbRepo.complete(element.id);
          count++;
        } else {
          clearInterval(interval)
        }
      });
    }, 3600 ,this.dbRepo);
  }

  @Transactional()
  public async complete(id: number): Promise<any> {
    try {
      await this.dbRepo.complete(id);
      return id;
    } catch (error) {
      throw new Error(`Error in update service ${error}`);
    }
  }
}
