
class MenuController {
  index = (req, res) => {
    res.render('dashboard/menus', { layout: 'layouts/dashboard' });
  };
}

export default new MenuController();

