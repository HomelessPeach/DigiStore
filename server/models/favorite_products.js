const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('favorite_products', {
    favorite_product_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    fk_product: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fk_user: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'favorite_products',
    timestamps: false,
    indexes: [
      {
        name: "favorite_products_id",
        unique: true,
        fields: [
          { name: "favorite_product_id" },
        ]
      },
    ]
  });
};
