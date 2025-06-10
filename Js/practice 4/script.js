function getUniqueValues(arr) {
    return [...new Set(arr)];
}

const array1 = [1, 2, 2, 3, 4, 4, 5];
document.getElementById('result1').textContent = `Original array: [${array1}] → Unique values: [${getUniqueValues(array1)}]`;


function getNamesOfAdults(people) {
    return people.filter(person => person.age > 18).map(person => person.name);
}

const people = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 17 },
    { name: "Charlie", age: 30 },
    { name: "David", age: 16 }
];
document.getElementById('result2').textContent = `People: ${JSON.stringify(people)} → Adults: [${getNamesOfAdults(people)}]`;


function capitalizeWords(sentence) {
    return sentence
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

const sentence = "hello world, how are you?";
document.getElementById('result3').textContent = `Original: "${sentence}" → Capitalized: "${capitalizeWords(sentence)}"`;


document.getElementById('changeColorBtn').addEventListener('click', function() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.backgroundColor = '#feeb3e';
    });
});


function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    
    if (num % 2 === 0 || num % 3 === 0) return false;
    
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    
    return true;
}

const primeResults = [
    { number: 7, result: isPrime(7) },
    { number: 10, result: isPrime(10) },
    { number: 13, result: isPrime(13) },
    { number: 25, result: isPrime(25) }
];

document.getElementById('result5').innerHTML = primeResults
    .map(item => `isPrime(${item.number}) = ${item.result}`)
    .join('<br>');


function multiply(a, b) {
    return a * b;
}

const multiplyArrow = (a, b) => a * b;

document.getElementById('result6').innerHTML = 
    `Original: multiply(5, 3) = ${multiply(5, 3)}<br>` +
    `Arrow: multiplyArrow(5, 3) = ${multiplyArrow(5, 3)}`;


function countVowels(str) {
    const vowels = str.match(/[aeiou]/gi);
    return vowels ? vowels.length : 0;
}

const testString = "Hello, how are you today?";
document.getElementById('result7').textContent = `String: "${testString}" → Vowel count: ${countVowels(testString)}`;

function uppercaseStrings(arr) {
    const result = [];
    for (const str of arr) {
        result.push(str.toUpperCase());
    }
    return result;
}

const fruits = ["apple", "banana", "cherry", "date"];
document.getElementById('result8').innerHTML = 
    `Original array: [${fruits}]<br>` +
    `Uppercase: [${uppercaseStrings(fruits)}]`;

function factorial(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

const factorialResults = [
    { number: 4, result: factorial(4) },
    { number: 5, result: factorial(5) },
    { number: 6, result: factorial(6) }
];

document.getElementById('result9').innerHTML = factorialResults
    .map(item => `factorial(${item.number}) = ${item.result}`)
    .join('<br>');

function filterEvenNumbers(arr) {
    return arr.filter(num => num % 2 === 0);
}

const numbers = [1, 2, 3, 4, 5, 6];
document.getElementById('result10').textContent = `Original array: [${numbers}] → Even numbers: [${filterEvenNumbers(numbers)}]`;

function removeSpaces(str) {
    return str.replace(/\s/g, '');
}

const spacedString = "This is a test string with spaces";
document.getElementById('result11').textContent = `Original: "${spacedString}" → No spaces: "${removeSpaces(spacedString)}"`;