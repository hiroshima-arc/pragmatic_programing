describe("FizzBuzz Page", () => {
  it("successfully loads", () => {
    cy.visit("http://localhost:8080"); // change URL to match your dev URL
    cy.get("h2").should("contain", "FizzBuzz");
  });

  describe("カウンター画面", () => {
    const counterAppId = "fizz-buzz-app-counter"

    beforeEach(() => {
      cy.get("#tab-menu01").click();
    });

    it("初期値が表示される", () => {
      cy.get(".display-1").should("contain", "FizzBuzz");
    });

    it("インクリメントすると値が変わる", () => {
      cy.get(`#${counterAppId}__increment`).click();
      cy.get(`#${counterAppId}__increment`).click();
      cy.get(`#${counterAppId}__increment`).click();
      cy.get(".display-1").should("contain", "Fizz");
    });

    it("デクリメントすると値が変わる", () => {
      cy.get(`#${counterAppId}__decrement`).click();
      cy.get(`#${counterAppId}__decrement`).click();
      cy.get(".display-1").should("contain", "1");
    });
  });

  describe("一覧編集画面", () => {
    beforeEach(() => {
      cy.get("#tab-menu02").click();
    });
    
    const createUpdateId = "fizz-buzz-app-create-update"
    const readDeletId = "fizz-buzz-app-read-delete"
    const select = (type) => {
            cy.get(`#${createUpdateId}__select--type`).select(type);
    }
    const save = (() => {
            cy.get(`#${createUpdateId}__table__button--save`).click();
    })

    describe("Create&Update", () => {
      describe("表示する", () => {
        describe("タイプ1を選択した場合", () => {
          it("通常パターンが表示される", () => {
            select("タイプ1");
            cy.get("tbody > :nth-child(1) > :nth-child(3)").should(
              "contain",
              "Fizz"
            );
          });
        });

        describe("タイプ2を選択した場合", () => {
          it("数字のみのパターンが表示される", () => {
            select("タイプ2");
            cy.get("tbody > :nth-child(1) > :nth-child(3)").should(
              "contain",
              "3"
            );
          });
        });

        describe("タイプ3を選択した場合", () => {
          it("FizzBuzzのみのパターンが表示される", () => {
            select("タイプ3");
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
          cy.get(`#${readDeletId}__button--delete-select`).click();
          cy.get("#tab-menu02").click();
        });

        describe("タイプ1を選択した場合", () => {
          it("通常パターンが保存される", () => {
            select("タイプ1");
            save();
            cy.get("#tab-menu03").click();
            cy.get(
              `#${readDeletId}__table > .table > tbody > :nth-child(1) > :nth-child(1)`
            ).should("contain", "1");
          });
        });

        describe("タイプ2を選択した場合", () => {
          it("数字のみのパターンが保存される", () => {
            select("タイプ2");
            save();
            cy.get("#tab-menu03").click();
            cy.get(
              `#${readDeletId}__table > .table > tbody > :nth-child(1) > :nth-child(3)`
            ).should("contain", "3");
          });
        });

        describe("タイプ3を選択した場合", () => {
          it("FizzBuzzのみのパターンが保存される", () => {
            select("タイプ3");
            save();
            cy.get("#tab-menu03").click();
            cy.get(
              `#${readDeletId}__table > .table > tbody > :nth-child(2) > :nth-child(5)`
            ).should("contain", "FizzBuzz");
          });
        });
      });

      describe("削除する", () => {
        it("保存した全てのレコードが削除される", () => {
          cy.get("#tab-menu02").click();
          select("タイプ1");
          save();
          select("タイプ2");
          save();
          select("タイプ3");
          save();

          cy.get("#tab-menu03").click();
          cy.get(`#${readDeletId}__button--delete-all`).click();
        });
      });
    });
  });
});
