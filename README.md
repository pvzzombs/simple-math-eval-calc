# simple-math-eval-calc
A simple, small, and alternative code to replace javascript native ``eval()`` function.

### What It Can Do ?
It can accept mathematical expression (numerical expressions) based on a string only.

### What Operations It Accept? 
It accepts currently: 
<ul>
  <li> Addition </li>
  <li> Subtraction </li>
  <li> Multiplication </li>
  <li> Division </li>
  <li> Exponentation </li>
</ul>

### Usage  
1. Download the release files and include it in your ``HTML`` file.  
2. Include ``src/calc.js`` by adding it as a script.  
3. Use it!  

### Examples of use: 
```javascript
Eval(" 1 + 1"); //returns 2
Eval("10 - 5"); //returns 5
Eval("6 * 2"); //returns 12
Eval("14 / 7"); //returns 2
Eval("2 ^ 2"); //returns 4
```

### How does it work?  
The ``Eval()`` function accepts a ``string``   
* It is then parsed by the parser, 
* then it will be arrange by the transformer, 
* and lastly it will be generated, 
* and the expression is evaluated.  
* It returns the output as a ``string``.
  
### What type of algorithm or notation does it use?  
This ``function`` uses the [**Shunting Yard Algorithm**](https://en.m.wikipedia.org/wiki/Shunting-yard_algorithm) and [**Reverse Polish Notation**](https://en.m.wikipedia.org/wiki/Reverse_Polish_notation). 
  
##### THIS IS THE MIT LICENSED VERSION OF SIMLPLE-MATH-EVAL-CALC
