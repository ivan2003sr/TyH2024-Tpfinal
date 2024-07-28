const Articulo = require("./Articulo");
const { TipoArticulo } = require("../enums");

class ArticuloPoster extends Articulo {
  constructor(
    titulo,
    urlArchivoAdjunto,
    urlFuentes,
    autores,
    autorEncargado = null
  ) {
    super(
      titulo,
      urlArchivoAdjunto,
      TipoArticulo.POSTER,
      autores,
      autorEncargado
    );
    this.urlFuentes = urlFuentes;
  }
}

module.exports = ArticuloPoster;
