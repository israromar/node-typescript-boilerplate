import HttpException from './HttpException';

class AuthenticationTokenMissingException extends HttpException {
  constructor () {
    super(404,'No token provided');
  }
}
export default AuthenticationTokenMissingException;