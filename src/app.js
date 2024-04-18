const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger-output.json')
const categoriaRouter = require('../routes/categoria.routes')
const productoRouter = require('../routes/producto.routes')

const app = express()

// Middlewares
app.use(express.json())
app.use(cors())

// rutas
app.use(categoriaRouter)
app.use(productoRouter)
// app.use('/producto', productoRouter)

// swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('Server listening on http://localhost:' + PORT)
})
