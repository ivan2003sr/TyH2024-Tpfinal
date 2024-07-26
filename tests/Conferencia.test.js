const Conferencia = require("../src/models/Conferencia");
const SesionRegular = require("../src/models/SesionRegular");
const SesionWorkshop = require("../src/models/SesionWorkshop");
const SesionPoster = require("../src/models/SesionPoster");
const { TipoSesion } = require("../src/models/enums");
const Chair = require("../src/models/Chair");
const Revisor = require("../src/models/Revisor");

describe("Conferencia", () => {
  test("Crear una sesión regular", () => {
    const conferencia = new Conferencia(
      "Conferencia Test",
      "2023-07-25",
      "2023-07-26"
    );
    const sesion = conferencia.crearSesion(TipoSesion.REGULAR);
    expect(sesion).toBeInstanceOf(SesionRegular);
    expect(conferencia.sesiones).toHaveLength(1);
  });

  test("Crear una sesión de workshop", () => {
    const conferencia = new Conferencia(
      "Conferencia Test",
      "2023-07-25",
      "2023-07-26"
    );
    const sesion = conferencia.crearSesion(TipoSesion.WORKSHOP);
    expect(sesion).toBeInstanceOf(SesionWorkshop);
    expect(conferencia.sesiones).toHaveLength(1);
  });

  test("Crear una sesión de poster", () => {
    const conferencia = new Conferencia(
      "Conferencia Test",
      "2023-07-25",
      "2023-07-26"
    );
    const sesion = conferencia.crearSesion(TipoSesion.POSTER);
    expect(sesion).toBeInstanceOf(SesionPoster);
    expect(conferencia.sesiones).toHaveLength(1);
  });

  test("Agregar un chair a la conferencia", () => {
    const conferencia = new Conferencia(
      "Conferencia Test",
      "2023-07-25",
      "2023-07-26"
    );
    const chair = new Chair("Luis Martínez", "UTN", "luis@utn.edu", "luis123");
    conferencia.agregarChair(chair);
    expect(conferencia.chairs).toHaveLength(1);
    expect(conferencia.chairs[0].nombreCompleto).toBe("Luis Martínez");
  });

  test("Agregar un revisor a la conferencia", () => {
    const conferencia = new Conferencia(
      "Conferencia Test",
      "2023-07-25",
      "2023-07-26"
    );
    const revisor = new Revisor(
      "Carlos López",
      "UBA",
      "carlos@uba.edu",
      "carlos123"
    );
    conferencia.agregarRevisor(revisor);
    expect(conferencia.comitePrograma).toHaveLength(1);
    expect(conferencia.comitePrograma[0].nombreCompleto).toBe("Carlos López");
  });

  test("Listar chairs de la conferencia", () => {
    const conferencia = new Conferencia(
      "Conferencia Test",
      "2023-07-25",
      "2023-07-26"
    );
    const chair1 = new Chair("Luis Martínez", "UTN", "luis@utn.edu", "luis123");
    const chair2 = new Chair("Ana García", "UNLP", "ana@unlp.edu", "ana123");
    conferencia.agregarChair(chair1);
    conferencia.agregarChair(chair2);
    const listaChairs = conferencia.listarChairs();
    expect(listaChairs).toHaveLength(2);
    expect(listaChairs).toContain("Luis Martínez");
    expect(listaChairs).toContain("Ana García");
  });

  test("Listar comité de programa de la conferencia", () => {
    const conferencia = new Conferencia(
      "Conferencia Test",
      "2023-07-25",
      "2023-07-26"
    );
    const revisor1 = new Revisor(
      "Carlos López",
      "UBA",
      "carlos@uba.edu",
      "carlos123"
    );
    const revisor2 = new Revisor(
      "José Pérez",
      "UTN",
      "jose@utn.edu",
      "jose123"
    );
    conferencia.agregarRevisor(revisor1);
    conferencia.agregarRevisor(revisor2);
    const listaComite = conferencia.listarComitePrograma();
    expect(listaComite).toHaveLength(2);
    expect(listaComite).toContain("Carlos López");
    expect(listaComite).toContain("José Pérez");
  });

  test("Crear sesión con tipo no válido", () => {
    const conferencia = new Conferencia(
      "Conferencia Test",
      "2023-07-25",
      "2023-07-26"
    );
    expect(() => {
      conferencia.crearSesion("TipoInvalido");
    }).toThrow("Tipo de sesión no válido");
    expect(conferencia.sesiones).toHaveLength(0);
  });
});
