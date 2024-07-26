const { TipoDeInteres } = require("./enums");

class Bid {
  constructor(tipoDeInteres) {
    if (!Object.values(TipoDeInteres).includes(tipoDeInteres)) {
      throw new Error("Tipo de interés no válido");
    }
    this.tipoDeInteres = tipoDeInteres;
  }
}

module.exports = Bid;
