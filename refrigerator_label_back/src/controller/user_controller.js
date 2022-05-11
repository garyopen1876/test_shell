const user_service = require("../services/user_service.js");

find_user_all = async (req, res) => {
  try {
    const users = await user_service.select_user_all();
    return res.status(200).json({ message: users });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

create_user = async (req, res) => {
  try {
    const user = await user_service.create_user(req.body);
    if (user) {
      return res.status(201).json({ message: "新增成功" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  find_user_all,
  create_user,
};
