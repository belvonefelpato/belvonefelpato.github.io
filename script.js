function loaderFn() {
  setTimeout(showPage, 1000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("loader-cover").style.display = "none";
}