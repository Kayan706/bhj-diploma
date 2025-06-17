class Modal {

  constructor(element){
    if (!element) {
      throw new Error('Параметр element класса Modal не задан');
    }
    this.element = element;
    
    this.registerEvents();
  }

  registerEvents() {
    const closeTriggers = this.element.querySelectorAll('[data-dismiss="modal"]');

    for (const closeTrigger of closeTriggers) {
      closeTrigger.onclick = () => {
        this.onClose();
      }
    }
  }

  onClose() {
    this.close();
  }

  open() {
    this.element.style.display = 'block';
  }

  close() {
    this.element.style.removeProperty('display');
  }
}