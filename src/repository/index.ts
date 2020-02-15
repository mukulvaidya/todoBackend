import DbRepositoryImpl from './dbRepositoryImpl'
import { ContainerModule } from 'inversify'

const repoModule = new ContainerModule(bind =>{
    bind("dbRepository").toFactory(context => {
        return () => {
          return new DbRepositoryImpl();
        };
      });
});

export {
    repoModule
}