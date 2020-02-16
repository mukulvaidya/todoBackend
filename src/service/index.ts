import TodoServiceImpl from "./todo-service-implementation";
import TodoService from "./todo-service";
import { ContainerModule } from "inversify";
const serviceModule = new ContainerModule(bind => {
  bind<TodoService>("TodoService").to(TodoServiceImpl);
});

export { serviceModule };
