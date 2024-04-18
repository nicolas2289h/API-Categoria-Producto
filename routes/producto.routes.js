const routes = require('express').Router()

const { Categoria } = require('../models')
const { Producto } = require('../models');

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

// crear un nuevo producto
routes.post('/producto/crear', async (req, res, next) => {
    try {
        const newProducto = req.body
        if (!newProducto.descripcion || !newProducto.idCategoria) {
            return res.status(400).json({ message: 'Los campos de categoria son obligatorios' })
        }
        const productoCreado = await Producto.create(newProducto)
        res.status(201).json(productoCreado)
    } catch (error) {
        next(error)
    }
})

// traer un producto por ID
routes.get('/producto/:id', validarID, async (req, res, next) => {
    try {
        const { id } = req.params
        const productoEncontrado = await Producto.findByPk(id)
        if (!productoEncontrado) {
            return res.status(404).json({ message: 'Producto ' + id + ' no encontrado.' })
        }
        res.status(200).json(productoEncontrado)
    } catch (error) {
        next(error)
    }
})

// listar todos los productos, si es /producto/productos da error por validarID detecta que no es un numero
routes.get('/producto', async (req, res, next) => {
    try {
        const listadoProductos = await Producto.findAll()
        res.status(200).json(listadoProductos)
    } catch (error) {
        next(error)
    }
})

// eliminar un producto
routes.delete('/producto/:id', validarID, async (req, res, next) => {
    try {
        const { id } = req.params
        const productoEncontrado = await Producto.findByPk(id)
        if (!productoEncontrado) {
            return res.status(404).json({ message: 'Producto ' + id + ' no encontrado.' })
        }
        await Producto.destroy({ where: { id: id } })
        res.status(200).json({ message: 'Producto ' + id + ' eliminado exitosamente.' })
    } catch (error) {
        next(error)
    }
})

// obtener todos los productos asociados a un idCategoria, ej: todos los productos con idCategoria = 2
routes.get('/producto/categoria/:id', validarID, async (req, res, next) => {
    try {
        const { id } = req.params // va como id y no como idCategoria ya que asi esta definido validarID()
        const categoriaEncontrada = await Categoria.findByPk(id)
        if (!categoriaEncontrada) {
            return res.status(404).json({ message: 'Categoria ' + id + ' no encontrada.' })
        }
        const listaProductos = await categoriaEncontrada.getProductos()
        res.status(200).json(listaProductos)
    } catch (error) {
        next(error)
    }
})

// editar un producto
routes.put('/producto/:id', validarID, async (req, res, next) => {
    try {
        const { id } = req.params
        const productoActualizado = req.body
        const productoEncontrado = await Producto.findByPk(id)

        if (!productoEncontrado) {
            return res.status(404).json({ message: 'Producto ' + id + ' no encontrado.' })
        }
        if (!productoActualizado.descripcion) {
            return res.status(400).json({ message: 'Los campos de productos son obligatorios.' })
        }

        await Producto.update(productoActualizado, { where: { id: id } })
        res.status(200).json({ message: 'Producto ' + id + ' actualizado' })
    } catch (error) {
        next(error)
    }
})

module.exports = routes;