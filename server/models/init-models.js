var DataTypes = require("sequelize").DataTypes;
var _auth_tokens = require("./auth_tokens");
var _chat_messages = require("./chat_messages");
var _chats = require("./chats");
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
  var chat_messages = _chat_messages(sequelize, DataTypes);
  var chats = _chats(sequelize, DataTypes);
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

  chats.hasMany(chat_messages, { as: "chat_messages", foreignKey: "fk_chat"});
  chat_messages.belongsTo(chats, { as: "chat", foreignKey: "fk_chat"});
  images.hasMany(news, { as: "news", foreignKey: "fk_image"});
  news.belongsTo(images, { as: "image", foreignKey: "fk_image"});
  images.hasMany(product_categories, { as: "product_categories", foreignKey: "fk_image"});
  product_categories.belongsTo(images, { as: "image", foreignKey: "fk_image"});
  images.hasMany(users, { as: "users", foreignKey: "fk_image"});
  users.belongsTo(images, { as: "image", foreignKey: "fk_image"});
  images.hasMany(product_images, { as: "products", foreignKey: "fk_image"});
  product_images.belongsTo(images, { as: "image", foreignKey: "fk_image"});
  products.belongsTo(product_categories, { as: "product_category", foreignKey: "fk_product_category"});
  product_categories.hasMany(products, { as: "products", foreignKey: "fk_product_category"});
  product_images.belongsTo(products, { as: "product_image", foreignKey: "fk_product"});
  products.hasMany(product_images, { as: "product_images", foreignKey: "fk_product"});
  product_feature_values.belongsTo(products, { as: "products", foreignKey: "fk_product"});
  products.hasMany(product_feature_values, { as: "product_feature_values", foreignKey: "fk_product"});
  product_feature_values.belongsTo(product_features, { as: "product_feature", foreignKey: "fk_product_feature"});
  product_features.hasMany(product_feature_values, { as: "product_feature_value", foreignKey: "fk_product_feature"});
  orders.hasMany(order_products, { as: "order_products", foreignKey: "fk_order"});
  order_products.belongsTo(orders, { as: "orders", foreignKey: "fk_order"});

  return {
    auth_tokens,
    chat_messages,
    chats,
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
