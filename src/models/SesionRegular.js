const Sesion = require('./Sesion');

class SesionRegular extends Sesion {
    constructor(tema, deadline, numeroMaximoArticulosAceptados) {
        super(tema, deadline, numeroMaximoArticulosAceptados, 'Regular');
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

module.exports = SesionRegular;
