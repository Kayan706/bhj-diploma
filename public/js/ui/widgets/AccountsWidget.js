class AccountsWidget {

  constructor(element) {
    if (!element) {
      throw new Error('Элемент не существует');
    }
    this.element = element;
    this.registerEvents();
    this.update();
  }

  registerEvents() {

    this.element.addEventListener('click', e => {
      e.preventDefault();
      if (e.target.closest('.pull-right')) {
        const modal = App.getModal('createAccount');
        modal.open();
      }
      else if (e.target.closest('.account')) {
        this.onSelectAccount(e.target.closest('.account'));
      }
    })
  }

  update() {

    if (!User.current()) {
      return;
    }
    Account.list(User.current(), (err, response) => {
      if (err) {
        return;
      }
      if (!response.data) {
        return;
      }
      this.clear();
      response.data.forEach(item => {
        this.renderItem(item);
      });
    });


  }


  clear() {

    [...this.element.querySelectorAll('.account')].forEach(item => item.remove());
  }

  onSelectAccount(element) {
    if (this.element.querySelector('.active')) {
      this.element.querySelector('.active').classList.remove('active');
    }
    element.closest('.account').classList.add('active');
   App.showPage('transactions', { account_id: element.closest('.account').dataset.id});
   
  }

  getAccountHTML(item) {
    return `
          <li class="account" data-id="${item.id}">
              <a href="#">
                  ${item.name} / ${item.sum} ₽
              </a>
          </li>
        `;
  }
  renderItem(item) {
    this.element.insertAdjacentHTML('beforeend', this.getAccountHTML(item));
  }
}