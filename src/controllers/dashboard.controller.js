
class DashboardController {
  index = (req, res) => {
    res.render('dashboard/home', { layout: 'layouts/dashboard' });
  };

  QRCodeView = (req, res) => {
    res.render('dashboard/qrcode', { layout: 'layouts/dashboard' });
  };

  ShareLinkView = (req, res) => {
    res.render('dashboard/sharelink', { layout: 'layouts/dashboard' });
  };

  SettingsView = (req, res) => {
    res.render('dashboard/settings', { layout: 'layouts/dashboard' });
  };
}

export default new DashboardController();
