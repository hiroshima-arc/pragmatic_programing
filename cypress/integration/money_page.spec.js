/* eslint-disable no-undef */
describe('The Money Example', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:8080') // change URL to match your dev URL
  })

  describe('レポート', () => {
    it('CSVファイルをアップロードする', () => {
      const fileName = 'report.csv'

      cy.fixture(fileName).then(fileContent => {
        cy.get('#app-money-upload').upload({ fileContent, fileName, mimeType: 'text/csv' })
      })
    })

    it('レポートが表示される', () => {
      cy.get('#report-table > tbody > :nth-child(1) > :nth-child(1)').should('contain', 'IBM')
    })

    it('CSVファイルをダウンロードする', () => {
      cy.get('#app-money-download').should('contain', 'CSVダウンロード')
    })
  })

  describe('為替レート', () => {
    it('為替レートを追加する', () => {
      cy.get('#tab-menu02').click()
      cy.wait(1000)
      cy.get('#button-add').click()
      cy.wait(1000)
      cy.get('#exchange-rate-table > tbody > tr > :nth-child(4)').should('contain', 1.5)
    })

    it('為替レートを更新する', () => {
      cy.get('#button-edit-0').click()
      cy.get('tr > :nth-child(2) > input').clear()
      cy.get('tr > :nth-child(2) > input').type('USD')
      cy.get('tr > :nth-child(3) > input').clear()
      cy.get('tr > :nth-child(3) > input').type('CHF')
      cy.get('tr > :nth-child(4) > input').clear()
      cy.get('tr > :nth-child(4) > input').type(3)
      cy.get('#button-save-0').click()
      cy.get('#exchange-rate-table > tbody > :nth-child(1) > :nth-child(2)').should('contain', 'USD')
      cy.get('#exchange-rate-table > tbody > :nth-child(1) > :nth-child(3)').should('contain', 'CHF')
      cy.get('#exchange-rate-table > tbody > :nth-child(1) > :nth-child(4)').should('contain', 3)
    })

    it('為替レートを削除する', () => {
      cy.get('#button-delete-0').click()
      cy.wait(1000)
      cy.get('#exchange-rate-table > tbody > tr > :nth-child(4)').should('not.contain', '3')
    })

    it('為替レートを全て削除する', () => {
      cy.get('#button-delete').click()
    })
  })
})
