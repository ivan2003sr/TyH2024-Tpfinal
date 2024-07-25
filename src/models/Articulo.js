const { EstadoArticulo, TipoArticulo } = require("./enums");

class Articulo {
  constructor(titulo, urlArchivoAdjunto, tipo, autores, autorEncargado = null) {
    if (this.constructor === Articulo) {
      throw new Error("Cannot instantiate abstract class.");
    }

    if (
      !Array.isArray(autores) ||
      autores.length === 0 ||
      autores[0] === null
    ) {
      throw new Error("Debe haber al menos un autor válido.");
    }
    this.titulo = titulo;
    this.urlArchivoAdjunto = urlArchivoAdjunto;
    this.estado = EstadoArticulo.RECEPCION;
    this.cantidadRevisores = 0;
    this.tipo = tipo;
    this.observers = [];
    this.autores = autores;
    this.revisiones = [];
   // this.puntaje = null;

    if (autorEncargado && autores.includes(autorEncargado)) {
      this.autorEncargado = autorEncargado;
    } else if (autorEncargado) {
      throw new Error("El autor encargado debe estar en la lista de autores.");
    } else {
      this.autorEncargado = autores[0];
    }
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  notifyObservers() {
    this.observers.forEach((observer) => observer.update(this));
  }

  addAutor(autor) {
    if (autor && !this.autores.includes(autor)) {
      this.autores.push(autor);
    } else {
      console.log("Autor agregado previamente.");
    }
  }

  setAutorEncargado(autor) {
    if (this.autores.includes(autor)) {
      this.autorEncargado = autor;
    } else {
      throw new Error("El autor encargado debe estar en la lista de autores.");
    }
  }

  addBid(revisor, bid) {
    this.bids.set(revisor, bid);
  }

  addRevision(revision) {
    if (this.revisiones.length >= 3) {
      throw new Error("No se pueden añadir más de 3 revisiones.");
    }
    this.revisiones.push(revision);
    this.calculatePuntaje();
  }

  calculatePuntaje() {
    if (this.revisiones.length > 0) {
      const totalPuntaje = this.revisiones.reduce(
        (sum, rev) => sum + rev.puntaje,
        0
      );
      this.puntaje = totalPuntaje / this.revisiones.length;
    } else {
      this.puntaje = null;
    }
  }
}

module.exports = Articulo;
