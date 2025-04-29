import express from "express";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";
import http from "http";
import { Server } from "socket.io";
import OneToOneMessage from "./models/onetoonemessage.model.js";
import MessageModel from "./models/message.model.js"; // your group message model
import authRoutes from "./routes/auth.routes.js";
import studentRoutes from "./routes/student.routes.js";
import classRoute from "./routes/classroom.routes.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";
import placementRoute from "./routes/placement.routes.js";
import adminRoute from "./routes/admin.route.js";
import Noticerouter from "./routes/notices.route.js";
import EventRouter from "./routes/events.routes.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
mongoose.connect("mongodb://localhost:27017/database");

app.use(cors({
  origin: '*',
  credentials: true 
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/classroom", classRoute);
app.use("/api/chat", chatRoute);
app.use("/api/message", messageRoute);
app.use("/api/placement",placementRoute);
app.use("/api/admin", adminRoute);
app.use("/api/notices",Noticerouter);
app.use('/api/events',EventRouter);

app.get('/api/jobs', async (req, res) => {
  try {
    const response = await fetch('https://arbeitnow.com/api/job-board-api');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});


let users = {};

io.on("connection", (socket) => {
  socket.on("join", (userId) => {
    users[userId] = socket.id;
  });

  socket.on("joinGroup", (groupId) => {
    socket.join(groupId);
  });

  socket.on("sendMessage", async (data) => {
    const { sender, receiver, content, messageType } = data;
    const message = new OneToOneMessage({ sender, receiver, content, messageType });
    await message.save();
    if (users[receiver]) {
      io.to(users[receiver]).emit("receiveMessage", message);
    }
  });

  socket.on("sendGroupMessage", async (data) => {
    const { sender, groupId, content, messageType } = data;
    const message = new MessageModel({
      chat: groupId,
      sender,
      content,
      messageType,
    });
    await message.save();
    io.to(groupId).emit("receiveGroupMessage", message);
  });

  socket.on("disconnect", () => {
    for (let userId in users) {
      if (users[userId] === socket.id) {
        delete users[userId];
        break;
      }
    }
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
