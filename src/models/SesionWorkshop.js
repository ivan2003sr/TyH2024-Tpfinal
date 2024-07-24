// SesionWorkshop.js

const Sesion = require('./Sesion');
const { TipoArticulo } = require('./enums');

class SesionWorkshop extends Sesion {
    constructor(tema, deadline, numeroMaximoArticulosAceptados) {
        super(tema, deadline, numeroMaximoArticulosAceptados, 'Workshop');
        this.metodoSeleccionRegular = null;
        this.metodoSeleccionPoster = null;
    }

    setMetodoSeleccion(metodo, tipoArticulo) {
        if (tipoArticulo === TipoArticulo.REGULAR) {
            this.metodoSeleccionRegular = metodo;
        } else if (tipoArticulo === TipoArticulo.POSTER) {
            this.metodoSeleccionPoster = metodo;
        }
    }

    seleccionarArticulos() {
        const regulares = this.articulos.filter(a => a.tipo === TipoArticulo.REGULAR);
        const posters = this.articulos.filter(a => a.tipo === TipoArticulo.POSTER);

        let seleccionados = [];
        if (this.metodoSeleccionRegular) {
            seleccionados = seleccionados.concat(this.metodoSeleccionRegular.seleccionar(regulares));
        }
        if (this.metodoSeleccionPoster) {
            seleccionados = seleccionados.concat(this.metodoSeleccionPoster.seleccionar(posters));
        }

        return seleccionados;
    }
}

module.exports = SesionWorkshop;
