const Conferencia = require("../src/models/Conferencia");
const { TipoSesion } = require("../src/models/enums");

const conferencia = new Conferencia(
    "Conferencia de Informática",
    new Date("2024-08-01"),
    new Date("2024-08-05")
  );

test("Crear una nueva conferencia y sesión regular", () => {
  
  const sesion = conferencia.crearSesion(TipoSesion.REGULAR);
  expect(conferencia.nombre).toBe("Conferencia de Informática");
  expect(conferencia.fechaInicio).toEqual(new Date("2024-08-01"));
  expect(conferencia.fechaFin).toEqual(new Date("2024-08-05"));
  expect(sesion.tipo).toBe(TipoSesion.REGULAR);
});

test("Crear una nueva sesión poster", () => {
    const sesion = conferencia.crearSesion(TipoSesion.POSTER);
    expect(sesion.tipo).toBe(TipoSesion.POSTER);
  });

test("Crear una nueva sesión Workshop", () => {
    const sesion = conferencia.crearSesion(TipoSesion.WORKSHOP);
    expect(sesion.tipo).toBe(TipoSesion.WORKSHOP);
  });

  test('Crear una sesión con tipo no válido', () => {
    expect(() => conferencia.crearSesion('TipoInvalido')).toThrow('Tipo de sesión no válido');
  });