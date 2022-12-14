const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('chats', {
    chat_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      unique: true
    },
    fk_user: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    is_answer: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'chats',
    timestamps: false,
    indexes: [
      {
        name: "chats_chat_id",
        unique: true,
        fields: [
          { name: "chat_id" },
        ]
      },
    ]
  });
};
