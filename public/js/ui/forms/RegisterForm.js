class RegisterForm extends AsyncForm {

  onSubmit(options) {

    User.register(options, (e, response) => {
      if (response.success) {
        const registerForm = document.querySelector("#register-form");
        registerForm.reset();
        App.setState('user-logged');
        App.getModal('register').close();
      }
    }
    )
  }
}