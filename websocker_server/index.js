const httpServer = require("http").createServer();

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:5175",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
httpServer.listen(8080, () => {
  console.log("listening on *:8080");
});

io.on("connection", (socket) => {
  console.log(`client ${socket.id} has connected`);
  socket.on("loggedIn", function (user) {
    console.log(`client ${user.id} has connected`);
    socket.join(user.id);
    if (user.type == "EC") {
      console.log(`client ${user.type} has join chef group`);
      socket.join("chefs");
    }
  });

  socket.on("loggedOut", function (user) {
    socket.leave(user.id);
    socket.leave("chefs");
  });
  socket.on("updateProduct", (product) => {
    socket.broadcast.emit("updateProduct", product);
  });
  socket.on("pratoParaCozinhar", (product) => {
    console.log("prato")
    socket.in('chefs').emit('pratoParaCozinhar', product)
  });  
  socket.on("newOrder", (order) => {
    socket.broadcast.emit("newOrder", order);
  });
});
