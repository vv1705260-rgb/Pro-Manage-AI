import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    await axios.post('http://localhost:5000/api/auth/register', {
      email,
      password
    });

    alert('Registered! Now login');
    window.location = '/';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white/20 p-8 rounded-xl">
        <h2 className="text-white text-2xl mb-4">Register</h2>

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
          onClick={register}
          className="bg-green-600 text-white w-full p-2 rounded"
        >
          Register
        </button>
      </div>
    </div>
  );
}
