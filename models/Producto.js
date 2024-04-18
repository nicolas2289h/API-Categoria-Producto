'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    static associate(models) {
      // define association here
      Producto.belongsTo(models.Categoria, {
        foreignKey: 'idCategoria', // ID PROPIO
      })
    }
  }
  Producto.init({
    descripcion: DataTypes.STRING,
    idCategoria: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Producto',
  });
  return Producto;
};