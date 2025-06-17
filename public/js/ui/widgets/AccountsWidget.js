class AccountsWidget {

  constructor(element) {
    if (!element) {
      throw new Error('Параметр element класса AccountsWidget не задан');
    }
    this.element = element;

    this.update();
    this.registerEvents();
  }

  registerEvents() {
    const createAccount = this.element.querySelector('.create-account');

    createAccount.onclick = () => App.getModal('createAccount').open();

    const clickHandler = (event) => {
      const target = event.target.closest('.account');

      if (target) {
        this.onSelectAccount(target);
      }
    }

    this.element.addEventListener('click', clickHandler);
  }

  update() {
    const user = User.current();

    if (user) {
      const callback = (error, response) => {
        if (error) {
          handleError(error);
        } else {
          this.clear();
          for (const account of response.data) {
            this.renderItem(account);
          }
        }
      };

      Account.list(user, callback);
    }
  }


  clear() {
    for (const account of this.element.querySelectorAll('.account')) {
      account.remove();
    }
  }

  onSelectAccount(element) {
    const activeAccount = this.element.querySelector('.account.active');

    activeAccount?.classList.remove('active');

    element.classList.add('active');

    const accountName = element.querySelector('span').textContent;

    const callback = (error, response) => {
      if (error) {
        handleError(error);
      } else {
        const accountId = response.data.find(account => {
          return account.name === accountName;
        }).id;
        App.showPage('transactions', {account_id: accountId});
      }
    };

    Account.list(User.current(), callback);
  }

  getAccountHTML(item){
    return `
      <li class="account" data-id="${item.id}">
        <a href="#">
            <span>${item.name}</span> /
            <span>${item.sum} ₽</span>
        </a>
      </li>
    `;
  }


  renderItem(data){
    this.element.insertAdjacentHTML('beforeend', this.getAccountHTML(data));
  }
}
