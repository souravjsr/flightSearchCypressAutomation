// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Below are the custom commands used.

const COMMAND_DELAY = 1000;
for (const command of [
  "visit",
  "click",
  "trigger",
  "type",
  "clear",
  "reload",
  "contains",
]) {
  Cypress.Commands.overwrite(command, (originalFn, ...args) => {
    // This command slows the execution speed, to make the steps clerly visible.
    const origVal = originalFn(...args);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(origVal);
      }, COMMAND_DELAY);
    });
  });
}

Cypress.Commands.add("secondPageNextMonth", () => {
  // Custom command to select next month and go to second page.
  cy.get(":nth-child(1) > .index_container_3GUAF > .index_input_MYGAS").type(
    "IAD"
  );
  cy.log("Waiting for 2 secs.");
  cy.wait(2000);
  cy.get(
    ":nth-child(1) > .index_container_3GUAF > .index_suggestionList_32-IA > .index_active_R7nrZ"
  ).click();
  cy.get(":nth-child(2) > .index_container_3GUAF > .index_input_MYGAS").type(
    "DEL"
  );
  cy.log("Waiting for 2 secs.");
  cy.wait(2000);
  cy.get(".index_active_R7nrZ").click();
  cy.get(":nth-child(3) > .index_container_1iBBj > .index_input_2swCx").click();
  cy.get('[aria-label="Next month"] > .v-btn__content > .v-icon').click();
  cy.get(":nth-child(3) > :nth-child(3) > .v-btn > .v-btn__content").click({
    force: true,
    multiple: true,
  });
  // Checking the search button is enabled.
  cy.get(".index_btn_3-fZ3").should("be.enabled").click();
  cy.get(".index_title_28dBN").should("not.exist");
  cy.get(".index_cheapest_2q1Am").click({ multiple: true });
  // Checking the bar showing the value is displayed.
  cy.contains("Total: ").should("exist");
});

Cypress.Commands.add("secondPageSameMonth", () => {
  // Custom command to select next month and go to second page.
  cy.get(":nth-child(1) > .index_container_3GUAF > .index_input_MYGAS").type(
    "IAD"
  );
  cy.log("Waiting for 2 secs.");
  cy.wait(2000);
  cy.get(
    ":nth-child(1) > .index_container_3GUAF > .index_suggestionList_32-IA > .index_active_R7nrZ"
  ).click();
  cy.get(":nth-child(2) > .index_container_3GUAF > .index_input_MYGAS").type(
    "DEL"
  );
  cy.log("Waiting for 2 secs.");
  cy.wait(2000);
  cy.get(".index_active_R7nrZ").click();
  cy.get(":nth-child(3) > .index_container_1iBBj > .index_input_2swCx").click();
  cy.contains("30").click();

  // Checking the search button is not enabled.
  cy.get(".index_btn_3-fZ3").should("be.enabled").click();
  cy.get(".index_title_28dBN").should("not.exist");
});
