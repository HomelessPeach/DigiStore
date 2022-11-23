const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('chat_messages', {
    chat_message_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    chat_message_content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    create_at: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "datetime(now, localtime)"
    },
    fk_chat_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    is_user: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'chat_messages',
    timestamps: false,
    indexes: [
      {
        name: "chat_messages_id",
        unique: true,
        fields: [
          { name: "chat_message_id" },
        ]
      },
    ]
  });
};
