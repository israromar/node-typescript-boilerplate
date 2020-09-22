import HttpException from './HttpException';

class InvalidCredentialsException extends HttpException {
  constructor () {
    super(409,'Invalid credentials');
  }
}
export default InvalidCredentialsException;