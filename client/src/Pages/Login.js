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
import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      localStorage.setItem('token', res.data.token);
      window.location = '/dashboard';
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-black">
      <div className="bg-white/20 backdrop-blur-lg p-8 rounded-xl shadow-xl">
        <h2 className="text-white text-2xl mb-4">Login</h2>

        <input
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
          className="w-full mb-3 p-2 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
          className="w-full mb-3 p-2 rounded"
        />

        <button
          onClick={login}
          className="bg-purple-600 text-white w-full p-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
 http://localhost:5000/api/auth/login                                    }
https://pro-manage-ai-1.onrender.com/api/auth/login
