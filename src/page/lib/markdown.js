/* eslint-disable */
const spec = document.getElementById('spec')
if (spec) {
  // eslint-disable-next-line no-undef
  spec.innerHTML = marked(
    `
## 仕様

#### 顧客が借りたビデオのレンタル料金を計算して計算書を印刷する。

+ ビデオレンタルの料金を計算して計算書を印刷するプログラム
+ システムにはどの映画を何日間借りるかが入力される。
+ 貸出の日数によって料金が計算され、映画の分類が判定される。
+ 映画の分類は３つある。一般向け、子供向け、新作。
+ レンタルポイントも印刷される。新作かどうかによってポイント計算の仕方が異なる。

##### 料金表

|      |  一般向け | 子供向け | 新作 |
| ---- | ----     |----    |---- |
|1日    | 200     |150     |300  |
|2日    | 200     |150     |600  |
|3日    | 350     |150     |900  |
|4日    | 500     |300     |1200 |
|5日    | 650     |450     |1500 |

+ 一般向けは3日以降は借りる日数x150が200に加算される
+ 子供向けは4日以降は借りる日数x150が150に加算される
+ 新作は借りる日数x300
+ 新作を2日以上借りた場合はボーナスポイント

## ToDoリスト
- [x] 一般向けを1日借りる
- [x] 一般向けを3日借りる
- [x] 一般向けを4日借りる
- [x] 子供向けを1日借りる
- [x] 子供向けを3日借りる
- [x] 子供向けを4日借りる
- [x] 子供向けを5日借りる
- [x] 新作を1日借りる
- [x] 新作を5日借りる
- [x] 一般向けと子供向けと新作を1日借りる
- [x] 一般向けと子供向けと新作を5日借りる

#### 計算書をHTMLで出力してWebブラウザで参照したい

## ToDoリスト
- [x] statementメソッドの分割、再配置
- [x] 料金計算の条件式をポリモーフィズムに置き換える
- [x] Template Methodの形成
`
  )
}
