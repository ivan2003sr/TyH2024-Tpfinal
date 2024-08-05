const Usuario = require("./Usuario");
const { Roles } = require("../enums");

class Autor extends Usuario {
  constructor(nombreCompleto, afiliacion, email, contrasena) {
    super(nombreCompleto, afiliacion, email, contrasena);
    this.addRol(Roles.AUTOR);
  }
}

module.exports = Autor;
