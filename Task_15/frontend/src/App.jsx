import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function useAuth() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const login = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setToken(data.token); setUser(data.user);
  };
  const logout = () => { localStorage.clear(); setToken(null); setUser(null); };
  return { token, user, login, logout };
}

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
}

function Login() {
  const nav = useNavigate();
  const auth = useAuth();
  const [email, setEmail] = useState('demo@demo.com');
  const [password, setPassword] = useState('Demo@123');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch(`${API}/api/auth/${isRegister? 'register':'login'}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Request failed');
      auth.login(data);
      nav('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      <form onSubmit={submit}>
        <div className="row">
          <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div className="row">
          <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        {error && <p style={{color:'#fca5a5'}}>{error}</p>}
        <div className="row">
          <button type="submit">{isRegister ? 'Create account' : 'Sign in'}</button>
          <button type="button" onClick={()=>setIsRegister(s=>!s)}>
            {isRegister ? 'Have an account? Login' : 'New here? Register'}
          </button>
        </div>
      </form>
    </div>
  );
}

function Dashboard() {
  const [data, setData] = useState(null);
  const auth = useAuth();

  useEffect(() => {
    (async () => {
      const res = await fetch(`${API}/api/protected`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const json = await res.json();
      setData(json);
    })();
  }, []);

  return (
    <div className="container">
      <div className="nav">
        <Link to="/">Home</Link>
        <button onClick={auth.logout}>Logout</button>
      </div>
      <h2>Dashboard (Protected)</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

function Home() {
  return (
    <div className="container">
      <div className="nav">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
      <h2>Welcome to the Auth App</h2>
      <p>Use the Login page to get a token. Then visit the protected Dashboard.</p>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
