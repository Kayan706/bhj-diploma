class TransactionsPage {

  constructor(element) {
    if (!element) {
      throw new Error('Параметр element класса TransactionsPage не задан');
    }
    this.element = element;

    this.registerEvents();
  }

  update() {
    this.render(this.lastOptions);
  }


  registerEvents() {
    const deleteAccount = this.element.querySelector('.remove-account');

    deleteAccount.onclick = () => this.removeAccount();

    const clickHandler = (event) => {
      const target = event.target.closest('.transaction__remove');

      if (target) {
        this.removeTransaction(target.dataset.id);
      }
    }

    this.element.addEventListener('click', clickHandler);
  }

  removeAccount() {
    if (this.lastOptions) {
      const confirmation = window.confirm('Вы действительно хотите удалить счёт?');

      if (confirmation) {
        const callback = (error) => {
          if (error) {
            handleError(error);
          } else {
            App.updateWidgets();
            this.clear();
          }
        }

        Account.remove({id: this.lastOptions.account_id}, callback);
      }
    }
  }

  removeTransaction(id) {
    const confirmation = window.confirm('Вы действительно хотите удалить эту транзакцию?');

    if (confirmation) {
      const callback = (error) => {
        if (error) {
          handleError(error);
        } else {
          App.getWidget("accounts").update();
          this.update();
        }
      }

      Transaction.remove({id}, callback);
    }
  }

  render(options){
    if (options) {
      this.lastOptions = options;

      let callback = (error, response) => {
        if (error) {
          handleError(error);
        } else {
          this.renderTitle(response.data.name);
        }
      }

      Account.get(options.account_id, callback);

      callback = (error, response) => {
        if (error) {
          handleError(error);
        } else {
          this.renderTransactions(response.data);
        }
      };

      Transaction.list(options.account_id, callback);
    }
  }

  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    this.lastOptions = null;
  }

  renderTitle(name){
    const contentTitle = this.element.querySelector('.content-title');

    contentTitle.textContent = name;
  }

  formatDate(date){
    const fullDate = new Date(date);
    const options = {dateStyle: 'long', timeStyle: 'short'};
    const formatedDate = new Intl.DateTimeFormat('ru-RU', options).format(fullDate);

    return formatedDate.split(',').join(' в ');
  }

  getTransactionHTML(item) {
    return `
      <div class="transaction transaction_${item.type} row">
        <div class="col-md-7 transaction__details">
          <div class="transaction__icon">
              <span class="fa fa-money fa-2x"></span>
          </div>
          <div class="transaction__info">
              <h4 class="transaction__title">${item.name}</h4>
              <div class="transaction__date">${this.formatDate(item.created_at)}</div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="transaction__summ">
            ${item.sum}
            <span class="currency">₽</span>
          </div>
        </div>
        <div class="col-md-2 transaction__controls">
            <button class="btn btn-danger transaction__remove" data-id="${item.id}">
                <i class="fa fa-trash"></i>
            </button>
        </div>
      </div>
    `;
  }


  renderTransactions(data) {
    let html = '';

    for (const item of data) {
      html += this.getTransactionHTML(item);
    }

    const content = this.element.querySelector('.content');
    content.textContent = '';

    content.insertAdjacentHTML('beforeend', html);
  }
}