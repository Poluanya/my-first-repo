class CheckoutStepTwoPage {
  constructor(page) {
    this.page = page;
    this.finishButton = page.locator('#finish');
    this.summaryInfo = page.locator('.summary_info');
  }

  async finishCheckout() {
    await this.finishButton.click();
  }
}
module.exports = { CheckoutStepTwoPage };