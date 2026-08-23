import {Page,Locator,expect} from '@playwright/test';
import { CheckoutPage } from './CheckoutPage';

export class CartPage {

private readonly cartItems: Locator;
private readonly cartItemContainers: Locator;
private readonly checkoutButton: Locator;

constructor(private readonly page: Page){
        this.cartItems = this.page.locator('.inventory_item_name');
        this.cartItemContainers = this.page.locator('.cart_item');
        this.checkoutButton = this.page.locator('#checkout');
    }   

async verifyProductExists(productName: string): Promise<void> {
    const product = this.cartItems.filter({ hasText: productName });
    await expect(product).toBeVisible();
   
}
async verifyProductPrice(productName: string, expectedPrice: number): Promise<void> {
    const productContainer = this.cartItemContainers.filter({ hasText: productName });
    const priceText = await productContainer
    .locator('.inventory_item_price')
    .textContent();

     if (priceText === null) {
        throw new Error(`Price for product "${productName}" not found.`);
   }

    const price = parseFloat(priceText.replace('$', ''));
    expect(price).toBe(expectedPrice);
 }
 async removeProductByName(productName: string): Promise<void> {
    const productContainer = this.cartItemContainers.filter({ hasText: productName });
    const removeButton = productContainer.locator('button:has-text("Remove")');
    await removeButton.click();
  }
  async verifyProductNotExists(productName: string): Promise<void> {
    const product = this.cartItems.filter({ hasText: productName });
    await expect(product).toHaveCount(0);
  }
  async proceedToCheckout(): Promise<CheckoutPage> {
    await this.checkoutButton.click();
    return new CheckoutPage(this.page);
  }
  }

