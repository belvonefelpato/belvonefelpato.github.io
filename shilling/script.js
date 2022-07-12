window.onload = function() {
    retrieveText();
}

function retrieveText() {
            var xmlhttp;
            if (window.XMLHttpRequest) {
                // code for IE7+, Firefox, Chrome, Opera, Safari
                // Create an XMLHttpRequest object
                xmlhttp = new XMLHttpRequest();
            } else {
                // code for IE6, IE5  
                // Create an ActiveXObject object
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }

            // Define a callback function
            xmlhttp.onload = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    // Here you can use the Data
                    txt = xmlhttp.responseText.toString()
                    txt.replace('\n', '');
                    setTxt(txt);
                }
            }

            // Send a request
            xmlhttp.open("GET", "https://docs.google.com/document/d/1IzBp8nhbGh6XxH4epfW6G1Wh5mDTPwsRAauCBYqaDD0/export?format=txt", true);
            xmlhttp.send();
  
  
  
}

function setTxt(stxt){
  
  var buffer = ""
  var t = ""
  var b = ""
  var charControl = ''
  var isBox = false
  var shillIndex = 0
  
  for (let i = 0; i < stxt.length; i++){
    
      if(stxt.charAt(i) == '/'){
        
        if(buffer !== ""){
          if(charControl == 'b') b = buffer
          else if(charControl == 't') t = buffer
          
          buffer = ""
        }
        
        switch(stxt.charAt(i+1)){

          case 't':
            charControl = 't'
            i += 1;
            break;
            
          case 'b':
            charControl = 'b'
            i += 1;
            break;
            
          case 's':
            charControl = 's'
            i += 2
            break;
            
          case 'f':
            charControl = 'f'
            shillIndex++;
            write(shillIndex, t, b)
            break;            
      }
    }
    else buffer += stxt.charAt(i)
  }
}

function write(i, t, b){
  
  var bURLSpaces = encodeURIComponent(b);
  bURLSpaces = bURLSpaces.replace(/(\r\n|\n|\r)/gm, '%0A')
  
    
  document.getElementById('writings').innerHTML += '<div id="shill' + i + '"><p id="desc">' + t + '</p><pre id="pre' + i + '">' + b + '</pre><input type="button" class="copy-text btn" onclick="copyText(' + i + ');"value="Copy" /><input type="button" class="copy-text btn" onclick="window.location.href=' + "'" + 'https://twitter.com/intent/tweet?text=' + bURLSpaces.toString() + "'" + ';" value="Tweet it!" /></div><hr class="separate-writings">'
  
}


function copyText(number) {
  var id = "pre" + number
  var copyText = document.getElementById(id).innerHTML;

   /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText);

  /* Alert the copied text */
  alert("Copied: " + copyText);
} 