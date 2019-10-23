const fs = require("fs");

class Ticket {
  constructor(numero, escritorio) {
    this.numero = numero;
    this.escritorio = escritorio;
  }
}

class TicketControl {
  constructor() {
    // Para controlar cual es el ultimo ticket
    this.ultimo = 0;
    this.hoy = new Date().getDate();
    this.tickets = [];
    this.ultimos4 = [];

    // Para leer informacion de un json
    let data = require("../../data/data.json");

    if (data.hoy === this.hoy) {
      this.ultimo = data.ultimo;
      this.tickets = data.tickets;
      this.ultimos4 = data.ultimos4;
    } else {
      this.reinciarConteo();
    }
  }
  reinciarConteo() {
    this.ultimo = 0;
    this.tickets = [];
    this.ultimos4 = [];
    this.grabarArchivo();
  }
  getUtlimoTicket() {
    return `Tiket: ${this.ultimo}`;
  }
  getUltimos4() {
    return this.ultimos4;
  }

  atenderticket(escritorio) {
    if (this.tickets.length === 0) {
      return "No hay tickets";
    }

    let numeroTicket = this.tickets[0].numero;
    // Eliminar el primer elemento de un arreglo
    this.tickets.shift();
    let atenderticket = new Ticket(numeroTicket, escritorio);
    this.ultimos4.unshift(atenderticket);
    if (this.ultimos4.length > 4) {
      this.ultimos4.splice(-1, 1); // borra los últimos
    }
    console.log("Ultimos 4");
    console.log(this.ultimos4);
    this.grabarArchivo();
    return atenderticket;
  }
  siguienteTiket() {
    this.ultimo += 1;
    let ticket = new Ticket(this.ultimo, null);
    this.tickets.push(ticket);

    this.grabarArchivo();
    return `Tiket: ${this.ultimo}`;
  }
  grabarArchivo() {
    let jsonData = {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets,
      ultimos4: this.ultimos4
    };

    let jsonDatString = JSON.stringify(jsonData);
    fs.writeFileSync("./server/data/data.json", jsonDatString);
  }
}

module.exports = { TicketControl };
