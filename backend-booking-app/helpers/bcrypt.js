const bcrypt = require("bcrypt");
const SALT_ROUND = parseInt(process.env.SALT_ROUND);

const encryptPassword = async (data) => {
  try {
    return await bcrypt.hash(String(data), SALT_ROUND);
  } catch (e) {
    throw e;
  }
};

const decryptPassword = async (data, hashPwd) => {
  try {
    return await bcrypt.compare(String(data), hashPwd);
  } catch (e) {
    throw e;
  }
};

module.exports = {
  encryptPassword,
  decryptPassword,
};
