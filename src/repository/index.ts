import DbRepository from './dbrepository'
import DbRepositoryImpl from './dbRepositoryImpl'
import { ContainerModule } from 'inversify'

const repoModule = new ContainerModule(bind =>{
    bind("dbRepository").toFactory(context => {
        return (databaseEntityClass: string) => {
          return new DbRepositoryImpl(
            context.container.get("dbRepository")
          );
        };
      });
});

export {
    repoModule
}