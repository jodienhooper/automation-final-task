
import { Page } from "@playwright/test"

export class LogInPage {
    readonly page: Page;

    constructor (page: Page) {
        this.page = page;
    }

   async navigateToLoginPage () {
        await this.page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
    };

    async clickCustomerLogIn() {
      await this.page.getByRole('button', { name: 'Customer Login' }).click(); 
    }

async selectCustomer(name: string) {
    await this.page.locator('#userSelect').selectOption({ label: name });
  }

  async clickLoginButton() {
    await this.page.getByRole('button', { name: 'Login' }).click();
  };

  async loginAsCustomer(name: string) {
    await this.navigateToLoginPage();
    await this.clickCustomerLogIn();
    await this.selectCustomer(name);
    await this.clickLoginButton();
  }
};