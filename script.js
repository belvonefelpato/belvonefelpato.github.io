var myTimeout;

function loaderFn() {
  myTimeout = setTimeout(showPage, 2000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("loader-cover").style.display = "none";
}