const { TipoDeInteres, EstadoSesion } = require("../enums");
const Bid = require("../Bid");

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
    this.revisores = [];
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

  cambiarEstado(nuevoEstado) {
    this.estado = nuevoEstado;
  }

  procesarBidding(revisor, articulo, tipoDeInteres) {
    if (this.estado !== EstadoSesion.BIDDING) {
      throw new Error(
        "El proceso de bidding solo se puede realizar durante el estado de bidding."
      );
    }
    const bid = new Bid(tipoDeInteres);
    articulo.addBid(revisor, bid);
  }

  asignarRevisores(articulo) {
    if (this.estado !== EstadoSesion.ASIGNACION) {
      throw new Error(
        "El proceso de asignación solo se puede realizar durante el estado de asignación."
      );
    }
    if (!this.articulos.includes(articulo)) {
      throw new Error(
        "El artículo no está en la lista de artículos de la sesión."
      );
    }

    const interesados = [];
    const quizas = [];
    const noInteresados = [];
    const noIndicados = [];

    this.revisores.forEach((revisor) => {
      const bid = articulo.bids.get(revisor);
      if (bid) {
        switch (bid.tipoDeInteres) {
          case TipoDeInteres.INTERESADO:
            interesados.push(revisor);
            break;
          case TipoDeInteres.QUIZAS:
            quizas.push(revisor);
            break;
          case TipoDeInteres.NO_INTERESADO:
            noInteresados.push(revisor);
            break;
        }
      } else {
        noIndicados.push(revisor);
      }
    });

    const seleccionados = [
      ...interesados,
      ...quizas,
      ...noIndicados,
      ...noInteresados,
    ].slice(0, 3);

    if (seleccionados.length < 3) {
      throw new Error("El número mínimo de revisores para un artículo es de 3.");
    }

    articulo.revisores = seleccionados;
  }

  agregarRevision(articulo, revisor, revision) {
    if (this.estado !== EstadoSesion.REVISION) {
      throw new Error(
        "El proceso de revisión solo se puede realizar durante el estado de revisión."
      );
    }
    if (!articulo.revisores.includes(revisor)) {
      throw new Error("El revisor no está asignado a este artículo.");
    }
    articulo.addRevision(revision);
  }
}

module.exports = Sesion;
