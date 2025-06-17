class RegisterForm extends AsyncForm {

  onSubmit(data) {
    const callback = (error) => {
      if (error) {
        handleError(error);
      } else {
        this.element.reset();
        App.getModal('register').close();
        App.setState('user-logged');
      }
    }

    User.register(data, callback);
  }
}