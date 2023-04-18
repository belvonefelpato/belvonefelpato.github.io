function loaderFn() {
  setTimeout(showPage, 1000);
}

function showPage() {
    document.getElementById('belvoneHeader').style.display = "unset";
    document.getElementById("loader").style.display = "none";
    document.getElementById("loader-cover").style.display = "none";
}