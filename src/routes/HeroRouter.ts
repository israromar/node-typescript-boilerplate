import {Router,Request,Response} from 'express';
import Heroes from '../data.json';

export class HeroRouter {
router:Router;

constructor () {
  this.router = Router();
  this.init();
}

public getAll (req:Request,res:Response):void {
  res.send(Heroes);
}

private init ():void {
  this.router.get('/',this.getAll);
}
}

const heroRoutes = new HeroRouter();

export default heroRoutes.router;