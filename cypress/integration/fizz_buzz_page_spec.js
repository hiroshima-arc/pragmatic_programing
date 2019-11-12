describe("FizzBuzz Page", () => {
  it("successfully loads", () => {
    cy.visit("http://localhost:8080"); // change URL to match your dev URL
    cy.get("h2").should("contain", "FizzBuzz");
  });

  describe("一覧編集画面", () => {
    beforeEach(() => {
      cy.get('#tab-menu02').click();
    });

    describe("タイプ1を選択した場合", () => {
      it("通常パターンが表示される", () => {
        cy.get("tbody > :nth-child(1) > :nth-child(3)").should(
          "contain",
          "Fizz"
        );
      });
    });

    describe("タイプ2を選択した場合", () => {
      it("数字のみのパターンが表示される", () => {
        cy.get("#fizz-buzz-app-select-type").select("タイプ2");
        cy.get("tbody > :nth-child(1) > :nth-child(3)").should("contain", "3");
      });
    });

    describe("タイプ3を選択した場合", () => {
      it("FizzBuzzのみのパターンが表示される", () => {
        cy.get("#fizz-buzz-app-select-type").select("タイプ3");
        cy.get("tbody > :nth-child(2) > :nth-child(5)").should(
          "contain",
          "FizzBuzz"
        );
      });
    });
  });
});
