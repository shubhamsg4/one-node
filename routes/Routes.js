const AccountCntrl = require("../controllers/AccountController")
const ProductCntrl = require("../controllers/ProductController");
const AccountModel = require("../models/AccountModel");
var AuthHelper = require("../helpers/authhelper");
// const validator = require("express-joi-validation").createValidator({})
module.exports = function (app, validate) {

  app.post(
    "/login",
    // validator.query(AccountModel.LoginModel),
    AccountCntrl.login
  );

  app.post(
    "/register",
    // validator.query(AccountModel.RegisterModel),
    AccountCntrl.register
  );

  app.get(
    "/roles",
    AccountCntrl.getRoles
  )

  app.get(
    "/products",
    AuthHelper.authorize,
    ProductCntrl.getProduct,
  )

  app.post(
    "/products",
    AuthHelper.authorize,
    ProductCntrl.saveProduct
  );

  app.put(
    "/products",
    AuthHelper.authorize,
    ProductCntrl.updateProduct,
  );

  app.delete(
    "/products",
    AuthHelper.authorize,
    ProductCntrl.deleteProduct,
  )
};