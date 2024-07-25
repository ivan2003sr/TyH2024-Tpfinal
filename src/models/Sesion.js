const { TipoDeInteres, EstadoSesion } = require('./enums');
const Bid = require('./Bid');

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
        this.revisores = []
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
/*
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
        */

    asignarRevisores(articulo, revisores) {
        if (this.estado !== EstadoSesion.ASIGNACION) {
            throw new Error("El proceso de asignación solo se puede realizar durante el estado de asignación.");
        }
        if (!this.articulos.includes(articulo)) {
            throw new Error("El artículo no está en la lista de artículos de la sesión.");
        }
        if (!Array.isArray(revisores) || revisores.length === 0) {
            throw new Error("Debe proporcionar una lista de revisores.");
        }
        if (revisores.length > 3) {
            throw new Error("No se pueden asignar más de 3 revisores a un artículo.");
        }
        // Verificar que los revisores están en la lista de revisores válidos para la sesión
        revisores.forEach(revisor => {
            if (!this.revisores.includes(revisor)) {
                throw new Error(`El revisor ${revisor.nombreCompleto} no está en la lista de revisores válidos.`);
            }
        });
        articulo.revisores = revisores;
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
