// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import {LogIn, SignUp} from "../support/page.objects/login.page";
import { DataBuilderExpenses, TestDataBuilder } from "./dataBuilder";
import { CyUser } from "./models/user.model";
import { BudgetExpensesPage, BudgetsPage } from "./page.objects/budgets.page";
import { StatisticsPage } from "./page.objects/stats.page";

Cypress.Commands.add('createUser', (user: CyUser) => {
  let login = new LogIn()
  let signUp = new SignUp()

  login.buttonSignUp().click()
  signUp.buttonUsername().type(user.username)
  signUp.buttonPassword().type(user.password)
  signUp.buttonPasswordRepeat().type(user.password)
  signUp.buttonSignUp().click()
})

Cypress.Commands.add('createBudget', (data: TestDataBuilder) => {
  let budgetPage = new BudgetsPage()
  data.budgets.forEach(budget => {
    budgetPage.inputNewBudgetName(budget.budgetName)
    budgetPage.buttonCreateNewBudget().click()
  })

})

Cypress.Commands.add('login', (user: CyUser) => {
  let login = new LogIn()
  login.inputUsername().type(user.username)
  login.inputPassword().type(user.password)
  login.buttonLogin().click()
})

Cypress.Commands.add('addExpenses', (data: TestDataBuilder) => {
  let expensePage = new BudgetExpensesPage()
  data.budgetExpenses.forEach(expense => {
    expensePage.inputEntryAmount(expense.amount)
    expensePage.inputEntryName(expense.name)
    expensePage.selectCategory(expense.category)
    expense.isIncome ? null : expensePage.toggleBudgetIncomeExpense()
    expensePage.buttonConfirmEntry()
  })
})

Cypress.Commands.add('assertIncomesExpense', (data: DataBuilderExpenses[]) => {
  var totalIncome = 0
  var totalExpense = 0
  debugger
  let statsPage = new StatisticsPage()
  data.forEach(expense => {
    expense.isIncome ? 
    totalIncome += Number(expense.amount) : 
    totalExpense += Number(expense.amount)
  })
  statsPage.totalIncomeShouldBe(totalIncome)
  statsPage.totalExpenseShouldBe(totalExpense)
})

Cypress.Commands.add('visitStats', () => {
  cy.visit('/stats')
})