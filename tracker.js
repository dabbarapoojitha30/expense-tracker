let user = localStorage.getItem("user");

if (!user) {
  alert("Please login first");
  location.href = "index.html";
}

let data = JSON.parse(localStorage.getItem(user)) || [];

let table=document.getElementById('table');


let totalIncome = document.getElementById('totalIncome');
let totalExpense = document.getElementById('totalExpense');
let balance = document.getElementById('balance');

data.forEach(d => {
  let row = document.createElement('tr');

  let amounttable = document.createElement('td');
  amounttable.innerText = d.amount;

  let transactiontable = document.createElement('td');
  transactiontable.innerText = d.transaction;

  let datetable = document.createElement('td');
  datetable.innerText = d.date;

  let bintable = document.createElement('td');
  let deleteButton = document.createElement('button');
  deleteButton.innerText = "Delete";
  deleteButton.style.backgroundColor = "Red";
  deleteButton.onclick = () => deleteRow(row, d.amount, d.transaction);

  bintable.appendChild(deleteButton);

  row.appendChild(amounttable);
  row.appendChild(transactiontable);
  row.appendChild(datetable);
  row.appendChild(bintable);

  table.appendChild(row);

  if (d.transaction === 'income') {
    totalIncome.innerText =
      (parseInt(totalIncome.innerText) || 0) + parseInt(d.amount);
    balance.innerText =
      (parseInt(balance.innerText) || 0) + parseInt(d.amount);
  } else {
    totalExpense.innerText =
      (parseInt(totalExpense.innerText) || 0) + parseInt(d.amount);
    balance.innerText =
      (parseInt(balance.innerText) || 0) - parseInt(d.amount);
  }
});


function addRow()
{
    let date=document.getElementById('dateInput').value;
    let amount=document.getElementById('amountInput').value;
    let transaction=document.getElementById('typeInput').value;

    if(date==""||amount==""){
    alert("Please fill all fields");
    return;
    }
   
    let row=document.createElement('tr');

    let amounttable=document.createElement('td');
    amounttable.innerText=amount;

    let transactiontable=document.createElement('td');
    transactiontable.innerText=transaction;

    let datetable=document.createElement('td');
    datetable.innerText=date;
    
    let bintable=document.createElement('td');
     
    let deleteButton=document.createElement('button');
    deleteButton.innerText="Delete";
    deleteButton.style.backgroundColor="Red";
    bintable.appendChild(deleteButton);

    deleteButton.onclick=()=>deleteRow(row,amount,transaction);

    row.appendChild(amounttable);
    row.appendChild(transactiontable);
    row.appendChild(datetable);
    row.appendChild(bintable)

    table.appendChild(row);
    

    let totalIncome=document.getElementById('totalIncome');
    let totalExpense=document.getElementById('totalExpense');
    let balance=document.getElementById('balance');

    let incomeValue=parseInt(totalIncome.innerText)||0;
    let expenseValue=parseInt(totalExpense.innerText)||0;
    let balanceValue=parseInt(balance.innerText)||0;
   
    if(transaction=='income'){
        incomeValue=incomeValue+parseInt(amount);
        balanceValue=balanceValue+parseInt(amount);

        totalIncome.innerText=incomeValue;
        balance.innerText=balanceValue;
    }
    else if(transaction=='expense'){
        expenseValue=expenseValue+parseInt(amount);
        balanceValue=balanceValue-parseInt(amount);

        totalExpense.innerText=expenseValue;
        balance.innerText=balanceValue;
    }
   document.getElementById('amountInput').value="";
   document.getElementById('dateInput').value="";

   data.push({
  date: date,
  amount: amount,
  transaction: transaction
});

localStorage.setItem(user, JSON.stringify(data));

}
function deleteRow(row,amount,transaction)
{
  let totalIncome=document.getElementById('totalIncome');
  let totalExpense=document.getElementById('totalExpense');
  let balance=document.getElementById('balance');
  
  let incomeValue=parseInt(totalIncome.innerText)||0;
  let expenseValue=parseInt(totalExpense.innerText)||0;
  let balanceValue=parseInt(balance.innerText)||0;



    if(transaction=='income'){
        incomeValue=incomeValue-parseInt(amount);
        balanceValue=balanceValue-parseInt(amount);

        totalIncome.innerText=incomeValue;
        balance.innerText=balanceValue;
    }
    else if(transaction=='expense'){
        expenseValue=expenseValue-parseInt(amount);
        balanceValue=balanceValue+parseInt(amount);

        totalExpense.innerText=expenseValue;
        balance.innerText=balanceValue;
    }

    row.remove();

    // remove from localStorage
data = data.filter(d =>
  !(d.amount == amount && d.transaction == transaction)
);
localStorage.setItem(user, JSON.stringify(data));

}


















   