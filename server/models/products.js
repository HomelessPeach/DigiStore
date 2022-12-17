const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('products', {
    product_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    product_name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    product_description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    product_rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fk_product_category: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'product_categories',
        key: 'product_categoty_id'
      }
    },
    product_price: {
      type: DataTypes.REAL,
      allowNull: true
    },
    is_publish: {
      type: DataTypes.REAL,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'products',
    timestamps: false,
    indexes: [
      {
        name: "products_id",
        unique: true,
        fields: [
          { name: "product_id" },
        ]
      },
    ]
  });
};
