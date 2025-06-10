function displayOutput(elementId, content) {
            document.getElementById(elementId).textContent = content;
        }

        
        function exercise1() {
            const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
            let output = 'Colors using for-of loop:\n';
            
            for (const color of colors) {
                output += `- ${color}\n`;
            }
            
            displayOutput('output1', output);
        }

        
        function exercise2() {
            const person = {name: "Alice", age: 25, city: "New York", profession: "Developer"};
            let output = 'Object properties using for-in loop:\n';
            
            for (const key in person) {
                output += `${key}: ${person[key]}\n`;
            }
            
            displayOutput('output2', output);
        }

    
        function exercise3() {
            const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            let output = 'Squares using forEach():\n';
            
            numbers.forEach(function(number) {
                output += `${number}² = ${number * number}\n`;
            });
            
            displayOutput('output3', output);
        }

        
        function exercise4() {
            const marks = [45, 23, 67, 89, 12, 56, 78, 34, 90, 25];
            let output = 'Marks evaluation using forEach():\n';
            
            marks.forEach(function(mark) {
                const result = mark >= 35 ? 'Pass' : 'Fail';
                output += `Mark: ${mark} - ${result}\n`;
            });
            
            displayOutput('output4', output);
        }

        
        function exercise5() {
            const str = "JavaScript";
            let output = 'String methods on "JavaScript":\n';
            output += `Length: ${str.length}\n`;
            output += `toUpperCase(): ${str.toUpperCase()}\n`;
            output += `toLowerCase(): ${str.toLowerCase()}\n`;
            
            displayOutput('output5', output);
        }

        
        function exercise6() {
            const str = "JavaScript";
            const extracted = str.slice(4); 
            let output = 'Using slice() method:\n';
            output += `Original string: "${str}"\n`;
            output += `str.slice(4): "${extracted}"\n`;
            
            displayOutput('output6', output);
        }

        
        function exercise7() {
            const originalStr = "I like apples";
            const newStr = originalStr.replace("apples", "mangoes");
            let output = 'Using replace() method:\n';
            output += `Original: "${originalStr}"\n`;
            output += `After replace: "${newStr}"\n`;
            
            displayOutput('output7', output);
        }

        
        function exercise8() {
            const str = "apple,banana,grapes";
            const fruitsArray = str.split(",");
            let output = 'Using split() method:\n';
            output += `Original string: "${str}"\n`;
            output += `After split(","):\n`;
            fruitsArray.forEach((fruit, index) => {
                output += `[${index}]: "${fruit}"\n`;
            });
            
            displayOutput('output8', output);
        }

        
        function greet() {
            return "Hello, World!";
        }

        function exercise9() {
            let output = 'Normal function called greet():\n';
            output += greet();
            
            displayOutput('output9', output);
        }

        
        const square = (number) => number * number;

        function exercise10() {
            let output = 'Arrow function for square:\n';
            const testNumbers = [3, 5, 7, 9];
            testNumbers.forEach(num => {
                output += `square(${num}) = ${square(num)}\n`;
            });
            
            displayOutput('output10', output);
        }

        
        const anonymousFunc = function() {
            return "I am anonymous";
        };

        function exercise11() {
            let output = 'Anonymous function assigned to variable:\n';
            output += anonymousFunc();
            
            displayOutput('output11', output);
        }

        
        function greetPerson(name) {
            return `Hello, ${name}`;
        }

        
        const greetPersonArrow = (name) => `Hello, ${name}`;

        function exercise12() {
            const testNames = ["Dani", "Aritro", "TJ"];
            let output = 'Functions with parameters:\n\n';
            
            output += 'Normal function results:\n';
            testNames.forEach(name => {
                output += `greetPerson("${name}") = "${greetPerson(name)}"\n`;
            });
            
            output += '\nArrow function results:\n';
            testNames.forEach(name => {
                output += `greetPersonArrow("${name}") = "${greetPersonArrow(name)}"\n`;
            });
            
            displayOutput('output12', output);
        }

        
        function runAllExercises() {
            exercise1();
            exercise2();
            exercise3();
            exercise4();
            exercise5();
            exercise6();
            exercise7();
            exercise8();
            exercise9();
            exercise10();
            exercise11();
            exercise12();
        }

        
        function clearOutput() {
            for (let i = 1; i <= 12; i++) {
                document.getElementById(`output${i}`).textContent = '';
            }
        }

        
        window.onload = function() {
            runAllExercises();
        };