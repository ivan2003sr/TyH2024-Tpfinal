const Bid = require("../src/models/Bid");
const { TipoDeInteres } = require("../src/models/enums");

describe("Bid", () => {
  test("Debería crear un Bid con el tipo de interés especificado", () => {
    const bid = new Bid(TipoDeInteres.INTERESADO);

    expect(bid.tipoDeInteres).toBe("Interesado");
  });

  test("Debería crear un Bid con el tipo de interés medio", () => {
    const bid = new Bid(TipoDeInteres.QUIZAS);

    expect(bid.tipoDeInteres).toBe("Quizas");
  });

  test("Debería crear un Bid con el tipo de interés bajo", () => {
    const bid = new Bid(TipoDeInteres.NO_INTERESADO);

    expect(bid.tipoDeInteres).toBe("NoInteresado");
  });

  test("Debería dar error al crear un bid con un tipo de interés no existente", () => {
    expect(() => new Bid("NO_VALIDO")).toThrow("Tipo de interés no válido");
  });
});
