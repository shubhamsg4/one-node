const userService = require('../services/user-services');
const roleService = require('../services/role-service');
const ResHelper = require('../helpers/response');
const AuthHelper = require('../helpers/authhelper');
exports.login = async function (req, res) {
  try {
    let { username, password } = req.body
    let loginDetails = await userService.login(username, password);
    if (loginDetails.length) {
      ResHelper.apiResponse(res, "Successfully Login", 200, loginDetails[0], AuthHelper.createJWToken(loginDetails[0]));
    }
    else {
      ResHelper.apiResponse(res, "Please enter valid details", 403, {});
    }

  } catch (err) {
    ResHelper.apiResponse(res, "Error occured during excution", 500, {});
  }
};

exports.register = async function (req, res) {
  try {
    // let { username, password, role } = req.body
    let registerDetails = await userService.register(req.body);
    if (!registerDetails.length) {
      ResHelper.apiResponse(res, "Already added with this username", 403, {});
    }
    else {
      ResHelper.apiResponse(res, "Registered Successfully", 200, registerDetails, AuthHelper.createJWToken(registerDetails[0]));
    }

  } catch (err) {
    ResHelper.apiResponse(res, "Error occured during excution", 500, {});
  }
};

exports.getRoles = async function (req, res) {
  try {
    let rolesData = await roleService.getRoles();
    ResHelper.apiResponse(res, "Data fetched Successfully", 200, rolesData, {});

  } catch (err) {
    ResHelper.apiResponse(res, "Error occured during excution", 500, {});
  }
};