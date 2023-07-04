const socketIO = require('socket.io');

function socket(server) {
  const io = socketIO(server);

  io.use((request, next) => {
    console.log(request.handshake.headers['user-agent']);

    // const user = await User.findOne({ session: session });
    // request.user = user;
    request.user = { name: 'Ivan' };

    next();
  });

  io.on('connection', socket => {
    console.log('socket connected', socket.user, socket.id);
    // await Session.updateOne({ user: socket.user }, { socketId: socket.id });

    socket.on('client_user_typing', isTyping => {
      console.log('client_user_typing', isTyping);
    });

    socket.emit('lala', () => {
      console.log('user has received the message!');
    });

    // io.to('yMrxv1BTxE75jNEzAAAA').emit('message', 'hello!');

    socket.on('client_user_message', message => {
      io.emit('server_user_message', message);
    });

    // 'price_changed'
    // 'red_card' 'goal' 'corner'

    socket.on('disconnect', () => {
      console.log('socket disconnected', socket.id);

      // await Session.updateOne({ user: socket.user }, { socketId: undefined });
    });
  });
}

module.exports = socket;
