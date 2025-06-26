// Triangle Calculator JavaScript - Version 2
class TriangleCalculatorV2 {
    constructor() {
        this.areaForm = document.getElementById('areaForm');
        this.perimeterForm = document.getElementById('perimeterForm');
        
        // Area calculation elements
        this.areaResults = document.getElementById('areaResults');
        this.areaError = document.getElementById('areaError');
        this.areaValue = document.getElementById('areaValue');
        
        // Perimeter calculation elements
        this.perimeterResults = document.getElementById('perimeterResults');
        this.perimeterError = document.getElementById('perimeterError');
        this.perimeterValue = document.getElementById('perimeterValue');
        this.triangleType = document.getElementById('triangleType');
        
        this.initEventListeners();
    }

    initEventListeners() {
        // Area form submission
        this.areaForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.calculateArea();
        });

        // Perimeter form submission
        this.perimeterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.calculatePerimeter();
        });

        // Add input validation on real-time for all inputs
        const allInputs = document.querySelectorAll('input[type="number"]');
        allInputs.forEach(input => {
            input.addEventListener('input', () => {
                this.validateInput(input);
            });
        });
    }

    validateInput(input) {
        const value = parseFloat(input.value);
        
        // Remove any existing error styling
        input.classList.remove('error');
        
        // Check if value is valid
        if (input.value !== '' && (isNaN(value) || value <= 0)) {
            input.classList.add('error');
            input.style.borderColor = '#e53e3e';
        } else {
            input.style.borderColor = '#e1e5e9';
        }
    }

    // Area calculation methods
    getAreaInputValues() {
        return {
            base: parseFloat(document.getElementById('areaBase').value),
            height: parseFloat(document.getElementById('areaHeight').value)
        };
    }

    calculateTriangleArea(base, height) {
        return (base * height) / 2;
    }

    showAreaResults(area) {
        this.areaValue.textContent = `${area.toFixed(2)} cm²`;
        this.areaResults.style.display = 'block';
        this.areaError.style.display = 'none';
        
        // Smooth scroll to results
        this.areaResults.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
    }

    showAreaError() {
        this.areaResults.style.display = 'none';
        this.areaError.style.display = 'block';
        
        // Smooth scroll to error message
        this.areaError.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
    }

    calculateArea() {
        const areaBtn = this.areaForm.querySelector('.calculate-btn');
        const originalText = areaBtn.textContent;
        
        // Add loading state
        areaBtn.classList.add('loading');
        areaBtn.textContent = 'Menghitung...';
        
        setTimeout(() => {
            const { base, height } = this.getAreaInputValues();
            
            // Validate inputs
            if (isNaN(base) || isNaN(height) || base <= 0 || height <= 0) {
                this.showAreaError();
            } else {
                const area = this.calculateTriangleArea(base, height);
                this.showAreaResults(area);
            }
            
            // Remove loading state
            areaBtn.classList.remove('loading');
            areaBtn.textContent = originalText;
        }, 500);
    }

    // Perimeter calculation methods
    getPerimeterInputValues() {
        return {
            sideA: parseFloat(document.getElementById('sideA').value),
            sideB: parseFloat(document.getElementById('sideB').value),
            sideC: parseFloat(document.getElementById('sideC').value)
        };
    }

    validateTriangle(a, b, c) {
        // Check triangle inequality theorem
        return (a + b > c) && (a + c > b) && (b + c > a);
    }

    calculateTrianglePerimeter(a, b, c) {
        return a + b + c;
    }

    determineTriangleType(a, b, c) {
        // Sort sides to make comparison easier
        const sides = [a, b, c].sort((x, y) => x - y);
        const [shortest, middle, longest] = sides;

        // Check for right triangle (Pythagorean theorem)
        const isRight = Math.abs(shortest * shortest + middle * middle - longest * longest) < 0.001;
        
        // Check for equilateral triangle
        if (Math.abs(a - b) < 0.001 && Math.abs(b - c) < 0.001) {
            return 'Segitiga Sama Sisi';
        }
        
        // Check for isosceles triangle
        if (Math.abs(a - b) < 0.001 || Math.abs(b - c) < 0.001 || Math.abs(a - c) < 0.001) {
            if (isRight) {
                return 'Segitiga Siku-siku Sama Kaki';
            }
            return 'Segitiga Sama Kaki';
        }
        
        // Check for right triangle
        if (isRight) {
            return 'Segitiga Siku-siku';
        }
        
        // Check for acute or obtuse triangle
        if (longest * longest < shortest * shortest + middle * middle) {
            return 'Segitiga Lancip';
        } else if (longest * longest > shortest * shortest + middle * middle) {
            return 'Segitiga Tumpul';
        }
        
        return 'Segitiga Sembarang';
    }

    showPerimeterResults(perimeter, type) {
        this.perimeterValue.textContent = `${perimeter.toFixed(2)} cm`;
        this.triangleType.textContent = type;
        this.perimeterResults.style.display = 'block';
        this.perimeterError.style.display = 'none';
        
        // Smooth scroll to results
        this.perimeterResults.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
    }

    showPerimeterError() {
        this.perimeterResults.style.display = 'none';
        this.perimeterError.style.display = 'block';
        
        // Smooth scroll to error message
        this.perimeterError.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
    }

    calculatePerimeter() {
        const perimeterBtn = this.perimeterForm.querySelector('.calculate-btn');
        const originalText = perimeterBtn.textContent;
        
        // Add loading state
        perimeterBtn.classList.add('loading');
        perimeterBtn.textContent = 'Menghitung...';
        
        setTimeout(() => {
            const { sideA, sideB, sideC } = this.getPerimeterInputValues();
            
            // Validate all inputs are positive numbers
            if (isNaN(sideA) || isNaN(sideB) || isNaN(sideC) ||
                sideA <= 0 || sideB <= 0 || sideC <= 0) {
                this.showPerimeterError();
            } else if (!this.validateTriangle(sideA, sideB, sideC)) {
                // Validate triangle inequality
                this.showPerimeterError();
            } else {
                // Calculate perimeter and determine triangle type
                const perimeter = this.calculateTrianglePerimeter(sideA, sideB, sideC);
                const triangleType = this.determineTriangleType(sideA, sideB, sideC);
                this.showPerimeterResults(perimeter, triangleType);
            }
            
            // Remove loading state
            perimeterBtn.classList.remove('loading');
            perimeterBtn.textContent = originalText;
        }, 500);
    }

    // Utility methods
    resetAreaForm() {
        this.areaForm.reset();
        this.areaResults.style.display = 'none';
        this.areaError.style.display = 'none';
    }

    resetPerimeterForm() {
        this.perimeterForm.reset();
        this.perimeterResults.style.display = 'none';
        this.perimeterError.style.display = 'none';
    }

    resetAllForms() {
        this.resetAreaForm();
        this.resetPerimeterForm();
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TriangleCalculatorV2();
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Escape key to clear all results
    if (e.key === 'Escape') {
        const resultsElements = document.querySelectorAll('.results-section, .error-message');
        resultsElements.forEach(element => {
            element.style.display = 'none';
        });
    }
    
    // Ctrl+R to reset all forms
    if (e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        const calculator = new TriangleCalculatorV2();
        calculator.resetAllForms();
    }
});

// Add visual feedback for form interactions
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input[type="number"]');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'scale(1.02)';
            input.parentElement.style.transition = 'transform 0.2s ease';
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.style.transform = 'scale(1)';
        });
    });
});

// Export for potential testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TriangleCalculatorV2;
}

