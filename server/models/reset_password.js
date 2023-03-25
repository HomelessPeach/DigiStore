const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reset_password', {
    reset_password_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    fk_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      },
      unique: true
    },
    code: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'reset_password',
    timestamps: false,
    indexes: [
      {
        name: "fk_user",
        unique: true,
        fields: [
          { name: "fk_user" },
        ]
      },
      {
        name: "reset_password_id",
        unique: true,
        fields: [
          { name: "reset_password_id" },
        ]
      },
    ]
  });
};
