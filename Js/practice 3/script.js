document.addEventListener('DOMContentLoaded', function() {
    
    const person = {
        name: 'TJ BOSS',
        age: 20,
        city: 'MUMBAI',
        profession: 'Kidnapping',
        hobby: 'Gaming'
    };
    
    let objectProperties = '<strong>Object Properties:</strong><br>';
    for (let property in person) {
        objectProperties += `${property}: ${person[property]}<br>`;
    }
    document.getElementById('object-properties').innerHTML = objectProperties;
    

    const numbers = [1, 2, 3, 4, 5];
    const squaredNumbers = numbers.map(num => num * num);
    document.getElementById('squared-numbers').innerHTML = 
        `<strong>Squared Numbers:</strong><br>Original: [${numbers.join(', ')}]<br>Squared: [${squaredNumbers.join(', ')}]`;
    
    const mixedNumbers = [3, 12, 8, 25, 7];
    const filteredNumbers = mixedNumbers.filter(num => num > 10);
    document.getElementById('filtered-numbers').innerHTML = 
        `<strong>Filtered Numbers (> 10):</strong><br>Original: [${mixedNumbers.join(', ')}]<br>Filtered: [${filteredNumbers.join(', ')}]`;
    
    const numbersToSum = [10, 20, 30, 40, 50];
    const sum = numbersToSum.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    document.getElementById('sum-result').innerHTML = 
        `<strong>Sum using Reduce:</strong><br>Numbers: [${numbersToSum.join(', ')}]<br>Sum: ${sum}`;
    
    
    const multiply = (a, b) => a * b;
   
    const result1 = multiply(6, 7);
    const result2 = multiply(12, 3);
    const result3 = multiply(8, 9);
    
    document.getElementById('multiplication-result').innerHTML = 
        `<strong>Arrow Function Multiplication:</strong><br>6 × 7 = ${result1}<br>12 × 3 = ${result2}<br>8 × 9 = ${result3}`;
    
    
    console.log('🎉 All JavaScript examples executed successfully!');
    console.log('Object properties:', person);
    console.log('Squared numbers:', squaredNumbers);
    console.log('Filtered numbers:', filteredNumbers);
    console.log('Sum result:', sum);
    console.log('Multiplication function test:', multiply(5, 4));
});


function demonstrateArrayMethods() {
    const fruits = ['apple', 'banana', 'orange', 'grape'];
    
    console.log('--- Array Methods Demo ---');
    console.log('Original array:', fruits);
    console.log('Length:', fruits.length);
    console.log('First item:', fruits[0]);
    console.log('Last item:', fruits[fruits.length - 1]);
    

    console.log('Using forEach:');
    fruits.forEach((fruit, index) => {
        console.log(`${index + 1}. ${fruit}`);
    });
}

function demonstrateObjectMethods() {
    const student = {
        name: 'Alice',
        grade: 'A',
        subjects: ['Math', 'Science', 'English']
    };
    
    console.log('--- Object Methods Demo ---');
    console.log('Student object:', student);
    console.log('Object keys:', Object.keys(student));
    console.log('Object values:', Object.values(student));
    console.log('Object entries:', Object.entries(student));
}

demonstrateArrayMethods();
demonstrateObjectMethods();