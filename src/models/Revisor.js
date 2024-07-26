const Usuario = require("./Usuario");
const Revision = require("./Revision");
const { Roles } = require("./enums");

class Revisor extends Usuario {
  constructor(nombreCompleto, afiliacion, email, contrasena) {
    super(nombreCompleto, afiliacion, email, contrasena);
    this.revisiones = [];
    this.addRol(Roles.REVISOR);
  }

  realizarRevision(articulo, texto, puntaje, tipoDeInteres) {
    const revision = new Revision(texto, puntaje, tipoDeInteres);
    articulo.addRevision(revision);
    this.revisiones.push(revision);
  }
}

module.exports = Revisor;
