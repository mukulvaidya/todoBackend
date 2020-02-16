import { dbModule } from "./Database";
import { serviceModule } from "./service";
import { repoModule } from "./repository";
import { Container } from "inversify";
import { controllerModule } from "./controller";

export default function containerInitialization(): Container {
  const container = new Container();
  container.load(repoModule, serviceModule, controllerModule);
  container.load(dbModule);
  return container;
}
