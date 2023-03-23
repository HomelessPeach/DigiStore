const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reviews', {
    review_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    review_rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    review_description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fk_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    fk_product: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    create_at: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "datetime(now, localtime)"
    }
  }, {
    sequelize,
    tableName: 'reviews',
    timestamps: false,
    indexes: [
      {
        name: "reviews_id",
        unique: true,
        fields: [
          { name: "review_id" },
        ]
      },
    ]
  });
};
