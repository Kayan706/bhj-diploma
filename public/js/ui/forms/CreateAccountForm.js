
class CreateAccountForm extends AsyncForm {

  onSubmit(data) {
    const callback = (error) => {
      if (error) {
        handleError(error);
      } else {
        this.element.reset();
        App.getModal('createAccount').close();
        App.getWidget("accounts").update();
        App.updateForms();
      }
    }

    Account.create(data, callback);
  }
}