const { TipoDeInteres } = require('./enums');

class Revision {
    constructor(texto, puntaje, tipoDeInteres) {
        this.texto = texto;
        this.puntaje = puntaje;
        this.tipoDeInteres = tipoDeInteres;
    }
}

module.exports = Revision;
