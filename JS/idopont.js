document.getElementById("ok").addEventListener("change", function() {
    let selectedOption = this.options[this.selectedIndex];
    let color = selectedOption.getAttribute("data-color");
    this.style.backgroundColor = color;
});