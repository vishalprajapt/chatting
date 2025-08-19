const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Public folder ko serve karo
app.use(express.static(path.join(__dirname, "public")));

// Default route (index.html serve karega)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// socket.io connection
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("chat message", (msg) => {
    // sab clients ko bhejna (including sender)
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
