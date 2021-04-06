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


let section = document.getElementsByTagName ('section');

/* ligne.innerHTML(newrecord);
section.appendchild(ligne); */

function insert ( nouvelleInstance ) {
    let ligne = document.querySelector('#patient');

    const state = document.querySelector('#state');
    const nom = document.querySelector('#nom');
    const scan = document.querySelector('#scan');
    const date = document.querySelector('#date');
    const delai = document.querySelector('#delai');
};
function insertLigne( nouvelleInstance, elementLigne ) {
    elementLigne.querySelector('#nom').innerHTML(nouvelleInstance.patient);
    elementLigne.querySelector('#scan').innerHTML();
    elementLigne.querySelector('#date').innerHTML();
    elementLigne.querySelector('#delai').innerHTML());
};