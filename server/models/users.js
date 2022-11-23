const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    user_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    user_name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    user_email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    user_phone_number: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    user_password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    fk_image: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'images',
        key: 'image_id'
      }
    },
    is_admin: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: false,
    indexes: [
      {
        name: "users_email",
        unique: true,
        fields: [
          { name: "user_email" },
        ]
      },
      {
        name: "users_id",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "users_phone_number",
        unique: true,
        fields: [
          { name: "user_phone_number" },
        ]
      },
    ]
  });
};
