// SesionWorkshop.js

const Sesion = require('./Sesion');
const { TipoArticulo } = require('./enums');

class SesionWorkshop extends Sesion {
    constructor(tema, deadline, numeroMaximoArticulosAceptados) {
        super(tema, deadline, numeroMaximoArticulosAceptados, 'Workshop');
        this.metodoSeleccionPorTipo = {};
    }

    setMetodoSeleccion(metodo, tipoArticulo) {
        this.metodoSeleccionPorTipo[tipoArticulo] = metodo;
    }

    seleccionarArticulos() {
        let seleccionados = [];
        for (let tipoArticulo in this.metodoSeleccionPorTipo) {
            const metodo = this.metodoSeleccionPorTipo[tipoArticulo];
            const articulosPorTipo = this.articulos.filter(articulo => articulo.tipo === tipoArticulo);
            seleccionados = seleccionados.concat(metodo.seleccionar(articulosPorTipo));
        }
        return seleccionados;
    }

    addArticulo(articulo) {
        if (articulo.tipo === TipoArticulo.REGULAR || articulo.tipo === TipoArticulo.POSTER) {
            this.articulos.push(articulo);
        } else {
            throw new Error("Sólo se pueden agregar artículos tipo Regular o Poster a esta sesión.");
        }
    }
}

module.exports = SesionWorkshop;