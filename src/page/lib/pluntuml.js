/* eslint-disable */
const usecaseDiagram = (() => {
  const inputId = "usecase-diagram-input";
  const outputId = "usecase-im";
  const source = `
left to right direction
skinparam packageStyle rectangle
actor customer
rectangle VedioRental {
  customer -- (Rental)
              (Calculate rental fee)
              (Print a statement)
}
          `;
  compress(source, outputId);
})();

const classDiagram = (() => {
  const inputId = "class-diagram-input";
  const outputId = "class-im";
  const source = `
class Movie {
  {static} CHILDRENS
  {static} REGULAR
  {static} NEW_RELEASE
  title:string
  priceCode:int
}
class Rental {
  daysRented:int
}
class Customer {
  statement()
}
Movie "1"<-"*" Rental
Rental "*"<-"1" Customer
          `;
  compress(source, outputId);
})();

const sequencDiagram = (() => {
  const inputId = "sequence-diagram-input";
  const outputId = "sequence-im";
  const source = `
-> aCustomer: statement
   activate aCustomer
       aCustomer -> aCustomer :*[for all rental]
       activate aCustomer
           aCustomer -> aRental :getMovie
           aCustomer -> aMovie :getPriceCode
           aCustomer -> aRental :getDaysRented
       deactivate aCustomer
   deactivate aCustomer
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
