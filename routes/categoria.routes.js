const routes = require("express").Router()

const { Categoria } = require('../models')

// Middleware para validar IDs
const validarID = (req, res, next) => {
    const { id } = req.params
    if (!id || isNaN(id)) {
        return res.status(400).json({ message: 'ID no valido.' })
    }
    next() // pasa el control al siguiente middleware
}

// Middleware para manejo de errores
routes.use((err, req, res, next) => { // err va primero por convencion
    console.error('Error: ' + err)
    res.status(500).json({ message: 'Error interno en el servidor: ' + err })
})

// alta categorias
routes.post('/categoria/crear', async (req, res, next) => {
    try {
        const newCategory = req.body
        if (!newCategory.descripcion) {
            return res.status(400).json({ message: 'Debe proporcionar una categoria.' })
        }
        const categoriaCreada = await Categoria.create(newCategory)
        res.status(201).json({ categoriaCreada })
    } catch (error) {
        console.log(error)
        next(error)
    }
})

// traer todas las categorias
routes.get('/categoria', async (req, res, next) => {
    try {
        const listaCategorias = await Categoria.findAll()
        res.status(200).json(listaCategorias)
    } catch (error) {
        next(error)
    }
})

// traer categoria por ID
routes.get('/categoria/:id', validarID, async (req, res, next) => {
    try {
        const { id } = req.params
        const categoria = await Categoria.findByPk(id)
        if (!categoria) {
            return res.status(404).json({ message: 'Categoria no encontrada' })
        }
        res.status(200).json(categoria)
    } catch (error) {
        next(error)
    }
})

module.exports = routes;