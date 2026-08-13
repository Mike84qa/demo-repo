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
    console.log(`Found product: ${foundProduct}`);
    const products = await inventoryPage.getProducts();
    console.log('Products:', products);
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
});                   
    

