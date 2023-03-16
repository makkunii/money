var state = {
    balance: 1000,
    income: 400,
    expense: 100,
    transactions: [
    
    ]
}

var balanceEl = document.querySelector('#balance');
var incomeEL =  document.querySelector('#income');
var expenseEL = document.querySelector('#expense');
var transactionsEl = document.querySelector('#transaction');
var incomeBtnEl = document.querySelector('#incomeBtn');
var expenseBtnEl = document.querySelector('#expenseBtn');
var nameInputEl = document.querySelector('#name')
var amountInputEl = document.querySelector('#amount')




function init() {
   var localState = JSON.parse(localStorage.getItem('expensetrackerState'));
   if(localState !== null) {
    state = localState;
   }

   updateState();
   initListeners();
}
function uniqueId() {
    return Math.round(Math.random() * 100000);
}
function initListeners(){ 
    incomeBtnEl.addEventListener('click', onAddIncomeClick);
    expenseBtnEl.addEventListener('click', onAddExpenseClick);
}
function  onAddIncomeClick() {
    addTransaction(nameInputEl.value, amountInputEl.value,'income');
    document.getElementById("header-banner").src = "/images/kkrabs.png";

}

function  onAddExpenseClick() {
    addTransaction(nameInputEl.value, amountInputEl.value,'expense');
    document.getElementById("header-banner").src = "/images/krabs2.jpg";
}

function addTransaction(name, amount, type) {
    if (name !== '' && amount !=='') {
        var transaction = { 
            id: uniqueId(),
            name: name,
            amount: parseInt(amount), 
            type: type
        };
        state.transactions.push(transaction); 
        updateState();
    } else {
        alert('Please Enter Valid Data ')
    }
    nameInputEl.value = '';
    amountInputEl.value = '';
}

function onDeleteClick(event) {
    var id = parseInt(event.target.getAttribute('data-id'));
    var deleteIndex;

    for (var i = 0; i < state.transactions.length; i++) {
        if(state.transactions[i].id === id) {
            deleteIndex = i;
            break;
        }

    }

    state.transactions.splice(deleteIndex, 1);
    updateState()
    document.getElementById("header-banner").src = "/images/kkrabs.png";
}

function  updateState() {
    var balance = 0,
        income = 0,
        expense = 0,
        item;

    for (var i = 0; i < state.transactions.length; i++) {
        item = state.transactions[i];

        if(item.type === 'income') {
            income += item.amount;
        }
        else if(item.type === 'expense') {
            expense += item.amount;
        }
    }

    balance = income - expense;

    state.balance = balance;
    state.income = income;
    state.expense = expense;

    localStorage.setItem('expensetrackerState', JSON.stringify(state));

  
    render();

}

function render() {
    balanceEl.innerHTML = `P${state.balance}`;
    incomeEL.innerHTML = `P${state.income}`;
    expenseEL.innerHTML = `P${state.expense}`;

    var transactionEl,containerEl,amountEl, item, btnEl;

    transactionsEl.innerHTML = '';

    for (var i = 0; i < state.transactions.length; i++) {
        item = state.transactions[i];
        transactionEl = document.createElement('li');
        transactionEl.append(item.name); 

        transactionsEl.appendChild(transactionEl);

        containerEl = document.createElement('div');
        amountEl = document.createElement('span');

        if (item.type === 'income') {
            amountEl.classList.add('income-amt');
        }
        else if (item.type === 'expense') {
            amountEl.classList.add('expense-amt');
        }

        amountEl.innerHTML = `P${item.amount}`; 
        containerEl.appendChild(amountEl);

        btnEl = document.createElement('button');
        btnEl.setAttribute('data-id', item.id);
        btnEl.innerHTML = 'x';
        btnEl.addEventListener('click' , onDeleteClick);

        containerEl.appendChild(btnEl);

        transactionEl.appendChild(containerEl);


    }
}
init();