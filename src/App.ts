import express, {Application, Request, Response} from 'express';
import {Connection, createConnection} from 'typeorm';
import config from './config/ormconfig';
import logger from 'morgan';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
// Middlewares
import errorMiddleware from './middlewares/error.middleware';
// Interfaces
import IController from './interfaces/controller.interface';
// Controllers
import AuthenticationController from './controllers/authentication.controller';
import authenticationMiddleware from './middlewares/authentication.middleware';
import UserController from './controllers/userController';
import ProfileController from './controllers/profile.controller';
class App {

  // ref to Express instance
  public express: Application;

  private root = '/api/v1'
 
  //Run configuration methods on the Express instance.
  constructor (controllers:IController[]) {
    this.connectToPostGres();
    this.express = express();
    this.middleware();
    // this.initializeCors();
    this.initializeControllers(controllers);
    this.initializeErrorMiddleware();
  }

  // Configure Express middleware.
  private middleware (): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({extended: false}));
    this.express.use(cookieParser());
    this.express.use(cors());
  }
  
  private initializeErrorMiddleware ():void{
    this.express.use(errorMiddleware);
  }

  private initializeCors ():void {
    const options: cors.CorsOptions = {
      allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
      ],
      credentials: true,
      methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
      origin: process.env.REACT_APP_URL,
      preflightContinue: false,
    };

    this.express.use(cors(options));
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
    this.express.get(`${this.root}/test`, authenticationMiddleware, (req:Request, res:Response)=>res.status(200).json({message:'working...'}));
    controllers.forEach((controller) => {
      this.express.use(this.root, controller.router);
    });
  }
}

const controllers = [
  new AuthenticationController(),
  new UserController(),
  new ProfileController()
]

export default new App(controllers).express;