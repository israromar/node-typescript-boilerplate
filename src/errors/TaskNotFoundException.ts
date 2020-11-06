import HttpException from './HttpException';

export default class TaskNotFoundException extends HttpException {
  constructor () {
    super(404, 'Task not found')
  }
}