class CheckoutCompletePage {
  constructor(page) {
    this.page = page;
    this.completeHeader = page.locator('.complete-header');
    this.backHomeButton = page.locator('#back-to-products');
  }

  async getCompletionMessage() {
    return await this.completeHeader.textContent();
  }
}
module.exports = { CheckoutCompletePage };