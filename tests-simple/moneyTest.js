import formatCurrency from "../scripts/utils/money.js";
//Basic test case...
console.log('Test suite : Format currency');
console.log('converts cents into dollors');
if(formatCurrency(2095) === '20.95'){
  console.log('Passed');
}
else{
  console.log('failed');
}

//Edge test cases....

console.log('Works with 0')
if(formatCurrency(0) === '0.00'){
  console.log('Passed');
}
else{
  console.log('Failed');
}

console.log('Rounds up to the nearest cent');
if(formatCurrency(2000.5) === '20.01'){
  console.log('Passed');
}
else{
  console.log('Failed');
}

