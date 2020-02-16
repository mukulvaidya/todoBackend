import "reflect-metadata";
import { initializeTransactionalContext } from "typeorm-transactional-cls-hooked";
initializeTransactionalContext(); // Initialize cls-hooked
import DbInterface from "./Database/dbInterface";
import containerInitialization from "./inversifyConfig";
import { Container } from "inversify";
import bodyParser = require("body-parser");
import cors from "cors";
import { InversifyExpressServer } from "inversify-express-utils";
import helmet = require("helmet");
import "./controller";

export default class App {
  private container: Container;
  public async start() {
    this.container = containerInitialization();
    console.log(`container initialized`);
    const database: DbInterface = this.container.get<DbInterface>(
      "DbInterface"
    );
    await database.init();
    console.log(`Database initialized`);
    let server = new InversifyExpressServer(this.container);
    server.setConfig(theApp => {
      theApp.use(
        bodyParser.urlencoded({
          extended: true
        })
      );
      theApp.use(bodyParser.json());
      theApp.use(cors());
      theApp.use(helmet());
    });
    let app = server.build();
    app.listen(3000);
    console.log("Server started on port http://localhost:3000/");

    exports = module.exports = app;
  }

  public async stop() {
    console.log(`stopping the application`);
    const database: DbInterface = this.container.get<DbInterface>(
      "DbInterface"
    );
    database.close();
  }
}

/*import "reflect-metadata";
import express from "express";
import { Container } from "inversify";
import containerInitialization from "./inversifyConfig";
import DbInterface from "./Database/dbInterface";
import bodyParser from "body-parser";
import cors from "cors";

export default class App {
  private container: Container;
  public async start() {
    this.container = containerInitialization();
    console.log(`Container Initialized`);
    const database: DbInterface = this.container.get<DbInterface>(
      "DbInterface"
    );
    try {
      await database.init();
    } catch (err) {
      console.log(err);
    }

    console.log(`Database initialized`);
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    app.get("/", function(req, res) {
      res.send("get called");
    });
    app.listen(3000, (res, req) => {
      console.log(`Server running on port ${3000}`);
    });
  }
  public async stop() {
    console.log(`stopping the application`);
    const database: DbInterface = this.container.get<DbInterface>(
      "DbInterface"
    );
    database.close();
  }
}*/
/*
import "reflect-metadata"; // this shim is required
import { createExpressServer } from "routing-controllers";
import { TodoController } from "./controller";
import DbInterface from "./Database/dbInterface";
import { Container } from "inversify";
import containerInitialization from "./inversifyConfig";

export default class App {
  private container: Container;
  public async start() {
    this.container = containerInitialization();
    console.log(`Container Initialized`);
    const database: DbInterface = this.container.get<DbInterface>(
      "DbInterface"
    );
    try {
      await database.init();
    } catch (err) {
      console.log(err);
    }

    console.log(`Database initialized`);
    const app = createExpressServer({
      controllers: [TodoController] // we specify controllers we want to use
    });
    app.listen(5000);
  }
  public async stop() {
    console.log(`stopping the application`);
    const database: DbInterface = this.container.get<DbInterface>(
      "DbInterface"
    );
    database.close();
  }
}
*/
