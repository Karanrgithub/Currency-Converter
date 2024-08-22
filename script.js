let fromOptionBox = document.querySelector(".container .from-county-option");
let toOptionBox = document.querySelector(".container .to-country-option");
let fromInputBox = document.querySelector(".container .form-input");
let toInputBox = document.querySelector(".container .to-input");
let fromInputFlag = document.querySelector(".container .form-flag img");
let toInputFlag = document.querySelector(".container .to-flag img");
let fromInput = document.querySelector(".container .form-input input");
let toInput = document.querySelector(".container .to-input input");
let convertBtn = document.querySelector(".container .convert-btn");
let amount = document.querySelector(".container .amount input");
let resultBox = document.querySelector(".container .result-box");
let result = document.querySelector(".container .result-box .result");
let switchBtn = document.querySelector(".container .switch-btn");


let currFromValue, currToValue, currFromFlagSrc, currToFlagSrc;


//getting symbol
let getSymbols = () =>{
    let fromLi ="";
    let toli ="";
    for(currency_code in country_list){
        fromLi += `<li onclick = "getFromValue('${currency_code}')"><img src="https://flagsapi.com/${country_list[currency_code]}/flat/64.png" alt="">${currency_code}</li>`;

         toli += `<li  onclick = "getToValue('${currency_code}')"> <img src="https://flagsapi.com/${country_list[currency_code]}/flat/64.png" alt="">${currency_code}</li>`;
    }
    fromOptionBox.innerHTML = fromLi;
    toOptionBox.innerHTML = toli;
}


//showing hiding from option box
fromInputBox.addEventListener("click",()=>{
    fromOptionBox.classList.toggle("active");
    toOptionBox.classList.remove("active");
})

//showing hiding to-option-box
toInputBox.addEventListener("click",()=>{
    toOptionBox.classList.toggle("active");
    fromOptionBox.classList.remove("active");
})

let getFromValue = (country)=>{
    fromInputFlag.src =`https://flagsapi.com/${country_list[country]}/flat/64.png`;

    fromInput.value = country;
    fromOptionBox.classList.remove("active");

}

let getToValue = (country)=>{
    toInputFlag.src =`https://flagsapi.com/${country_list[country]}/flat/64.png`;

    toInput.value = country;
    toOptionBox.classList.remove("active");

}

let getExchangeRate =()=>{
result.innerHTML = "Getting Exchange Rate.....";
result.style.fontSize = "17px";


    //Exchange rate api
    let url=`https://v6.exchangerate-api.com/v6/${ApiKey}/latest/${fromInput.value}`;
    fetch(url).then((res) =>res.json()).then((data) =>{

        //gettingn exchange rate
        let exchangeRate = data.conversion_rates[toInput.value];

        //getting total exchange rate
        let totalExchangeRate = (amount.value * exchangeRate).toFixed(2);

        result.innerHTML = `${amount.value} ${fromInput.value} =${totalExchangeRate} ${toInput.value}`;
    })
    resultBox.style.display ="block";
}

switchBtn.addEventListener("click",()=>{

    //setting select boxes value in global variable
    currFromValue = fromInput.value;
    currToValue = toInput.value;

    //setting select boxes flag url in global variable
    currFromFlagSrc = fromInputFlag.src;
    currToFlagSrc = toInputFlag.src;

    //Exchanging select boxes value
    fromInput.value = currToValue;
    toInput.value = currFromValue;
//exchanging select boxes flag url
    fromInputFlag.src = currToFlagSrc;
    toInputFlag.src = currFromFlagSrc;
    getExchangeRate();
})
convertBtn.addEventListener("click",()=>{
    if(amount.value !=""){
       getExchangeRate();
    }
})



getSymbols();
