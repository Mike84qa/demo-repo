import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { users } from './data/users';

test ('Successful login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    
    const inventoryPage = await loginPage.login(users.standard); 
    const index = await inventoryPage.getProductIndex('Backpack');
    expect(index).not.toBe(-1);   
    await inventoryPage.verifyNumberOfProducts(6);
    await inventoryPage.verifyProductExists('Backpack');
    const foundProduct = await inventoryPage.findProductByName('Backpack');
    expect(foundProduct).toBeDefined();
    const products = await inventoryPage.getProducts();
});


test  ('Invalid login show error message', async ({ page }) => {
   const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.attemptLogin(users.invalid);
    await loginPage.verifyInvalidCredentialsMessage();
});

test ('verify all products have price >0', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    
    const inventoryPage = await loginPage.login(users.standard); 
    const products = await inventoryPage.getProducts();
       expect(
        products.every(p => p.price > 0)).toBe(true);
});
    
test ('verify at least one product costs more than 40$', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    
    const inventoryPage = await loginPage.login(users.standard); 
    const products = await inventoryPage.getProducts();
       expect(
        products.some(p => p.price > 40)).toBe(true);
    const directPrice = 
    await inventoryPage.getProductPriceByNameDirect('Backpack');

    expect(directPrice).toBe(29.99);
});         

 test('add product to cart by name', async ({ page }) => {
            const loginPage = new LoginPage(page);
            await loginPage.open();
            
            const inventoryPage = await loginPage.login(users.standard);
            
            await inventoryPage.addProductToCartByName('Backpack');
            await inventoryPage.verifyCartCount(1);
            const cartPage = await inventoryPage.openCart();
            await cartPage.verifyProductExists('Backpack');
            await cartPage.verifyProductPrice('Backpack', 29.99);
            await cartPage.removeProductByName('Backpack');
            await cartPage.verifyProductNotExists('Backpack');

        }
    )
