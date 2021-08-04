import './App.css';
import { useState } from 'react';
// import vault from './Vault'
const Crypto = require('cryptr')

function App() {
  const key = process.env.REACT_APP_SECRET_KEY
  const cartographer = new Crypto(key);
  const [name, setName] = useState("")
  const [age, setAge] = useState(1)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = () => {
    fetch('https://localhost:2000/users/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "name": cartographer.encrypt(name),
        "age": cartographer.encrypt(age),
        "email": cartographer.encrypt(email),
        "password": cartographer.encrypt(password)
      })
    }).then(res => res.json()).then(data => {
      console.log(data);
    })

    /* vault.read('secret/credentials').then(async ({ data }) => {
      const key = new Crypto(data['cartographer']);
      const reqName = key.encrypt(name);
      const reqAge = key.encrypt(age);
      const reqEmail = key.encrypt(email);
      const reqPassword = key.encrypt(password);
      fetch('https://localhost:2000/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
          "name": reqName,
          "age": reqAge,
          "email": reqEmail,
          "password": reqPassword
        }
      }).then(res => res.json()).then(data => {
        console.log(data);
      })
    }) */
  }

  return (
    <div className="App">
      <input type="text" defaultValue={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" defaultValue={age} onChange={(e) => setAge(parseInt(e.target.value))} />
      <input type="text" defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" defaultValue={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
