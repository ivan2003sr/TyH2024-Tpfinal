const Articulo = require("./Articulo");
const { TipoArticulo } = require("./enums");

class ArticuloRegular extends Articulo {
  constructor(
    titulo,
    urlArchivoAdjunto,
    abstract,
    autores,
    autorEncargado = null,
    revisiones = []
  ) {
    super(
      titulo,
      urlArchivoAdjunto,
      TipoArticulo.REGULAR,
      autores,
      autorEncargado
    );
    this.abstract = abstract;
    if (this.abstract.split(" ").length > 300) {
      throw new Error("El resumen no puede tener más de 300 palabras.");
    }
    this.revisiones = revisiones;
  }
}

module.exports = ArticuloRegular;
