function showRegister() {
  document.getElementById('login-panel').style.display = 'none';
  document.getElementById('register-panel').style.display = 'flex';
}

function showLogin() {
  document.getElementById('register-panel').style.display = 'none';
  document.getElementById('login-panel').style.display = 'flex';
}

function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  }).then(res => res.json()).then(data => {
    if (data.success) {
      document.getElementById('login-panel').style.display = 'none';
      document.getElementById('search-panel').style.display = 'flex';
    } else {
      alert(data.message);
    }
  });
}

function register() {
  const email = document.getElementById('newEmail').value;
  const password = document.getElementById('newPassword').value;
  fetch('/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  }).then(res => res.json()).then(data => {
    if (data.success) {
      alert('Registrado correctamente. Inicia sesión.');
      showLogin();
    } else {
      alert(data.message);
    }
  });
}
