
document.addEventListener('DOMContentLoaded', function() {
    
    initializeThemeToggle();
    initializeFormHandling();
    initializeColorChangeButton();
    initializeHighlightToggle();
    initializeInputDisplay();
    initializeHoverLogger();
    initializeCardButtons();
});


function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    //! Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    //! Apply saved theme
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeToggle.checked = true;
    }
    
    //! Theme toggle event listener
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    });
}


function initializeFormHandling() {
    const form = document.getElementById('studentForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        
        const formData = new FormData(form);
        const studentData = {};
        
        
        for (let [key, value] of formData.entries()) {
            if (key === 'subjects') {
               
                if (!studentData.subjects) {
                    studentData.subjects = [];
                }
                studentData.subjects.push(value);
            } else {
                studentData[key] = value;
            }
        }
        
        
        showNotification('Student registered successfully!', 'success');
        
        
        console.log('Student Data:', studentData);
        
        
        form.reset();
    });
    
    // Real-time bio character counter
    const bioTextarea = document.getElementById('bio');
    const bioGroup = bioTextarea.closest('.form-group');
    
    // Create character counter
    const charCounter = document.createElement('div');
    charCounter.className = 'char-counter';
    charCounter.style.cssText = 'font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.25rem;';
    bioGroup.appendChild(charCounter);
    
    bioTextarea.addEventListener('input', function() {
        const remaining = 500 - this.value.length;
        charCounter.textContent = `${remaining} characters remaining`;
        charCounter.style.color = remaining < 50 ? '#ef4444' : 'var(--text-secondary)';
    });
    
    // Initialize counter
    bioTextarea.dispatchEvent(new Event('input'));
}


function initializeColorChangeButton() {
    const colorBtn = document.getElementById('colorChangeBtn');
    const colors = [
        '#10b981', '#3b82f6', '#8b5cf6', '#ef4444', 
        '#f59e0b', '#06b6d4', '#84cc16', '#ec4899'
    ];
    let currentColorIndex = 0;
    
    colorBtn.addEventListener('click', function() {
        currentColorIndex = (currentColorIndex + 1) % colors.length;
        this.style.backgroundColor = colors[currentColorIndex];
        
        //style for color
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        console.log(`Button color changed to: ${colors[currentColorIndex]}`);
    });
}

function initializeHighlightToggle() {
    const highlightText = document.getElementById('highlightText');
    
    highlightText.addEventListener('click', function() {
        this.classList.toggle('highlighted');
        
        const isHighlighted = this.classList.contains('highlighted');
        console.log(`Text ${isHighlighted ? 'highlighted' : 'unhighlighted'}`);
        
        //ripple effect
        createRippleEffect(this, event);
    });
}


function initializeInputDisplay() {
    const textInput = document.getElementById('textInput');
    const displayBtn = document.getElementById('displayBtn');
    const displayOutput = document.getElementById('displayOutput');
    
    function displayText() {
        const inputValue = textInput.value.trim();
        
        if (inputValue) {
            displayOutput.innerHTML = `
                <strong>You entered:</strong> "${inputValue}"
                <br><small>Length: ${inputValue.length} characters</small>
            `;
            displayOutput.style.opacity = '0';
            setTimeout(() => {
                displayOutput.style.opacity = '1';
            }, 100);
        } else {
            displayOutput.innerHTML = '<em>Please enter some text first.</em>';
            displayOutput.style.color = '#ef4444';
            setTimeout(() => {
                displayOutput.style.color = 'var(--primary-color)';
            }, 2000);
        }
    }
    
    // Button click event
    displayBtn.addEventListener('click', displayText);
    
    // Enter key event
    textInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            displayText();
        }
    });
    
    // Clear output when input is cleared
    textInput.addEventListener('input', function() {
        if (!this.value.trim()) {
            displayOutput.innerHTML = '';
        }
    });
}


function initializeHoverLogger() {
    const hoverElement = document.getElementById('hoverElement');
    
    // Mouse enter event
    hoverElement.addEventListener('mouseenter', function() {
        console.log('🖱️ Mouse entered the hover box!');
        console.log('Timestamp:', new Date().toLocaleTimeString());
        
        // Visual feedback
        this.style.transform = 'scale(1.05) rotate(1deg)';
    });
    
    // Mouse leave event
    hoverElement.addEventListener('mouseleave', function() {
        console.log('🖱️ Mouse left the hover box!');
        console.log('Timestamp:', new Date().toLocaleTimeString());
        
        // Reset visual feedback
        this.style.transform = 'scale(1) rotate(0deg)';
    });
    
    // Additional mouse move event for detailed logging
    hoverElement.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = Math.round(e.clientX - rect.left);
        const y = Math.round(e.clientY - rect.top);
        
        // Throttle the logging to avoid spam
        if (!this.lastLogTime || Date.now() - this.lastLogTime > 500) {
            console.log(`🖱️ Mouse position in hover box: (${x}, ${y})`);
            this.lastLogTime = Date.now();
        }
    });
}


function initializeCardButtons() {
    const cardButtons = document.querySelectorAll('.card-btn');
    
    cardButtons.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const cardTitle = this.closest('.card').querySelector('h3').textContent;
            showNotification(`Clicked on ${cardTitle} course!`, 'info');
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            console.log(`Card button clicked: ${cardTitle}`);
        });
    });
}

// Utility Functions

// Create ripple effect
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(59, 130, 246, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    // Add ripple animation keyframes if not already added
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6',
        warning: '#f59e0b'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
        font-weight: 500;
    `;
    
    notification.textContent = message;
    
    // Add slide-in animation
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
    
    
    notification.addEventListener('click', function() {
        this.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            this.remove();
        }, 300);
    });
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateAge(age) {
    return age >= 16 && age <= 100;
}

console.log(`
🎓 Student Information System Loaded!
📝 Features included:
   • Responsive student registration form
   • Dark/Light mode toggle
   • Interactive elements with event listeners
   • CSS Grid layout for course cards
   • Flexbox responsive design
   • Form validation and submission
   • Hover effects and animations

💡 Try interacting with the elements and check the console for logs!
`);