const socketIO = require('socket.io');
const UAParser = require('ua-parser-js');

function socket(server) {
    const websocketServer = socketIO(server);

    websocketServer.use((req, next) => {
        const userAgent = req.handshake.headers['user-agent'];
        if (!userAgent) 
            return next(new Error('not allowed (no user-agent)'));

        const ua = new UAParser(userAgent);
        const browser = ua.getBrowser();

        console.log(browser);

        if (browser.name !== 'Chrome')
            return next(new Error('not allowed (only Chrome)'));
        
        next();
    });

    websocketServer.on('connection', websocket => {
        console.log(websocket.id);

        websocket.on('client_user_typing', isTyping => {
            console.log('client_user_typing', isTyping);
        });

        websocket.on('client_user_message', message => {
            websocketServer.emit('server_user_message', message);
            // websocket.broadcast.emit('server_user_message', message);

            // await Message.create({});
        });

        websocket.on('disconnect', () => {
            console.log('disconnected', websocket.id);
        });
    });
}

module.exports = socket;
