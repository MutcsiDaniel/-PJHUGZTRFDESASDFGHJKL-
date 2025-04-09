// Form elements
const veznevInput = document.getElementById("veznev");
const kernevInput = document.getElementById("kernev");
const telefonInput = document.getElementById("telefon");
const emailInput = document.getElementById("emaill");

// Appointment reason radio buttons
const laborcsomagRadio = document.getElementById("laborcs");
const szolgaltatasRadio = document.getElementById("szolgalt");
const mindkettoRadio = document.getElementById("mind2");

// Lab package checkboxes
const genetikaCheck = document.getElementById("genetika");
const alapegeszCheck = document.getElementById("alapegesz");
const diagnosztikaCheck = document.getElementById("diagnosztika");
const sportoloCheck = document.getElementById("sportolo");
const elelmiszerCheck = document.getElementById("elelmiszer");
const kornyezet2Check = document.getElementById("kornyezet2");

// Service checkboxes
const vervizsCheck = document.getElementById("vervizs");
const mikroBCheck = document.getElementById("mikroB");
const genetikaiVCheck = document.getElementById("genetikaiV");
const kornyezetCheck = document.getElementById("kornyezet");
const elelmiszer2Check = document.getElementById("elelmiszer2");
const gyogyszerCheck = document.getElementById("gyogyszer");
const hormonCheck = document.getElementById("hormon");
const immunologiaCheck = document.getElementById("immunologia");

// Building selection
const aEpuletBtn = document.getElementById("aEpulet");
const bEpuletBtn = document.getElementById("bEpulet");
const terkepzDiv = document.getElementById("terkepz");

// Message display element
const messageElement = document.getElementById("form-message");

// Make all form fields required
const requiredFields = [veznevInput, kernevInput, telefonInput, emailInput];
requiredFields.forEach(field => {
    if (field) field.required = true;
});

// Function to display messages
function displayMessage(message, isError = false) {
    if (messageElement) {
        messageElement.textContent = message;
        messageElement.style.color = isError ? '#ff0000' : '#ffffff';
    }
}

// Function to toggle checkbox states based on radio selection
function updateCheckboxStates() {
    const labPackages = [genetikaCheck, alapegeszCheck, diagnosztikaCheck, sportoloCheck, elelmiszerCheck, kornyezet2Check];
    const services = [vervizsCheck, mikroBCheck, genetikaiVCheck, kornyezetCheck, elelmiszer2Check, gyogyszerCheck, hormonCheck, immunologiaCheck];
    
    const disableLabPackages = !laborcsomagRadio?.checked && !mindkettoRadio?.checked;
    const disableServices = !szolgaltatasRadio?.checked && !mindkettoRadio?.checked;
    
    labPackages.forEach(checkbox => {
        if (checkbox) {
            checkbox.disabled = disableLabPackages;
            if (disableLabPackages) {
                checkbox.checked = false;
                checkbox.parentElement.style.opacity = "0.5";
            } else {
                checkbox.parentElement.style.opacity = "1";
            }
        }
    });
    
    services.forEach(checkbox => {
        if (checkbox) {
            checkbox.disabled = disableServices;
            if (disableServices) {
                checkbox.checked = false;
                checkbox.parentElement.style.opacity = "0.5";
            } else {
                checkbox.parentElement.style.opacity = "1";
            }
        }
    });
}

// Rádiógombok és checkboxok állapotának kezeléséhez
[laborcsomagRadio, szolgaltatasRadio, mindkettoRadio].forEach(radio => {
    if (radio) radio.addEventListener('change', updateCheckboxStates);
});

// Function to handle building selection and show map
function handleBuildingSelection(buildingId) {
    if (!terkepzDiv) return;

    const maps = {
        'aEpulet': 'https://www.google.com/maps/embed?...',
        'bEpulet': 'https://www.google.com/maps/embed?...'
    };

    if (maps[buildingId]) {
        const iframe = document.createElement('iframe');
        iframe.src = maps[buildingId];
        iframe.width = "100%";
        iframe.height = "450";
        iframe.style.border = "0";
        iframe.allowFullscreen = true;
        iframe.loading = "lazy";
        iframe.referrerPolicy = "no-referrer-when-downgrade";
        
        terkepzDiv.innerHTML = '';
        terkepzDiv.appendChild(iframe);
    }
}

// Add event listeners to building buttons
if (aEpuletBtn) aEpuletBtn.addEventListener('click', () => handleBuildingSelection('aEpulet'));
if (bEpuletBtn) bEpuletBtn.addEventListener('click', () => handleBuildingSelection('bEpulet'));

// Function to validate form submission
function validateForm(event) {
    event.preventDefault(); // Megakadályozzuk az oldal újratöltését

    const missingFields = [];

    requiredFields.forEach(field => {
        if (!field.value.trim()) missingFields.push(field.placeholder || field.name);
    });

    const isLabor = laborcsomagRadio?.checked;
    const isSzolg = szolgaltatasRadio?.checked;
    const isMind = mindkettoRadio?.checked;

    // Ha nincs kiválasztott rádiógomb, hozzáadjuk a hiányzó mezők közé
    if (!isLabor && !isSzolg && !isMind) {
        missingFields.push("Időpontfoglalás oka");
    }

    // Ha a laborcsomag vagy mindkettő választásnál nincs legalább egy laborcsomag választva
    if ((isLabor || isMind) && ![genetikaCheck, alapegeszCheck, diagnosztikaCheck, sportoloCheck, elelmiszerCheck, kornyezet2Check].some(cb => cb?.checked)) {
        missingFields.push("Legalább egy laborcsomag");
    }

    // Ha a szolgáltatás vagy mindkettő választásnál nincs legalább egy szolgáltatás választva
    if ((isSzolg || isMind) && ![vervizsCheck, mikroBCheck, genetikaiVCheck, kornyezetCheck, elelmiszer2Check, gyogyszerCheck, hormonCheck, immunologiaCheck].some(cb => cb?.checked)) {
        missingFields.push("Legalább egy szolgáltatás");
    }

    // Ha vannak hiányzó mezők, üzenet megjelenítése
    if (missingFields.length > 0) {
        displayMessage("Kérjük, töltse ki az összes mezőt!", true);
        return false;
    }

    // Ha nincs hiba, összegzés készítése és üzenet megjelenítése
    const summary = generateAppointmentSummary();
    displayMessage(summary, false);
    return true;
}
// Function to generate appointment summary
function generateAppointmentSummary() {
    let summary = "Időpontfoglalás összegzése:\n\n";
    summary += `Név: ${veznevInput.value} ${kernevInput.value}\n`;
    summary += `Telefon: ${telefonInput.value}\n`;
    summary += `Email: ${emailInput.value}\n\n`;

    summary += "Időpontfoglalás oka:\n";
    if (laborcsomagRadio?.checked) summary += "- Laborcsomag\n";
    if (szolgaltatasRadio?.checked) summary += "- Szolgáltatás\n";
    if (mindkettoRadio?.checked) summary += "- Mindkettő\n\n";

    if (laborcsomagRadio?.checked || mindkettoRadio?.checked) {
        summary += "Választott laborcsomagok:\n";
        if (genetikaCheck?.checked) summary += "- Genetikai vizsgálat\n";
        if (alapegeszCheck?.checked) summary += "- Alap egészségügyi szűrőcsomag\n";
        if (diagnosztikaCheck?.checked) summary += "- Diagnosztikai csomag\n";
        if (sportoloCheck?.checked) summary += "- Sportoló csomag\n";
        if (elelmiszerCheck?.checked) summary += "- Élelmiszer csomag\n";
        if (kornyezet2Check?.checked) summary += "- Környezet csomag\n";
    }

    if (szolgaltatasRadio?.checked || mindkettoRadio?.checked) {
        summary += "\nVálasztott szolgáltatások:\n";
        if (vervizsCheck?.checked) summary += "- Vérvizsgálat\n";
        if (mikroBCheck?.checked) summary += "- Mikrobiológiai vizsgálat\n";
        if (genetikaiVCheck?.checked) summary += "- Genetikai vizsgálat\n";
        if (kornyezetCheck?.checked) summary += "- Környezeti vizsgálat\n";
        if (elelmiszer2Check?.checked) summary += "- Élelmiszer vizsgálat\n";
        if (gyogyszerCheck?.checked) summary += "- Gyógyszer vizsgálat\n";
        if (hormonCheck?.checked) summary += "- Hormon vizsgálat\n";
        if (immunologiaCheck?.checked) summary += "- Immunológiai vizsgálat\n";
    }

    return summary;
}

// Initialize checkbox states
updateCheckboxStates();

// Form submission
const form = document.querySelector("form");
if (form) {
    form.addEventListener("submit", validateForm);
}
