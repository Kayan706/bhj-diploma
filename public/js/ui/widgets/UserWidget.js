class UserWidget {

  constructor(element) {
    if (!element) {
      throw new Error('Параметр element класса UserWidget не задан');
    }
    this.element = element;
  }


  update(){
    const name = User.current().name;

    if (name) {
      const nameBox = this.element.querySelector('.user-name');
      nameBox.textContent = name;
    }
  }
}
