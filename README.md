# FlightSearch Cypress Automation
This Repo contains Automation of  flightSearch web app, using Cypress.

## Cypress installation
Just follow the step by step approach mentioned in the official Cypress guide to install cypress in local - 
https://docs.cypress.io/guides/getting-started/installing-cypress#System-requirements

*NOTE:* For docker execution method no local setups are required, only latest docker is to be installed in the system.

## Execution of Testcases
* Using Cypress Command line:
    * cd flightSearchCypressAutomation
    * npx cypress run
  
* Using Docker (RECOMMENDED):
    * cd flightSearchCypressAutomation
    * docker run -it -v $PWD:/e2e -w /e2e cypress/included:6.2.1 --spec cypress/integration/flightSearchTests/sanity.test.js --browser firefox
    * docker run -it -v $PWD:/e2e -w /e2e cypress/included:6.2.1 --spec cypress/integration/flightSearchTests/load.test.js --browser firefox
    * docker run -it -v $PWD:/e2e -w /e2e cypress/included:6.2.1 --spec cypress/integration/flightSearchTests/api.test.js --browser firefox
  
* Using Cypress Runner
    * cd flightSearchCypressAutomation
    * npx cypress open
    * Just double click on the spec to execute
  
* Running individual spec
    * cd flightSearchCypressAutomation
    * npx cypress run --spec cypress/integration/flightSearchTests/sanity.test.js
  
* Running on specific browser
    * cd flightSearchCypressAutomation
    * npx cypress run --spec cypress/integration/flightSearchTests/sanity.test.js --browser firefox
  
## Testcases
All testcases are located in folder: cypress/integration/flightSearchTests/ 
* api.test.js: Contains REST api TCs.
* load.test.js: Contains Load testing TCs.
* mobileBrowser.test.js: Contains mobile browser TCs.
* sanity.test.js: Contains all sanity TCs.

## Report
  When cypress runner is used report will be listed in UI like screenshot below:
  ![image](https://user-images.githubusercontent.com/26439049/115125830-66bfb180-9fe8-11eb-825c-c7c5f015cd36.png)
   
  When cypress cli or docker method is used to execute the testcases, report will be generated like screenshot below:
  <img width="1176" alt="image" src="https://user-images.githubusercontent.com/26439049/115125577-b9986980-9fe6-11eb-9ee4-013525c0db88.png">
  <img width="822" alt="image" src="https://user-images.githubusercontent.com/26439049/115125797-2c561480-9fe8-11eb-82b8-683f2ce51b4a.png">

