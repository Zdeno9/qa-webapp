export class StatisticsPage {

    totalIncomeShouldBe(income: number){
        cy.get('[data-cy="totalIncome"]').next().should("contain.text", income.toString())
    }
    totalExpenseShouldBe(expense: number){
        cy.get('[data-cy="totalExpense"]').next().should("contain.text", expense.toString())
    }
}