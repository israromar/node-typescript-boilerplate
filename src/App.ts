import express from 'express';
import logger from 'morgan';
import * as bodyParser from 'body-parser';
// Error Middleware
import errorMiddleware from './middlewares/error.middleware';
// Interfaces
import IController from './interfaces/controller.interface';
// Controllers
import HeroController from './controllers/hero.controller';
class App {

  // ref to Express instance
  public express: express.Application;

  private root = '/api/v1'
 
  //Run configuration methods on the Express instance.
  constructor (controllers:IController[]) {
    this.express = express();
    this.middleware();
    this.initializeControllers(controllers);
  }

  // Configure Express middleware.
  private middleware (): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({extended: false}));
    this.express.use(errorMiddleware);
  }

  private initializeControllers (controllers: IController[]):void {
    controllers.forEach((controller) => {
      this.express.use(this.root, controller.router);
    });
  }
}

const controllers = [
  new HeroController()
]

export default new App(controllers).express;