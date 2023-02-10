export default class Section {
  constructor({ renderer }, containerSelector) {
  this._renderer = renderer;
  this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  deleteCard(cardElement) {
    //this._element.closest('.element').remove();
    cardElement.remove();
  }
    
  renderItems(serverCards) {
    serverCards.forEach(item => {
      this._renderer(item);
    });
  }
}