var addProduct = require('../../controllers/addproduct');

describe('Test addProduct', () => { 
    test('Deberia crear un nuevo producto con datos validos', async () => { 
        const req = {
            body : {
                id : 14,
                name : "Terminator",
                price : 12,
                count : 12
            }
        }
        const resultados = await addProduct(req);
        expect(resultados).toHaveProperty('name', "Terminator");
        expect(resultados).toHaveProperty("price", 12);
        expect(resultados).toHaveProperty("count", 12);
        expect(resultados).toHaveProperty("id");

     });
     test("Deberia arrojar un error cuando las entradas son invalidas", async() => {
        const req = {
            body : {
                name : 12,
                price : "",
                count : -12
            }
        }

        const response = await addProduct(req);
        expect(response).toHaveProperty("message");
        expect(response.message[0]).toHaveProperty("errors");
        expect(response.message[0].errors).toEqual(expect.arrayContaining([
            {
                type: "field",
                value: -12,
                msg: "El valor minimo es cero, dataTypeInt",
                path: "count",
                location: "body"
            },
            {
                type: "field",
                value: "",
                msg: "Invalid value",
                path: "price",
                location: "body"
            },
            {
                type: "field",
                value: "",
                msg: "No puede estar vacio, datatypeFloat",
                path: "price",
                location: "body"
            },
            {
                type: "field",
                value: 12,
                msg: "Invalid value",
                path: "name",
                location: "body"
            }
        ]))
     })
 })