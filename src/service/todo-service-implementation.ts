import "reflect-metadata";
import TodoService from "./todo-service";
import dbRepository from "../repository/dbrepository";
import { Todo } from "../todo";
import { inject, injectable } from "inversify";
import { Transactional } from "typeorm-transactional-cls-hooked";
import { GMailService } from "../mail";

@injectable()
export default class TodoServiceImpl implements TodoService {
  public dbRepo: dbRepository;

  constructor(
    @inject("dbRepository") repo: (databaseEntity: string) => dbRepository
  ) {
    this.dbRepo = repo("Todo");
  }
  @Transactional()
  public async getTodo(): Promise<Todo[]> {
    try {
      const list = await this.dbRepo.find();
      return list;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Transactional()
  public async getById(id: number): Promise<Todo> {
    try {
      const todo = await this.dbRepo.findById(id);
      return todo;
    } catch (error) {
      throw new Error(error);
    }
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
    } catch (error) {
      throw new Error(error);
    }
  }

  //Method For sending mail after Todo is expired
  public async sendMail(list: any) {
    let gmailService = new GMailService();

    // Function for converting date from UTC format to IST format
    function convertToIst(): Date {
      const dateIST = new Date();
      dateIST.setHours(dateIST.getHours() + 5);
      dateIST.setMinutes(dateIST.getMinutes() + 30);
      return dateIST;
    }

    // setInterval function to check the Expiry of Todo after every one minute
    let interval = setInterval(
      dbRepo => {
        let taskStatus = true;
        const dateIST = convertToIst();
        list.forEach(async function(element) {
          if (
            taskStatus &&
            element.dueDate < dateIST &&
            element.status !== true
          ) {
            try {
              await gmailService.sendMail(
                `mukul.vaidya11@gmail.com`,
                `Todo Expired`,
                `Todo with id:${element.id} Expired`
              );
              await dbRepo.complete(element.id);
              element.status = true;
            } catch (error) {
              throw new Error(error);
            }
          }
        });
      },
      3600,
      this.dbRepo
    );
  }

  // Method to mark a task as completed
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
