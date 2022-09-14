var chars = {
  "+": {
    type: "Operator",
    value: "+",
    asso: "left",
    prec: 2
  },
  "-": {
    type: "Operator",
    value: "-",
    asso: "left",
    prec: 2
  },
  "*": {
    type: "Operator",
    value: "*",
    asso: "left",
    prec: 3
  },
  "/": {
    type: "Operator",
    value: "/",
    asso: "left",
    prec: 3
  },
  "^": {
    type: "Operator",
    value: "^",
    asso: "right",
    prec: 4
  },
  "number": function (n) {
    if (!isNaN(n) && isFinite(n)) {
      return {
        type: "Literal",
        value: n + ''
      }
    }
  },
  "(": {
    type: "Left Parenthesis",
    value: "("
  },
  ")": {
    type: "Right Parenthesis",
    value: ")"
  }
};

function tokenize(str) {
  str = str.replace(/(\t|\s)/g, "");
  var out = [];
  var temp = "";
  for (var i = 0; i < str.length; i++) {
    if (isDigit(str.charAt(i))) {
      temp += str.charAt(i);
      if (!isDigit(str.charAt(i + 1))) {
        out.push(chars["number"](temp));
        temp = "";
      }
    } else if (isOperator(str.charAt(i))) {
      if (str.charAt(i) == "-" && (str.charAt(i - 1) == "" || isOperator(str.charAt(i - 1)) || str.charAt(i - 1) == "(") && isDigit(str.charAt(i + 1))) {
        temp += "-";
      } else {
        out.push(chars[str.charAt(i)]);
      }
    } else if (isPars(str.charAt(i))) {
      if (str.charAt(i) == "(") {
        if (isDigit(str.charAt(i - 1)) || str.charAt(i - 1) == ")") {
          out.push(chars["*"]);
        }
        out.push(chars["("]);
      } else {
        out.push(chars[")"]);
      }
    }
  }

  function test(_string, _array) {
    for (var i = 0; i < _array.length; i++) {
      if (_string === _array[i]) {
        return true;
      }
    }
    return false;
  }

  function isDigit(_string) {
    return test(_string, ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]);
  }

  function isOperator(_string) {
    return test(_string, ["+", "-", "*", "/", "^"]);
  }

  function isPars(s) {
    return test(s, ["(", ")"])
  }
  return out
}

function c(token) {
  var output = [];
  var stack = []
  for (var i = 0; i < token.length; i++) {
    var x = token[i];
    var last = stack.length ? stack[stack.length - 1] : false;

    if (x.type == "Literal") {
      output.push(x);
    } else if (x.type == "Operator") {
      while (last && last.value != "(" && (x.prec < last.prec || x.asso == "left" && x.prec == last.prec)) {
        output.push(stack.pop());
        last = stack.length ? stack[stack.length - 1] : false;
      }
      stack.push(x);
    } else if (x.type == "Left Parenthesis") {
      stack.push(x)
    } else if (x.type == "Right Parenthesis") {
      while (last && last.value != "(") {
        output.push(stack.pop());
        last = stack.length ? stack[stack.length - 1] : false;
      }
      stack.pop();
    }
  }
  return output.concat(stack.reverse())
}

function t(a) {
  var x = [];
  for (var i = 0; i < a.length; i++) {
    if (a[i].type == "Literal") {
      x.push(parseFloat(a[i].value));
    } else if (a[i].type == "Operator") {
      switch (a[i].value) {
      case "+":
        {
          x[x.length - 2] = parseFloat(((x[x.length - 2]*10000) + (x[x.length - 1]*10000)) / 10000);
          x.pop();
          break;
        }
      case "-":
        {
          x[x.length - 2] = parseFloat(((x[x.length - 2]*10000) - (x[x.length - 1]*10000)) / 10000);
          x.pop();
          break;
        }
      case "*":
        {
          x[x.length - 2] = parseFloat(x[x.length - 2] * x[x.length - 1]);
          x.pop();
          break;
        }
      case "/":
        {
          x[x.length - 2] = parseFloat(x[x.length - 2] / x[x.length - 1]);
          x.pop();
          break;
        }
      case "^":
        {
          x[x.length - 2] = parseFloat(Math.pow(x[x.length - 2], x[x.length - 1]));
          x.pop();
          break;
        }
      }
    }
  }
  return x.length ? x[0] : 0;
}

function Eval(n) {
  var x = tokenize(n);
  var y = c(x);
  var z = t(y);
  return z.toString();
}

/*
  @license
  ========================================================================
  
	LICENSED UNDER MIT
	------------------
	
	See https://github.com/pvzzombs/simple-math-eval-calc/blob/master/LICENSE for the license
	This is a MIT - licensed version of Sinple Math Eval Calc.
	If you want to see the APACHE - licensed version, go to :
		https://bit.ly/2whs9fi
	
	Thank You.
  
  ========================================================================
  
*/
