/// <reference types="cypress" />

describe("Load testing Suite", () => {
  beforeEach(() => {
    cy.visit("https://lucid-heisenberg-474565.netlify.app/");
  });

  it("Load test with larger date range 18.08.2027 this will fail", () => {
    cy.get(":nth-child(1) > .index_container_3GUAF > .index_input_MYGAS").type(
      "kansas city"
    );
    cy.get(
      ":nth-child(1) > .index_container_3GUAF > .index_suggestionList_32-IA > .index_active_R7nrZ"
    ).click();
    cy.get(":nth-child(2) > .index_container_3GUAF > .index_input_MYGAS").type(
      "new york"
    );
    cy.wait(2000);
    cy.get(".index_active_R7nrZ").click();
    cy.get(
      ":nth-child(3) > .index_container_1iBBj > .index_input_2swCx"
    ).click();
    cy.get(".v-date-picker-header__value > div > button").click();
    cy.get(
      ".v-date-picker-header__value > div:nth-child(1) > button:nth-child(1)"
    ).click({ force: true, multiple: true });
    cy.get(":nth-child(95)").click();
    cy.get(":nth-child(3) > :nth-child(2) > .v-btn > .v-btn__content").click();
    cy.get(":nth-child(3) > :nth-child(4) > .v-btn > .v-btn__content").click();
    cy.get(".index_btn_3-fZ3").click();
    cy.get(".index_cheapest_2q1Am").click();
  });
});
