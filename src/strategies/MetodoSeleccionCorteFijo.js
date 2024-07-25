const MetodoSeleccion = require("./MetodoSeleccion");

class MetodoSeleccionCorteFijo extends MetodoSeleccion {
  constructor(corteFijo) {
    super();
    this.corteFijo = corteFijo;
  }

  seleccionar(articulos) {
    const sortedArticulos = articulos.sort((a, b) => b.puntaje - a.puntaje);
    const cantidadASeleccionar = Math.ceil(
      sortedArticulos.length * this.corteFijo
    );
    return sortedArticulos.slice(0, cantidadASeleccionar);
  }
}

module.exports = MetodoSeleccionCorteFijo;
