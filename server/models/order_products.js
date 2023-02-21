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
      allowNull: true
    },
    order_product_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    order_product_price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    order_product_name: {
      type: DataTypes.TEXT,
      allowNull: true
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
