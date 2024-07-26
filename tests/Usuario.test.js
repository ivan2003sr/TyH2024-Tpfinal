const Usuario = require("../src/models/Usuario");
const Revisor = require("../src/models/Revisor");
const Autor = require("../src/models/Autor");
const Chair = require("../src/models/Chair");


describe("Usuario", () => {
  test("No se puede instanciar la clase Usuario directamente", () => {
    expect(() => {
      new Usuario("Juan Pérez", "UNLP", "juan@unlp.edu", "password123");
    }).toThrow("No se puede instanciar la clase Usuario directamente.");
  });

  test("Crear un nuevo revisor", () => {
    const revisor = new Revisor("Carlos López", "UBA", "carlos@uba.edu", "carlos123");
    expect(revisor.nombreCompleto).toBe("Carlos López");
    expect(revisor.afiliacion).toBe("UBA");
    expect(revisor.email).toBe("carlos@uba.edu");
    expect(revisor.contrasena).toBe("carlos123");
    expect(revisor.roles).toContain("Revisor");
  });

  test("Crear un nuevo autor", () => {
    const autor = new Autor("Luis Pérez", "EMPRESA", "luis@empresa.com", "luis123");
    expect(autor.nombreCompleto).toBe("Luis Pérez");
    expect(autor.afiliacion).toBe("EMPRESA");
    expect(autor.email).toBe("luis@empresa.com");
    expect(autor.contrasena).toBe("luis123");
    expect(autor.roles).toContain("Autor");
  });

  test("Crear un nuevo chair", () => {
    const chair = new Chair("Ana Gómez", "UNLP", "ana@unlp.edu", "ana123");
    expect(chair.nombreCompleto).toBe("Ana Gómez");
    expect(chair.afiliacion).toBe("UNLP");
    expect(chair.email).toBe("ana@unlp.edu");
    expect(chair.contrasena).toBe("ana123");
    expect(chair.roles).toContain("Chair");
  });

  test("Agregar un rol a un usuario", () => {
    const autor = new Autor("Luis Pérez", "EMPRESA", "luis@empresa.com", "luis123");
    const rol = "Revisor";

    autor.addRol(rol);

    expect(autor.roles).toHaveLength(2);
    expect(autor.roles).toContain(rol);
  });

  test("Eliminar un rol de un usuario", () => {
    const revisor = new Revisor("Carlos López", "UBA", "carlos@uba.edu", "carlos123");

    revisor.removeRol("Revisor");

    expect(revisor.roles).toHaveLength(0);
  });

  test("Intentar eliminar un rol que no existe en el usuario", () => {
    const revisor = new Revisor("Carlos López", "UBA", "carlos@uba.edu", "carlos123");

    revisor.removeRol("Autor");  // Intentar eliminar un rol que no existe
    
    expect(revisor.roles).toHaveLength(1);  // Debe seguir teniendo el rol "Revisor"
    expect(revisor.roles).toContain("Revisor");
});


  test("No agregar el mismo rol dos veces a un usuario", () => {
    const chair = new Chair("Ana Gómez", "UNLP", "ana@unlp.edu", "ana123");
    const rol = "Chair";

    chair.addRol(rol);

    expect(chair.roles).toHaveLength(1);  // Solo debe haber un rol "Chair"
  });
});