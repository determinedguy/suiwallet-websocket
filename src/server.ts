import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket: Socket) => {
  const userId = 'user-id'; // Replate with appropriate user ID
  socket.join(userId);
});

app.post('/send-data/:userId', (req, res) => {
  const { userId } = req.params;
  const { data } = req.body;

  io.to(userId).emit('data', data);

  res.sendStatus(200);
});

httpServer.listen(3000, () => {
  console.log("Socket.IO server berjalan di http://localhost:3000");
});
