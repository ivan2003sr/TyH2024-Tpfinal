const { EstadoArticulo, TipoArticulo } = require('./enums');

class Articulo {
    constructor(titulo, urlArchivoAdjunto, tipo) {
        this.titulo = titulo;
        this.urlArchivoAdjunto = urlArchivoAdjunto;
        this.estado = EstadoArticulo.RECEPCION;
        this.cantidadRevisores = 0;
        this.tipo = tipo;
        this.observers = [];
        this.autores = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    notifyObservers() {
        this.observers.forEach(observer => observer.update(this));
    }

    addAutor(autor) {
        this.autores.push(autor);
    }

    setAutorEncargado(autor) {
        this.autorEncargado = autor;
    }
}




module.exports = Articulo;
