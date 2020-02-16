import DbImplementation from "./dbImplementation";
import DbInterface from "./dbInterface";
import { ContainerModule } from "inversify";
import containerInitialization from "../inversifyConfig";

const databaseModule = new ContainerModule(bind => {
  bind<DbInterface>("DbInterface")
    .to(DbImplementation)
    .inSingletonScope();
});

export { databaseModule, DbInterface, DbImplementation, containerInitialization };
