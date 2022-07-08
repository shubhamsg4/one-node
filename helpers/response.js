exports.apiResponse = (res, message, code, data, token) => {
  const resModel = {
    meta: {
      message: message ? message : "",
      code: code ? code : 200
    },
    Data: data ? data : {},
    Token: token ? token : ""
  };
  res.json(resModel);
};
