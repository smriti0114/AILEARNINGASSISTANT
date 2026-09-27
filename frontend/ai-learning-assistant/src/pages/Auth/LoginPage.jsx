import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useAuth} from '../../context/AuthContext';
import authService from '../../services/authService';
import {Mail, Lock, ArrowRight} from 'lucide-react';
import toast from 'react-hot-toast';
import ThemeToggle from '../../components/common/ThemeToggle';

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setLoading(true);
      try {
        const { token, user } = await authService.login(email, password);
        localStorage.setItem("token", token); 
        login(user, token);
        toast.success('Logged in successfully!');
        navigate('/dashboard');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to login. Please check your credentials.');
        toast.error(err.response?.data?.message || 'Failed to login.');
      } finally {
        setLoading(false);
      }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-page bg-dotted">
          <div className="absolute top-6 right-6 z-50">
            <ThemeToggle />
          </div>


          <div className="relative w-full max-w-md px-6">
            <div className="bg-surface/80 backdrop-blur-xl border border-border-subtle/60 rounded-3xl shadow-xl shadow-border-subtle/50 p-10">
              {/* Header */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-24 h-24 shrink-0 mb-6 overflow-hidden rounded-full shadow-xl shadow-primary/20 ring-4 ring-page/50">
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-cover scale-110" />
                </div>
                <h1 className="text-2xl font-medium text-navy tracking-tight mb-2">
                  Welcome back
                </h1>
                <p className="text-muted text-sm">
                  Sign in to continue your journey
                </p>
              </div>

              {/* Form */}
              <div className="space-y-5">
                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-body uppercase tracking-wide">
                    Email
                  </label>
                  <div className="relative group">
                    <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${
                      focusedField === 'email' ? 'text-primary' : 'text-muted'
                    }`}>
                      <Mail className="h-5 w-5" strokeWidth={2} />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full h-12 pl-12 pr-4 border-2 border-border-subtle rounded-xl bg-page/50 text-navy placeholder-muted text-sm font-medium transition-all duration-200 focus:outline-none focus:border-primary focus:bg-surface focus:shadow-lg focus:shadow-primary/10"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                   <label className="block text-xs font-semibold text-body uppercase tracking-wide">
                     Password
                   </label>
                   <div className="relative group">
                     <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${
                       focusedField === 'password' ? 'text-primary' : 'text-muted'
                     }`}>
                       <Lock className="h-5 w-5" strokeWidth={2} />
                   </div>
                   <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full h-12 pl-12 pr-4 border-2 border-border-subtle rounded-xl bg-page/50 text-navy placeholder-muted text-sm font-medium transition-all duration-200 focus:outline-none focus:border-primary focus:bg-surface focus:shadow-lg focus:shadow-primary/10"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                {/*Error message*/}
                {error && (
                    <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                        <p className="text-xs text-red-600 font-medium text-center">{error}</p>
                    </div>
                )}

                {/*Submit Button*/}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="group relative w-full h-12 bg-primary hover:bg-primary-hover active:scale-[0.98] text-surface text-sm font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 shadow-lg shadow-primary/25 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-surface/30 border-t-surface rounded-full animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign in
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" strokeWidth={2.5} />
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-surface/10 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </button>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-border-subtle/60">
                  <p className="text-center text-sm text-muted">
                     Don't have an account?{' '}
                     <Link to='/register' className="font-semibold text-primary-hover hover:text-primary-dark transition-colors duration-200">
                       Sign up
                     </Link>
                  </p>
                </div>
              </div>

              {/* Subtle footer text */}
              <p className="text-center text-xs text-muted mt-6">
                By continuing, you agree to our Terms & Privacy Policy
              </p>
            </div>
        </div>
    )
}

export default LoginPage;