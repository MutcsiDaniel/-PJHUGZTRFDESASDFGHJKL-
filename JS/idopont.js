document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const form = document.querySelector('form');
    const formMessage = document.getElementById('form-message');
    const mapContainer = document.getElementById('terkepz');

    // Get appointment type radio buttons
    const labRadio = document.getElementById('laborcs');
    const serviceRadio = document.getElementById('szolgalt');
    const bothRadio = document.getElementById('mind2');

    // Get location radio buttons (using a different name attribute)
    const locationARadio = document.getElementById('aEpulet');
    const locationBRadio = document.getElementById('bEpulet');

    // Fix the radio button groups
    [labRadio, serviceRadio, bothRadio].forEach(radio => {
        radio.setAttribute('name', 'appointmentType');
    });

    [locationARadio, locationBRadio].forEach(radio => {
        radio.setAttribute('name', 'location');
    });

    // Get checkboxes
    const labCheckboxes = ['genetika', 'alapegesz', 'sportolo', 'elelmiszer', 'kornyezet2', 'diagnosztika']
        .map(id => document.getElementById(id));
    const serviceCheckboxes = ['mikroB', 'genetikaiV', 'kornyezet', 'elelmiszer2', 'gyogyszer', 'hormon', 'immunologia', 'vervizs']
        .map(id => document.getElementById(id));

    // Function to toggle checkbox availability
    function updateCheckboxes() {
        const labEnabled = labRadio.checked || bothRadio.checked;
        const serviceEnabled = serviceRadio.checked || bothRadio.checked;

        // Update lab checkboxes
        labCheckboxes.forEach(checkbox => {
            if (checkbox) {  // Check if checkbox exists
                checkbox.disabled = !labEnabled;
                checkbox.checked = false;  // Reset checkbox state
                checkbox.parentElement.style.opacity = labEnabled ? '1' : '0.5';
            }
        });

        // Update service checkboxes
        serviceCheckboxes.forEach(checkbox => {
            if (checkbox) {  // Check if checkbox exists
                checkbox.disabled = !serviceEnabled;
                checkbox.checked = false;  // Reset checkbox state
                checkbox.parentElement.style.opacity = serviceEnabled ? '1' : '0.5';
            }
        });
    }

    // Add event listeners to appointment type radio buttons
    [labRadio, serviceRadio, bothRadio].forEach(radio => {
        if (radio) {  // Check if radio exists
            radio.checked = false;  // Ensure no radio is checked by default
            radio.addEventListener('change', updateCheckboxes);
        }
    });

    // Handle location selection and map display
    function updateMap() {
        if (!locationARadio || !locationBRadio) return;  // Guard clause

        const mapHtml = locationARadio.checked ? 
            '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d380.9981644354839!2d19.205078899180652!3d50.02934769367189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4716be32014dffa1%3A0xe8e173d6821a53c5!2sMemorial%20and%20Museum%20Auschwitz-Birkenau!5e0!3m2!1shu!2shu!4v1742369296763!5m2!1shu!2shu" width="800" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>' :
            locationBRadio.checked ?
            '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d202.15600893748862!2d14.483567870064133!3d35.83683604980013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130e5a72808b3e23%3A0xb70cd39b5f96da83!2sLidl!5e0!3m2!1shu!2shu!4v1742369410269!5m2!1shu!2shu" width="800" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>' :
            '';
        mapContainer.innerHTML = mapHtml;
    }

    // Add event listeners to location radio buttons
    [locationARadio, locationBRadio].forEach(radio => {
        if (radio) {  // Check if radio exists
            radio.checked = false;  // Ensure no radio is checked by default
            radio.addEventListener('change', updateMap);
        }
    });

    // Form validation and submission
    function validateForm() {
        // Get form inputs
        const lastName = document.getElementById('veznev')?.value;
        const firstName = document.getElementById('kernev')?.value;
        const phone = document.getElementById('telefon')?.value;
        const email = document.getElementById('emaill')?.value;

        // Check required fields
        if (!lastName || !firstName || !phone || !email) {
            formMessage.textContent = 'Kérjük töltse ki az összes kötelező mezőt!';
            formMessage.style.color = 'white';
            return false;
        }

        // Check appointment type selection
        if (!labRadio?.checked && !serviceRadio?.checked && !bothRadio?.checked) {
            formMessage.textContent = 'Kérjük válasszon időpontfoglalás típust!';
            formMessage.style.color = 'white';
            return false;
        }

        // Check location selection
        if (!locationARadio?.checked && !locationBRadio?.checked) {
            formMessage.textContent = 'Kérjük válasszon helyszínt!';
            formMessage.style.color = 'white';
            return false;
        }

        // Check if at least one service is selected
        const hasSelectedService = [...labCheckboxes, ...serviceCheckboxes]
            .filter(checkbox => checkbox) // Filter out null values
            .some(checkbox => checkbox.checked);
        
        if (!hasSelectedService) {
            formMessage.textContent = 'Kérjük válasszon legalább egy szolgáltatást!';
            formMessage.style.color = 'white';
            return false;
        }

        // If validation passes, show summary
        showSummary();
        return false; // Prevent form submission
    }

    // Function to show form summary
    function showSummary() {
        const selectedServices = [...labCheckboxes, ...serviceCheckboxes]
            .filter(checkbox => checkbox && checkbox.checked)
            .map(checkbox => checkbox.parentElement.textContent.trim());

        const appointmentType = labRadio?.checked ? 'Laborcsomag' :
                              serviceRadio?.checked ? 'Szolgáltatás' : 'Mindkettő';

        const location = locationARadio?.checked ? '"A" épület' : '"B" épület';

        const summaryHTML = `
            <div style="background-color: transparent; padding: 20px; border-radius: 8px; margin-top: 20px;">
                <h3 style="color: white; margin-bottom: 15px;">Összegzés:</h3>
                <p><strong>Név:</strong> ${document.getElementById('veznev')?.value} ${document.getElementById('kernev')?.value}</p>
                <p><strong>Elérhetőség:</strong> Telefon: ${document.getElementById('telefon')?.value}, E-mail: ${document.getElementById('emaill')?.value}</p>
                <p><strong>Időpontfoglalás típusa:</strong> ${appointmentType}</p>
                <p><strong>Helyszín:</strong> ${location}</p>
                <p><strong>Választott szolgáltatás(ok):</strong></p>
                <ul style="margin-left: 20px;">
                    ${selectedServices.map(service => `<li>${service}</li>`).join('')}
                </ul>
            </div>
        `;

        formMessage.innerHTML = summaryHTML;
    }

    // Initialize form state
    updateCheckboxes();
    updateMap();

    // Add form submit handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        validateForm();
    });
});
