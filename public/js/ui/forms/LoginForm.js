class LoginForm extends AsyncForm {

  onSubmit(data) {
    const callback = (error) => {
      if (error) {
        handleError(error);
      } else {
        this.element.reset();
        App.getModal('login').close();
        App.setState('user-logged');
      }
    };

    User.login(data, callback);
  }
}