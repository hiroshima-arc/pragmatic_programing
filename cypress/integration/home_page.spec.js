/* eslint-disable no-undef */
describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.wait(1000)
    cy.visit('http://localhost:8080') // change URL to match your dev URL
  })

  it('お知らせが表示される', () => {
    cy.get('#function-name').should('contain', 'お知らせ')
  })

  describe('ナビゲーション', () => {
    it('このサイトについてが表示される', () => {
      cy.get('#about-app-menu').click()
      cy.get('#function-name').should('contain', 'このサイトについて')
    })

    it('コンテンツメニューが表示される', () => {
      cy.get('#navbarDropdown').click()
      cy.get('#fizz-buzz-app-menu').should('contain', 'FizzBuzz')
    })

    it('お知らせが表示される', () => {
      cy.get('#notice-app-menu').click()
      cy.get('#function-name').should('contain', 'お知らせ')
    })
  })

  describe('フッター', () => {
    it('このサイトについてが表示される', () => {
      cy.get('#footer-about').click()
      cy.get('#function-name').should('contain', 'このサイトについて')
    })

    it('お知らせが表示される', () => {
      cy.get('#footer-top').click()
      cy.get('#function-name').should('contain', 'お知らせ')
    })
  })
})
