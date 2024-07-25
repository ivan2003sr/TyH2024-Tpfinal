const Usuario = require('./Usuario');

class Chair extends Usuario {
    constructor(nombreCompleto, afiliacion, email, contrasena) {
        super(nombreCompleto, afiliacion, email, contrasena);
        this.roles.push('Chair');
    }
}

module.exports = Chair;