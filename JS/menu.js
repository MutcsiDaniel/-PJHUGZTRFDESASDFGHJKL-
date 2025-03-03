function menu() {
    var x = document.getElementById("osszecsukhato");
    if (x.className === "fejlec") {
      x.className += " responsive";
    } else {
      x.className = "fejlec";
    }
  } 