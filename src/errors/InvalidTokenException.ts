import HttpException from './HttpException';

class InvalildTokenException extends HttpException {
  constructor () {
    super(401, 'Session expired. Please login again');
  }
}
export default InvalildTokenException;