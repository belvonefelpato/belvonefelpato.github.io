var defaultTagsToAdd = "\n\n@CivFund $CIV #0ne #Civilization\ncivfund.org"
var tweetsWithLessThan = [];
var characterCount = 280;

var appliedFilter = "filter0"
var filterCount = document.getElementsByClassName("content-btn").length - 1;

window.onload = function () {
  document.getElementById('switch-text').innerHTML = "Less than " + characterCount.toString() + " characters"
  retrieveText();
  loaderFn();
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
  xmlhttp.onload = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      // Here you can use the Data
      txt = xmlhttp.responseText.toString()

      setTxt(removeReturns(txt));
    }
  }

  // Send a request
  xmlhttp.open("GET", "https://docs.google.com/document/d/1IzBp8nhbGh6XxH4epfW6G1Wh5mDTPwsRAauCBYqaDD0/export?format=txt", true);
  //xmlhttp.open("GET", "https://belvonefelpato.github.io/shilling/shilltext.txt", true);
  xmlhttp.send();



}

function removeReturns(t) {
  var buffer = "";
  for (let i = 0; i < t.length; i++) {
    if (t.charAt(i) == /[\n\r]/gm && t.charAt(i + 1) == /[\n\r]/gm) i++;
    else buffer += t.charAt(i);
  }

  return buffer;
}

function setTxt(stxt) {

  var buffer = ""
  var t = ""
  var b = ""
  var charControl = ''
  var isBox = false
  var shillIndex = 0

  for (let i = 0; i < stxt.length; i++) {

    //if(i == readMoreCount-1) b += '<span id="dots">...</span><span id="more">'

    if (stxt.charAt(i) == '§') {

      if (buffer !== "") {
        if (charControl == 'b') b = buffer
        else if (charControl == 't') t = buffer

        buffer = ""
      }

      switch (stxt.charAt(i + 1)) {

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
          buffer = ""
          charControl = 'f'
          shillIndex++;
          b += defaultTagsToAdd;
          t += " - (total characters: " + b.length + ")"
          //if(b.length > readMoreCount-1) b += '</span><a id="read-more" onclick="ReadMoreFn">read more</a>'
          write(shillIndex, t, b)
          break;
      }
    }
    else buffer += stxt.charAt(i)
  }
}

function write(i, t, b) {

  if (t === null) t = ""
  if (b === null) b = ""

  var bURIEncoded = encodeURIComponent(b)
  bURIEncoded = bURIEncoded.replace(/[\n\r]/gm, '%0A')

  if (t !== "" && b !== "") {
    document.getElementById('writings').innerHTML += '<div id="shill' + i + '"><p id="desc">' + t + '</p><pre id="pre' + i + '">' + b + '</pre><input type="button" class="copy-text btn" onclick="copyText(' + i + ');"value="Copy" /><input type="button" class="copy-text btn" onclick="window.location.href=' + "'" + 'https://twitter.com/intent/tweet?text=' + bURIEncoded + "'" + ';" value="Tweet it!" /></div><hr class="separate-writings">'
    if (b.length > characterCount) tweetsWithLessThan.push("shill" + i.toString());
  }
}


function copyText(number) {
  var id = "pre" + number
  var copyText = document.getElementById(id).innerHTML;
  navigator.clipboard
    .writeText(copyText)
    .then(() => {
      alert("Shilling text copied");
    })
    .catch(() => {
      alert("something went wrong");
    });
}

function checkUnCheck() {
  if (tweetsWithLessThan.length !== 0) {
    for (let i = 0; i < tweetsWithLessThan.length; i++) {
      if (document.getElementById('switch-input').checked) document.getElementById(tweetsWithLessThan[i]).style.display = "none"
      else document.getElementById(tweetsWithLessThan[i]).style.display = "unset"
    }
  }
}

function loaderFn() {
  setTimeout(showPage, 3000);
}

function showPage() {
  document.getElementById('belvoneHeader').style.display = "unset";
  document.getElementById("loader").style.display = "none";
  document.getElementById("loader-cover").style.display = "none";
}

function applyFilter(s, f) {
  var kindOfFilter = parseInt(f[f.length - 1]);
  if (kindOfFilter == appliedFilter) return;
  var writings = document.getElementById('writings');


  switch (s) {
    case "Ascending":
      writings.style.display = "block";
      writings.style.flexDirection = "initial";
      break;
    case "Descending":
      writings.style.display = "flex";
      writings.style.flexDirection = "column-reverse";
      break;
  }

  for (let i = 0; i <= filterCount; i++) {
    if (kindOfFilter != i) {
      let filterString = document.getElementById("filter" + i.toString()).innerText
      filterString = filterString.replace('✓', '')
      filterString = filterString.replace(/\s+/g, '')
      document.getElementById("filter" + i.toString()).innerText = filterString
    }
  }

  document.getElementById("filter" + kindOfFilter.toString()).innerText = "✓ " + s;
  filterApplied = "filter" + kindOfFilter.toString();


}


/*function ReadMoreFn() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("read-more");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "read more"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = " Read less"; 
    moreText.style.display = "inline";
  }
}*/