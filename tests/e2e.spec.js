const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutStepOnePage } = require('../pages/CheckoutStepOnePage');
const { CheckoutStepTwoPage } = require('../pages/CheckoutStepTwoPage');
const { CheckoutCompletePage } = require('../pages/CheckoutCompletePage');

test('Цикл покупки самого дорогого товара', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const stepOne = new CheckoutStepOnePage(page);
  const stepTwo = new CheckoutStepTwoPage(page);
  const completePage = new CheckoutCompletePage(page);


  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');

  expect(await inventoryPage.getPageTitle()).toBe('Products');

  await inventoryPage.sortByPriceHighToLow();
  await inventoryPage.addItemToCart(0); 

  await inventoryPage.openCart();

  await expect(cartPage.cartItems).toHaveCount(1);

  await cartPage.goToCheckout();

  await stepOne.fillUserInfo('Test', 'User', '12345');

  await stepTwo.finishCheckout();

  const message = await completePage.getCompletionMessage();
  expect(message).toBe('Thank you for your order!');
});