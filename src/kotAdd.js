import openSocket from 'socket.io-client';
const API_URL = process.env.REACT_APP_API_URL;
console.log(API_URL)
const  socket = openSocket(API_URL);
function kotAdd(cb) 
{
  socket.on('post', timestamp => cb(null, timestamp));
  socket.emit('tables', 1000);
  // let data;
  // socket.on('call',timestamp => cb(null, timestamp));
  // socket.emit('test', 1000);

}
export { kotAdd };