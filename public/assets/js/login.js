const formLogin = document.getElementById('form-login');
const formRegister = document.getElementById('form-register');
const errorMessageDiv  = document.getElementById('div-error-message');

const btnLogin = document.getElementById('btn-login');
const btnRegister = document.getElementById('btn-register');

const loginUsername  = document.getElementById('login-username');
const loginPassword  = document.getElementById('login-password');

const registerUsername  = document.getElementById('register-username');
const registerPassword  = document.getElementById('register-password');
const registerConfirmPassword  = document.getElementById('register-confirmPassword');

function toggleForm() {
  formLogin.classList.toggle('form-hide')
  formRegister.classList.toggle('form-hide');
  errorMessageDiv.className = '';
};

document.addEventListener('DOMContentLoaded', () => {
  const socket = io();

  let socketId = undefined
  socket.emit('getmyidsocket', {});
  socket.on('myid', ({id}) => {
    socketId = id;
  });

  socket.on('userErrorLogin', ({message}) => {
    errorMessageDiv.querySelector('p').textContent = message;
    errorMessageDiv.className = '';
  });

  formLogin.addEventListener('submit', async (event) => {
    const username = loginUsername.value;
    const password = loginPassword.value;
    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, socketId }),
    });
    if(response.redirected) {
      window.location.href = response.url;
    };
  });
});