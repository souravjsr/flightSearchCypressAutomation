/// <reference types="cypress" />

describe("API testing Suite", () => {
  it("API Test to check whether destination list is correct", () => {
    cy.request({
      method: "GET",
      url:
        "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=Del",
      headers: {
        "X-RapidAPI-Key": "2555fb00efmsh2ea1aafc67edd33p1bb476jsncc4e3c44af5a",
        "X-RapidAPI-Host":
          "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      response.body["Places"].forEach((element) => {
        expect(element.PlaceName).to.contain("Del");
      });
    });
  });

  it("API Test to check repeated values in destination list", () => {
    cy.request({
      method: "GET",
      url:
        "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=San Jose",
      headers: {
        "X-RapidAPI-Key": "2555fb00efmsh2ea1aafc67edd33p1bb476jsncc4e3c44af5a",
        "X-RapidAPI-Host":
          "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
      },
    }).then((response) => {
      var count = 0;
      expect(response.status).to.eq(200);
      response.body["Places"].forEach((element) => {
        if (element.PlaceName == "San Jose") {
          count++;
        }
      });
      if (count > 1) {
        console.error(
          "There are " + count + " repeated values, so failing TC."
        );
        throw "Repeated Values found.";
      }
    });
  });

  it("API test to check flight timings", () => {
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
      var count = 0;
      expect(response.status).to.eq(200);
      response.body["Quotes"].forEach((element) => {
        if (element.OutboundLeg.DepartureDate.includes("00:00")) {
          count++;
        }
      });
      if (count == response.body["Quotes"].length) {
        console.error(
          "All " +
            response.body["Quotes"].length +
            " flights have 00:00 time of departure. So failing the TCs."
        );
        throw "Incorrect Flight timings.";
      }
    });
  });
});
