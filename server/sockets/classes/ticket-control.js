const fs = require("fs");
class TicketControl {
  constructor() {
    // Para controlar cual es el ultimo ticket
    this.ultimo = 0;
    this.hoy = new Date().getDate();

    // Para leer informacion de un json
    let data = require("../../data/data.json");

    if (data.hoy === this.hoy) {
      this.ultimo = data.ultimo;
    } else {
      this.reinciarConteo();
    }
  }
  reinciarConteo() {
    this.ultimo = 0;
    this.grabarArchivo();
  }

  siguienteTiket() {
    this.ultimo += 1;
    this.grabarArchivo();
    return `Tiket: ${this.ultimo}`;
  }
  grabarArchivo() {
    let jsonData = {
      ultimo: this.ultimo,
      hoy: this.hoy
    };

    let jsonDatString = JSON.stringify(jsonData);
    fs.writeFileSync("./server/data/data.json", jsonDatString);
  }
}

module.exports = { TicketControl };
