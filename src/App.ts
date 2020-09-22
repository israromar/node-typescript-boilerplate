import express,{Application} from 'express';
import logger from 'morgan';
import mongoose from 'mongoose';
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
    this.express = express();
    this.connectToMongDb();
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

  private connectToMongDb ():void{
    const {
      MONGO_URL,
    } = process.env;
    const config ={useNewUrlParser:true,useUnifiedTopology:true}

    if(MONGO_URL)
      mongoose.connect(MONGO_URL,config,(err)=>{
        if(err) throw new Error(err.message);
        console.log(`Connected to ${process.env.MONGO_URL}`);
      });
    else throw new Error('No database url provided....');
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