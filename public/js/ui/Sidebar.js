class Sidebar {

  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  static initToggleButton() {
    const sidebarToggle = document.querySelector('.sidebar-toggle');

    sidebarToggle.onclick = () => {
      document.body.classList.toggle('sidebar-open');
      document.body.classList.toggle('sidebar-collapse');
    }
  }

  static initAuthLinks() {
    const menuItems = document.getElementsByClassName('menu-item');

    for (const item of menuItems) {
      let handler;

      if (item.classList.contains('menu-item_login')) {
        handler = () => {
          App.getModal('login').open();
        }
      } else if (item.classList.contains('menu-item_register')) {
        handler = () => {
          App.getModal('register').open();
        }
      } else if (item.classList.contains('menu-item_logout')) {
        handler = () => {
          const callback = (error) => {
            if (error) {
              handleError(error);
            } else {
              App.setState('init');
            }
          };

          User.logout(User.current(), callback);
        }
      }

      item.onclick = handler;
    }
  }
}