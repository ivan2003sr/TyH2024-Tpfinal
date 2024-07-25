class Usuario {
    constructor(nombreCompleto, afiliacion, email, contrasena) {
        this.nombreCompleto = nombreCompleto;
        this.afiliacion = afiliacion;
        this.email = email;
        this.contrasena = contrasena;
        this.roles = [];
    }

    addRol(rol) {
        this.roles.push(rol);
    }

}

module.exports = Usuario;