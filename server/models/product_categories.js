const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product_categories', {
    product_categoty_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    product_categoty_name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    fk_image: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'product_categories',
    timestamps: false
  });
};
