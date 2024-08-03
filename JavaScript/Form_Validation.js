// Tarifs par période
const rates = {
    lowSeason: 250,    // Décembre à Février
    midSeason: 270,    // Mars à Mai
    highSeason: 280,   // Juin à Août
    fallSeason: 260    // Septembre à Novembre
};

// Fonction pour déterminer le tarif par nuit en fonction du mois de la date d'arrivée
function getPricePerNight(SDate) {
    const date = new Date(SDate);
    const month = date.getMonth() + 1; // Les mois sont indexés à partir de 0

    if (month >= 12 || month <= 2) {
        return rates.lowSeason; // Période 1 : Décembre à Février
    } else if (month >= 3 && month <= 5) {
        return rates.midSeason; // Période 2 : Mars à Mai
    } else if (month >= 6 && month <= 8) {
        return rates.highSeason; // Période 3 : Juin à Août
    } else {
        return rates.fallSeason; // Période 4 : Septembre à Novembre
    }
}

// Cette fonction calcule le coût total en fonction des options sélectionnées
function updateCost() {
    let subTotal = 0;
    const SDate = document.getElementById('SDate').value;
    const EDate = document.getElementById('EDate').value;

    if (DateCheck(SDate, EDate)) {
        const pricePerNight = getPricePerNight(SDate);
        const SParsed = Date.parse(SDate);
        const EParsed = Date.parse(EDate);

        const diffTime = Math.abs(EParsed - SParsed);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        subTotal = pricePerNight * diffDays;
    }

    document.getElementById("subT").value = subTotal + "€" ;
}

// Cette fonction vérifie la validité des dates de début et de fin
function DateCheck(SDate, EDate) {
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    
    const todayStr = `${year}-${month < 10 ? '0' + month : month}-${date < 10 ? '0' + date : date}`;

    return (SDate > todayStr && EDate > SDate);
}

// Cette fonction rend visible les champs de temps en fonction de la validité des dates, et met à jour le coût
function TimeUnhide() {
    const SDate = document.getElementById('SDate').value;
    const EDate = document.getElementById('EDate').value;
    const ValidDate = DateCheck(SDate, EDate);

    if (ValidDate) {
        document.getElementById('ATime').classList.remove('hidden');
        document.getElementById('STime').classList.remove('hidden');    
        document.getElementById('STime').classList.add('input');    
        removeDisplayError(document.form1.SDate);
        removeDisplayError(document.form1.EDate);
        updateCost();
    } else {
        document.getElementById('ATime').classList.add('hidden');
        document.getElementById("STime").classList.add("hidden");
        document.getElementById("STime").classList.remove("input");    
        const msg = "Please check Start and End date";
        displayError(document.form1.EDate, msg);
        displayError(document.form1.SDate, msg);
    }
}

// Validation du prénom
function validateFname() {
    const fname = document.forms["form1"]["fname"].value;
    if (fname === "" ) {            
        const msg = "Field can't be left blank";
        displayError(document.form1.fname, msg);
        return false;
    } else {
        removeDisplayError();
    }
}

// Validation du nom de famille
function validateLname() {
    const lname = document.forms["form1"]["lname"].value;
    if (lname === "" ) {
        const msg = "Field can't be left blank";
        displayError(document.form1.lname, msg);
        return false;
    } else {
        removeDisplayError();
    }
}

// Validation de l'email
function validEmail() {
    const email_regexp = /^\w+@[a-z]+(\.[a-z]+)+$/;
    const email = document.forms["form1"]["email"];
    const valid = email_regexp.test(email.value);
    if (!valid) {
        displayError(email, "Email must be correct as it will be used to send booking confirmation");
        return false;
    } else {
        removeDisplayError();
        return true;
    }
}

// Suppression de l'affichage des erreurs
function removeDisplayError() {
    const errorElements = document.querySelectorAll("#error");
    errorElements.forEach(element => element.remove());
}

// Affichage des erreurs
function displayError(element, msg) {
    removeDisplayError();
    const msgElement = document.createElement("span");
    msgElement.setAttribute("id", "error");
    msgElement.textContent = msg;
    if (element !== document.forms["form1"]["email"]) {
        element.style.border = "solid 1px red";
    }
    msgElement.style.color = "red";
    msgElement.style.float = "right";
    element.parentNode.insertBefore(msgElement, element.nextSibling);    
}
