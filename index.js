const express = require("express");
const app = express();
const http= require("http");
const {Server} = require("socket.io");
const server = http.createServer(app);
const cors = require("cors");
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // No trailing slash
    methods: ["GET", "POST"],
    credentials: true
  },
});
const path = require("path");





io.on("connection",(socket)=>{
    socket.on("sendmessage",(data)=>{
        io.emit("broadcastMessage", { text: data, id: socket.id });
    })
   

});
server.listen(3000,()=>{
    console.log("3000 par chal raha hain");
});