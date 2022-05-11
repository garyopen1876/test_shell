const token_authentication_middleware = require("../middleware/token_authentication");
const user_controller = require("../controller/user_controller.js");
const label_controller = require("../controller/label_controller.js");
const admin_controller = require("../controller/admin_controller.js");
const mail_controller = require("../controller/mail_controller.js");

module.exports = function (router) {
  router.get("/", (req, res) => {
    res.send("Hello World!");
  });

  router.post("/api/login", admin_controller.login);

  router.use(token_authentication_middleware);

  router.get("/api/find_user_all", user_controller.find_user_all);

  router.get("/api/find_label_all", label_controller.find_label_all);

  router.post("/api/manual_send_mail", mail_controller.manual_send_mail);

  router.get("/api/auto_send_mail", mail_controller.auto_send_mail);

  router.post("/api/label", label_controller.create_label);

  router.delete("/api/label", label_controller.delete_label);

  router.post("/api/create_user", user_controller.create_user);

  router.put("/api/label", label_controller.update_label);
};
