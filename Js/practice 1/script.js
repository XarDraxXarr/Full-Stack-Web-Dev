function displayOutput(message) {
    console.log(message);
    const display = document.getElementById('console-display');
    if (display) {
        display.textContent += message + '\n';
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('console-display');
    if (display) {
        display.textContent = '';
    }
    
    
    runJavaScriptExercises();
});

function runJavaScriptExercises() {
    displayOutput('=== JavaScript Practice Exercises ===\n');


    displayOutput('1. Variable Types:');
    let stringVar = "Hello World";
    let numberVar = 42;
    let booleanVar = true;
    let undefinedVar = undefined;
    let nullVar = null;

    displayOutput(`String: ${stringVar} (type: ${typeof stringVar})`);
    displayOutput(`Number: ${numberVar} (type: ${typeof numberVar})`);
    displayOutput(`Boolean: ${booleanVar} (type: ${typeof booleanVar})`);
    displayOutput(`Undefined: ${undefinedVar} (type: ${typeof undefinedVar})`);
    displayOutput(`Null: ${nullVar} (type: ${typeof nullVar})\n`);


    displayOutput('2. Even/Odd Check:');
    let testNumber = 15;
    if (testNumber % 2 === 0) {
        displayOutput(`${testNumber} is even`);
    } else {
        displayOutput(`${testNumber} is odd`);
    }

    testNumber = 20;
    if (testNumber % 2 === 0) {
        displayOutput(`${testNumber} is even\n`);
    } else {
        displayOutput(`${testNumber} is odd\n`);
    }

    
    displayOutput('3. Comparison Operators:');
    let num1 = 10;
    let num2 = 5;
    displayOutput(`${num1} > ${num2}: ${num1 > num2}`);
    displayOutput(`${num1} < ${num2}: ${num1 < num2}`);
    displayOutput(`${num1} === ${num2}: ${num1 === num2}`);
    displayOutput(`${num1} >= ${num1}: ${num1 >= num1}\n`);

    
    displayOutput('4. String Concatenation:');
    let str = "The number is: ";
    let num = 25;
    let result = str + num;
    displayOutput(`Result: "${result}"`);
    displayOutput(`Type of result: ${typeof result}\n`);

    displayOutput('5. For Loop (1 to 10):');
    let forResult = '';
    for (let i = 1; i <= 10; i++) {
        forResult += i + ' ';
    }
    displayOutput(forResult.trim());

    displayOutput('While Loop (1 to 10):');
    let whileResult = '';
    let j = 1;
    while (j <= 10) {
        whileResult += j + ' ';
        j++;
    }
    displayOutput(whileResult.trim() + '\n');

    
    displayOutput('6. Do-While Loop (5 to 1):');
    let doWhileResult = '';
    let k = 5;
    do {
        doWhileResult += k + ' ';
        k--;
    } while (k >= 1);
    displayOutput(doWhileResult.trim() + '\n');

    
    displayOutput('7. Array of Fruits:');
    let fruits = ['Apple', 'Banana', 'Orange', 'Mango', 'Grapes'];
    displayOutput('Original fruits array:');
    for (let i = 0; i < fruits.length; i++) {
        displayOutput(`${i + 1}. ${fruits[i]}`);
    }
    displayOutput('');

    
    displayOutput('8. Array Manipulation:');
    displayOutput('Adding "Strawberry" to end (push):');
    fruits.push('Strawberry');
    displayOutput(fruits.join(', '));

    displayOutput('Adding "Pineapple" to beginning (unshift):');
    fruits.unshift('Pineapple');
    displayOutput(fruits.join(', ') + '\n');

    
    displayOutput('9. Splice Method:');
    displayOutput('Before splice: ' + fruits.join(', '));
    
    fruits.splice(3, 2, 'Kiwi', 'Watermelon', 'Peach');
    displayOutput('After splice (removed 2 items from index 3, added Kiwi, Watermelon, Peach):');
    displayOutput(fruits.join(', ') + '\n');

    displayOutput('=== All JavaScript exercises completed! ===');
}


function handlePurchase() {
    alert('Thank you for your interest! This is a demo product card.');
    displayOutput('\n[User clicked Buy Now button]');
}


