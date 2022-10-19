const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('feedbacks', {
    feedback_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    feedback_email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    feedback_massege: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    is_answer: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'feedbacks',
    timestamps: false,
    indexes: [
      {
        name: "feedbacks_email",
        unique: true,
        fields: [
          { name: "feedback_email" },
        ]
      },
      {
        name: "feedbacks_id",
        unique: true,
        fields: [
          { name: "feedback_id" },
        ]
      },
    ]
  });
};
