import DbImplementation from "./dbImplementation";
import DbInterface from "./dbInterface";
import { ContainerModule } from "inversify";
import containerInitialization from "../inversifyConfig";

const dbModule = new ContainerModule(bind => {
  bind<DbInterface>("DbInterface")
    .to(DbImplementation)
    .inSingletonScope();
});

export { dbModule, DbInterface, DbImplementation, containerInitialization };
