var multiplier = function(x) {
  return function(y) {
    return x * y;
  };
};

var doubleIt = multiplier(2);
var tripleIt = multiplier(3);

console.log(doubleIt(5));   // 10
console.log(tripleIt(25));  // 75
