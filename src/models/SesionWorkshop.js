const Sesion = require("./Sesion");
const { TipoArticulo } = require("./enums");

class SesionWorkshop extends Sesion {
  constructor(tema, deadline, numeroMaximoArticulosAceptados) {
    super(tema, deadline, numeroMaximoArticulosAceptados, "Workshop");
    //    this.metodoSeleccionPorTipo = {};
    this.metodoSeleccionRegulares = null;
    this.metodoSeleccionPosters = null;
  }

  setMetodoSeleccion(metodoSeleccion, tipoArticulo) {
    if (tipoArticulo === TipoArticulo.REGULAR) {
      this.metodoSeleccionRegulares = metodoSeleccion;
    } else if (tipoArticulo === TipoArticulo.POSTER) {
      this.metodoSeleccionPosters = metodoSeleccion;
    } else {
      throw new Error("Tipo de artículo no soportado.");
    }
  }

  seleccionarArticulos() {
    const articulosRegulares = this.articulos.filter(
      (articulo) => articulo.tipo === TipoArticulo.REGULAR
    );
    const articulosPosters = this.articulos.filter(
      (articulo) => articulo.tipo === TipoArticulo.POSTER
    );

    let seleccionadosRegulares = [];
    if (this.metodoSeleccionRegulares) {
      seleccionadosRegulares =
        this.metodoSeleccionRegulares.seleccionar(articulosRegulares);
    }

    let seleccionadosPosters = [];
    if (this.metodoSeleccionPosters) {
      seleccionadosPosters =
        this.metodoSeleccionPosters.seleccionar(articulosPosters);
    }

    return [...seleccionadosRegulares, ...seleccionadosPosters];
  }

  addArticulo(articulo) {
    if (
      articulo.tipo === TipoArticulo.REGULAR ||
      articulo.tipo === TipoArticulo.POSTER
    ) {
      this.articulos.push(articulo);
    } else {
      throw new Error(
        "Sólo se pueden agregar artículos tipo Regular o Poster a esta sesión."
      );
    }
  }
}

module.exports = SesionWorkshop;
