import { expect, Locator, Page } from '@playwright/test';
 import { InventoryPage } from './InventoryPage';

export class LoginPage {
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessage: Locator;

    constructor(private readonly page: Page) {
        this.usernameInput = this.page.locator('[data-test="username"]');
        this.passwordInput = this.page.locator('[data-test="password"]');
        this.loginButton = this.page.getByRole('button', { name: 'Login' });
        this.errorMessage = this.page.locator('[data-test="error"]');
    }
   
    async open(){
              await this.page.goto('https://www.saucedemo.com');

        }
        async login(user: { username: string, password: string }) {
            await this.attemptLogin(user);
           
            await expect(this.page).toHaveURL(/inventory/);
            
            return new InventoryPage(this.page); 

            }  

            async enterUsername(username: string) {
             await this.usernameInput.fill(username);
            }   

            async enterPassword(password: string) {
             await this.passwordInput.fill(password);
            }

            async clickLogin() {
             await expect(this.loginButton).toBeEnabled();   
             await this.loginButton.click();
            }

            async verifyInvalidCredentialsMessage() {
                await expect(this.errorMessage).
                    toContainText('Username and password do not match');     
                    }
        
        async attemptLogin(user: { username: string, password: string }) {
            await this.enterUsername(user.username);
            await this.enterPassword(user.password);
            await this.clickLogin();
        }
        
        
    }




        