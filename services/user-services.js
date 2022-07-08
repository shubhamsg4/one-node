const db = require("../lib/mysql");
exports.login = async (username, password) => {
  try {
    let loginDetails = await db("users").select("username", "users.role_id", "roles.role_name", "user_id")
      .leftJoin("roles", "roles.role_id", "users.role_id")
      .where("username", username)
      .andWhere("password", password);
    return loginDetails;

  } catch (error) {
    reject(error);
  }
};

exports.register = async (data) => {
  try {
    let isExist = await db("users").count("user_id as count").where({ username: data.username })
    if (isExist[0].count > 0) {
      return [];
    }
    else {
      let registerDetails = await db("users").insert(data);
      let userData = await db("users").select("username", "users.role_id", "roles.role_name", "user_id")
        .leftJoin("roles", "roles.role_id", "users.role_id")
        .where({ user_id: registerDetails[0] })
      return userData;
    }

  } catch (error) {
    reject(error);
  }
};