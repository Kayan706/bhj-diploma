
class AsyncForm {

  constructor(element) {
    if (!element) {
      throw new Error('Параметр element класса AsyncForm не задан');
    }
    this.element = element;

    this.registerEvents();
  }


  registerEvents() {
    this.element.addEventListener('submit', (event) => {
      event.preventDefault();

      this.submit();
    });
  }

  getData() {
    const data = {};

    const formData = new FormData(this.element).entries();

    for (const item of formData) {
      data[item[0]] = item[1];
    }

    return data;
  }

  onSubmit(options) {

  }

  submit() {
    this.onSubmit(this.getData());
  }
}