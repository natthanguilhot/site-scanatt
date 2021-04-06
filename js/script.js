class Record {
    constructor (state, patient, scan, impression, delai) {
        this.state = state;
        this.patient = patient;
        this.scan = scan;
        this.impression = impression;
        this.délai = delai;
    }
}

let records = []
records.push(newrecord (true, 'jean', 'scan12345', '02/04/2021', '7jrs'));

let ligne = document.querySelector('#patient');

function insertLigne ( nouvelleInstance, elementLigne ) {
    elementLigne.querySelector('#nom').innerHTML(nouvelleInstance.patient);
    elementLigne.querySelector('#scan').innerHTML(nouvelleInstance.scan);
    elementLigne.querySelector('#date').innerHTML(nouvelleInstance.impression);
    elementLigne.querySelector('#delai').innerHTML(nouvelleInstance.delai);
};
insertLigne (newrecord, ligne);