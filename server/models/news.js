const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('news', {
    news_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    news_name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    news_short_description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    news_description: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fk_image: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'images',
        key: 'image_id'
      }
    }
  }, {
    sequelize,
    tableName: 'news',
    timestamps: false,
    indexes: [
      {
        name: "news_id",
        unique: true,
        fields: [
          { name: "news_id" },
        ]
      },
    ]
  });
};
