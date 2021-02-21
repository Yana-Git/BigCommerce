describe("order API test", function () {
  it("create an order", function () {
    cy.request({
      method: "post",
      url: "https://api.bigcommerce.com/stores/747hf8df3w/v2/orders",
      headers: {
        "X-Auth-Token": "kcylj96oghf7q8lzp215t5vkcl4f11u",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: {
        billing_address: {
          first_name: "Jane1",
          last_name: "Doe",
          street_1: "123 Main Street",
          city: "Austin",
          state: "Texas",
          zip: "78751",
          country: "United States",
          country_iso2: "US",
          email: "janedoe@email.com",
        },
        products: [
          {
            name: "BigCommerce Coffee Mug",
            quantity: 1,
            price_inc_tax: 50,
            price_ex_tax: 45,
          },
        ],
        status_id: 11,
      },
    }).then((response) => {
      expect(response.status).equal(201);
    });
  });

  it("check new order", function () {
    cy.visit("https://login.bigcommerce.com/login");
    cy.get("#user_email").clear().type("yaowang274@gmail.com");
    cy.get("#user_password").clear().type("wangSONG123.");
    cy.get(".login-form-button").click();
    cy.url().should("include", "/manage/dashboard");
    cy.get("a").find("span").contains("Orders").click();
    cy.get(".order-status");
  });

  it.only("check order status", function () {
    cy.request({
      method: "get",
      url: "https://api.bigcommerce.com/stores/747hf8df3w/v3/catalog/summary",
      headers: {
        "X-Auth-Token": "kcylj96oghf7q8lzp215t5vkcl4f11u",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: {
        order_id: "105",
      },
    }).then((response) => {
      expect(response.status).equal(200);
    });
  });
  after(function () {
    cy.request({
      method: "delete",
      url: "https://api.bigcommerce.com/stores/747hf8df3w/v2/orders",
      headers: {
        "X-Auth-Token": "kcylj96oghf7q8lzp215t5vkcl4f11u",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((response) => {
      expect(response.status).equal(204);
    });
  });
});
