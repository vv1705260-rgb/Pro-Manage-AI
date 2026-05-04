import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    const res = await axios.post('http://localhost:5000/api/auth/login', {
      email,
      password
    });

    localStorage.setItem('token', res.data.token);
    window.location = '/dashboard';
  };

  return (
    <div>
      <input onChange={e => setEmail(e.target.value)} placeholder=\"Email\" />
      <input onChange={e => setPassword(e.target.value)} placeholder=\"Password\" />
      <button onClick={login}>Login</button>
    </div>
  );
}
