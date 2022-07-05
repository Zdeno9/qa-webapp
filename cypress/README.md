## Automation Solution

### Tools Used
For the e2e automation, Cypress was used as the main tool. Modified to be used with typescript for better stability.

Page Object Model is mainly used (although Cypress does not encourage, i have never tried App Actions before, so i chose POM) with Test Data Builder. Dockerized solution can be also used, though the docker-compose 

### Tests
For the simplicity, there are only two spec files namely authentication and budgets. (Many more could be created, for individual sites, workflows, modules etc.)

Authentication - contains basic authentication tests along with sing up tests.

Budgets - contains basic budget operations and subsequent assertions.

I believe, the tests should be somehow self-explanatory of what they test and what is covered. Usually, there should be some Test Plan, or Acceptance criteria on which the tests are based on and tests would reference individual cases. 

Tests can be run either with docker compose up (see the limitation in compose file), through Cypress GUI with 'npx cypress open' or through command directly from root folder - 'npx cypress run --spec=cypress/e2e/authentication.cy.ts'

### Limitations/missing
Reporter - Usually i would go with Allure where all necessary links, descriptions and so on can be easily added. 
Executor - executor file for CI is missing where different env variables (language, subset of tests) would be provided.
Proper descriptions - to spare some time, i included only a few method descriptions and test descriptions as example what i would usually do for the rest of the code. 
Proper navigation - navigation would be implemented using own Cy commands based on enum.
Proper user/data population - users would be prefferably created through REST in the test setup. For the simplicity, users are created manually. 