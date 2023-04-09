'use strict';
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function(movements, sort = false){
     containerMovements.innerHTML = '';

     const movs = sort ? movements.slice().sort(
      (a,b) => a-b) : movements; 

     movs.forEach( (mov, i) => { 
        const type = mov > 0 ? 'deposit' : 'withdrawal';

        const html = `
              <div class="movements__row">
                  <div class="movements__type movements__type--${type}">${i + 1} ${type} </div>
                  <div class="movements__value">${mov}€</div>
              </div>
        `; 
        containerMovements.insertAdjacentHTML('afterbegin', html);
        
      });
};

const calcDisplayBalance = function(acc){
  acc.balance = acc.movements.reduce((acc, mov) => acc+ mov, 0)

  labelBalance.textContent = `${acc.balance} EUR`
};

const calcDisplaySummary = function(acc){
  const incomes = acc.movements
  .filter(mov => mov > 0)
  .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`

  const out = acc.movements
  .filter(mov => mov < 0)
  .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`

  const interest = acc.movements
  .filter(mov => mov > 0)
  .map(deposit => deposit*acc.interestRate/100)
  .filter((int, i, arr) => {
    return int >=1
  })
  .reduce((acc, interest) => acc + interest, 0)

  labelSumInterest.textContent = `${interest}€`
}

const createUserNames = function(acc){
  acc.forEach(function(acc){
    acc.userName = acc.owner
    .toLowerCase()
    .split(' ')
    .map((name) => name[0])
    .join('')
  });
}
createUserNames(accounts)


const updateUI = function(acc){
  //Display Movements
  displayMovements(currentAccount.movements)

  //Display Balance
  calcDisplayBalance(currentAccount)

  //Display Summary
  calcDisplaySummary(currentAccount)
}
// Event Handler
let currentAccount;

btnLogin.addEventListener('click', function(e){
  //Prevent form from submitting
  e.preventDefault()
  const accounts = [account1, account2, account3, account4];
  currentAccount = accounts.find(
     acc => acc.userName === inputLoginUsername.value)

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
      // Display UI and Message
      labelWelcome.textContent = `Welcome back, ${ currentAccount.owner.split(' ')[0]}`;
      containerApp.style.opacity = 100;

      // Clear input fields
      inputLoginUsername.value = inputLoginPin.value = '';
      inputLoginPin.blur()
      
      updateUI(currentAccount)
  }
})

btnTransfer.addEventListener('click', function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  )
  inputTransferAmount.value = inputTransferTo.value = '';
  
  if(
    amount > 0 && 
    receiverAcc &&
    currentAccount.balance >= amount && 
    receiverAcc.userName !== currentAccount.userName
    ){
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(amount);

      updateUI(currentAccount)
    }
});

btnLoan.addEventListener('click', function(e){
  e.preventDefault()
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(
    mov => mov >= amount*0.1)) 
  {
    currentAccount.movements.push(amount)
    updateUI(currentAccount)
  }
  inputLoanAmount.value = '';
})


btnClose.addEventListener('click', function(e){
  e.preventDefault();
  
  if (inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
    ) {
      const index = accounts.findIndex(
        acc => acc.userName === currentAccount.userName)
      
      // Delete account
      accounts.splice(index, 1)
      // Hide the UI
      containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function(e){
  e.preventDefault()
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted
})



// const dogAge = [5,2,4,1,15,8,3]

// const averageHumanAges = function(dogAge){
//   const averageHumanAge = dogAge.map(age => age <=2 ? age*2 : 16+4*age)
//          .filter(humanAge => humanAge > 18)
//          .reduce((acc, curr, i, arr) => acc + curr/arr.length, 0) 
//   console.log(averageHumanAge)
// }
// averageHumanAges(dogAge)

// const movementsDscription = movements.map( 
//   (mov, i) => `Movements §{i+1}: You ${mov >  0 ? 'deposited' :
//   'withdrew'} ${Maths.abs(mov)}`
// )

// const deposits = account1.movements.filter(function (mov) {
//   return mov > 0;
// }); 

// const withdrawals = account1.movements.filter(function(mov){
//   return mov < 0
// });

// const balance = account1.movements.reduce((acc, cur) > )
// console.log(withdrawals)

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const firstWithdrawal = account1.movements.find(mov => mov < 0);

//console.log(firstWithdrawal)

/////////////////////////////////////////////////
