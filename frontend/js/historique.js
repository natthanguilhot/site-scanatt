if (!localStorage.getItem('User') === true) {
    window.location.href = "http://127.0.0.1:5500/frontend/index.html";
}


let token = JSON.parse(localStorage.getItem('User')).token;

function restoreDeleted() {
    let index = this.parentNode.dataset.indexAttelle;

    records[index].isDeleted = false;
    records[index].dateDeleted = null;
    let record = records[index];


    fetch('http://localhost:3000/api/attelles/' + record._id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
            body: JSON.stringify(record),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayRecordsDeleted();
        })
        .catch(err => {
            console.error(err);
        });
};

function addDisplayRecord(index, record, htmlTemplate, domRecords) {
    let newLine = htmlTemplate.cloneNode(true);
    newLine.removeAttribute('id');
    newLine.classList.remove('hidden');
    newLine.classList.add('patient');
    newLine.dataset.indexAttelle = index;

    let nomDeleted = newLine.querySelector('.nom_deleted');
    let scanDeleted = newLine.querySelector('.scan_deleted');
    let dateDeleted = newLine.querySelector('.date_deleted');
    nomDeleted.innerHTML = record.patient;
    scanDeleted.innerHTML = record.scan;
    dateDeleted.innerHTML = record.dateDeleted;

    let icSupp = newLine.querySelector('.restore');
    icSupp.addEventListener('click', restoreDeleted);

    domRecords.appendChild(newLine);
}
let records = []

function displayRecordsDeleted() {
    fetch('http://localhost:3000/api/attelles', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
        })
        .then(response => response.json())
        .then(response => {
            records = response;

            let ligne = document.querySelector('#attelle_suppr');
            let domRecordsArray = document.querySelector('main');
            let oldHTMLRecords = domRecordsArray.querySelectorAll("div.patient");
            for (let old of oldHTMLRecords) {
                domRecordsArray.removeChild(old);
            }

            records.forEach((attelle, i) => {
                if (attelle.isDeleted == true) {
                    addDisplayRecord(i, attelle, ligne, domRecordsArray);
                }
            });
        })
        .catch(err => {
            console.error(err);
        });
};

displayRecordsDeleted();

const logout = document.querySelector('#logout');
logout.addEventListener('click', () => {
    sessionStorage.removeItem('User');
    window.location.href = "http://127.0.0.1:5500/frontend/index.html";
});