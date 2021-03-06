setInterval(function(){
  var min = document.getElementById("min").value
  var max = document.getElementById("max").value
  disclaimer = document.getElementById("disclaimer")
 
      disclaimer.innerHTML = "*Compounding on an average of " + (parseFloat(min)+parseFloat(max))/2 + "% daily"

}, 100);


function getRandomFloat(min, max, decimals) {
  const str = (Math.random() * (max - min) + min)
  return parseFloat(str).toFixed(decimals);
}

function preF1(number){
  
  setTimeout(function() {
  buttonResult = document.getElementById("buttonResult")
  buttonResult.style.pointerEvents = "none"
  buttonResult.style.cursor = "default";
  buttonResult.innerHTML = "0%";
}, 10);
  
  setTimeout(function() {
  f1(number);
}, 300); 
}

function f1(number){
    
  buttonResult = document.getElementById("buttonResult")
  buttonResult.innerHTML = "0%";
  document.getElementById('res').value = ""
  min = document.getElementById("min").value
  max = document.getElementById("max").value
  
  withdrawAmount = document.getElementById('withdrawAmount').value
  withdrawDays = document.getElementById('withdrawDays').value
  withdrawTax = document.getElementById('withdrawTax').value
  
  if(withdrawTax > 100){
       withdrawTax = 100;
       document.getElementById('withdrawTax').value = 100
    }
  
  withdrawCounter = 0
  timesOfWithdrawal = 0;
  totalWithdrew = 0.0
  totalTaxPaid = 0.0
  
  revenueOnly = 0.0
  
  initial = document.getElementById("in").value
  days = document.getElementById("days").value
  x = 0
  percentages = 0.0
  result=parseFloat(initial)
  nocompoundResult = 0.0
  textResults = document.getElementById('res')
  pres2Text = document.getElementById('res2')
  
  textResults.innerHTML = "";
  pres2Text.innerHTML = "";
  
  widthProgressBarStyle = document.getElementById('progressBar').style
  
  function loopDays(){
    
     progress = parseFloat((x/days)*100)
     ProgressBar = ((223-50)*progress/100)+50
      
     buttonResult.innerHTML = progress.toFixed(0).toString() + "%"
     widthProgressBarStyle.width = ProgressBar
     $('#progressBar').css('width', ProgressBar)
    
   if(result < withdrawAmount && x == 0){ //initial case if witdrawAmount is grater than the invested amount
            days = x
    } 
    
   if(result > 0 && days > 0){
        random = getRandomFloat(min, max, 3)
        percentages += parseFloat(random);
        nocompoundResult = result;
        result += result*random / 100
        tempResult = result
        
      
        if((result - parseFloat(withdrawAmount) > 0)){
          pres2Text.innerHTML += "Day "+(x+1)+": " + result.toFixed(2) + " USDT" + " - with " + random + "% gain"+"<br>"
        }
        else{
            pres2Text.innerHTML += "Last Day after withdrawal: " + nocompoundResult.toFixed(2) + " USDT" + " - with " + random + "% gain"+"<br>"
            pres2Text.innerHTML += "MAKE SURE TO HAVE MONEY AVAILABLE TO WITHDRAW" + "<br>"
          }
        
        
        if(result < withdrawAmount && x > 0){
            days = x
            result = tempResult
          }
      
        if(withdrawDays >= 1 && (result-parseFloat(withdrawAmount)) > 0){
           if(++withdrawCounter == withdrawDays){
               result -= parseFloat(withdrawAmount)
               withdrawCounter = 0
               totalWithdrew += parseFloat(withdrawAmount)
               timesOfWithdrawal++;
             }
         }
      else if(withdrawDays > 0){
          days = x
          revenueOnly = tempResult
        }

       }    
    else{
        pres2Text.innerHTML += "MAKE SURE TO HAVE MONEY AVAILABLE TO WITHDRAW" + "<br>"
        if(days != 0) days = x+1;
      }
    

    if(++x < days){
      setTimeout(loopDays, 0.0001)
      }
    else{
        var finalGain = parseFloat(result);
      
        if(withdrawAmount <= 0) withdrawTax = 0;
        if(withdrawTax <= 0 && withdrawAmount > 0) finalGain = parseFloat(result)+parseFloat(totalWithdrew)
      
        totalTaxPaid = parseFloat((parseFloat(totalWithdrew)*parseFloat(withdrawTax))/100)
        if(withdrawTax > 0 && withdrawAmount > 0) finalGain = parseFloat(result) + (parseFloat(totalWithdrew) - parseFloat(totalTaxPaid))
      
        revenueOnly = finalGain - parseFloat(initial)
      
        singleTaxPaid = parseFloat(totalTaxPaid)/parseFloat(timesOfWithdrawal)
        totalAmountWithdrewAfterTax = parseFloat(totalWithdrew)-parseFloat(totalTaxPaid)
        singleWithdrawAfterTax = (parseFloat(totalWithdrew)/parseFloat(timesOfWithdrawal)) - parseFloat(singleTaxPaid)
        
      
      
        textResults.innerHTML += "======= RESULTS ========" + "<br><br>"
        textResults.innerHTML += "Amount Invested: " + initial +" USDT" + "<br>"
        if(revenueOnly > 0) textResults.innerHTML += "Money gained after " + days + " days: " + revenueOnly.toFixed(2) +" USDT" + "<br>"
        else textResults.innerHTML += "Money lost after " + days + " days: " + revenueOnly.toFixed(2) +" USDT" + "<br>"
        
        
        gainLossPercentage = revenueOnly * 100 /parseFloat(initial)
        if(gainLossPercentage > 0) textResults.innerHTML += "A gain of: " + gainLossPercentage.toFixed(3) + "%" + "<br>"
        else textResults.innerHTML += "A loss of: " + gainLossPercentage.toFixed(3) + "%" + "<br>"
      
        if(withdrawCounter != 1) textResults.innerHTML += "Compound % average: " + (percentages / days).toFixed(3) + "%" + "<br>" 
      
        textResults.innerHTML += "Total amount after " + days + " days: " + finalGain.toFixed(2) + " USDT" + "<br>" 
        
        if(totalWithdrew > 0) textResults.innerHTML += "<br>" + "Amount Withdrew: " + totalWithdrew + " USDT"
        if(totalWithdrew > 0 && withdrawTax > 0){
          textResults.innerHTML += "<br>" + "Amount Withdrew after commission: " + totalAmountWithdrewAfterTax + " USDT"
          textResults.innerHTML += "<br>" + "Single withdraw after commission: " + singleWithdrawAfterTax + " USDT" + "<br><br>"
        }
      
        if(withdrawTax > 0){
          textResults.innerHTML += "Total of " + withdrawTax + "% commission paid: " + parseFloat(totalTaxPaid).toFixed(2) +" USDT" + "<br>"
          textResults.innerHTML += "Commission paid each " + withdrawDays + " days: " + parseFloat(singleTaxPaid) + " USDT"
        }
      
        textResults.innerHTML += "<br>"
        textResults.innerHTML += "<br>" + "====== ITERATIONS ======" + "<br>"
        pres2Text.innerHTML += "<br>" + "========================" + "<br>"
      
        switchButtons(number)
        switchClasses(number);
      }
  }
  
 setTimeout(loopDays, 0.0001)
}

function switchButtons(number){
  var button = document.getElementById("buttonResult");
  
  if(number === 1){
  button.classList.remove('resultButton');
  button.classList.add('closeButton');
  scrollToTop()
  $('#progressBar').css('width', '0')
  button.setAttribute('onclick','switchClasses(2)');
    
  setTimeout(function() {
  button.innerHTML = "X";
}, 130)
    
  setTimeout(function() {
  button.style.pointerEvents = "auto"
  button.style.cursor = "pointer";
}, 600)
}
else{
  button.classList.remove('closeButton');
  button.classList.add('resultButton');
  button.setAttribute('onclick','preF1(1)');
  
  setTimeout(function() {
  button.innerHTML = "Calculate"
}, 180);
}
}

function switchClasses(number){
  
var textArea = document.getElementById("textArea");
 
if(number === 1){
  textArea.classList.remove('textAreaContainerHidden');
  textArea.classList.add('textAreaContainerShowed');
}
else{
  textArea.classList.remove('textAreaContainerShowed');
  textArea.classList.add('textAreaContainerHidden');
  switchButtons(2)
}
}

function scrollToTop(){
  var textArea = document.getElementById("textArea");
  textArea.scrollTo({ top: 0, behavior: 'smooth' });
}


function showAdvancedMode(number){
 
  buttonOpenClose = document.getElementById('opencloseButton')
  advancedMode = document.getElementById('advancedMode')
  compounderBlock = document.getElementById('compounderBlock')
  
  if(number == 1){
    advancedMode.classList.remove('advancedSettingsHidden')
    advancedMode.classList.add('advancedSettingsShowed')
    compounderBlock.classList.remove('compounder')
    compounderBlock.classList.add('compounderShifted')
    buttonOpenClose.setAttribute('onclick','showAdvancedMode(2)');
    
    setTimeout(function() {
    buttonOpenClose.innerHTML = "???"
    buttonOpenClose.classList.remove('openAdvancedMode')
    buttonOpenClose.classList.add('openAdvancedModeShifted')
    }, 300);
    
  }
  else{
    advancedMode.classList.remove('advancedSettingsShowed')
    advancedMode.classList.add('advancedSettingsHidden')
    compounderBlock.classList.remove('compounderShifted')
    compounderBlock.classList.add('compounder')
    buttonOpenClose.setAttribute('onclick','showAdvancedMode(1)');
    buttonOpenClose.classList.remove('openAdvancedModeShifted')
    buttonOpenClose.classList.add('openAdvancedMode')
    setTimeout(function() {
    buttonOpenClose.innerHTML = "???"
    }, 500);

  }
  
  
}

