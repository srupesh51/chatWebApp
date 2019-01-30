import io from 'socket.io-client';

export const loadConnection = () => {
  return io('http://localhost:9001');

}
