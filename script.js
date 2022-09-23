
let $toggler = document.getElementById('toggler'),
$calculator = document.querySelector('.calculator');

if($calculator.classList.contains('dark')) {
$toggler.querySelector('#light').style.display = 'block';
$toggler.querySelector('#dark').style.display = 'none';
} else {
$toggler.querySelector('#light').style.display = 'none';
$toggler.querySelector('#dark').style.display = 'block';
}

$toggler.addEventListener('click', function() {
$calculator.classList.toggle('dark');

if($calculator.classList.contains('dark')) {
$toggler.querySelector('#light').style.display = 'block';
$toggler.querySelector('#dark').style.display = 'none';
} else {
$toggler.querySelector('#light').style.display = 'none';
$toggler.querySelector('#dark').style.display = 'block';
}
})

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }
  clear(){
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }
  delete(){
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }
  appendNumber(number){
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString() //we use to string so we may be able to append numbers to already existing number

  }
  chooseOperation(operation){
    
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }
  compute(){
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return

    switch (this.operation) {
      case '+':
        computation = prev + current
        break;
        case '-':
        computation = prev - current
        break;
        case '*':
        computation = prev * current
        break;
        case '÷':
        computation = prev / current
        break;
    
      default:
        return true;
    }
    this.currentOperand = computation ;
    this.operation = undefined ;
    this.previousOperand = ''
  }
  updateDisplay(){
    this.currentOperandTextElement.innerText = this.currentOperand
    this.previousOperandTextElement.innerText = this.previousOperand
  }
}




const calculator = new Calculator (previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
  button.addEventListener('click', ()=>{
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
  
})

operationButtons.forEach(button => {
  button.addEventListener('click', ()=>{
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })

})

equalsButton.addEventListener('click', button =>{
  calculator.compute();
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button =>{
  calculator.clear();
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button =>{
  calculator.delete();
  calculator.updateDisplay()
})