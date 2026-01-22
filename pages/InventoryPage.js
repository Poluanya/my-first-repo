class InventoryPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.inventoryItems = page.locator('.inventory_item');
    this.sortContainer = page.locator('.product_sort_container');
  }

  async getPageTitle() { return await this.pageTitle.textContent(); }

  async sortByPriceHighToLow() {
    await this.sortContainer.selectOption('hilo');
  }

  async addItemToCart(index = 0) {
    await this.inventoryItems.nth(index).locator('button').click();
  }

  async openCart() {
    await this.cartIcon.click();
  }
}
module.exports = { InventoryPage };