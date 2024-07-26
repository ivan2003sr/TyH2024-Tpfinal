class Usuario {
  constructor(nombreCompleto, afiliacion, email, contrasena) {
    if (this.constructor === Usuario) {
      throw new Error("No se puede instanciar la clase Usuario directamente.");
    }
    this.nombreCompleto = nombreCompleto;
    this.afiliacion = afiliacion;
    this.email = email;
    this.contrasena = contrasena;
    this.roles = [];
  }

  addRol(rol) {
    if (!this.roles.includes(rol)) {
      this.roles.push(rol);
    }
  }

  removeRol(rolNombre) {
    this.roles = this.roles.filter((rol) => rol !== rolNombre);
  }
}

module.exports = Usuario;
