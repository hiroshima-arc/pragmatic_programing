/* eslint-disable */
const classDiagram = (() => {
  const inputId = "class-diagram-input";
  const outputId = "class-im";
  const source = `
class Expression {
  times(multiplier)
  plus(addend)
  reduce(bank, to)
}
class Sum {
  augend: Expression
  addend: Expression
  times(multiplier): Expression
  reduce(to): Money
  plus(added): Expression
}
class Bank {
  rates: Map
  reduce(source, to): Money
  addRate(from, to, rate): void
  rate(from, to): int
}
class Pair {
  from: String
  to: String
  equlas(object): boolean
  hashCode(): int
  toString(): String
}
class Money {
  amount: int
  currency() :String
  times(multiplier) :Money
  plus(addend) :Expression
  equals(object) :boolean
  reduce(to) :Money
  {static} dollar(amount): Dollar
  {static} franc(amount): Franc
}
class ExChangeRate {
  from: String
  to: String
  rate: float
  id: int
}
class Report {
  title: String
  sum: int
  currenty: String
  items<ReportLineItem>: List
  total(): Sum
}
class ReportLineItem {
  stockName: String
  stockAmount: int
  price: Money
  sum: Money
}
class ExChangeRates {
  record: List<ExChangeRate>
}
class MoneyService {
  setupDb(): void
  createReportViewModel(data): RepositoryViewModel
  addExChangeRate(entity): ExChangeRates
  selectAllExChangeRate(): ExChangeRates
  updateExChangeRate(id):  ExChangeRates
  deleteExChangeRate(id): ExChangeRates
  deleteAllExChangeRate(): ExChangeRates
  saveReport(): void
  getReport(): ReportViewModle
  deleteReport(): void
}
class ReportService {
  repository: ReportRepository
  createReportViewModel(data): RepositoryViewModel
  saveReport(): void
  getReport(): ReportViewModle
  deleteReport(): void
}
class ExChangeRateService {
  repository: ExChangeRateRepository
  addExChangeRate(entity): ExChangeRates
  selectAllExChangeRate(): ExChangeRates
  updateExChangeRate(id):  ExChangeRates
  deleteExChangeRate(id): ExChangeRates
  deleteAllExChangeRate(): ExChangeRates
}
class MoneyDB {
  name: String
  {static}REPORT
  {static}EXCHANGE_RATS
  setup(): void
  connect(): void
}
class ReportRepository {
  table: String
  setup(): void
  connect(): void
  get(): ReporViewModel
  save(): void
  destroy(): void
}
class ExChangeRateRepository {
  table: String
  setup(): void
  connect(): void
  create(): ExChangeRate
  createBatch(): List<ExChangeRate>
  save(): ExChangeRate
  find(): ExChangeRate
  seletAll(): List<ExChangeRate>
  delete(): void
  destroy(): void
}
class MoneyView {
  REPORT: 1
  EXCHANGE: 2
  render(): String
}
class ReportView {
  render(): String
}
class ExChangeRateView {
  render(): String
}
class TabComponent {
  create(): String
}
class TableComponent {
  create(): String
}
class ButtonComponent {
  create(): String
}
class InputComponent {
  create(): String
}
class MessageView {
  WARNING: 1
  SUCCESS: 2
  DANGER: 3
  render() : String
}
Expression <|.. Money
Expression <|.. Sum
Money <- Sum
Sum <- Bank
Bank -> Pair
Bank <-- Report
Sum <-- Report
Money <-- ReportLineItem
ExChangeRates o- ExChangeRate
ReportService -o MoneyService 
MoneyService o- ExChangeRateService
ExChangeRates <-- ExChangeRateService
ExChangeRate <-- ExChangeRateRepository
ReportRepository -o ReportService
Report <- ReportRepository
ExChangeRateService o- ExChangeRateRepository
ReportRepository *-- MoneyDB 
ExChangeRateRepository *-- MoneyDB 
ReportLineItem -o Report
Report <-- ReportService
Bank <-- ReportService
MoneyService ---o MoneyView
MoneyView o-- ExChangeRateView
MoneyView o-- ReportView
MoneyView -> TabComponent
MessageView -o MoneyView
ReportView --> TableComponent
ReportView --> ButtonComponent 
ReportView --> InputComponent
ExChangeRateView --> TableComponent
ExChangeRateView --> ButtonComponent
ExChangeRateView --> InputComponent
ButtonComponent <|-- DefaultButtonComponent
ButtonComponent <|-- DefaultMiniButtonComponent
ButtonComponent <|-- DangerMiniButtonComponent
InputComponent <|--- FileInputComponent
InputComponent <|--- TextInputComponent
          `;
  compress(source, outputId);
})();

function encode64(data) {
  r = "";
  for (i = 0; i < data.length; i += 3) {
    if (i + 2 == data.length) {
      r += append3bytes(data.charCodeAt(i), data.charCodeAt(i + 1), 0);
    } else if (i + 1 == data.length) {
      r += append3bytes(data.charCodeAt(i), 0, 0);
    } else {
      r += append3bytes(
        data.charCodeAt(i),
        data.charCodeAt(i + 1),
        data.charCodeAt(i + 2)
      );
    }
  }
  return r;
}

function append3bytes(b1, b2, b3) {
  c1 = b1 >> 2;
  c2 = ((b1 & 0x3) << 4) | (b2 >> 4);
  c3 = ((b2 & 0xf) << 2) | (b3 >> 6);
  c4 = b3 & 0x3f;
  r = "";
  r += encode6bit(c1 & 0x3f);
  r += encode6bit(c2 & 0x3f);
  r += encode6bit(c3 & 0x3f);
  r += encode6bit(c4 & 0x3f);
  return r;
}

function encode6bit(b) {
  if (b < 10) {
    return String.fromCharCode(48 + b);
  }
  b -= 10;
  if (b < 26) {
    return String.fromCharCode(65 + b);
  }
  b -= 26;
  if (b < 26) {
    return String.fromCharCode(97 + b);
  }
  b -= 26;
  if (b == 0) {
    return "-";
  }
  if (b == 1) {
    return "_";
  }
  return "?";
}

var deflater = window.SharedWorker && new SharedWorker("rawdeflate.js");
if (deflater) {
  deflater.port.addEventListener("message", done_deflating, false);
  deflater.port.start();
} else if (window.Worker) {
  deflater = new Worker("rawdeflate.js");
  deflater.onmessage = done_deflating;
}

function done_deflating(e, id) {
  document.getElementById(id).src =
    "http://www.plantuml.com/plantuml/img/" + encode64(e.data);
}

function compress(s, id) {
  //UTF8
  s = unescape(encodeURIComponent(s));

  if (deflater) {
    if (deflater.port && deflater.port.postMessage) {
      deflater.port.postMessage(s);
    } else {
      deflater.postMessage(s);
    }
  } else {
    setTimeout(function() {
      done_deflating({ data: deflate(s) }, id);
    }, 100);
  }
}
