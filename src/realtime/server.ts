import { createServer } from "node:http";
import { Server } from "socket.io";
import Redis from "ioredis";

const httpServer = createServer();
const io = new Server(httpServer, { cors: { origin: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000", credentials: true } });
const redis = process.env.REDIS_URL ? new Redis(process.env.REDIS_URL) : null;

io.use(async (socket, next) => {
  const userId = socket.handshake.auth.userId;
  if (typeof userId !== "string" || userId.length < 5) return next(new Error("Unauthorized"));
  socket.data.userId = userId;
  next();
});

io.on("connection", (socket) => {
  socket.join(`user:${socket.data.userId}`);
  socket.on("channel:join", (channelId: string) => socket.join(`channel:${channelId}`));
  socket.on("typing:start", ({ channelId }) => socket.to(`channel:${channelId}`).emit("typing:start", { userId: socket.data.userId, channelId }));
  socket.on("message:created", async ({ channelId, message }) => {
    if (redis) await redis.publish("studenthub:message", JSON.stringify({ channelId, message }));
    socket.to(`channel:${channelId}`).emit("message:created", message);
  });
  socket.on("notification:send", ({ recipientId, notification }) => io.to(`user:${recipientId}`).emit("notification:new", notification));
});

const port = Number(process.env.SOCKET_PORT ?? 4000);
httpServer.listen(port, () => console.log(`StudentHub realtime server listening on ${port}`));
