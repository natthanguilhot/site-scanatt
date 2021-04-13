class Record {
    constructor (id, patient, scan, impression) {
        this.id = id
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

// to do : requete suppression attelle fini 
function deleteFinished() {
    fetch('http://localhost:3000/recordsFinished', { 
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(recordsFinished[popUp.dataset.idAttelle]), 
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.error(err);
    });
};

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
    let id = 1;
    if (records.length > 0) {
        id = records[records.length-1].id+1;
    }

    console.log(id);
    let newRecord = new Record (id, addNom, addScan, addDate);

    formulaireAddAttelle.style.display = "";

    fetch('http://localhost:3000/records', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRecord)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        
        displayRecords();
    })
    .catch(err => {
        console.error(err);
    });
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
    popUp.classList.replace('block', 'hidden');
    fetch('http://localhost:3000/records/'+ records[popUp.dataset.idAttelle].id, { 
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(records[popUp.dataset.idAttelle]), 
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.error(err);
    });
});
popUpDone.addEventListener('click', function() {
    popUp.classList.replace('block', 'hidden');
    
    fetch('http://localhost:3000/records/'+ records[popUp.dataset.idAttelle].id, { 
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(records[popUp.dataset.idAttelle])
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let id = 1;
        if (recordsFinished.length > 0) {
            id = recordsFinished[records.length-1].id+1;
        }
        records[popUp.dataset.idAttelle].id = id;

        fetch('http://localhost:3000/recordsFinished', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(records[popUp.dataset.idAttelle])
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.error(err);
        });
    })
    .catch(err => {
        console.error(err);
    });

    
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
    displayRecords();
    displayRecordsFinished();
}