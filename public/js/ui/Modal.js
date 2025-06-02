const modalWindow = Array.from(document.getElementsByClassName("modal fade in"));
class Modal {
  constructor(element) {
    try {
      this.element = element;
      this.registerEvents();
    }
    catch (err) {
      console.log(err);
    }
  }

  registerEvents() {
    this.element.querySelectorAll('[data-dismiss]').forEach(item => {
      item.addEventListener('click', (e) => {
        this.onClose();
        e.preventDefault();
      })
    })
  }
  onClose(e) {
    this.close();
  }
  open() {
    this.element.style.display = 'block';
  }
  close() {
    this.element.style.display = 'none';
  }
}