const Usuario = require("../src/models/Usuario");
const Rol = require("../src/models/Rol");

describe("Usuario", () => {
  test("Crear un nuevo usuario", () => {
    const usuario = new Usuario(
      "Juan Pérez",
      "UNLP",
      "juan@unlp.edu",
      "password123"
    );
    expect(usuario.nombreCompleto).toBe("Juan Pérez");
    expect(usuario.afiliacion).toBe("UNLP");
    expect(usuario.email).toBe("juan@unlp.edu");
    expect(usuario.contrasena).toBe("password123");
  });

  test("Agregar un rol a un usuario", () => {
    const usuario = new Usuario(
      "Juan Pérez",
      "UNLP",
      "juan@unlp.edu",
      "password123"
    );
    const rol = new Rol("Revisor");

    usuario.addRol(rol);

    expect(usuario.roles).toHaveLength(1);
    expect(usuario.roles[0]).toBe(rol);
  });

  test("Agregar múltiples roles a un usuario", () => {
    const usuario = new Usuario(
      "Juan Pérez",
      "UNLP",
      "juan@unlp.edu",
      "password123"
    );
    const rol1 = new Rol("Revisor");
    const rol2 = new Rol("Chair");

    usuario.addRol(rol1);
    usuario.addRol(rol2);

    expect(usuario.roles).toHaveLength(2);
    expect(usuario.roles[0]).toBe(rol1);
    expect(usuario.roles[1]).toBe(rol2);
  });
});
