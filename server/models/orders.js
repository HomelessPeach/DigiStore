const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orders', {
    order_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    order_number: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    fk_user: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    is_complete: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    client_phone_number: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    client_email: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    client_name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    is_cancel: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
  }, {
    sequelize,
    tableName: 'orders',
    timestamps: false,
    indexes: [
      {
        name: "orders_id",
        unique: true,
        fields: [
          { name: "order_id" },
        ]
      },
      {
        name: "orders_number",
        unique: true,
        fields: [
          { name: "order_number" },
        ]
      },
    ]
  });
};
