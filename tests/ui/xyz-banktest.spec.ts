import { test, expect } from '@playwright/test';
import { LogInPage } from '../../src/pages/xyzbank-home-loginpage';
import { AccountPage } from '../../src/pages/xyzbank-accountpage';
import { customers, money } from '../test-data/xyzbank-data';


test('customer can deposit and withdraw money and see correct balance', async ({ page }) => {
  const loginPage = new LogInPage(page);
  const accountPage = new AccountPage(page);
  let startingBalance: number;
  let balanceAfterDeposit: number;
  let finalBalance: number;

  await test.step('Given I am logged in as a valid XYZ Bank Customer', async () => {
  await loginPage.loginAsCustomer(customers.hermoine);
  await accountPage.verifyUserLogIn(customers.hermoine);
  });

  await test.step('And I can see my starting balance', async () => {
  startingBalance = await accountPage.getBalance();
  });

  await test.step('When I deposit money into my account', async () => {
  await accountPage.deposit(money.deposit);
  await accountPage.verifyDepositSuccess();
  });

  
 await test.step('Then my balance should increase by the deposit amount', async () => {
  balanceAfterDeposit = await accountPage.getBalance();
  expect(balanceAfterDeposit).toBe(startingBalance + money.deposit);
 });

  await test.step('When I withdraw money from my account', async () => {
  await accountPage.withdraw(money.withdraw);
  }); 

  await test.step('Then my balance should decrease by the withdrawn amount', async () => {
  finalBalance = await accountPage.getBalance();
  expect(finalBalance).toBe(balanceAfterDeposit - money.withdraw);
  });
});
