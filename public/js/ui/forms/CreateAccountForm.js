class CreateAccountForm extends AsyncForm {
  onSubmit(options) {

    Account.create(options, (e, response) => {
      if (response.success) {
        App.getModal('createAccount').close();
        this.element.reset();
        App.update();
        console.log('Сработала форма создания нового счета CreateAccountForm', this.element);
      }
    }
    )
  }
}