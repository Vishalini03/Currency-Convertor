let select = document.querySelectorAll('#currency');
let button = document.getElementById('button');
let input = document.getElementById('input');


fetch('https://api.frankfurter.app/currencies')
    .then(res => res.json())
    .then(res => displayDropDown(res));



function displayDropDown(res)
{
    let curr = Object.entries(res);
    for (let i = 0; i < curr.length; i++)
    {
        let option=`<option value=${curr[i][0]}>${curr[i][0]} - ${curr[i][1]}</option>`
        select[0].innerHTML += option;
        select[1].innerHTML += option;
    }  
}
    
button.addEventListener('click', () => {
    error.style.display= 'none';
    let cur1 = select[0].value;
    let cur2 = select[1].value;

    let inputVal = input.value;
    if (cur1 !== cur2) {
        if (inputVal < 0)
        {
            error.innerHTML = "*Please enter a valid amount";
            error.style.display = 'block';
            return;
        }
       
        convertCurrency(cur1, cur2, inputVal);
    }
    else {
        error.innerHTML = "*Please choose different currencies";
        error.style.display= 'block';
        
    }
});

function convertCurrency(cur1,cur2,inputVal) {
    const host = 'api.frankfurter.app';
    fetch(`https://${host}/latest?amount=${inputVal}&from=${cur1}&to=${cur2}`)
    .then(resp => resp.json())
    .then((data) => {
       document.getElementById('result').value = Object.values(data.rates)[0]
  });
}