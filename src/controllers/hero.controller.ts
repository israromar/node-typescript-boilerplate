import {NextFunction, Request, Response, Router} from 'express';
import IController from '../interfaces/controller.interface';
import IHero from '../interfaces/hero.interface';
import HeroData from '../data.json';
import HeroNotFoundException from '../errors/HeroNotFoundException';
import authMiddleware from '../middlewares/authentication.middleware';
import IRequestWithUser from '../interfaces/requestWithUser.interface';
class HeroController implements IController {
    public path='/heroes';

    public router = Router();

    // private heroes:IHero[] = HeroData;

    constructor () {
      this.initializeRoutes();
    }

    private initializeRoutes () {
      this.router.get(this.path,authMiddleware, this.getAll);
      this.router.get(`${this.path}/:id`, this.get);
    }

    getAll (req:IRequestWithUser,res:Response):void {
      res.status(200).json(HeroData)
    }

    get (req:Request,res:Response,next:NextFunction):void {
      const {id} = req.params;

      const Hero:IHero = HeroData.filter(hero=>hero.id.toString()===id)[0]

      if(!Hero)
        next(new HeroNotFoundException(id))
      else res.status(200).json(Hero)
    }

}
export default HeroController;