let server = require('http').Server();

let io = require('socket.io')(server);

io.on('connection', socket => {
    console.log("New websocket connection");
});

const Redis = require('ioredis');

const redis = new Redis();

redis.psubscribe('*',(err, count) => {});

redis.on('pmessage', (subscribed, channel, data) => {
    data = JSON.parse(data);
    console.log(channel);
    console.log(data.event);
    io.emit(channel + ':' + data.event, data.data);
});

server.listen(3000);