const btnLogin = document.querySelector('#login');
btnLogin.addEventListener('click', () => {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    user = {email: email, password: password};

    fetch('http://localhost:3000/api/auth/login', { 
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(()=>{ window.location.href='http://127.0.0.1:5500/frontend/html/suivi.html'})
    .catch(err => {
        console.error(err);
    });
});