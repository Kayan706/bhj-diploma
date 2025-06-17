class CreateTransactionForm extends AsyncForm {

  constructor(element) {
    super(element);
    if (!element) {
      throw new Error('Параметр element класса CreateTransactionForm не задан');
    }
    this.element = element;

    this.renderAccountsList();
  }

  renderAccountsList() {
    const user = User.current();

    const callback = (error, response) => {
      if (error) {
        handleError(error);
      } else {
        const selectBox = this.element.querySelector('.accounts-select');
        selectBox.textContent = '';
        let html = '';
        for (const account of response.data) {
          html += `
            <option value="${account.id}">${account.name}</option>
          `;
        }

        selectBox.insertAdjacentHTML('beforeend', html);
      }
    }

    Account.list(user, callback);
  }

  onSubmit(data) {
    const callback = (error) => {
      if (error) {
        handleError(error);
      } else {
        this.element.reset();
        if (App.getModal('newIncome')) {
          App.getModal('newIncome').close();
        }
        if (App.getModal('newExpense')) {
          App.getModal('newExpense').close();
        }
        App.getWidget("accounts").update();
        App.getPage("transactions").update();
      }
    }

    Transaction.create(data, callback);
  }
}