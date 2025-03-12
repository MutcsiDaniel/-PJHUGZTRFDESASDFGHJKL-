function ellenorizEmail() {
    const emailInput = document.getElementById("email").value;
    const eredmeny = document.getElementById("emailszov");
    const emailMinta = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailMinta.test(emailInput)) {
        eredmeny.textContent = "Sikeres feliratkozás!";
    } else {
        eredmeny.textContent = "Hibás email formátum!";
    }
}