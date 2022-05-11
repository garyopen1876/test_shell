const admin_service = require("../services/admin_service.js");
const bcrypt = require("bcrypt");

login = async (req, res) => {
  try {
    const admin = await admin_service.is_admin(req.body);
    if (admin && bcrypt.compareSync(req.body.password, admin.password)) {
      const token = await admin_service.token_create(admin);
      return res.status(201).json({ message: "登入成功", token: token });
    } else {
      return res.status(401).json({ message: "帳號或密碼錯誤" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  login,
};
