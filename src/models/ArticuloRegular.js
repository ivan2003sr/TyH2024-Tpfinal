const Articulo = require('./Articulo');
const { TipoArticulo } = require('./enums');

class ArticuloRegular extends Articulo {
    constructor(titulo, urlArchivoAdjunto, abstract, autores, autorEncargado = null) {
        super(titulo, urlArchivoAdjunto, TipoArticulo.REGULAR, autores, autorEncargado);
        this.abstract = abstract;
    }
}

module.exports = ArticuloRegular;
