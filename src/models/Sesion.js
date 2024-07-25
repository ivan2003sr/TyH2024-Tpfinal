const { TipoSesion } = require('./enums');

class Sesion {
    constructor(tema, deadline, numeroMaximoArticulosAceptados, tipo) {
        if (this.constructor === Sesion) {
            throw new Error("Cannot instantiate abstract class");
        }
        this.tema = tema;
        this.deadline = deadline;
        this.numeroMaximoArticulosAceptados = numeroMaximoArticulosAceptados;
        this.tipo = tipo;
        this.articulos = [];
        this.metodoSeleccion = null;
    }

    setMetodoSeleccion(metodo, tipoArticulo) {
        throw new Error("Abstract method!");
    }

    seleccionarArticulos() {
        throw new Error("Abstract method!");
    }

    addArticulo(articulo) {
        throw new Error("Abstract method!");
    }
}

module.exports = Sesion;
