require("dotenv").config();
const db = require("../models/index.js");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

is_admin = async (body) => {
  const is_admin = await db.Admins.findOne({
    where: {
      [Op.or]: [{ username: body.username }, { mail: body.username }],
    },
  });
  return is_admin;
};

token_create = async (admin_data) => {
  const token = jwt.sign(
    { username: admin_data.username },
    process.env.JWT_SECRET,
    { expiresIn: "60 minutes" }
  );
  await db.Admins.update(
    {
      token: token,
    },
    {
      where: {
        username: admin_data.username,
      },
    }
  );
  return token;
};

module.exports = {
  is_admin,
  token_create,
};
