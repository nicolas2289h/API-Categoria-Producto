'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    static associate(models) {
      // define association here
      Categoria.hasMany(models.Producto,{
        foreignKey: 'idCategoria' // ID PROPIO
      })
    }
  }
  Categoria.init({
    descripcion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Categoria',
  });
  return Categoria;
};