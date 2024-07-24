// SesionPoster.js

const Sesion = require('./Sesion');

class SesionPoster extends Sesion {
    constructor(tema, deadline, numeroMaximoArticulosAceptados) {
        super(tema, deadline, numeroMaximoArticulosAceptados, 'Poster');
    }

    setMetodoSeleccion(metodo, tipoArticulo) {
        this.metodoSeleccion = metodo;
    }

    seleccionarArticulos() {
        if (this.metodoSeleccion) {
            return this.metodoSeleccion.seleccionar(this.articulos);
        }
        return [];
    }
}

module.exports = SesionPoster;
