import socketIo from 'socket.io';

export default (io:socketIo.Server):void=>{
  io.on('connection', (socket)=>{
    console.log('Connection established');
    socket.on('message', (m) => {
      console.log('[server](message): %s', JSON.stringify(m));
      io.emit('message', m);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
  
}