const Config = require("./config");
const jwt = require('jwt-simple')
const moment = require('moment')
const ResHelper = require("./response");
const db = require("../lib/mysql");
exports.createJWToken = function (user) {
    const payload = {
        user: user,
        iat: moment().unix(),
        exp: moment().add(1, 'day').unix()    //Token for a 1 day
    }
    return jwt.encode(payload, Config.TOKEN_SECRET)
}

exports.authorize = async function (req, res, next) {
    const resModel = {
        Status: false,
        Message: "",
        Data: {}
    };

    if (!req.header('Authorization')) {
        resModel.Message = 'Please make sure your request has an Authorization header';
        return res.status(401).send(resModel);
    }
    const token = req.header('Authorization');
    let payload = null
    try {
        payload = jwt.decode(token, Config.TOKEN_SECRET)
    } catch (err) {
        console.log("HERLL ", err);
        resModel.Message = err.message;
        return res.status(401).send(resModel);
    }
    if (payload.exp <= moment().unix()) {
        resModel.Message = 'Token has expired';
        return res.status(401).send(resModel);
    }

    req.userId = payload.userId;
    req.loggedInUser = payload.user;
    const isBackendUserLegit = await checkUserStatus(req);
    if (isBackendUserLegit) {
        next()
    }
    else {
        ResHelper.apiResponse(res, false, "You are not allowed to perform this action anymore. Please contact admin", 401, {}, "");
    }
}


exports.getRequestingUser = function (token) {
    const decoded = jwt.decode(token, Config.TOKEN_SECRET);
    return decoded.user;
}


const checkUserStatus = async (req) => {
    try {
        let getUser = await db('users')
            .where({ user_id: req.loggedInUser.user_id });
        return (getUser.length ? true : false);
    }
    catch (e) {
        return false;
    }
}