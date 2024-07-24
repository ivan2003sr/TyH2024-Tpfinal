const MetodoSeleccion = require('./MetodoSeleccion');

class MetodoSeleccionMejores extends MetodoSeleccion {
    constructor(puntajeMinimo) {
        super();
        this.puntajeMinimo = puntajeMinimo;
    }

    seleccionar(articulos) {
        return articulos.filter(articulo => articulo.puntaje >= this.puntajeMinimo);
    }
}

module.exports = MetodoSeleccionMejores;
