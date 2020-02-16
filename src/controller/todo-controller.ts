import 'reflect-metadata'
import {
  controller, httpGet, httpPost, httpPut, httpDelete
} from 'inversify-express-utils';
import express from "express";
import TodoService from "../service/todo-service";
import { inject, injectable } from "inversify";


@controller("/todo")
export default class TodoController {
  constructor( @inject('TodoService') private service: TodoService) { }

  @httpGet("/all")
  public async getAllTodos(req: express.Request, res: express.Response) {
    try {
      const todos = await this.service.getTodo();
      this.service.sendMail(todos);
      res.send(todos);
    } catch (err) {
      throw new Error("listing failed from controller" + err);
    }
  }

  @httpGet("/:id")
  public async getById(req: express.Request, res: express.Response) {
    const { id } = req.params;
    try {
      const todo = await this.service.getById(parseInt(id));
      res.send(todo);
    } catch (err) {
      throw new Error("listing by id failed from controller" + err);
    }
  }

  @httpPost("/createTodo")
  public async createTodo(req: express.Request, res: express.Response) {
    const {
      title = "",
      description = "",
      dueDate = "",
      isComplete
    } = req.body;
    try {
      const todo = await this.service.createTodo({
        title,
        description,
        dueDate,
        isComplete
      });
      res.send(todo);
    } catch (err) {
      throw new Error("create failed from controller" + err);
    }
  }

  @httpDelete("/delete/:id")
  public async deleteTodo(req: express.Request, res: express.Response) {
    const { id } = req.params;
    try {
      await this.service.deleteById(parseInt(id));
      res.send(`${id} Todo deleted`);
    } catch (err) {
      throw new Error("delete failed from controller" + err);
    }
  }

  @httpPut('/complete/:id')
  public async updateTodo(req:express.Request,res:express.Response){
    const {id} = req.params;
    try {
         await this.service.complete(parseInt(id));
    } catch (error) {
        throw new Error(`Error during update`)
    }
  }
}
