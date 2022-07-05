// in cypress/support/index.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

import { DataBuilderExpenses, TestDataBuilder } from "./dataBuilder";
import { CyUser } from "./models/user.model";

export { };

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Will create basic user given the user object from fixture. 
       *
       * @param {CyUser} user - CyUser variable
       * @returns void
       **/
      createUser(user: CyUser): Chainable<Element>
      /**
       * Will create budget depending on the data in TestDataBuilder object passed
       *
       * @param {TestDataBuilder} dataBuilder - Data builder object, populated with correct data
       * @returns void
       **/
      createBudget(data: TestDataBuilder): void
      login(user: CyUser): void
      addExpenses(data: TestDataBuilder): void
      assertIncomesExpense(data: DataBuilderExpenses[]): void
      visitStats(): void
    }
  }
}