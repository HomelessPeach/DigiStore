var DataTypes = require("sequelize").DataTypes;
var _auth_tokens = require("./auth_tokens");
var _chat = require("./chat");
var _chat_messages = require("./chat_messages");
var _favorite_products = require("./favorite_products");
var _feedbacks = require("./feedbacks");
var _images = require("./images");
var _news = require("./news");
var _order_products = require("./order_products");
var _orders = require("./orders");
var _product_categories = require("./product_categories");
var _product_feature_values = require("./product_feature_values");
var _product_features = require("./product_features");
var _product_images = require("./product_images");
var _products = require("./products");
var _reviews = require("./reviews");
var _users = require("./users");

function initModels(sequelize) {
  var auth_tokens = _auth_tokens(sequelize, DataTypes);
  var chat = _chat(sequelize, DataTypes);
  var chat_messages = _chat_messages(sequelize, DataTypes);
  var favorite_products = _favorite_products(sequelize, DataTypes);
  var feedbacks = _feedbacks(sequelize, DataTypes);
  var images = _images(sequelize, DataTypes);
  var news = _news(sequelize, DataTypes);
  var order_products = _order_products(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var product_categories = _product_categories(sequelize, DataTypes);
  var product_feature_values = _product_feature_values(sequelize, DataTypes);
  var product_features = _product_features(sequelize, DataTypes);
  var product_images = _product_images(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var reviews = _reviews(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  news.belongsTo(images, { as: "fk_image_image", foreignKey: "fk_image"});
  images.hasMany(news, { as: "newss", foreignKey: "fk_image"});
  product_images.belongsTo(images, { as: "fk_image_image", foreignKey: "fk_image"});
  images.hasMany(product_images, { as: "product_images", foreignKey: "fk_image"});
  products.belongsTo(product_categories, { as: "fk_product_category_product_category", foreignKey: "fk_product_category"});
  product_categories.hasMany(products, { as: "products", foreignKey: "fk_product_category"});
  product_images.belongsTo(products, { as: "fk_product_product", foreignKey: "fk_product"});
  products.hasMany(product_images, { as: "product_images", foreignKey: "fk_product"});

  return {
    auth_tokens,
    chat,
    chat_messages,
    favorite_products,
    feedbacks,
    images,
    news,
    order_products,
    orders,
    product_categories,
    product_feature_values,
    product_features,
    product_images,
    products,
    reviews,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
