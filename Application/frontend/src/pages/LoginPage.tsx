import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const ok = await login(email, password);
    if (ok) navigate('/rooms');
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-800">
        <h1 className="text-3xl font-bold text-white mb-2 text-center">Welcome back</h1>
        <p className="text-gray-400 text-center mb-8">Log in to Pixel Party</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <Button type="submit" isLoading={loading} className="mt-2 w-full py-3">
            Log In
          </Button>
        </form>

        <p className="text-gray-400 text-center mt-6 text-sm">
          No account?{' '}
          <Link to="/register" className="text-primary-400 hover:text-primary-300 font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
