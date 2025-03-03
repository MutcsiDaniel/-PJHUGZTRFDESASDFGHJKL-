function toggleSzoveg() {
  var szovegElem = document.getElementById("dropdown1");

  if (szovegElem.style.maxHeight === "0px" || szovegElem.style.maxHeight === "") {
      szovegElem.style.maxHeight = szovegElem.scrollHeight + "px";
      szovegElem.style.padding = "10px";
  } else {
      szovegElem.style.maxHeight = "0px";
      szovegElem.style.padding = "0 10px";
  }
}

function toggleSzoveg2() {
  var szovegElem = document.getElementById("dropdown2");
  if (szovegElem.style.display === "none") {
      szovegElem.style.display = "block";
  } else {
      szovegElem.style.display = "none";
  }
}
