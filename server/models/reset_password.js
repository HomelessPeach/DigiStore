const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reset_password', {
    reset_password_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fk_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    code: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    create_at: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    ]
  });
};
