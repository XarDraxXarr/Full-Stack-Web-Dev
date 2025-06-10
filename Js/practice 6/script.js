// 1. Function to check whether a number is prime
function isPrime(num) {
  if (num < 2) return false
  if (num === 2) return true
  if (num % 2 === 0) return false

  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false
  }
  return true
}

function checkPrime() {
  const input = document.getElementById("primeInput")
  const result = document.getElementById("primeResult")
  const num = Number.parseInt(input.value)

  if (isNaN(num)) {
    result.textContent = "Please enter a valid number"
    result.className = "result error"
    return
  }

  const prime = isPrime(num)
  result.textContent = `${num} is ${prime ? "a prime" : "not a prime"} number`
  result.className = `result ${prime ? "success" : "info"}`
}

// 2. Function to find the factorial of a number
function factorial(num) {
  if (num < 0) return null
  if (num === 0 || num === 1) return 1

  let result = 1
  for (let i = 2; i <= num; i++) {
    result *= i
  }
  return result
}

function calculateFactorial() {
  const input = document.getElementById("factorialInput")
  const result = document.getElementById("factorialResult")
  const num = Number.parseInt(input.value)

  if (isNaN(num) || num < 0) {
    result.textContent = "Please enter a valid non-negative number"
    result.className = "result error"
    return
  }

  if (num > 20) {
    result.textContent = "Number too large (please enter a number ≤ 20)"
    result.className = "result warning"
    return
  }

  const fact = factorial(num)
  result.textContent = `${num}! = ${fact}`
  result.className = "result success"
}

// 3. Function to check whether a number is even or odd
function isEven(num) {
  return num % 2 === 0
}

function checkEvenOdd() {
  const input = document.getElementById("evenOddInput")
  const result = document.getElementById("evenOddResult")
  const num = Number.parseInt(input.value)

  if (isNaN(num)) {
    result.textContent = "Please enter a valid number"
    result.className = "result error"
    return
  }

  const even = isEven(num)
  result.textContent = `${num} is ${even ? "even" : "odd"}`
  result.className = `result ${even ? "success" : "info"}`
}

// 4. Function to count the number of vowels in a string
function countVowelsInString(str) {
  const vowels = "aeiouAEIOU"
  let count = 0

  for (const char of str) {
    if (vowels.includes(char)) {
      count++
    }
  }
  return count
}

function countVowels() {
  const input = document.getElementById("vowelInput")
  const result = document.getElementById("vowelResult")
  const str = input.value

  if (!str.trim()) {
    result.textContent = "Please enter a string"
    result.className = "result error"
    return
  }

  const count = countVowelsInString(str)
  result.textContent = `"${str}" contains ${count} vowel${count !== 1 ? "s" : ""}`
  result.className = "result info"
}

// 5. Function to check whether a string is a palindrome
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "")
  return cleaned === cleaned.split("").reverse().join("")
}

function checkPalindrome() {
  const input = document.getElementById("palindromeInput")
  const result = document.getElementById("palindromeResult")
  const str = input.value

  if (!str.trim()) {
    result.textContent = "Please enter a string"
    result.className = "result error"
    return
  }

  const palindrome = isPalindrome(str)
  result.textContent = `"${str}" is ${palindrome ? "a palindrome" : "not a palindrome"}`
  result.className = `result ${palindrome ? "success" : "info"}`
}

// 6. Function to reverse a given string
function reverseStr(str) {
  return str.split("").reverse().join("")
}

function reverseString() {
  const input = document.getElementById("reverseInput")
  const result = document.getElementById("reverseResult")
  const str = input.value

  if (!str.trim()) {
    result.textContent = "Please enter a string"
    result.className = "result error"
    return
  }

  const reversed = reverseStr(str)
  result.textContent = `Original: "${str}" → Reversed: "${reversed}"`
  result.className = "result success"
}

// 7. Function to check whether a given year is a leap year
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

function checkLeapYear() {
  const input = document.getElementById("leapYearInput")
  const result = document.getElementById("leapYearResult")
  const year = Number.parseInt(input.value)

  if (isNaN(year) || year < 1) {
    result.textContent = "Please enter a valid year"
    result.className = "result error"
    return
  }

  const leap = isLeapYear(year)
  result.textContent = `${year} is ${leap ? "a leap year" : "not a leap year"}`
  result.className = `result ${leap ? "success" : "info"}`
}

// 8. Function that returns the Fibonacci sequence up to n terms
function fibonacciSequence(n) {
  if (n <= 0) return []
  if (n === 1) return [0]
  if (n === 2) return [0, 1]

  const sequence = [0, 1]
  for (let i = 2; i < n; i++) {
    sequence[i] = sequence[i - 1] + sequence[i - 2]
  }
  return sequence
}

function generateFibonacci() {
  const input = document.getElementById("fibonacciInput")
  const result = document.getElementById("fibonacciResult")
  const n = Number.parseInt(input.value)

  if (isNaN(n) || n < 1) {
    result.textContent = "Please enter a valid positive number"
    result.className = "result error"
    return
  }

  if (n > 50) {
    result.textContent = "Number too large (please enter a number ≤ 50)"
    result.className = "result warning"
    return
  }

  const sequence = fibonacciSequence(n)
  result.textContent = `First ${n} Fibonacci numbers: ${sequence.join(", ")}`
  result.className = "result success"
}

// 9. Function to swap two variables without using a third variable
function swapWithoutThird(a, b) {
  // Using arithmetic operations
  a = a + b
  b = a - b
  a = a - b
  return { a, b }
}

function swapVariables() {
  const input1 = document.getElementById("swapInput1")
  const input2 = document.getElementById("swapInput2")
  const result = document.getElementById("swapResult")

  const num1 = Number.parseFloat(input1.value)
  const num2 = Number.parseFloat(input2.value)

  if (isNaN(num1) || isNaN(num2)) {
    result.textContent = "Please enter valid numbers for both variables"
    result.className = "result error"
    return
  }

  const swapped = swapWithoutThird(num1, num2)
  result.textContent = `Before: a = ${num1}, b = ${num2} → After: a = ${swapped.a}, b = ${swapped.b}`
  result.className = "result success"
}

// Add event listeners for Enter key press
document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll("input")
  inputs.forEach((input) => {
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        const button = this.parentElement.querySelector("button")
        if (button) button.click()
      }
    })
  })
})
