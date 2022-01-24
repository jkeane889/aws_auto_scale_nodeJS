const path = require('path');
const express = require('express');
const { Server } = require("socket.io");
const { createServer } = require("http");
const { createClient } = require("redis");
const { createAdapter } = require("@socket.io/redis-adapter");

// config for socket.io
const config = {
    pingTimeout: 60000,
    pingInterval: 25000,
    transports: ['websocket'],
};

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, config);

app.use(express.static('app/build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'app', 'build', 'index.html'));
});

// TODO: save Redis cluster host name in environmental file
const pubClient = createClient({ host: 'redis-cluster-test.sufcdc.clustercfg.use1.cache.amazonaws.com', port: 6379 });
const subClient = pubClient.duplicate();

io.adapter(createAdapter(pubClient, subClient));

io.on("connection", (socket) => {
    console.log('New user connected')
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

httpServer.listen(3000);
