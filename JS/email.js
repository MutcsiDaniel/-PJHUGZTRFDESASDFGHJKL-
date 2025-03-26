function ellenorizEmail() {
    const emailInput = document.getElementById("email").value;
    const eredmeny = document.getElementById("emailszov");
    const emailMinta = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailMinta.test(emailInput)) {
        eredmeny.textContent = "Sikeres feliratkozás!";
        eredmeny.classList.add("latszik")
        
    } else {
        eredmeny.textContent = "Hibás email formátum!";
    }
}