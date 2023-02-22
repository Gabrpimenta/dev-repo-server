import express, { Router } from 'express';
import cors from 'cors';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  routes() {
    const routes = new Router();
    routes.get('/hello', (req, res) => {
      return res.json({ message: 'Hello World' });
    });
    this.server.use(routes);
  }
}

export default new App().server;
