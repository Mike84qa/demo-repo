import {Page,Locator,expect} from '@playwright/test';

export class CheckoutPage

{

   private readonly firstNameInput: Locator;
   private readonly lastNameInput: Locator;
   private readonly postalCodeInput: Locator;
   private readonly continueButton: Locator;
   private readonly productNames: Locator;
   private readonly cartItemContainers: Locator;
   private readonly finishButton: Locator;
   private readonly completeHeader: Locator;


   constructor(private readonly page: Page){ 
   
      this.firstNameInput = this.page.locator('#first-name');
      this.lastNameInput = this.page.locator('#last-name');
      this.postalCodeInput = this.page.locator('#postal-code');
      this.continueButton = this.page.locator('#continue');
      this.productNames = this.page.locator('.inventory_item_name');
      this.cartItemContainers = this.page.locator('.cart_item');
      this.finishButton = this.page.locator('#finish');
      this.completeHeader = this.page.locator('[data-test="complete-header"]');
   }

async fillCustomerInformation(
   firstName: string,
   lastName: string,
   postalCode: string,
): Promise<void> {

   await this.firstNameInput.fill(firstName);
   await this.lastNameInput.fill(lastName);
   await this.postalCodeInput.fill(postalCode);

}

async continueCheckout(): Promise<void>{

   await this.continueButton.click();
}

async verifyProductExists(productName: string): Promise <void> {

       const product = this.productNames.filter({ hasText: productName });
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

async finishCheckout(): Promise<void> {
   await this.finishButton.click();

}

async verifyCheckoutComplete(): Promise<void> {
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
    
}
}

