import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, ShieldPlus, Activity, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth, getRoleHome } from '@/lib/auth';
import { Logo } from '@/components/Logo';
import { Button, Input, Spinner } from '@/components/ui';
import { MOCK_ACCOUNTS } from '@/lib/mockData';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = (location.state as { from?: string })?.from;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      const token = localStorage.getItem('predicare_token');
      const account = MOCK_ACCOUNTS.find((a) => 'mock-jwt-' + a.role === token);
      if (account) {
        if (from && from.startsWith('/')) {
          navigate(from);
        } else {
          navigate(getRoleHome(account.role));
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (accountEmail: string, accountPassword: string) => {
    setEmail(accountEmail);
    setPassword(accountPassword);
    setError('');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-navy-800 via-navy-700 to-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-navy-400/10 rounded-full blur-3xl" />

        <div className="relative flex flex-col justify-center px-12 xl:px-20 text-white">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
                <ShieldPlus className="w-7 h-7 text-white" />
                <Activity className="w-3.5 h-3.5 text-accent-400 absolute mt-6 ml-6" />
              </div>
              <div>
                <span className="text-2xl font-bold tracking-tight">PrediCare</span>
                <span className="text-2xl font-light text-accent-400 tracking-tight"> TPA</span>
              </div>
            </div>
          </div>

          <h1 className="text-3xl xl:text-4xl font-bold leading-tight mb-4 max-w-md">
            Détecter la fraude.<br />
            Expliquer chaque alerte.<br />
            Protéger les assurés.
          </h1>

          <p className="text-navy-200 text-base mb-10 max-w-md leading-relaxed">
            La plateforme intelligente pour les tiers-payants santé. Analyse prédictive, explicabilité et contrôle humain.
          </p>

          <div className="space-y-3 max-w-md">
            {[
              { label: 'Conforme RGPD', icon: '🔒' },
              { label: 'IA explicable', icon: '📊' },
              { label: 'Contrôle humain', icon: '✅' },
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-3 bg-white/5 backdrop-blur rounded-xl px-4 py-3 border border-white/10">
                <span className="text-lg">{badge.icon}</span>
                <span className="text-sm font-medium text-white">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel - login form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-surface-50 dark:bg-surface-900">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 flex justify-center">
            <Logo size="lg" />
          </div>

          <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-card border border-surface-200 dark:border-surface-700 p-8">
            <h2 className="text-2xl font-bold text-surface-800 dark:text-surface-100 mb-1">Connexion</h2>
            <p className="text-sm text-surface-500 dark:text-surface-400 mb-6">Accédez à votre espace PrediCare TPA</p>

            {error && (
              <div className="mb-4 flex items-start gap-2 p-3 rounded-xl bg-danger-50 dark:bg-danger-900/30 border border-danger-200 dark:border-danger-800 text-sm text-danger-700 dark:text-danger-300">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Adresse email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.fr"
                required
                icon={<Mail className="w-4 h-4" />}
              />
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                  Mot de passe <span className="text-danger-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-900 text-surface-900 dark:text-surface-100 placeholder-surface-400 pl-10 pr-10 py-2.5 text-sm focus:border-navy-500 focus:ring-1 focus:ring-navy-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <span className="text-sm text-navy-600 hover:text-navy-700 cursor-pointer">Mot de passe oublié ?</span>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner className="w-4 h-4" /> Connexion...
                  </>
                ) : (
                  'Se connecter'
                )}
              </Button>
            </form>
          </div>

          {/* Demo accounts */}
          <div className="mt-6 bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 p-5">
            <p className="text-xs font-medium text-surface-500 dark:text-surface-400 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-500 animate-pulse" />
              Comptes de démonstration
            </p>
            <div className="grid grid-cols-2 gap-2">
              {MOCK_ACCOUNTS.map((acc) => (
                <button
                  key={acc.role}
                  onClick={() => fillDemo(acc.email, acc.password)}
                  className="text-left px-3 py-2.5 rounded-xl border border-surface-200 dark:border-surface-600 hover:border-navy-300 dark:hover:border-navy-600 hover:bg-navy-50 dark:hover:bg-navy-900/20 transition-all"
                >
                  <p className="text-xs font-medium text-surface-700 dark:text-surface-200">{acc.display_name}</p>
                  <p className="text-[10px] text-surface-400 mt-0.5">{acc.pseudonym}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
