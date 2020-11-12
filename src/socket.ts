import socketIo from 'socket.io';
import User from './entities/user.entity';
import {UserSocket} from './interfaces/UserSocket.interface';
const users:UserSocket[] =[];

export default (io:socketIo.Server):void=>{
  io.on('connection', (socket)=>{
    console.log('Connection established');
    
    socket.on('join', (user:User)=>{
      users.push({socketId:socket.id, ...user})
      io.emit('joined', users)
    });

    socket.on('message', (m) => {
      console.log('[server](message): %s', JSON.stringify(m));
      io.emit('message', m);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
      io.emit('joined', users.filter(user=>user.socketId!==socket.id))
    });
  });
  
}