class CreateTransactionForm extends AsyncForm {

  constructor(element) {
    super(element);
    this.element = element;
    this.renderAccountsList();
  }

  renderAccountsList() {
    if (!User.current()) {
      return;
    } else
      Account.list(User.current(), (e, response) => {

        if (response.success) {
          const select = this.element.querySelector(".accounts-select");
          select.innerHTML = '';
          response.data.forEach(element => {
            select.insertAdjacentHTML("beforeend", `<option value="${element.id}">${element.name}</option>`);
          });
        }
      })
  }

  onSubmit(options) {
    Transaction.create(options, (e, response) => {

      if (response.success) {
        this.element.reset();
        App.getModal('newExpense').close();
        App.getModal('newIncome').close();
        App.update();
        console.log('произошлa транзакция расхода/дохода');
        console.log(options)
      }
    })

  }
}