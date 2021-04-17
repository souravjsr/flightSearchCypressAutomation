/// <reference types="cypress" />

describe("Basic Sanity Suite", () => {
  beforeEach(() => {
    cy.visit("https://lucid-heisenberg-474565.netlify.app/");
  });

  it("Testing presence of all the required elements", () => {
    // Navigating to second page.
    cy.secondPageNextMonth();

    // Checking all the required elements are present in second page.
    var elements_array = [
      "Choose another flight?",
      "by price",
      "by date",
      "Only direct flights",
      "Cost range",
    ];
    elements_array.forEach((element) => {
      cy.contains(element).should("exist");
    });

    // Routing to the first page
    cy.get(".index_container_3Hfy- > .router-link-active").click();

    // Checking all the required elements are present in first page.
    // Following: https://github.com/hellochef-me/frontend-challenge
    var elements_array = [
      "Flights searching",
      "Search the most suitable flights",
      "Search now",
    ];
    elements_array.forEach((element) => {
      cy.contains(element).should("exist");
    });

    cy.get(":nth-child(1) > .index_container_3GUAF > .index_input_MYGAS")
      .invoke("attr", "placeholder")
      .should("contain", "From");
    cy.get(":nth-child(2) > .index_container_3GUAF > .index_input_MYGAS")
      .invoke("attr", "placeholder")
      .should("contain", "To");
    cy.get(":nth-child(3) > .index_container_1iBBj > .index_input_2swCx")
      .invoke("attr", "placeholder")
      .should("contain", "Departure on");
    cy.get(":nth-child(4) > .index_container_1iBBj > .index_input_2swCx")
      .invoke("attr", "placeholder")
      .should("contain", "Return date");
  });

  it("Testing by keeping from and to as same destination", () => {
    cy.get(":nth-child(1) > .index_container_3GUAF > .index_input_MYGAS").type(
      "DEL"
    );
    cy.log("Waiting for 2 secs.");
    cy.wait(2000);
    cy.get(".index_active_R7nrZ").click();
    cy.get(":nth-child(2) > .index_container_3GUAF > .index_input_MYGAS").type(
      "DEL"
    );
    cy.log("Waiting for 2 secs.");
    cy.wait(2000);
    cy.get(".index_active_R7nrZ").click();
    cy.get(
      ":nth-child(3) > .index_container_1iBBj > .index_input_2swCx"
    ).click();
    cy.get('[aria-label="Next month"] > .v-btn__content > .v-icon').click();
    cy.contains("30").click();
    cy.get(".index_btn_3-fZ3").click();
    cy.contains("Sorry, we can't find any flights").should("exist");
  });

  it("Testing selection of Lowest price", () => {
    var a = [];

    cy.secondPageNextMonth();
    cy.get(".index_price_2ibrS")
      .each(($ele) => {
        // Calculating the sum from individual flight details.
        a.push(parseInt($ele.text()));
      })
      .then(() => {
        console.log(Math.min(...a));
        cy.get(".index_cheapest_2q1Am").contains(Math.min(...a));
      });
  });

  it("Testing direct flight checkbox", () => {
    cy.secondPageNextMonth();
    cy.contains("flight with transition");

    // Checked Direct flight
    cy.get(".v-input--selection-controls__ripple").click();
    cy.contains(/^flight with transition$/).should("not.exist");
    cy.contains(/^direct flight$/).should("exist");

    // Unchecked Direct flight
    cy.get(".v-input--selection-controls__ripple").click();
    cy.contains(/^flight with transition$/).should("exist");
    cy.contains(/^direct flight$/).should("exist");
  });

  it("Testing chose another flight link", () => {
    cy.secondPageNextMonth();
    cy.get(".index_link_HlQyE").click();
    cy.contains("Search the most suitable flights");
    cy.get(".index_btn_3-fZ3").should("be.disabled");
  });

  it("Testing price calculator non negative value should be displayed", () => {
    cy.secondPageNextMonth();
    cy.get(".index_container_3dDcv > :nth-child(2) > div").click();
    cy.get(".index_active_12hsp > .index_info_ml0nk").click({ multiple: true });
    cy.contains("Total: -").should("not.exist");
  });

  it("Testing selection of all the flights and the total sum calculation", () => {
    cy.secondPageSameMonth();
    var sum = 0;
    cy.get(".index_price_2ibrS")
      .each(($ele) => {
        // Calculating the sum from individual flight details.
        sum = sum + parseInt($ele.text());
        cy.get($ele).click({ multiple: true });
      })
      .then(() => {
        cy.log("Total price = " + sum);
        cy.contains("Total: " + sum + " $");
      });
  });

  it("Testing selection of all the flights and the total with direct flight checked", () => {
    cy.secondPageSameMonth();
    var sum = 0;
    cy.get(".index_price_2ibrS")
      .each(($ele) => {
        sum = sum + parseInt($ele.text());
        cy.get($ele).click({ multiple: true });
      })
      .then(() => {
        cy.log("Total price = " + sum);
        cy.contains("Total: " + sum + " $");

        // Selecting direct flight checkbox. Post this the Sum should not be the same.
        cy.get(".v-input--selection-controls__ripple").click();
        cy.contains("Total: " + sum + " $").should("not.exist");
      });
  });

  it("Testing selection of Return date lesser than Departure date", () => {
    // Custom command to select date from next month.
    cy.get(":nth-child(1) > .index_container_3GUAF > .index_input_MYGAS").type(
      "IAD"
    );
    cy.get(
      ":nth-child(1) > .index_container_3GUAF > .index_suggestionList_32-IA > .index_active_R7nrZ"
    ).click();
    cy.get(":nth-child(2) > .index_container_3GUAF > .index_input_MYGAS").type(
      "DEL"
    );
    cy.log("Waiting for 2 secs.");
    cy.wait(2000);
    cy.get(".index_active_R7nrZ").click();
    cy.get(
      ":nth-child(3) > .index_container_1iBBj > .index_input_2swCx"
    ).click();
    cy.get('[aria-label="Next month"] > .v-btn__content > .v-icon').click();
    cy.contains("30").click();
    cy.get(
      ":nth-child(4) > .index_container_1iBBj > .index_input_2swCx"
    ).click();
    cy.contains("30").click();
    // Checking the search button is not enabled.
    cy.get(".index_btn_3-fZ3").should("be.disabled");
  });

  it("Testing whether all flights are displayed from the API", () => {
    cy.secondPageSameMonth();

    // Counting the number of displayed flights.
    var ele_count = 0;
    var api_count = 0;
    cy.get(".index_container_3w5wx").then(($ele) => {
      console.log($ele);
      ele_count = $ele.length;
    });

    // Counting number flights of listed from API
    cy.request({
      method: "GET",
      url:
        "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/IAD-sky/DEL-sky/2021-04",
      headers: {
        "X-RapidAPI-Key": "2555fb00efmsh2ea1aafc67edd33p1bb476jsncc4e3c44af5a",
        "X-RapidAPI-Host":
          "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");

      response.body["Quotes"].forEach((element) => {
        console.log(element);
        if (element["OutboundLeg"]["DepartureDate"].slice(9, 11) >= dd) {
          api_count++;
        }
      });

      // Comparing the numbers.
      console.log(
        "Expected flights " + api_count + ", total displayed:" + ele_count
      );
      if (api_count != ele_count) {
        throw "Incorrect number of flights displayed.";
      }
    });
  });
});
