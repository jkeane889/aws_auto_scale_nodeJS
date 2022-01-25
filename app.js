const cors = require('cors')
const path = require('path');
const express = require('express');
const { Server } = require("socket.io");
const { createServer } = require("http");
const { createClient } = require("redis");
const RedisManager = require('./redisClient')
const { createAdapter } = require("@socket.io/redis-adapter");

// config for socket.io - may not need!
const config = {
    pingTimeout: 60000,
    pingInterval: 25000,
    transports: ['websocket'],
};

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});
const redisCache = new RedisManager();

// initialize Redis users to empty array
redisCache.setRedisUsers([]);

// to utilize CORS with origin
app.use(function (req, res, next) {
    const origin = req.get('origin');

    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma'
    );
    if (req.method === 'OPTIONS') {
        res.sendStatus(204);
    } else {
        next();
    }
});

app.use(express.static('app/build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'app', 'build', 'index.html'));
});

// TODO: save Redis cluster host name in environmental file
const pubClient = createClient({ host: '', port: 6379 });
const subClient = pubClient.duplicate();

io.adapter(createAdapter(pubClient, subClient));

io.on("connection", (client) => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    client.emit('hello to all clients!');

    client.on('user_connected', async (user) => {
        console.log('this is the user: ', user)

        const updatedUsers = await addRedisUser({
            name: user.name,
            id: user.id,
            socketId: client.id,
        });

        console.log('added new user to redis')
        console.log(`Redis add user ${JSON.stringify(updatedUsers)}`)
    })
});

httpServer.listen(3000, () => {
    console.log('listening on port 3000');
});
