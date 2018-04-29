/*
	Math - Calc
	* by Miles
	* v 1.0.0
	* Do not remove comment
=====================================================

	Usage :
	* Eval(<type:string>) : takes input as string and 
	* solves it and outputs also as string.
	
	* Example :
	* Eval("1+1") //"2"
	
	**NOTE**
	* This can only accept + - * and / operators
	* Will be updated for future use.
*/
(function () {
  function main(str) {
    str = str.replace(/(\t|\s)/g, "");
    var num = [];
    var ops = [];
    var temp = "";
    for (var i = 0; i < str.length; i++) {
      if (isDigit(str.charAt(i))) {
        temp += str.charAt(i);
        if (i == str.length - 1) {
          num.push(parseFloat(temp));
        }
      } else {
        if (temp == "") {
          if (isOperator(str.charAt(i)) && str.charAt(i) == "-") {
            temp += "-";
          } else {
            throw "Error : multiple character " + str.charAt(i) + "";
          }
        } else {
          if (isOperator(str.charAt(i))) {
            num.push(parseFloat(temp));
            temp = "";
            ops.push(str.charAt(i));
          } else {
            throw "Error : " + str.charAt(i) + " is not a valid Operator";
          }
        }
      }
    }
    if (num.length != ops.length + 1) {
      throw "operation cancelled at line :" + " 39 ";
    }
    testBoth(num, ops);
    while (ops.length) {
      var x = firstOperator(ops);
      switch (ops[x]) {
      case "+":
        {
          num[x] = parseFloat(num[x] + num[x + 1]);
          num.splice(x + 1, 1);
          ops.splice(x, 1);
          break;
        }
      case "-":
        {
          num[x] = parseFloat(num[x] - num[x + 1]);
          num.splice(x + 1, 1);
          ops.splice(x, 1);
          break;
        }
      case "*":
        {
          num[x] = parseFloat(num[x] * num[x + 1]);
          num.splice(x + 1, 1);
          ops.splice(x, 1);
          break;
        }
      case "/":
        {
          num[x] = parseFloat(num[x] / num[x + 1]);
          num.splice(x + 1, 1);
          ops.splice(x, 1);
          break;
        }
      }
    }
    return num[0] + "";
  }

  function test(_string, _array) {
    for (var i = 0; i < _array.length; i++) {
      if (_string === _array[i]) {
        return true;
      }
    }
    return false;
  }

  function testBoth(left, right) {
    for (var i = 0; i < left.length; i++) {
      if (isNaN(left[i]) || !isFinite(left[i])) {
        throw "error : invalid Number"
      }
    }
    for (var i = 0; i < right.length; i++) {
      if (!isOperator(right[i])) {
        throw "error at right side : part " + i + " at Operator side : " + right[i];
      }
    }
    return true;
  }

  function isDigit(_string) {
    return test(_string, ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]);
  }

  function isOperator(_string) {
    return test(_string, ["+", "-", "*", "/"]);
  }

  function indexOf(_string, _array) {
    var i;
    for (i = 0; i < _array.length; i++) {
      if (_string === _array[i]) {
        return i;
      }
    }
    return -1;
  }

  function firstOperator(_array) {
    var mu = indexOf("*", _array);
    var di = indexOf("/", _array);
    var ad = indexOf("+", _array);
    var su = indexOf("-", _array);

    var stumpA;
    var stumpB;
    if (-1 < mu && -1 < di && mu < di) {
      stumpA = mu
    } else if (-1 < mu && -1 < di && di < mu) {
      stumpA = di
    } else if (mu > -1) {
      stumpA = mu;
    } else {
      stumpA = di;
    }



    if (-1 < ad && -1 < su && ad < su) {
      stumpB = ad;
    } else if (-1 < ad && -1 < su && su < ad) {
      stumpB = su
    } else if (ad > -1) {
      stumpB = ad;
    } else {
      stumpB = su;
    }
    //now
    if (-1 < stumpA) {
      return stumpA;
    } else if (-1 < stumpB) {
      return stumpB;
    }

  }


  if (typeof define === "function" && define.amd) {
    define([], function () {
      return main;
    })
  } else if (typeof window !== "undefined") {
    window.Eval = main;
  } else if (typeof scope !== "undefined") {
    scope.Eval = main;
  } else {
    this.Eval = main;
  }
})()
