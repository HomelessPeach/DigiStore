const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product_categories', {
    product_category_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    product_category_name: {
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
    timestamps: false,
    indexes: [
      {
        name: "product_category_id",
        unique: true,
        fields: [
          { name: "product_category_id" },
        ]
      },
    ]
  });
};
