const express = require('express');
import { createClient } from "redis";
const { Server } = require("socket.io");
const { createServer } = require("http");
import { createAdapter } from "@socket.io/redis-adapter";

// config for socket.io
const config = {
    pingTimeout: 60000,
    pingInterval: 25000,
    transports: ['websocket'],
};

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, config);

app.get('/', (req, res) => {
    res.send('<h1>Auto Scaling App</h1><h4>Message: Success!</h4><p>Version: 1.0.0</p>')
})

// TODO: save Redis cluster host name in environmental file
const pubClient = createClient({ host: 'redis-cluster-test.sufcdc.clustercfg.use1.cache.amazonaws.com', port: 6379 });
const subClient = pubClient.duplicate();

Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
    io.adapter(createAdapter(pubClient, subClient));
});

io.on("connection", (socket) => {
    console.log('New user connected')
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

httpServer.listen(3000);
