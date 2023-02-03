const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {

  it("Validar que Get de cafes responda un 200", async () => {
    const resultado = await request(server).get("/cafes").send();
    expect(resultado.body.length).toBeGreaterThanOrEqual(1);
    expect(resultado.statusCode).toBe(200);
  });

  it("Validar que id sean iguales para eliminar", async () => {
    const jwt = "token";
    const idDeProductoAEliminar = 5;
    const resultado = await request(server)
      .delete(`/cafes/${idDeProductoAEliminar}`)
      .set("Authorization", jwt)
      .send();
    expect(resultado.statusCode).toBe(404);
  });

  it("Validar que se agrega un cafe", async () => {
    const newCoffee = {
      id: 5,
      nombre: "cafe 5",
    };
    const resultado = await request(server).post("/cafes").send(newCoffee);
    expect(resultado.statusCode).toBe(201);
    expect(resultado.body).toContainEqual(newCoffee);
  });

  it("Validar que el id en params es igual al id del payload", async () => {
    const updateCoffee = {
      id: 7,
      nombre: "cafe 5",
    };
    const idDeProductoAactualizar = 5;
    const resultado = await request(server).put(`/cafes/${idDeProductoAactualizar}`).send(updateCoffee);
    expect(resultado.statusCode).toBe(400);
  });
});
