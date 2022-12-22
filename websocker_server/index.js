const httpServer = require("http").createServer();

// Cache de pares de socket id com pedidos em curso
let arrayPedidosSockets = [];

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

httpServer.listen(8080, () => {
  console.log("listening on *:8080");
});

io.on("connection", (socket) => {
  
  // Connections 
  socket.on("loggedIn", function (user) {
    checkJoinRoom(socket, user);
  });
	socket.on("loggedOut", function (user) {
    checkLeaveRoom(socket, user);
  });

  // Create Order
  socket.on("newOrder", (order,user)  => {
    arrayPedidosSockets.push({ id: order.id, user: user });
  });

  // Update Product
  socket.on("updateProduct", (product) => {
      socket.broadcast.emit("updateProduct", product);
  });
  
  // Update Orders
  socket.on("pratoHot", (product) => {
    socket.in('chefs').emit('pratoParaCozinhar', product)
  });
  socket.on("pratoProntoDelivery", (product) => {  
    socket.in('delivery').emit('Prato_Para_Entrega');
    findCustomerToNotify(product,socket);
  });
  
  // Broadcast to all but sender / use io.broadcast.emit to broadcast to all including sender
  socket.on("broadcast",(socket_origin,msg) => {
    socket_origin.broadcast.emit("broadcast", "Broadcast message from user "+socket_origin.id+" : "+msg);
  });

  // Send message to user by id / Pode ser alterado para enviar do socket que chama o evento
  socket.on("msg", (userId,msg) => {
    socket.in(userId).emit("msg","Personal message from user "+socket_origin.id+" : "+msg);
  });
  
  
});
  

function findCustomerToNotify(order,socket) {
  let pedido = arrayPedidosSockets.indexOf(order.id);
  if (pedido) {
    // Como o id do socket do pedido é guardado após o id do pedido, o pedido+1 é o socket do pedido
    socket.in(arrayPedidosSockets[pedido].user.id).emit("Prato_Pronto",order); // Para Entrega , Ticket Number: "+order.ticketNumber);
  }
}

function checkJoinRoom(socket, user) {
  // Se o User for um customer, entra numa room para si
  if(user.type == "C") {
    console.log(`client ${user.id} has connected`);
    socket.join(user.id);
 }
 // Se o User for um chef, entra no grupo dos chefs
 if (user.type == "EC") {
   console.log(`client ${user.type} has join chef group`);
   socket.join("chefs");
 }
 // Se o User for um staff, entra no grupo dos delivery
 if (user.type == "ED") {
   console.log(`client ${user.type} has join delivery group`);
   socket.join("delivery");
 }
 // se o User for um manager, entra no grupo dos managers
 if (user.type == "EM") {
   console.log(`client ${user.type} has join manager group`);
   socket.join("manager");
 }
}

function checkLeaveRoom(socket, user) {
  // Se o User for um customer, sai da room para si
  if(user.type == "C") {
    console.log(`client ${user.id} has disconnected`);
    socket.leave(user.id);
 }
 // Se o User for um chef, sai do grupo dos chefs
 if (user.type == "EC") {
   console.log(`Chef ${user.name} has left chef group`);
   socket.leave("chefs");
 }
 // Se o User for um staff, sai do grupo dos delivery
 if (user.type == "ED") {
   console.log(`Deliver ${user.name} has left delivery group`);
   socket.leave("delivery");
 }
 // se o User for um manager, sai do grupo dos managers
 if (user.type == "EM") {
   console.log(`Manager ${user.name} has left manager group`);
   socket.leave("manager");
 }
}

