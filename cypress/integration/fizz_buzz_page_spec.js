describe("FizzBuzz Page", function() {
  it("successfully loads", function() {
    cy.visit("http://localhost:8080"); // change URL to match your dev URL
    cy.get("h2").should("contain", "FizzBuzz");
  });

  describe("タイプ1を選択した場合", function() {
    it("通常パターンが表示される", function() {
      cy.get('tbody > :nth-child(1) > :nth-child(3)').should("contain","Fizz")
    });
  });

  describe("タイプ2を選択した場合", function() {
    it("数字のみのパターンが表示される", function() {
      cy.get('#fizz-buzz-app-select-type').select('タイプ2')
      cy.get('tbody > :nth-child(1) > :nth-child(3)').should("contain","3")
    });
  });

  describe("タイプ3を選択した場合", function() {
    it("FizzBuzzのみのパターンが表示される", function() {
      cy.get('#fizz-buzz-app-select-type').select('タイプ3')
      cy.get('tbody > :nth-child(2) > :nth-child(5)').should("contain", "FizzBuzz")
    });
  });
});
