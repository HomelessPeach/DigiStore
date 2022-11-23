const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('auth_tokens', {
    auth_token_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      unique: true
    },
    token_jwt: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fk_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    create_at: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    expired: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'auth_tokens',
    timestamps: false,
    indexes: [
      {
        name: "auth_tokens_auth_token_id_uindex",
        unique: true,
        fields: [
          { name: "auth_token_id" },
        ]
      },
    ]
  });
};
