class Record {
    constructor (patient, scan, impression) {
        this.isPrinting = false;
        this.patient = patient;
        this.scan = scan;
        this.impression = impression;
    }
}

Date.prototype.diffInDays = function (other) {
    return Math.round((other.valueOf()-this.valueOf())/(1000*60*60*24));
}

function convertHTMLDate (date) {
    let dateToSplitted = date.split('-');
    return dateToSplitted[2]+'/'+dateToSplitted[1]+'/'+dateToSplitted[0];
};

function onStateChange(line, isPrinting) {
    if(!isPrinting) {
        line.querySelector('.ico-printing').style.display = "none";
        line.querySelector('.ico-waiting').style.display = "block";
    }
    else if(isPrinting) {
        line.querySelector('.ico-printing').style.display = "block";
        line.querySelector('.ico-waiting').style.display = "none";
    }
}
let popUp = document.querySelector('#pop-up');

let records = []

let recordsFinished = []
recordsFinished.push(new Record("Jean", "scan_12.imed", "07/04/2021"))
recordsFinished.push(new Record("Jean", "scan_12.imed", "07/04/2021"))

function deleteFinished() {
    recordsFinished.splice(this.parentNode.dataset.idAttelle, 1);
    displayRecordsFinished();
}

// Création/actualisation d'une ligne html pour chaque ligne du array records
function insertLigne ( nouvelleInstance, elementLigne ) {
    let dateSplitted = nouvelleInstance.impression.split('/');
    let dateImp = new Date(dateSplitted[2], dateSplitted[1]-1, dateSplitted[0]);
    let now = new Date();

    onStateChange(elementLigne, nouvelleInstance.isPrinting);
    elementLigne.querySelector('.nom').innerHTML=nouvelleInstance.patient;
    elementLigne.querySelector('.scan').innerHTML=nouvelleInstance.scan;
    elementLigne.querySelector('.date').innerHTML=nouvelleInstance.impression;
    elementLigne.querySelector('.delai').innerHTML = now.diffInDays(dateImp) +' jr(s)';
};

function displayRecords() {
    let ligne = document.querySelector('#patient');
    let domRecordsArray = document.querySelector('#records-array');
    let oldHTMLRecords = document.querySelectorAll("div.patient");
    for(let old of oldHTMLRecords) {
        domRecordsArray.removeChild(old);
    }
    
    records.forEach(function(attelle, i) {
        let newLigne = ligne.cloneNode(true);
        newLigne.removeAttribute('id');
        newLigne.classList.add('patient');
        newLigne.style.display = 'flex';
        newLigne.addEventListener('click', function(event) {
            popUp.dataset.idAttelle = i;
            const x = event.pageX;
            const y = event.pageY;
            if (popUp.classList.contains('hidden')) {
                popUp.classList.replace('hidden', 'block');
            }
            popUp.style.top = y +'px';
            popUp.style.left = x +'px';
            popUp.style.zIndex = '100';
        });
        insertLigne (attelle, newLigne);
        domRecordsArray.appendChild(newLigne);
    });
};
//
// Création/actualisation d'une ligne FINI html pour chaque ligne du array recordsFinished
let lineFinished = document.querySelector('#line-finished');
let domRecordsFinishedArray = document.querySelector('#records-finished-array');

function insertLigneFini (nouvelleInstanceFini, elementLigneFini) {
    let dateSplitted = nouvelleInstanceFini.impression.split('/');
    let dateImp = new Date(dateSplitted[2], dateSplitted[1]-1, dateSplitted[0]);
    let now = new Date();

    elementLigneFini.querySelector('.nom-fini').innerHTML=nouvelleInstanceFini.patient;
    elementLigneFini.querySelector('.scan-fini').innerHTML=nouvelleInstanceFini.scan;
    elementLigneFini.querySelector('.date-fini').innerHTML=nouvelleInstanceFini.impression;
};

function displayRecordsFinished () {
    let ligneFinished = document.querySelector('#line-finished');
    let domRecordsFinishedArray = document.querySelector('#records-finished-array');
    let oldHTMLRecordsFinished = document.querySelectorAll("div.patientfini");
    for(let old of oldHTMLRecordsFinished) {
        domRecordsFinishedArray.removeChild(old);
    }

    recordsFinished.forEach(function(attelleFini, i) {
        let newLigneFinished = ligneFinished.cloneNode(true);
        newLigneFinished.removeAttribute('id');
        newLigneFinished.classList.add('patientfini');
        newLigneFinished.classList.remove('hidden');
        newLigneFinished.dataset.idAttelle = i;
        let icSupp = newLigneFinished.querySelector('i');
        icSupp.addEventListener('click', deleteFinished);
        insertLigneFini (attelleFini, newLigneFinished);
        domRecordsFinishedArray.appendChild(newLigneFinished);
    });
};
//

// Ouverture formulaire et ajout ligne d'attelle
let openFormAttelle = document.querySelector('#btn-open-form-attelle');
let formulaireAddAttelle = document.querySelector('#formulaire-add-attelle');

openFormAttelle.addEventListener('click', function(){
    if(formulaireAddAttelle.style.display == "block") {
        formulaireAddAttelle.style.display = "";
    }
    else if(formulaireAddAttelle.style.display == "") {
        formulaireAddAttelle.style.display = "block";
    }
});

const boutonAddAttelle = document.querySelector('#btn-add-attelle');

boutonAddAttelle.addEventListener('click', function() {
    let addNom = document.querySelector('#add-nom').value;
    let addScan = document.querySelector('#add-scan').value;
    let addDate = convertHTMLDate(document.querySelector('#add-date').value);
    let newRecord = new Record (addNom, addScan, addDate);
    records.push(newRecord);

    displayRecords();
    
    formulaireAddAttelle.style.display = "";
    event.preventDefault();
});

//
 
//Fonctionnalitées pop-up.
let popUpImpression = document.querySelector('#popup-impression');
let popUpDelete = document.querySelector('#popup-delete');
let popUpDone = document.querySelector('#popup-done');

popUpImpression.addEventListener('click', function() {
    records[popUp.dataset.idAttelle].isPrinting = true;
    displayRecords();
    popUp.classList.replace('block', 'hidden');
});
popUpDelete.addEventListener('click', function() {
    records.splice(popUp.dataset.idAttelle, 1);
    popUp.classList.replace('block', 'hidden');
    displayRecords();
});
popUpDone.addEventListener('click', function() {
    recordsFinished.push(records[popUp.dataset.idAttelle]);
    displayRecordsFinished();

    records.splice(popUp.dataset.idAttelle, 1);
    displayRecords();

    popUp.classList.replace('block', 'hidden');
});
//
let data ;

fetch("http://localhost:3000/records")
.then(response => response.json())
.then(response => {
    records = response;
    return fetch("http://localhost:3000/recordsFinished");
})
.then(response => response.json())
.then(response => {
    recordsFinished = response;
    init();
})

function init() {
    console.log(records);
    displayRecords();
    displayRecordsFinished();
}