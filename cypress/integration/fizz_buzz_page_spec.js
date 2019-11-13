describe("FizzBuzz Page", () => {
  it("successfully loads", () => {
    cy.visit("http://localhost:8080"); // change URL to match your dev URL
    cy.get("h2").should("contain", "FizzBuzz");
  });

  describe("カウンター画面", () => {
    beforeEach(() => {
      cy.get("#tab-menu01").click();
    });

    it("初期値が表示される", () => {
      cy.get(".display-1").should("contain", "FizzBuzz");
    });

    it("インクリメントすると値が変わる", () => {
      cy.get("#fizz-buzz-app-counter-increment").click();
      cy.get("#fizz-buzz-app-counter-increment").click();
      cy.get("#fizz-buzz-app-counter-increment").click();
      cy.get(".display-1").should("contain", "Fizz");
    });

    it("デクリメントすると値が変わる", () => {
      cy.get("#fizz-buzz-app-counter-decrement").click();
      cy.get("#fizz-buzz-app-counter-decrement").click();
      cy.get(".display-1").should("contain", "1");
    });
  });

  describe("一覧編集画面", () => {
    beforeEach(() => {
      cy.get("#tab-menu02").click();
    });

    describe("Create&Update", () => {
      describe("表示する", () => {
        describe("タイプ1を選択した場合", () => {
          it("通常パターンが表示される", () => {
            cy.get("#fizz-buzz-app-select-type").select("タイプ1");
            cy.get("tbody > :nth-child(1) > :nth-child(3)").should(
              "contain",
              "Fizz"
            );
          });
        });

        describe("タイプ2を選択した場合", () => {
          it("数字のみのパターンが表示される", () => {
            cy.get("#fizz-buzz-app-select-type").select("タイプ2");
            cy.get("tbody > :nth-child(1) > :nth-child(3)").should(
              "contain",
              "3"
            );
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

      describe("保存する", () => {
        beforeEach(() => {
          cy.get("#tab-menu03").click();
          cy.get("#fizz-buzz-app-table-button-delete-select").click();
          cy.get("#tab-menu02").click();
        });

        describe("タイプ1を選択した場合", () => {
          it("通常パターンが保存される", () => {
            cy.get("#fizz-buzz-app-select-type").select("タイプ1");
            cy.get("#fizz-buzz-app-table-button-save").click();
            cy.get("#tab-menu03").click();
            cy.get(
              "#fizz-buzz-app-table-read > .table > tbody > :nth-child(1) > :nth-child(1)"
            ).should("contain", "1");
          });
        });

        describe("タイプ2を選択した場合", () => {
          it("数字のみのパターンが保存される", () => {
            cy.get("#fizz-buzz-app-select-type").select("タイプ2");
            cy.get("#fizz-buzz-app-table-button-save").click();
            cy.get("#tab-menu03").click();
            cy.get(
              "#fizz-buzz-app-table-read > .table > tbody > :nth-child(1) > :nth-child(3)"
            ).should("contain", "3");
          });
        });

        describe("タイプ3を選択した場合", () => {
          it("FizzBuzzのみのパターンが保存される", () => {
            cy.get("#fizz-buzz-app-select-type").select("タイプ3");
            cy.get("#fizz-buzz-app-table-button-save").click();
            cy.get("#tab-menu03").click();
            cy.get(
              "#fizz-buzz-app-table-read > .table > tbody > :nth-child(2) > :nth-child(5)"
            ).should("contain", "FizzBuzz");
          });
        });
      });

      describe("削除する", () => {
        it("保存した全てのレコードが削除される", () => {
          cy.get("#tab-menu02").click();
          cy.get("#fizz-buzz-app-select-type").select("タイプ1");
          cy.get("#fizz-buzz-app-table-button-save").click();
          cy.get("#fizz-buzz-app-select-type").select("タイプ2");
          cy.get("#fizz-buzz-app-table-button-save").click();
          cy.get("#fizz-buzz-app-select-type").select("タイプ3");
          cy.get("#fizz-buzz-app-table-button-save").click();

          cy.get("#tab-menu03").click();
          cy.get("#fizz-buzz-app-table-button-delete-all").click();
        });
      });
    });
  });
});
