// Comando para establecer la conexion activo-activo con el servidor
var socket = io();
// Jquery
var label = $("#lblNuevoTicket");

socket.on("connect", function() {
  console.log("Conectado al servidor");
});

socket.on("disconnect", function() {
  console.log("Desconectado del servidor");
});

socket.on("estadoActual", function(data) {
  label.text(data.actual);
});

$("button").on("click", function() {
  // console.log("click");
  socket.emit("siguienteTicket", null, function(siguienteTicket) {
    label.text(siguienteTicket);
  });
});
