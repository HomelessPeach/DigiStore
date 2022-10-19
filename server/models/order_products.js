const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order_products', {
    order_product_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    fk_order: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fk_product: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'order_products',
    timestamps: false,
    indexes: [
      {
        name: "order_products_id",
        unique: true,
        fields: [
          { name: "order_product_id" },
        ]
      },
    ]
  });
};
