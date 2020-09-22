import express,{Application} from 'express';
import {Connection, createConnection} from 'typeorm';
import config from './config/ormconfig';
import logger from 'morgan';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
// Middlewares
import errorMiddleware from './middlewares/error.middleware';
// Interfaces
import IController from './interfaces/controller.interface';
// Controllers
import HeroController from './controllers/hero.controller';
import AuthenticationController from './controllers/authentication.controller';
class App {

  // ref to Express instance
  public express: Application;

  private root = '/api/v1'
 
  //Run configuration methods on the Express instance.
  constructor (controllers:IController[]) {
    this.connectToPostGres();
    this.express = express();
    this.middleware();
    this.initializeControllers(controllers);
    this.initializeErrorMiddleware();
  }

  // Configure Express middleware.
  private middleware (): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({extended: false}));
    this.express.use(cookieParser());
  }
  
  private initializeErrorMiddleware ():void{
    this.express.use(errorMiddleware);
  }

  private connectToPostGres = async ()=>{
    try {
      const conn:Connection = await createConnection(config);

      if(conn)console.log(`Connected to POST GRES ${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}`)
    } catch (error) {
      throw new Error(`Error connecting to the POST GRESS ${error.message}`)
    }
  }

  private initializeControllers (controllers: IController[]):void {
    controllers.forEach((controller) => {
      this.express.use(this.root, controller.router);
    });
  }
}

const controllers = [
  new HeroController(),
  new AuthenticationController()
]

export default new App(controllers).express;