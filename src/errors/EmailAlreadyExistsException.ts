import HttpException from './HttpException';

class EmailAlreadyExistsException extends HttpException {
  constructor (email:string) {
    super(409,`Email already exists with ${email}`)
  }
}
export default EmailAlreadyExistsException;