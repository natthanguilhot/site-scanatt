fetch('http://raspberrypi:3000/records', { 
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(), 
})
.then(response => response.json())
.then(response => {
    for (let attellesuppr of records) {
        if (records[index].isDeleted == true) {
        let templateline = document.querySelector('#attelle_suppr');
        let newLineDeleted = document.cloneNode('#attelle_suppr');
        newLineDeleted.removeAttribute('id');
        newLineDeleted.classList.replace('hidden', 'contents');
        newLineDeleted

        } 
    }
})