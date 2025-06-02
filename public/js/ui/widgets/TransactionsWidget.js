class TransactionsWidget {

 constructor(element) {
    if (!element) {
      throw new Error('Элемент не существует');
    }
    this.element = element;
    this.registerEvents();
  }

 registerEvents() {
    const createIncomeButton = this.element.querySelector('.create-income-button'),
      createExpenseButton = this.element.querySelector('.create-expense-button'),

      incomeModal = App.getModal('newIncome'),
      expenseModal = App.getModal('newExpense');

    createIncomeButton.addEventListener('click', () => incomeModal.open());
    createExpenseButton.addEventListener('click', () => expenseModal.open());



  }
}