const MetodoSeleccion = require("./MetodoSeleccion");

class MetodoSeleccionMejores extends MetodoSeleccion {
  constructor(puntajeMinimo) {
    super();
    this.puntajeMinimo = puntajeMinimo;
  }

 seleccionar(articulos) {
    
 //   return articulos.filter(articulo => articulo.puntaje >= this.puntajeMinimo);
    return articulos.filter(articulo => {
            const puntajePromedio = articulo.revisiones.reduce((sum, rev) => sum + rev.puntaje, 0) / articulo.revisiones.length;
            return puntajePromedio >= this.puntajeMinimo;
        });
    }
}

module.exports = MetodoSeleccionMejores;
