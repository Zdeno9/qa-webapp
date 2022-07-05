import { LogIn } from '../support/page.objects/login.page'
import "cypress-localstorage-commands";
import { CyUser } from '../support/models/user.model';

describe('Authentication Spec', () => {
  //Authentication Spec File tests basic authentication
  //tests for correct and incorrect login.
  //Sign Up functionality is also covered. 
  let login = new LogIn()
  before('One Time Setup', function () {  
    cy.fixture('static.users.json').then((users) => {
      this.users = users
      return users
    }).then((users) => {
      let admin : CyUser = users.admin
      cy.visit('/')
      //Create admin user for further testing. This
      cy.createUser(admin)
      cy.saveLocalStorage();
    })

  })
  beforeEach('Do Before Every Test', function () {    
    cy.visit('/')
  })
  context('S01 Sign Up Suite', function() {
    it('S01TC01 - Create User', function () {
      cy.createUser(this.users.admin)
    })
  })
  context('S02 Login Suite', function() {
    it('S02TC01 - Invalid Password', function () {          
      login.inputPassword().type(this.users.admin.username)
      login.inputUsername().type("invalid")
      login.buttonLogin().click()
      cy.get('div').should('contain.text', 'Invalid username or password.')
    })
    it('S02TC02 - Invalid Username', function () {          
      login.inputPassword().type("invalid")
      login.inputUsername().type(this.users.admin.password)
      login.buttonLogin().click()
      cy.get('div').should('contain.text', 'Invalid username or password.')
    })
    it('S02TC03 - Empty Username', function () {
      let login = new LogIn()
      login.inputUsername().type(this.users.admin.password)
      login.buttonLogin().should("be.disabled")
    })
    it('S02TC04 - Empty Passsword', function () {
      let login = new LogIn()
      login.inputPassword().type(this.users.admin.username)
      login.buttonLogin().should('be.disabled')
    })
    it('S02TC05 - Valid Login', function () {
      let login = new LogIn()
      cy.restoreLocalStorage();
      cy.reload();
      login.inputPassword().type(this.users.admin.password)
      login.inputUsername().type(this.users.admin.username)
      login.buttonLogin().click()
      cy.get('h1').contains("My Budgets")
    })
  })
})