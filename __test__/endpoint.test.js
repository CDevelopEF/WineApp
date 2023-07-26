const request = require('supertest');
const app = require('../app'); // Asegúrate de importar tu aplicación Express correctamente

test('Obtiene un arreglo de post al hacer una solicitud GET a /post/allpost', async () => {

  const response = await request(app).get('/post/allpost');
  expect(response.status).toBe(200);
  expect(response.body)
  expect(response.body).toHaveProperty('data');
  expect(Array.isArray(response.body.data)).toBe(true);
  // Puedes agregar más aserciones para verificar el contenido y estructura del arreglo de post si es necesario
});

test('DELETE /post/deletepost/24 debe devolver string', async () => {
    const response = await request(app).delete('/post/deletepost/24');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBe("No existe post con id: 24");

});
describe('Test para el proyect', () => {
    test('UPDATE -> Existe la propiedad data y devuelve un objeto', async() => {
        const response = await request(app).put('/post/updatepost/25');
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('title');
        expect(response.body.data).toHaveProperty('content');
    })
    test('UPDATE -> devuelve un objeto con la propiedad data y valor El post de id: 999 no existe', async () => {
        const response = await request(app).put('/post/updatepost/999');
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toBe("El post de id: 999 no existe.")
    })
})