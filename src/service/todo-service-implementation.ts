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
  private dbRepo: dbRepository;

  constructor(
    @inject("dbRepository") factory: (dbRepo: string) => dbRepository
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
  public async createTodo(body: Todo): Promise<void> {
    try {
      await this.dbRepo.create(body);
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

  public async sendMail(list:any) {
    let gmailService = new GMailService();
    function convertToIst():Date {
      const dateIST = new Date();
        dateIST.setHours(dateIST.getHours() + 5);
        dateIST.setMinutes(dateIST.getMinutes() + 30);
      return dateIST;
    }
    let interval = setInterval(() => {
      let count = true;
      if (count) {
        const dateIST = convertToIst();
        list.forEach(async function(element) {
          if (element.dueDate < dateIST) {
            if (element.isComplete === false) {
              await gmailService.sendMail(
                `mukul.vaidya11@gmail.com`,
                `Todo Expired`,
                `Todo with id:${element.id} Expired`
              );
              count = false;
            }
          } else {
            interval.unref();
          }
        });
      }
    }, 10000);
  }

  @Transactional()
  public async complete(id:number):Promise<number>{
    await this.dbRepo.complete(id);
    return id;
  }
}
