const db = require("../lib/mysql");

exports.getRoles = async (data) => {
    try {
        return await db("roles").select("*");
    }
    catch (error) {
        reject(error);
    }
};