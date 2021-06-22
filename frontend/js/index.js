const btnLogin = document.querySelector('#login');
btnLogin.addEventListener('click', () => {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const identifiers = {
        email: email,
        password: password
    };
    fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(identifiers),
        })
        .then(response => response.json())
        .then(response => {
            if (!sessionStorage.getItem('User') === false) {
                sessionStorage.removeItem('User');
                let user = {
                    userId: response.userId,
                    token: response.token
                };
                sessionStorage.setItem('User', JSON.stringify(user));
                window.location.href = "http://127.0.0.1:5500/frontend/html/suivi.html";
            } else {
                let user = {
                    userId: response.userId,
                    token: response.token
                };
                sessionStorage.setItem('User', JSON.stringify(user));
                window.location.href = "http://127.0.0.1:5500/frontend/html/suivi.html";
            }
        })
        .catch(error => {
            console.error(error);
        });
});