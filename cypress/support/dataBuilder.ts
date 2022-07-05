import { BudgetEntrycategories } from "./page.objects/budgets.page";

//import {faker} from "@faker-js/faker"
const { faker } = require('@faker-js/faker');
export class TestDataBuilder {

    public budgets : DataBuilderBudget[] = []
    public budgetExpenses : DataBuilderExpenses[] = []

    public withNewBudget(): TestDataBuilder{
        var budget = new DataBuilderBudget()
        budget.budgetName = faker.word.noun()
        this.budgets.push(budget)
        return this
    }
    public withBudgetIncomeExpense(isIncome: boolean, category: BudgetEntrycategories): TestDataBuilder{
        var budgetExpense = new DataBuilderExpenses()
        budgetExpense.isIncome = isIncome
        budgetExpense.name = faker.word.noun()
        budgetExpense.category = category
        budgetExpense.amount = faker.random.numeric(5);
        this.budgetExpenses.push(budgetExpense)
        return this
    }
}

export class DataBuilderBudget {
    public budgetName: string = ""
}

export class DataBuilderExpenses {
    public name : string = ""
    public amount: string = ""
    public isIncome: boolean = false
    public category : BudgetEntrycategories = BudgetEntrycategories.Transport

}