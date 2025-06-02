class UserWidget {

  constructor(element) {
    if (!element) {
      throw new Error('Элемент не существует');
    }
    this.element = element;

  }
  update() {
    const user = User.current();
    if (!user) {
      return;
    } else {
      const name = this.element.querySelector('.user-name');
      name.textContent = user.name;
    }

}}