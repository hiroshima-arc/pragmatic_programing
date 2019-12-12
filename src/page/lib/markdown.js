/* eslint-disable */
const spec = document.getElementById('spec')
if (spec) {
  // eslint-disable-next-line no-undef
  spec.innerHTML = marked(
    `
## 仕様

顧客が借りたビデオのレンタル料金を計算して計算書を印刷する。

+ ビデオレンタルの料金を計算して計算書を印刷するプログラム
+ システムにはどの映画を何日間借りるかが入力される。
+ 貸出の日数によって料金が計算され、映画の分類が判定される。
+ 映画の分類は３つある。一般向け、子供向け、新作。
+ レンタルポイントも印刷される。新作かどうかによってポイント計算の仕方が異なる。

## ToDoリスト
`
  )
}
