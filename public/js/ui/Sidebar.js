const body = document.getElementsByTagName("body");

class Sidebar {

  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  static initToggleButton() {
    const sidebarToggle = document.querySelector(".sidebar-toggle");
    sidebarToggle.addEventListener("click", () => {
      body[0].classList.toggle("sidebar-open");
      body[0].classList.toggle("sidebar-collapse");
    })
  }

  static initAuthLinks() {

    const registerButton = document.getElementsByClassName("menu-item_register");
    registerButton[0].addEventListener("click", (e) => {
      e.preventDefault();
      App.getModal('register').open();
    });
    const loginButton = document.getElementsByClassName("menu-item_login");
    loginButton[0].addEventListener("click", (e) => {
      e.preventDefault();
      App.getModal('login').open();
    });
    const logOutButton = document.getElementsByClassName("menu-item_logout");
    logOutButton[0].addEventListener("click", () => {

      User.logout(User.current(), (err, response) => {
        if (response && response.success) {
          App.setState('init');
        }
      });
    });
  }
}