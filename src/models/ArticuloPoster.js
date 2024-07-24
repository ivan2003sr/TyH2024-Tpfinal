const Articulo = require('./Articulo');
const { TipoArticulo } = require('./enums');

class ArticuloPoster extends Articulo {
    constructor(titulo, urlArchivoAdjunto, urlFuentes) {
        super(titulo, urlArchivoAdjunto, TipoArticulo.POSTER);
        this.urlFuentes = urlFuentes;
    }
}

module.exports = ArticuloPoster