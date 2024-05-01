export class commonMethodsClass {

  elements = {
    someElement: () => cy.get('.collapse')

  }
  /** Отображение селектора */
  displayingElement(selector) {
    cy.get(selector).should("be.visible");
  }

  /** Нажатие на селектор */
  clickSelector(selector) {
    cy.get(selector).click();
  }

  /** Ввод текста в селектор */
  typeText(selector, text) {
    cy.get(selector).type(text);
  }
}
