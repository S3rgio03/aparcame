const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.'));

app.post('/register', (req, res) => {
  const { email, password } = req.body;
  let users = JSON.parse(fs.readFileSync('database.json', 'utf8'));
  if (users.find(u => u.email === email)) {
    return res.json({ success: false, message: 'Usuario ya registrado' });
  }
  users.push({ email, password });
  fs.writeFileSync('database.json', JSON.stringify(users));
  res.json({ success: true });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const users = JSON.parse(fs.readFileSync('database.json', 'utf8'));
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.json({ success: true });
  } else {
    res.json({ success: false, message: 'Credenciales incorrectas' });
  }
});

app.listen(PORT, () => console.log(`Servidor activo en http://localhost:${PORT}`));
