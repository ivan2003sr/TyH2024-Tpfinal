const { TipoSesion } = require('./enums');
const { EstadoSesion } = require('./enums'); 

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
        this.estado = EstadoSesion.RECEPCION;
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

    cambiarEstado(nuevoEstado){
        this.estado = nuevoEstado;
    }

    procesarBidding(revisor, articulo, tipoDeInteres) {
        if (this.estado !== EstadoSesion.BIDDING) {
            throw new Error("El proceso de bidding solo se puede realizar durante el estado de bidding.");
        }
        const bid = new Bid(tipoDeInteres);
        articulo.addBid(revisor, bid);
    }

    asignarRevisores() {
        if (this.estado !== EstadoSesion.ASIGNACION) {
            throw new Error("El proceso de asignación solo se puede realizar durante el estado de asignación.");
        }
        this.articulos.forEach(articulo => {
            let revisores = Array.from(articulo.bids.keys());
            revisores = revisores.slice(0, 3); // Asignamos un máximo de 3 revisores por artículo
            articulo.revisores = revisores;
        });
    }

    agregarRevision(articulo, revisor, revision) {
        if (this.estado !== EstadoSesion.REVISION) {
            throw new Error("El proceso de revisión solo se puede realizar durante el estado de revisión.");
        }
        if (!articulo.revisores.includes(revisor)) {
            throw new Error("El revisor no está asignado a este artículo.");
        }
        articulo.addRevision(revision);
    }
}

module.exports = Sesion;
