/* eslint-disable */
const spec = document.getElementById('spec')
if (spec) {
  // eslint-disable-next-line no-undef
  spec.innerHTML = marked(
    `
## 仕様

通貨の異なる２つの金額を足し、通貨間の為替レートに基づいて換算された金額を得る。

金額（通貨単位あたりの額）に数値（通貨単位数）を掛け、金額を得る。

## 入力CSVファイル仕様

|銘柄   |株数 |価格  |通貨 |
|:---  |:--- |:--- |:--- |
| string  |  int  | int | string |

## 出力CSVファイル仕様

|銘柄   |株数 |価格  |合計 |
|:---  |:--- |:--- |:--- |
| string  |  int  | int | int |

## ToDoリスト
`
  )
}
