const label_service = require("../services/label_service.js");
const user_service = require("../services/user_service.js");

find_label_all = async (req, res) => {
  try {
    const label = await label_service.find_label_all();
    label.forEach((item) => {
      let array = item["dataValues"]["date"].split(" ");
      let Today = new Date();
      const date1 = new Date(array[0]);
      const date2 = new Date(
        Today.getFullYear() +
          "-" +
          (Today.getMonth() + 1) +
          "-" +
          Today.getDate()
      );
      const diff_time = Math.abs(date2 - date1);
      const diff_days = Math.ceil(diff_time / (1000 * 60 * 60 * 24));
      const date = array[0] + " - " + diff_days + " day ago";

      const name = item["dataValues"]["User"]["dataValues"]["name"];
      const mail = item["dataValues"]["User"]["dataValues"]["mail"];
      item["dataValues"]["name"] = name;
      item["dataValues"]["mail"] = mail;
      item["dataValues"]["date"] = date;
      delete item["dataValues"]["User"];
    });
    return res.status(200).json({ message: label });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

create_label = async (req, res) => {
  try {
    if (req.body.date === "") {
      return res.status(401).json({ message: "沒有日期" });
    } else {
      const is_user = await user_service.is_user(req.body);
      if (is_user) {
        const final_id = await label_service.last_id();
        if (!final_id?.id) {
          data_id = "001";
        } else if (final_id.id > 0 && final_id.id + 1 < 10) {
          data_id = "00" + String(final_id.id + 1);
        } else if (final_id.id + 1 >= 10 && final_id.id + 1 < 100) {
          data_id = "0" + String(final_id.id + 1);
        } else if (final_id.id + 1 >= 100 && final_id.id + 1 < 1000) {
          data_id = String(final_id.id + 1);
        } else {
          data_id = String(final_id.id + 1).slice(-3);
        }

        req.body.data_id = data_id;

        const label = await label_service.create_label(req.body);
        if (label) {
          return res.status(201).json({
            data_id: label["dataValues"]["label_id"],
            name: label.name
          });
        }
      } else {
        return res.status(401).json({ message: "沒有使用者" });
      }
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

update_label = async (req, res) => {
  try {
    const update_label = await label_service.update_label(req.body);
    if (update_label) {
      return res.status(200).json({ message: "修改成功" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

delete_label = async (req, res) => {
  try {
    if (req.body.label_id === "") {
      return res.status(404).json({ message: "沒有標籤ID" });
    } else {
      const delete_label = await label_service.delete_label(
        req.body["label_id"]
      );
      if (delete_label) {
        return res.status(200).json({ message: "刪除成功" });
      }
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  find_label_all,
  create_label,
  delete_label,
  update_label,
};
