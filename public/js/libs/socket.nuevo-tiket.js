// Comando para establecer la conexion activo-activo con el servidor
var socket = io();

socket.on("connect", function() {
  console.log("Conectado al servidor");
});

socket.on("disconnect", function() {
  console.log("Desconectado del servidor");
});

$("button").on("click", function() {
  console.log("click");
});
