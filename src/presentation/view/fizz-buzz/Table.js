export default class Table {
  // eslint-disable-next-line no-useless-constructor
  constructor () {}

  create (aList) {
    const header = (() => {
      return [...Array(10).keys()].map(i => `<th>${i + 1}</th>`)
    })()

    const body = (() => {
      const result = []
      let row = 0
      let col = []
      aList.forEach((v, k) => {
        if ((k + 1) % 10 === 0) {
          col.push(`<td>${v}</td>`)
          result[row++] = col
          col = []
        } else {
          col.push(`<td>${v}</td>`)
        }
      })
      return result
    })()

    const row = n => body[n].join(' ')

    const result = `
            <table>
              <thead>
                ${header[0]}
                ${header[1]}
                ${header[2]}
                ${header[3]}
                ${header[4]}
                ${header[5]}
                ${header[6]}
                ${header[7]}
                ${header[8]}
                ${header[9]}
              </thead>
              <tbody>
                <tr>${row(0)}</tr>
                <tr>${row(1)}</tr>
                <tr>${row(2)}</tr>
                <tr>${row(3)}</tr>
                <tr>${row(4)}</tr>
                <tr>${row(5)}</tr>
                <tr>${row(6)}</tr>
                <tr>${row(7)}</tr>
                <tr>${row(8)}</tr>
                <tr>${row(9)}</tr>
              </tbody>
            </table>
        `
    return result
  }
}
