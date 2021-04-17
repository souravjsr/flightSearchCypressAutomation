# FlightSearch Cypress Automation
This Repo contains Automation of a flight search web app, using Cypress.

## Cypress installing
Just follow the step by step approch mentioned in the official Cypress guide - https://docs.cypress.io/guides/getting-started/installing-cypress#System-requirements

## Execution of Testcases
* Using Command line:
  npx cypress run
* Using Docker:
  docker run -it -v $PWD:/e2e -w /e2e cypress/included:6.2.1 --browser firefox
* Using cypress runner
  npx cypress open
