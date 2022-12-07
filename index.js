const { createStore } = Redux;

console.log("AYO MILEY WHAT'S GOOD?!");

// Default Store (#1)
const defaultState = {
  balance: 0
};
console.log(defaultState, "default state")

// Actions (#2)
const actionDeposit = (amount) => {
    console.log(amount, "amount @action")
  return {
    type: "deposit",
    payload: amount,
  };
};

const actionWithdrawal = (amount) => {
  return {
    type: "withdrawal",
    payload: amount,
  };
};

// Reducer (#3)
const account = (state = defaultState, action) => {
  switch (action.type) {
    case "deposit":
        console.log(state.balance, "state balance @ account")
        console.log(action.payload, "action payload @ account")
      return {
        balance: state.balance + action.payload,
      };

    case "withdrawal":
      return {
        balance: state.balance - action.payload,
      };

    default:
      return state
  }
};


// Create Store
const store = createStore(
    account,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
    console.log("subscribing to state changes...");
    const state = store.getState();
    console.log('the current state is ', state);
    const displayBalance = document.getElementById("balance");
    displayBalance.innerHTML = state.balance
})


const addButton = document.getElementById("add");
const subtractButton = document.querySelector("#subtract");
const amount = document.querySelector("#amount");


addButton.addEventListener('click', (e) => {
    e.preventDefault();
    const amountValue = parseInt(amount.value)
    console.log(amountValue, "amount value")
    store.dispatch(actionDeposit(amountValue));
})

subtractButton.addEventListener('click', (e) => {
    e.preventDefault();
    const amountValue = parseInt(amount.value)
    store.dispatch(actionWithdrawal(amountValue));
})