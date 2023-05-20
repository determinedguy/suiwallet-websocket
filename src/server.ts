import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket: Socket) => {
  const { token } = socket.handshake.query;
  // TODO: Check and validate token with auth service
  const userId = 'user-id'; // Replace with appropriate user ID
  socket.join(userId);
});

app.post('/send-data', (req, res) => {
  const { userId, data } = req.body;

  io.to(userId).emit('data', data);

  res.sendStatus(200);
});

httpServer.listen(3000, () => {
  console.log("Socket.IO server berjalan di http://localhost:3000");
});
