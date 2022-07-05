import "cypress-localstorage-commands";
import { TestDataBuilder } from "../support/dataBuilder";
import { CyUser } from "../support/models/user.model";
import { BudgetExpensesPage, BudgetsPage, BudgetEntrycategories } from "../support/page.objects/budgets.page";

describe('Budgets Spec', () => {
  //Budgets spec file that contains basic budget tests.
  //Tests also use Statistics screen for data validation
  before('One Time Setup', function () {
    
    cy.fixture('static.users.json').then((users) => {
      this.users = users
      return users
    }).then((users) => {
        let admin : CyUser = users.admin
        let user : CyUser = users.user
        cy.visit('/')
        cy.createUser(admin)
        cy.createUser(user)
        cy.login(admin)
        //Save local storage so it can be used in between tests
        cy.saveLocalStorage();
        this.dataBuilder = new TestDataBuilder()      
        .withNewBudget()
        .withBudgetIncomeExpense(true, BudgetEntrycategories.Transport)
        .withBudgetIncomeExpense(true, BudgetEntrycategories.Entertainment)
        .withBudgetIncomeExpense(false, BudgetEntrycategories.Entertainment)
    })

  })
  beforeEach('Before Every Test', function () {
    cy.restoreLocalStorage()
    cy.visit('/')
    
  })

  context('S03 Budgets Suite', function() {
    it('S03TC01 - Create basic budget with expenses', function () {
      let dataBuilder : TestDataBuilder = this.dataBuilder
      let budgetPage = new BudgetsPage()

      cy.createBudget(dataBuilder)
      budgetPage.clickOnBudget(dataBuilder.budgets[0].budgetName)
      cy.addExpenses(dataBuilder)
      cy.visitStats()
      cy.assertIncomesExpense(dataBuilder.budgetExpenses)
    })
    it('S03TC02 - Remove expenses', function() {
      let dataBuilder : TestDataBuilder = this.dataBuilder
      let budgetPage = new BudgetsPage()
      let budgetExpensePage = new BudgetExpensesPage()
      cy.createBudget(dataBuilder)
      budgetPage.clickOnBudget(dataBuilder.budgets[0].budgetName)
      cy.addExpenses(dataBuilder)
      cy.visit('/')
      budgetPage.clickOnBudget(dataBuilder.budgets[0].budgetName)      
      budgetExpensePage.removeBudget(dataBuilder.budgetExpenses[0])
      cy.wait(0).then(()=>{
        dataBuilder.budgetExpenses.splice(0,1)
      })      
      cy.visitStats()
      cy.assertIncomesExpense(dataBuilder.budgetExpenses)
    })
    it('S03TC03 - Remove budget', function() {
      let dataBuilder : TestDataBuilder = this.dataBuilder
      let budgetPage = new BudgetsPage()
      cy.createBudget(dataBuilder)
      budgetPage.removeBudget(dataBuilder.budgets[0])
    })
  })
})