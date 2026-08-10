import { test } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { users } from './data/users';

test ('Successful login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    
const inventoryPage = await loginPage.login(users.standard);    
    await inventoryPage.verifyNumberOfProducts(6);
    await inventoryPage.verifyProductExists('Backpack');
});


test  ('Invalid login show error message', async ({ page }) => {
   const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.attemptLogin(users.invalid);
    await loginPage.verifyInvalidCredentialsMessage();
});




