const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'API de Categoria y Productos con Swagger',
        description: 'CRUD que muestra la relación de 1 a N. Una categoría para muchos productos.'
    },
    host: 'localhost:3000',
};

const outputFile = './swagger-output.json';
const routes = ['./routes/categoria.routes.js', './routes/producto.routes.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc).then(() => {
    require('./src/app.js'); // Your project's root file
})
