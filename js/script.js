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

function insertLigne ( nouvelleInstance, elementLigne ) {
    let dateSplitted = nouvelleInstance.impression.split('/');
    let dateImp = new Date(dateSplitted[2], dateSplitted[1]-1, dateSplitted[0]);
    let now = new Date();

    elementLigne.querySelector('.nom').innerHTML=nouvelleInstance.patient;
    elementLigne.querySelector('.scan').innerHTML=nouvelleInstance.scan;
    elementLigne.querySelector('.date').innerHTML=nouvelleInstance.impression;
    elementLigne.querySelector('.delai').innerHTML = now.diffInDays(dateImp) +' jr(s)';
};

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

let records = []
let recordsFinished = []
recordsFinished.push(new Record("Jean", "scan_12.imed", "07/04/2021"))
recordsFinished.push(new Record("Jean", "scan_12.imed", "07/04/2021"))
recordsFinished.push(new Record("Jean", "scan_12.imed", "07/04/2021"))
recordsFinished.push(new Record("Jean", "scan_12.imed", "07/04/2021"))
recordsFinished.push(new Record("Jean", "scan_12.imed", "07/04/2021"))
recordsFinished.push(new Record("Jean", "scan_12.imed", "07/04/2021"))
recordsFinished.push(new Record("Jean", "scan_12.imed", "07/04/2021"))

// Création d'une ligne html pour chaque ligne du array records
let ligne = document.querySelector('#patient');
let domRecordsArray = document.querySelector('#records-array');

for (let attelle of records) {
    let newLigne = ligne.cloneNode(true);
    newLigne.removeAttribute('id');
    newLigne.style.display = 'flex';
    newLigne.addEventListener('click', function() {
        attelle.isPrinting = !attelle.isPrinting;
        onStateChange(this, attelle.isPrinting);
    });
    insertLigne (attelle, newLigne);
    domRecordsArray.appendChild(newLigne);
}
//


// Création d'une ligne html pour chaque ligne fini du array recordsfinished
let lineFinished = document.querySelector('#line-finished');
let domRecordsFinishedArray = document.querySelector('#records-finished-array');

for (let attelleFini of recordsFinished) {
    let newLineFinished = lineFinished.cloneNode(true);
    newLineFinished.removeAttribute('id');
    newLineFinished.style.display = 'flex';

    insertLigneFini (attelleFini, newLineFinished);
    domRecordsFinishedArray.appendChild(newLineFinished);
};
function insertLigneFini (nouvelleInstanceFini, elementLigneFini) {
    let dateSplitted = nouvelleInstance.impression.split('/');
    let dateImp = new Date(dateSplitted[2], dateSplitted[1]-1, dateSplitted[0]);
    let now = new Date();

    elementLigneFini.querySelector('.nom-fini').innerHTML=nouvelleInstanceFini.patient;
    elementLigneFini.querySelector('.scan-fini').innerHTML=nouvelleInstanceFini.scan;
    elementLigneFini.querySelector('.date-fini').innerHTML=nouvelleInstanceFini.impression;
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

    let newLigne = ligne.cloneNode(true);
    newLigne.removeAttribute('id');
    newLigne.style.display = 'flex';
    newLigne.addEventListener('click', onClickLine);
    
    insertLigne (newRecord, newLigne);
    domRecordsArray.appendChild(newLigne);

    formulaireAddAttelle.style.display = "";
});
//