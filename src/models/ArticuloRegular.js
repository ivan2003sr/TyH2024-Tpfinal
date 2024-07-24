const Articulo = require('./Articulo');
const { TipoArticulo } = require('./enums');

class ArticuloRegular extends Articulo {
    constructor(titulo, urlArchivoAdjunto, abstract) {
        super(titulo, urlArchivoAdjunto, TipoArticulo.REGULAR);
        this.abstract = abstract;
    }
}

module.exports = ArticuloRegular;
