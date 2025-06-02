class AsyncForm {

  constructor(element) {
    if (!element) {
      throw new Error('Ошибка!')
    }
    this.element = element;
    this.registerEvents();
  }


  registerEvents() {
    this.element.addEventListener("submit", (e) => {
      e.preventDefault();
      this.submit();
    })
  }

  getData() {
    let obj = {};
    let form = this.element;

    for (let atr of form) {
      obj[atr.name] = atr.value;
    }
    return obj;
  }

  onSubmit(options) {

  }
  submit() {

    let result = this.getData();
    this.onSubmit(result);
    console.log(result)
  }
}