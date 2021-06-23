class User {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
};

function emailControl(email) {
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        return true;
    } else {
        alert('Email incorrect');
        return false;
    }
};

const btnInscription = document.querySelector('#signup');
btnInscription.addEventListener('click', () => {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const user = new User(email, password);
    // if (emailControl(email)) {

        fetch('http://localhost:3000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            .then(() => {
                window.location.href = 'http://127.0.0.1:5500/frontend/index.html'
            })
            .catch(err => {
                console.error(err);
            });
    // }
});