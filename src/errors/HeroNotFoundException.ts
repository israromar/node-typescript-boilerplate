import HttpException from './HttpException';

export default class HeroNotFoundException extends HttpException {
  constructor (id:string) {
    super(404,`Post with id ${id} not found`)
  }
}