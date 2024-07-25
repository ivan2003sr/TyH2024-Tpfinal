const { TipoArticulo } = require('./enums');
const Sesion = require('./Sesion');

class SesionPoster extends Sesion {
    constructor(tema, deadline, numeroMaximoArticulosAceptados) {
        super(tema, deadline, numeroMaximoArticulosAceptados, 'Poster');
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
        if (articulo.tipo === TipoArticulo.POSTER){
            this.articulos.push(articulo);
        } else {
            throw new Error("Sólo se pueden agregar artículos tipo Poster a esta sesión.")
        }
    }

}

module.exports = SesionPoster;
