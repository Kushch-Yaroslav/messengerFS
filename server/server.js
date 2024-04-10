const http = require("http");
const { Server } = require("socket.io");
const app = require("./app.js");

const PORT = process.env.PORT || 5000;

const cors = {
  origin: "*",
};

const server = http.createServer(app);
// Varian 1

const io = new Server(server, { cors });

io.on("connect", (socket) => {
  console.log("Новый пользователь подключен");
  socket.on("NEW_MESSAGE", (messages) => {
    console.log("Новое сообщение доставлено", messages);
    io.emit("MESSAGE_RECEIVED", messages);
  });
});
// Varian 2
// io.on("connect", (socket) => {
//   console.log("CONNECTION IS HERE");
//   setTimeout(() => {
//     io.emit(
//       "NEW_NOTIFICATION",
//       "Hello, there is your first notification",
//       1000
//     );
//     socket.on("NEW_MESSAGE", (data) => {
//       console.log(data);
//     });
//   });
// });

server.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
