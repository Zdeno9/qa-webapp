import { DataBuilderBudget, DataBuilderExpenses } from "../dataBuilder"

export class BudgetsPage {
    inputNewBudgetName(name: string) {
        cy.get('[data-cy="budgetInput"]').type(name)
    }
    buttonCreateNewBudget(){
        return cy.get('[data-cy="budgetSubmit"]')
    }
    clickOnBudget(name: string){
        cy.contains(name).parent().parent().click()
    }
    removeBudget(data: DataBuilderBudget){
        cy.contains(data.budgetName).parent().parent().find('button').click()
    }
}

export class BudgetExpensesPage {


    inputEntryName(name: string){
        cy.get('[data-cy="budgetEntry"]').should("be.visible").type(name)
        
    }
    inputEntryAmount(amount: string){
        cy.get('[data-cy="amount"]').type(amount)
    }
    selectCategory(category: BudgetEntrycategories) {
        cy.get('[data-cy="selectBudgetCategory"]').select(category)      
    }
    buttonConfirmEntry(){
        cy.get('[data-cy="submitEntry"]').click()
    }
    toggleBudgetIncomeExpense(){
        //Ideally, based on mode check if in correct mode
        cy.get('[data-cy="toggleIncomeExpense"]').click()
    }
    removeBudget(budgetExpense: DataBuilderExpenses){
        cy.contains(budgetExpense.name).parent().parent().find("button").click()
        cy.contains(budgetExpense.name).should('not.exist')
    }

}


export enum BudgetEntrycategories {
    Transport = "Transport",
    Entertainment = "Entertainment"
}