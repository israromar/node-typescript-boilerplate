import HttpException from './HttpException';

class InvalildTokenException extends HttpException {
  constructor () {
    super(401,'Invalid token');
  }
}
export default InvalildTokenException;