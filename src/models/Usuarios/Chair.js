const Usuario = require("./Usuario");
const { Roles } = require("../enums");

class Chair extends Usuario {
  constructor(nombreCompleto, afiliacion, email, contrasena) {
    super(nombreCompleto, afiliacion, email, contrasena);
    this.addRol(Roles.CHAIR);
  }
}

module.exports = Chair;
