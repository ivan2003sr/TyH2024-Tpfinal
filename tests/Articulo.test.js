const ArticuloRegular = require("../src/models/Articulo/ArticuloRegular");
const ArticuloPoster = require("../src/models/Articulo/ArticuloPoster");
const Articulo = require("../src/models/Articulo/Articulo");
const Autor = require("../src/models/Usuarios/Autor");
const Revision = require("../src/models/Revision");

describe("ArticuloRegular", () => {
  let autor1, autor2;

  beforeEach(() => {
    autor1 = new Autor("Ana Gómez", "UNLP", "ana@unlp.edu", "password456");
    autor2 = new Autor(
      "Luis Fernández",
      "UNLP",
      "luis@unlp.edu",
      "password123"
    );
  });

  test("Crear un nuevo artículo regular con autores y autor encargado válido", () => {
    const articulo = new ArticuloRegular(
      "Título 1",
      "http://archivo1.com",
      "Resumen del artículo 1",
      [autor1, autor2],
      autor2
    );

    expect(articulo.titulo).toBe("Título 1");
    expect(articulo.urlArchivoAdjunto).toBe("http://archivo1.com");
    expect(articulo.abstract).toBe("Resumen del artículo 1");
    expect(articulo.autores.length).toBe(2);
    expect(articulo.autores[0].nombreCompleto).toBe("Ana Gómez");
    expect(articulo.autores[1].nombreCompleto).toBe("Luis Fernández");
    expect(articulo.autorEncargado.nombreCompleto).toBe("Luis Fernández");
  });

  test("Crear un nuevo artículo regular sin autor encargado, usa el primer autor de la lista", () => {
    const articulo = new ArticuloRegular(
      "Título 1",
      "http://archivo1.com",
      "Resumen del artículo 1",
      [autor1, autor2]
    );

    expect(articulo.autorEncargado.nombreCompleto).toBe("Ana Gómez");
  });

  test("Crear un artículo regular con resumen de más de 300 palabras debería lanzar un error", () => {
    const resumenLargo = "Palabra ".repeat(301); // Crear un resumen con más de 300 palabras

    expect(
      () =>
        new ArticuloRegular("Título 1", "http://archivo1.com", resumenLargo, [
          autor1,
        ])
    ).toThrow("El resumen no puede tener más de 300 palabras.");
  });

  test("El puntaje final del artículo es el promedio de las revisiones", () => {
    const articulo = new ArticuloRegular(
      "Título 1",
      "http://archivo1.com",
      "Resumen del artículo 1",
      [autor1],
      autor1
    );

    const revision1 = new Revision("Buena calidad", 1, "General");
    const revision2 = new Revision("Excelente", 3, "General");
    const revision3 = new Revision("Aceptable", 2, "General");

    articulo.addRevision(revision1);
    articulo.addRevision(revision2);
    articulo.addRevision(revision3);

    expect(articulo.puntaje).toBe(2); // Promedio de 1, 3 y 2
  });

  test("No se pueden añadir más de 3 revisiones a un artículo", () => {
    const articulo = new ArticuloRegular(
      "Título 1",
      "http://archivo1.com",
      "Resumen del artículo 1",
      [autor1],
      autor1
    );

    const revision1 = new Revision("Buena calidad", 1, "General");
    const revision2 = new Revision("Excelente", 2, "General");
    const revision3 = new Revision("Aceptable", 3, "General");
    const revision4 = new Revision("Regular", 1, "General");

    articulo.addRevision(revision1);
    articulo.addRevision(revision2);
    articulo.addRevision(revision3);

    expect(() => articulo.addRevision(revision4)).toThrow(
      "No se pueden añadir más de 3 revisiones."
    );
  });

  test("El puntaje debe ser null si no hay revisiones", () => {
    const articulo = new ArticuloRegular(
      "Título 1",
      "http://archivo1.com",
      "Resumen del artículo 1",
      [autor1],
      autor1
    );
    articulo.calculatePuntaje();
    expect(articulo.puntaje).toBeNull();
  });
});

describe("ArticuloPoster", () => {
  let autor1;

  beforeEach(() => {
    autor1 = new Autor("Ana Gómez", "UNLP", "ana@unlp.edu", "password456");
  });

  test("Crear un nuevo artículo poster", () => {
    const articulo = new ArticuloPoster(
      "Título 2",
      "http://archivo2.com",
      "http://fuentes.com",
      [autor1]
    );

    expect(articulo.titulo).toBe("Título 2");
    expect(articulo.urlArchivoAdjunto).toBe("http://archivo2.com");
    expect(articulo.urlFuentes).toBe("http://fuentes.com");
    expect(articulo.autores.length).toBe(1);
    expect(articulo.autores[0].nombreCompleto).toBe("Ana Gómez");
    expect(articulo.autorEncargado.nombreCompleto).toBe("Ana Gómez");
  });

  test("Crear un artículo poster con autor encargado no válido, lanza exception.", () => {
    const autor2 = new Autor(
      "Pedro Rodríguez",
      "UNLP",
      "pedro@unlp.edu",
      "password123"
    );
    const articulo = new ArticuloPoster(
      "Título 2",
      "http://archivo2.com",
      "http://fuentes.com",
      [autor1]
    );

    expect(
      () =>
        new ArticuloPoster(
          "Título 2",
          "http://archivo2.com",
          "http://fuentes.com",
          [autor1],
          autor2
        )
    ).toThrow("El autor encargado debe estar en la lista de autores.");
  });

  test("Crear un artículo poster, luego cambia el autor encargado a uno válido y a uno no válido", () => {
    const autor2 = new Autor(
      "Carlos Pérez",
      "UNLP",
      "carlos@unlp.edu",
      "password789"
    );
    const autor3 = new Autor(
      "Juan Pérez",
      "UNLP",
      "juan@unlp.edu",
      "password555"
    );
    const articulo = new ArticuloPoster(
      "Título 2",
      "http://archivo2.com",
      "http://fuentes.com",
      [autor1, autor2]
    );

    expect(articulo.autorEncargado.nombreCompleto).toBe("Ana Gómez");

    articulo.setAutorEncargado(autor2);
    expect(articulo.autorEncargado.nombreCompleto).toBe("Carlos Pérez");

    expect(() => articulo.setAutorEncargado(autor3)).toThrow(
      "El autor encargado debe estar en la lista de autores."
    );
    expect(articulo.autorEncargado.nombreCompleto).toBe("Carlos Pérez");
  });
});

describe("Articulo (Abstract)", () => {
  test("No se puede instanciar directamente la clase abstracta Articulo", () => {
    const autor = new Autor(
      "Carlos Pérez",
      "UNLP",
      "carlos@unlp.edu",
      "password789"
    );
    expect(
      () => new Articulo("Título 2", "http://archivo2.com", "Tipo", [autor])
    ).toThrow("Cannot instantiate abstract class.");
  });

  test("No se puede instanciar un Articulo sin autores válidos", () => {
    expect(
      () =>
        new ArticuloRegular("Título 2", "http://archivo2.com", "Tipo", [null])
    ).toThrow("Debe haber al menos un autor válido.");

    expect(
      () => new ArticuloRegular("Título 2", "http://archivo2.com", "Tipo", [])
    ).toThrow("Debe haber al menos un autor válido.");
  });

  test("El autor encargado debe estar en la lista de autores", () => {
    const autor1 = new Autor(
      "Ana Gómez",
      "UNLP",
      "ana@unlp.edu",
      "password456"
    );
    const autor2 = new Autor(
      "Luis Fernández",
      "UNLP",
      "luis@unlp.edu",
      "password123"
    );
    expect(
      () =>
        new ArticuloPoster(
          "Título 2",
          "http://archivo2.com",
          "Tipo",
          [autor1, autor2],
          new Autor("No Existe", "UNLP", "no@unlp.edu", "password000")
        )
    ).toThrow("El autor encargado debe estar en la lista de autores.");
  });

  test("Si no se especifica un autor encargado, se usa el primer autor", () => {
    const autor1 = new Autor(
      "Ana Gómez",
      "UNLP",
      "ana@unlp.edu",
      "password456"
    );
    const autor2 = new Autor(
      "Luis Fernández",
      "UNLP",
      "luis@unlp.edu",
      "password123"
    );
    const articulo = new ArticuloPoster(
      "Título 2",
      "http://archivo2.com",
      "Tipo",
      [autor1, autor2]
    );

    expect(articulo.autorEncargado).toBe(autor1);
  });

  test("Agregar un observador y notificar a todos los observadores", () => {
    const autor = new Autor("Ana Gómez", "UNLP", "ana@unlp.edu", "password456");
    const articulo = new ArticuloRegular(
      "Título 2",
      "http://archivo2.com",
      "Tipo",
      [autor]
    );

    const observador = {
      update: jest.fn(),
    };

    articulo.addObserver(observador);
    articulo.notifyObservers();

    expect(observador.update).toHaveBeenCalledWith(articulo);
  });

  test("Agregar un autor solo si no existe en la lista", () => {
    const autor1 = new Autor(
      "Ana Gómez",
      "UNLP",
      "ana@unlp.edu",
      "password456"
    );
    const autor2 = new Autor(
      "Luis Fernández",
      "UNLP",
      "luis@unlp.edu",
      "password123"
    );
    const nuevoAutor = new Autor(
      "Juan Pérez",
      "UNLP",
      "juan@unlp.edu",
      "password321"
    );

    const articulo = new ArticuloPoster(
      "Título 2",
      "http://archivo2.com",
      "Tipo",
      [autor1]
    );

    articulo.addAutor(autor2);
    articulo.addAutor(nuevoAutor);
    expect(articulo.autores.length).toBe(3);
    articulo.addAutor(autor2); // Intentar volver a agregar un autor que ya existe
    expect(articulo.autores.length).toBe(3);
    expect(articulo.autores).toContain(nuevoAutor);
  });

  test("Establecer un autor encargado válido", () => {
    const autor1 = new Autor(
      "Ana Gómez",
      "UNLP",
      "ana@unlp.edu",
      "password456"
    );
    const autor2 = new Autor(
      "Luis Fernández",
      "UNLP",
      "luis@unlp.edu",
      "password123"
    );
    const articulo = new ArticuloRegular(
      "Título 2",
      "http://archivo2.com",
      "Tipo",
      [autor1, autor2]
    );

    articulo.setAutorEncargado(autor2);

    expect(articulo.autorEncargado).toBe(autor2);
  });

  test("No se puede establecer un autor encargado no válido", () => {
    const autor1 = new Autor(
      "Ana Gómez",
      "UNLP",
      "ana@unlp.edu",
      "password456"
    );
    const autor2 = new Autor(
      "Luis Fernández",
      "UNLP",
      "luis@unlp.edu",
      "password123"
    );
    const autorInvalido = new Autor(
      "Pedro Rodríguez",
      "UNLP",
      "pedro@unlp.edu",
      "password789"
    );
    const articulo = new ArticuloRegular(
      "Título 2",
      "http://archivo2.com",
      "Tipo",
      [autor1, autor2]
    );

    expect(() => articulo.setAutorEncargado(autorInvalido)).toThrow(
      "El autor encargado debe estar en la lista de autores."
    );
  });

  test("Agregar revisiones y calcular el puntaje", () => {
    const autor = new Autor("Ana Gómez", "UNLP", "ana@unlp.edu", "password456");
    const articulo = new ArticuloRegular(
      "Título 2",
      "http://archivo2.com",
      "Tipo",
      [autor]
    );

    const revision1 = new Revision("Buena calidad", 1, "General");
    const revision2 = new Revision("Excelente", 3, "General");
    const revision3 = new Revision("Aceptable", 2, "General");

    articulo.addRevision(revision1);
    articulo.addRevision(revision2);
    articulo.addRevision(revision3);

    expect(articulo.puntaje).toBe(2);
  });

  test("El puntaje debe ser null si no hay revisiones", () => {
    const autor = new Autor("Ana Gómez", "UNLP", "ana@unlp.edu", "password456");
    const articulo = new ArticuloRegular(
      "Título 2",
      "http://archivo2.com",
      "Tipo",
      [autor]
    );
    articulo.calculatePuntaje();
    expect(articulo.puntaje).toBeNull();
  });

  test("No se pueden añadir más de 3 revisiones", () => {
    const autor = new Autor("Ana Gómez", "UNLP", "ana@unlp.edu", "password456");
    const articulo = new ArticuloRegular(
      "Título 2",
      "http://archivo2.com",
      "Tipo",
      [autor]
    );

    const revision1 = new Revision("Buena calidad", 1, "General");
    const revision2 = new Revision("Excelente", 2, "General");
    const revision3 = new Revision("Aceptable", 3, "General");
    const revision4 = new Revision("Regular", 1, "General");

    articulo.addRevision(revision1);
    articulo.addRevision(revision2);
    articulo.addRevision(revision3);

    expect(() => articulo.addRevision(revision4)).toThrow(
      "No se pueden añadir más de 3 revisiones."
    );
  });
});
