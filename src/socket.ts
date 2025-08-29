import { Server } from 'socket.io';
export function initSocket(server: any) {
  const io = new Server(server, { cors: { origin: '*' } });
  io.on('connection', (socket) => {
    socket.on('join', (room: string) => socket.join(room));
    socket.on('disconnect', () => {});
  });
  return io;
}
