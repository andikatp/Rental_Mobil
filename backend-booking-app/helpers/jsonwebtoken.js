const jwt = require("jsonwebtoken");
const SECRET_CODE = process.env.SECRET_CODE;

const tokenGenerator = (data) => {
  try {
    return jwt.sign(data, SECRET_CODE);
  } catch (e) {
    throw e;
  }
};

const tokenVerifier = (token, cb) => {
    try {
        return jwt.verify(token, SECRET_CODE, cb);
    } catch (e) {
        throw e;
    }
}

module.exports = {
    tokenGenerator,
    tokenVerifier
}