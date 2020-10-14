import HttpException from './HttpException';

export default class UserNotFoundException extends HttpException {
  constructor () {
    super(404, 'Profile not found')
  }
}