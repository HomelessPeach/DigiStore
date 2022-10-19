const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product_features', {
    product_feature_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    product_feature_name: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'product_features',
    timestamps: false,
    indexes: [
      {
        name: "product_features_id",
        unique: true,
        fields: [
          { name: "product_feature_id" },
        ]
      },
    ]
  });
};
