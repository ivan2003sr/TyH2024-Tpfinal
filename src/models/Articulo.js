const { EstadoArticulo, TipoArticulo } = require("./enums");

class Articulo {
  constructor(titulo, urlArchivoAdjunto, tipo, autores, autorEncargado = null, puntaje = null) {

    if (this.constructor === Articulo) {
      throw new Error("Cannot instantiate abstract class.");
  }

    if (!Array.isArray(autores) || autores.length === 0 || autores[0] === null) {
      throw new Error("Debe haber al menos un autor válido.");
    }
    this.titulo = titulo;
    this.urlArchivoAdjunto = urlArchivoAdjunto;
    this.estado = EstadoArticulo.RECEPCION;
    this.cantidadRevisores = 0;
    this.tipo = tipo;
    this.observers = [];
    this.autores = autores;
    this.puntaje = puntaje;

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
}

module.exports = Articulo;
