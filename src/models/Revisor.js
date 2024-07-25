const Usuario = require("./Usuario");
const Revision = require("./Revision");

class Revisor extends Usuario {
  constructor(nombreCompleto, afiliacion, email, contrasena) {
    super(nombreCompleto, afiliacion, email, contrasena);
    this.revisiones = [];
  }

  realizarRevision(articulo, texto, puntaje, tipoDeInteres) {
    const revision = new Revision(texto, puntaje, tipoDeInteres);
    articulo.addRevision(revision);
    this.revisiones.push(revision);
  }
}

module.exports = Revisor;
