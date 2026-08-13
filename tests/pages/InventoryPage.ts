import {expect, Page, Locator } from '@playwright/test';
type Product = {
    name: string;
    price: number;
};

export class InventoryPage {
      private readonly inventoryItems: Locator;
      private readonly inventoryItemNames: Locator;
      private readonly productPrices: Locator;

    constructor(private readonly page: Page){
        this.inventoryItems = this.page.locator('.inventory_item');
        this.inventoryItemNames = this.page.locator('.inventory_item_name');
        this.productPrices = this.page.locator('.inventory_item_price');
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
        async findProductByName(productName: string): Promise<string | undefined> {
            const allProductNames = await this.getAllProductNames();
            const foundProduct = allProductNames.find(name => name.includes(productName));
            return foundProduct;
        }
        async getProductIndex(productName: string): Promise<number> {
            const allProductNames = await this.getAllProductNames();
            const index = allProductNames.findIndex(name => name.includes(productName));
            return index;
        }
        async getProducts(): Promise<Product[]> {
            const productNames = await this.getAllProductNames();
            const productPrices = await this.productPrices.allTextContents();
                   
            return productNames.map((name, index) => ({
                name,
                price: parseFloat(productPrices[index].replace('$', '')),
            }));
        }
    }
