class Calculator {
    constructor(firstOperand, secondOperand) {
        this.firstOperand = firstOperand;
        this.secondOperand = secondOperand;
        this.clear()
    }

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    delete() {  
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")){return}
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === "") return
        if (this.previousOperand !== "") {
            this.equals()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ""
    }

    equals() {
       let result
       const prev = parseFloat(this.previousOperand)
       const current = parseFloat(this.currentOperand)
       if (isNaN(prev) || isNaN(current)) return
       switch (this.operation) {
        case "+":
            result = prev + current
            break
        case "-":
            result = prev - current
            break
        case "8":
            result = prev * current
            break
        case "/":
            result = prev / current
            break
        default:
            return
       }
       this.currentOperand = result
       this.operation = undefined
       this.previousOperand = ""
    }

    updateDisplay() {
        this.secondOperand.innerText = this.currentOperand
        if (this.operation != null) {
            this.firstOperand.innerText =
            `${this.previousOperand} ${this.operation}`}
    } 
}


const numberButtons = document.querySelectorAll("[data-integers]")
const operationButtons = document.querySelectorAll("[data-operation]")
const equalsButton = document.querySelector("[data-equal]")
const allClearButton = document.querySelector("[data-ac]")
const delButton = document.querySelector("[data-del]")
const firstOperand = document.querySelector("[data-first-opnd]")
const secondOperand = document.querySelector("[data-second-opnd]")


const calculator = new Calculator(firstOperand, secondOperand)

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
    })
})

equalsButton.addEventListener("click", () => {
    calculator.equals()
    calculator.updateDisplay()
})

allClearButton.addEventListener("click", () => {
    calculator.clear()
    calculator.updateDisplay()
})

delButton.addEventListener("click", () => {
    calculator.delete()
    calculator.updateDisplay()
})