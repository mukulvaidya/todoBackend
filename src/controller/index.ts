import TodoController from './todo-controller'
import { ContainerModule } from 'inversify'

const controllerModule = new ContainerModule(bind =>{
    bind<TodoController>('TodoController').to(TodoController);
});

export {
    controllerModule,TodoController
}