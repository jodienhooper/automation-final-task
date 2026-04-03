import { test, expect } from '@playwright/test';
import { LogInPage } from '../../src/pages/xyzbank-home-loginpage';
import { AccountPage } from '../../src/pages/xyzbank-accountpage';
import { customers, money } from '../test-data/xyzbank-data';

test('customer can deposit and withdraw money and see correct balance', async ({ page }) => {
  const loginPage = new LogInPage(page);
  const accountPage = new AccountPage(page);

  await loginPage.loginAsCustomer(customers.hermoine);
  await accountPage.verifyUserLogIn(customers.hermoine);

  const startingBalance = await accountPage.getBalance();

  await accountPage.deposit(money.deposit);
  await accountPage.verifyDepositSuccess();

  const balanceAfterDeposit = await accountPage.getBalance();
  expect(balanceAfterDeposit).toBe(startingBalance + money.deposit);

  const finalBalance = await accountPage.getBalance();
  expect(finalBalance).toBe(balanceAfterDeposit - money.withdraw);
});