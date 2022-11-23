const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product_feature_values', {
    product_features_values_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      unique: true
    },
    product_features_values_value: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    fk_product: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fk_product_feature: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'product_feature_values',
    timestamps: false,
    indexes: [
      {
        name: "product_feature_value_id",
        unique: true,
        fields: [
          { name: "product_features_values_id" },
        ]
      },
    ]
  });
};
