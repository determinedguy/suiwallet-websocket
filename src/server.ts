import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

import dotenv from "dotenv"
import fetch from "node-fetch"

dotenv.config()

const app = express();
app.use(express.json())

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  }
});

io.on("connection", async (socket: Socket) => {
  const { token } = socket.handshake.query;

  const { id } = await fetch(`${process.env.AUTHENTICATION_API_URL}/cores/auth/validate/`, {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`
    }
  })
    .then(res => res.json())

  socket.join(id);
});

app.post('/send-data', (req, res) => {
  const { userId, data } = req.body;

  io.to(userId).emit('data', data);

  res.sendStatus(200);
});

httpServer.listen(3001, () => {
  console.log("Socket.IO server berjalan di http://localhost:3000");
});
