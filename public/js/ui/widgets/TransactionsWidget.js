class TransactionsWidget {

  constructor(element) {
    if (!element) {
      throw new Error('Параметр element класса TransactionsWidget не задан');
    }
    this.element = element;

    this.registerEvents();
  }


  registerEvents() {
    const income = this.element.querySelector('.btn-success');
    const expense = this.element.querySelector('.btn-danger');

    income.onclick = () => App.getModal('newIncome').open();
    expense.onclick = () => App.getModal('newExpense').open();
  }
}
