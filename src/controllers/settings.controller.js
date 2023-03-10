class SettingsController {
  index = async (req, res, next) => {
    try {
      res.render("settings/settings_index", { layout: "layouts/dashboard" });
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
}

export default new SettingsController();
