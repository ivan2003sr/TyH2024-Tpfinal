const Bid = require("../src/models/Bid");
const TipoDeInteres = require("../src/models/enums");

describe("Bid", () => {
  test("Debería crear un Bid con el tipo de interés especificado", () => {
    const bid = new Bid(TipoDeInteres.ALTO);

    expect(bid.tipoDeInteres).toBe(TipoDeInteres.ALTO);
  });

  test("Debería crear un Bid con el tipo de interés medio", () => {
    const bid = new Bid(TipoDeInteres.MEDIO);

    expect(bid.tipoDeInteres).toBe(TipoDeInteres.MEDIO);
  });

  test("Debería crear un Bid con el tipo de interés bajo", () => {
    const bid = new Bid(TipoDeInteres.BAJO);

    expect(bid.tipoDeInteres).toBe(TipoDeInteres.BAJO);
  });
});
