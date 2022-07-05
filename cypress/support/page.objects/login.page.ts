export class LogIn {

    buttonLogin() {
        return cy.get('button').contains('Log In')
    }

    buttonSignUp(){
        return cy.get('a').contains('Sign Up')
    }
    inputUsername() {
        return cy.get('[type="username"]')
    }
    inputPassword() {
        return cy.get('[type="password"]')
    }
}

export class SignUp {

    base = new GenericPageObjects()

    buttonUsername(){
        return this.base.ByName("Username")
    }
    buttonPassword(){
        return this.base.ByName("Password").eq(0)
    }
    buttonPasswordRepeat(){
        return this.base.ByName("Password (Repeat)")
    }
    buttonLogIn(){
        return cy.get('a').contains('Log In')
    }
    buttonSignUp(){
        return cy.get('button')
    }
}

export class GenericPageObjects {
    ByName(name: string) {
        return cy.get(`label:contains(${name})`).parent().find('input')
    }
    
}