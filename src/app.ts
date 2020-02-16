import App from "./server";

const app = new App();

app.start().catch(err => {
  return app.stop();
});
