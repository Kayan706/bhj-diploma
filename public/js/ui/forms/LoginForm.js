class LoginForm extends AsyncForm {
  onSubmit(options) {

    User.login(options, (e, response) => {
      if (response.success) {
        const loginForm = document.querySelector("#login-form");
        loginForm.reset();
        App.setState('user-logged');
        App.getModal('login').close();
      }
    })
  }
}