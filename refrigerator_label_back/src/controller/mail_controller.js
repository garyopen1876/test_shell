const mail_service = require("../services/mail_service.js");

auto_send_mail = async (req, res) => {
  try {
    await mail_service.auto_send_mail();
    return res.status(200).json({ message: "寄信成功" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

manual_send_mail = async (req, res) => {
  try {
    await mail_service.manual_send_mail(req.body);
    return res.status(200).json({ message: "寄信成功" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  auto_send_mail,
  manual_send_mail,
};
