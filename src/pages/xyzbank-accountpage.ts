
import { Page, expect } from "@playwright/test"

export class AccountPage {
    readonly page: Page;

    constructor (page: Page) {
        this.page = page;
    }


    async verifyUserLogIn(name: string) {
        await expect(this.page.getByText(name)).toBeVisible();
        await expect(this.page.getByRole('button', {name: 'Logout'})).toBeVisible();
    }

async getBalance(): Promise<number> {
  // Balance is the second <strong> element on the page
  const balanceText = await this.page.locator('strong').nth(1).textContent();

  return Number(balanceText?.trim());
}

 async openDepositTab() {
    await this.page.getByRole('button', { name: 'Deposit' }).first().click();
  }

  async openWithdrawTab() {
    await this.page.getByRole('button', { name: 'Withdrawl' }).click();
  }

  async enterAmount(amount: number) {
    await this.page.locator('input[ng-model="amount"]').fill(String(amount));
  }

  async clickDepositButton() {
    await this.page.getByRole('button', { name: 'Deposit' }).last().click();
  }

  async clickWithdrawButton() {
    await this.page.getByRole('button', { name: 'Withdraw' }).click();
  }

  async deposit(amount: number) {
    await this.openDepositTab();
    await this.enterAmount(amount);
    await this.clickDepositButton();
  }

  async withdraw(amount: number) {
    await this.openWithdrawTab();
    await this.enterAmount(amount);
    await this.clickWithdrawButton();
  }

  async verifyDepositSuccess() {
    await expect(this.page.locator('.error')).toContainText('Deposit Successful');
  }

  async verifyWithdrawSuccess() {
    await expect(this.page.locator('.error')).toContainText('Transaction successful');
  }
}