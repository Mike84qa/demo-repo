import {expect, Page, Locator } from '@playwright/test';

export class InventoryPage {
      private readonly inventoryItems: Locator;
      private readonly inventoryItemNames: Locator;

    constructor(private readonly page: Page){
        this.inventoryItems = this.page.locator('.inventory_item');
        this.inventoryItemNames = this.page.locator('.inventory_item_name');
    }
    
    async verifyNumberOfProducts(expectedCount: number) {
        await expect(this.inventoryItems).toHaveCount(expectedCount);
    }   

    async getAllProductNames(): Promise<string[]> {
        const productNames = await this.inventoryItemNames.allTextContents();
        return productNames;
    }
    async getProductNamesContaining(substring: string): Promise<string[]> {
        const allProductNames = await this.getAllProductNames();
        return allProductNames.filter(name => name.includes(substring));
    }
    async getNumberOfProducts(): Promise<number> {
        const productNames = await this.getAllProductNames();
        return productNames.length;
    } 
    async getproductNamesLowercase(): Promise<string[]> {
        const allProductNames = await this.getAllProductNames();
        return allProductNames.map(name => name.toLowerCase());

    }
    async verifyAllProductsHaveNames() {
        const productNames = await this.getAllProductNames();
        expect(productNames.every(name =>name.trim().length > 0)).toBe(true);
    }
    async verifyProductExists(productName: string) {
        const allProductNames = await this.getAllProductNames();
       
        expect(
            allProductNames.some(name => name.includes(productName))
        ).toBe(true);    
        
        }
        async printAllProductNames() {
          const productNames = await this.getAllProductNames();
            
          console.log('Product Names:');
        
          for (const productName of productNames) {
            console.log(productName);
          }     
    }
        }
