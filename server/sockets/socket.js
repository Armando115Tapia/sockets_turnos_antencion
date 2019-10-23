const { io } = require("../server");
const { TicketControl } = require("./classes/ticket-control");
const ticketControl = new TicketControl();

io.on("connection", client => {
  client.on("siguienteTicket", (data, callback) => {
    let siguiente = ticketControl.siguienteTiket();
    console.log("Siguiente: ", siguiente);
    callback(siguiente);
  });

  // Emitir el estado actual
  client.emit("estadoActual", {
    actual: ticketControl.getUtlimoTicket(),
    ultimos4: ticketControl.getUltimos4()
  });

  // Escucha el evento antender ticket
  client.on("atenderTicket", (data, callback) => {
    if (!data.escritorio) {
      return callback({
        err: true,
        mensaje: "El escritorio es necesario"
      });
    }
    let atenderTicket = ticketControl.atenderticket(data.escritorio);
    callback(atenderTicket);

    // Actualizar la pantalla que todo el mundo esta viendo.
    // emitir ultimos4
    client.broadcast.emit("ultimos4", {
      ultimos4: ticketControl.getUltimos4()
    });
  });

  // client.on("siguienteTicket", () => {
  //   console.log("cual es el siguiente tiket");
  // });

  // console.log("Usuario conectado");

  // client.emit("enviarMensaje", {
  //   usuario: "Administrador",
  //   mensaje: "Bienvenido a esta aplicación"
  // });

  // client.on("disconnect", () => {
  //   console.log("Usuario desconectado");
  // });

  // // Escuchar el cliente
  // client.on("enviarMensaje", (data, callback) => {
  //   console.log(data);

  //   client.broadcast.emit("enviarMensaje", data);

  // if (mensaje.usuario) {
  //     callback({
  //         resp: 'TODO SALIO BIEN!'
  //     });

  // } else {
  //     callback({
  //         resp: 'TODO SALIO MAL!!!!!!!!'
  //     });
  // }
  //});
});
