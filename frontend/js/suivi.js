if(!sessionStorage.getItem('User') === true){
    window.location.href = "http://127.0.0.1:5500/frontend/index.html";
} 

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

let records = [];
let token = JSON.parse(sessionStorage.getItem('User')).token;


function deleteFinished() {
    let index = this.parentNode.dataset.indexAttelle;
    records[index].isDeleted = true;
    records[index].dateDeleted = new Date().DDMMYYYYHHMMSS();
    fetch('http://localhost:3000/api/attelles/'+ records[index]._id, { 
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
        body: JSON.stringify(records[index]), 
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        displayRecordsFinished();
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
    fetch("http://localhost:3000/api/attelles", { 
        method: 'GET',
        headers: {
            'authorization': token
        },
        })
    .then(response => response.json())
    .then(response => {
        records = response;
        records.forEach(function(attelle, i) {
            if(attelle.isFinished == false && attelle.isDeleted == false) {
                let newLigne = ligne.cloneNode(true);
                newLigne.removeAttribute('id');
                newLigne.classList.add('patient');
                newLigne.style.display = 'flex';
                newLigne.dataset.idAttelle = i;
                newLigne.addEventListener('click', function(event) {
                    popUp.dataset.idAttelle = i;
                    const x = event.pageX;
                    const y = event.pageY;
                    popUp.style.top = y +'px';
                    popUp.style.left = x +'px';
                    popUp.style.zIndex = '100';
                    setTimeout(function() {
                        if (popUp.classList.contains('hidden')) {
                            popUp.classList.replace('hidden', 'block');
                        }
                    }, 1);
                });
                insertLigne (attelle, newLigne);
                domRecordsArray.appendChild(newLigne);
            }
        });
    })
    .catch(error => console.log(error));    
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
    fetch("http://localhost:3000/api/attelles", { 
        method: 'GET',
        headers: {
            'authorization': token
        },
        })
    .then(response => response.json())
    .then(response => {
        records = response;
        records.forEach(function(attelleFini, i) {
            if(attelleFini.isFinished == true && attelleFini.isDeleted == false) {
                let newLigneFinished = ligneFinished.cloneNode(true);
                newLigneFinished.removeAttribute('id');
                newLigneFinished.classList.add('patientfini');
                newLigneFinished.classList.remove('hidden');
                newLigneFinished.dataset.idAttelle = attelleFini.id;
                newLigneFinished.dataset.indexAttelle = i;
                let icSupp = newLigneFinished.querySelector('i');
                icSupp.addEventListener('click', deleteFinished);
                insertLigneFini (attelleFini, newLigneFinished);
                domRecordsFinishedArray.appendChild(newLigneFinished);
            }
        });
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
//

// Add attelle / POST
const boutonAddAttelle = document.querySelector('#btn-add-attelle');
boutonAddAttelle.addEventListener('click', function() {
    let addNom = document.querySelector('#add-nom').value;
    let addScan = document.querySelector('#add-scan').value;
    let addDate = convertHTMLDate(document.querySelector('#add-date').value);
   
    let newRecord = new Record (addNom, addScan, addDate);
    records.push(newRecord);


    fetch('http://localhost:3000/api/attelles', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token,
        },
        body: JSON.stringify(newRecord)
    })
    .then(response => response.json())
    .then(()=> {
        formulaireAddAttelle.style.display = "";
        displayRecords();
    })
    .catch(err => {
        console.error(err);
    });
});
//
 
////////////////////////////////////////////////////////////////////////Fonctionnalitées pop-up. //////////////////////////////////////////////////////////////////////////////////
let popUpImpression = document.querySelector('#popup-impression');
let popUpDelete = document.querySelector('#popup-delete');
let popUpDone = document.querySelector('#popup-done');

popUpImpression.addEventListener('click', function() {
    records[popUp.dataset.idAttelle].isPrinting = true;
    let rec = records[popUp.dataset.idAttelle];
    console.log(rec);
    fetch('http://localhost:3000/api/attelles/'+ rec._id, { 
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
        body: JSON.stringify(rec), 
    })
    .then(() => {
        displayRecords();
        popUp.classList.replace('block', 'hidden');
    })
    .catch(err => {
        console.error(err);
    });
});
popUpDelete.addEventListener('click', function() {
    records[popUp.dataset.idAttelle].isDeleted = true;
    records[popUp.dataset.idAttelle].dateDeleted = new Date().DDMMYYYYHHMMSS();
    let rec = records[popUp.dataset.idAttelle];

    popUp.classList.replace('block', 'hidden');
    fetch('http://localhost:3000/api/attelles/'+ rec._id, { 
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
        body: JSON.stringify(rec), 
    })
    .then(() => displayRecords())
    .catch(err => {
        console.error(err);
    });
});
popUpDone.addEventListener('click', function() {
    records[popUp.dataset.idAttelle].isFinished = true;
    let rec = records[popUp.dataset.idAttelle];
    fetch('http://localhost:3000/api/attelles/'+ rec._id, { 
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
        body: JSON.stringify(rec), 
    })
    .then(response => response.json())
    .then(() => {
        displayRecords();
        displayRecordsFinished();
        popUp.classList.replace('block', 'hidden');
    })
    .catch(err => {
        console.error(err);
    });  
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function init() {
    displayRecords();
    displayRecordsFinished();
}

init();

document.addEventListener('click', function() {
    if (popUp.classList.contains('block')) {
        popUp.classList.replace('block', 'hidden');
    }
});

/////////////////////////////////////////////////////////////////////////////////////////// SUPPR ALL //////////////////////////////////////////////
const supprAllFinished = document.querySelector('#suppr_all_finished');
supprAllFinished.addEventListener('click', function(){
    for(let attelle of records){
        if (attelle.isFinished === true && attelle.isDeleted === false) {
            attelle.isDeleted = true;
            attelle.dateDeleted = new Date().DDMMYYYYHHMMSS();
            fetch('http://localhost:3000/api/attelles/'+ attelle._id, { 
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                body: JSON.stringify(attelle), 
            })
            .then(() => {
                displayRecordsFinished();
            })
            .catch(err => {
                console.error(err);
            });  
        }
    }
});

const logout = document.querySelector('#logout');
logout.addEventListener('click', () => {
    sessionStorage.removeItem('User');
    window.location.href = "http://127.0.0.1:5500/frontend/index.html";     
});





















///!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\ DELETE ALL /!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\
let testdelete = document.querySelector('#test');
testdelete.addEventListener('click', function(){
    fetch('http://localhost:3000/api/attelles', { 
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
    })
    .then(() => 
        window.location.reload())
    .catch(err => {
        console.error(err);
    });  
})
///!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\