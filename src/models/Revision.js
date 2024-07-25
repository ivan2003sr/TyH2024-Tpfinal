const { TipoDeInteres } = require('./enums');

class Revision {
    constructor(texto, puntaje, tipoDeInteres) {

        if (puntaje < -3 || puntaje > 3) {
            throw new Error("El puntaje debe estar en el rango de -3 a 3.");
        }
        
        this.texto = texto;
        this.puntaje = puntaje;
        this.tipoDeInteres = tipoDeInteres;
    }
}

module.exports = Revision;
