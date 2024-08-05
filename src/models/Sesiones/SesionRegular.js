const { TipoArticulo } = require("../enums");
const Sesion = require("./Sesion");

class SesionRegular extends Sesion {
  constructor(tema, deadline, numeroMaximoArticulosAceptados) {
    super(tema, deadline, numeroMaximoArticulosAceptados, "Regular");
  }

  setMetodoSeleccion(metodo) {
    this.metodoSeleccion = metodo;
  }

  seleccionarArticulos() {
    if (this.metodoSeleccion) {
      return this.metodoSeleccion.seleccionar(this.articulos);
    }
    return [];
  }

  addArticulo(articulo) {
    if (articulo.tipo === TipoArticulo.REGULAR) {
      this.articulos.push(articulo);
    } else {
      throw new Error(
        "Sólo se pueden agregar artículos tipo Regular a esta sesión."
      );
    }
  }
}

module.exports = SesionRegular;
