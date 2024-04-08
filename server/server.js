const http = require("http");
const { Server } = require("socket.io");
const app = require("./app.js");

const PORT = process.env.PORT || 5000;

const cors = {
  origin: "*",
};

const server = http.createServer(app);

const io = new Server(server, { cors });

io.on("connect", (socket) => {
  console.log("CONNECTION IS HERE");
  setTimeout(() => {
    io.emit(
      "NEW_NOTIFICATION",
      "Hello, there is your first notification",
      10000
    );
    socket.on("NEW_MESSAGE", (data) => {
      console.log(data);
    });
  });
});

server.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
