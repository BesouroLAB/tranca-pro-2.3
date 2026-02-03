
import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';
import { useAuth } from './AuthContext';
import { Moon, Sun, Save, User, Mail, Phone, Lock, LogOut, ShieldCheck, QrCode, Globe, Crown, MessageSquare, Briefcase, BarChart2, Calendar, ChevronLeft, DollarSign } from 'lucide-react';
import { Transaction, Gender } from '../types';
import { useNavigate } from 'react-router-dom';

// Google Icon Component (Inline SVG for branded look)
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const {
    user,
    login,
    loginWithGoogle,
    register,
    verifyCode,
    isAuthenticated,
    logout,
    sendVerificationCode,
    updateProfile,
    updatePublicProfile
  } = useAuth();
  const navigate = useNavigate();

  // Auth Form State
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [verificationStep, setVerificationStep] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Dashboard Metrics State
  const [metrics, setMetrics] = useState({
    totalServices: 0,
    totalRevenue: 0,
    daysActive: 0
  });

  const isPremium = user?.plan === 'premium';

  useEffect(() => {
    if (isAuthenticated) {
      // Calculate metrics from localStorage
      const transactions: Transaction[] = JSON.parse(localStorage.getItem('transactions') || '[]');
      const pricingHistory = JSON.parse(localStorage.getItem('pricingHistory') || '[]');

      const revenue = transactions
        .filter(t => t.type === 'income')
        .reduce((acc, curr) => acc + curr.value, 0);

      // Mock days active calculation based on random or user date
      const days = user?.memberSince ? Math.floor((new Date().getTime() - new Date(Date.parse(user.memberSince)).getTime()) / (1000 * 3600 * 24)) : 1;

      setMetrics({
        totalServices: pricingHistory.length,
        totalRevenue: revenue,
        daysActive: Math.max(1, days)
      });
    }
  }, [isAuthenticated, user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(formData.email, formData.password);
    } catch (e) {
      setError('Erro ao entrar. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await loginWithGoogle();
    } catch (e) {
      setError('Erro ao conectar com Google.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(formData);
      await sendVerificationCode(formData.phone || formData.email, formData.phone ? 'whatsapp' : 'email');
      setVerificationStep(true);
    } catch (e) {
      setError('Erro ao criar conta.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    const success = await verifyCode(code);
    if (!success) {
      setError('Código inválido.');
      setLoading(false);
    } else {
      setVerificationStep(false);
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    await sendVerificationCode(formData.phone || formData.email, formData.phone ? 'whatsapp' : 'email');
  };

  const handleSaveProfile = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // --- RENDER: NOT LOGGED IN ---
  if (!isAuthenticated && !verificationStep) {
    return (
      <div className="max-w-md mx-auto py-10 animate-fade-in px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-display text-stone-800 dark:text-stone-100 mb-2">Boas-vindas</h2>
          <p className="text-stone-500">Faça login para gerenciar seu negócio.</p>
        </div>

        <div className="bg-white dark:bg-stone-800 p-8 rounded-[2.5rem] shadow-xl border border-stone-100 dark:border-stone-700">
          {/* Google Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white dark:bg-stone-100 text-stone-700 font-medium py-4 rounded-2xl border border-stone-300 dark:border-stone-200 hover:bg-stone-50 transition-colors flex items-center justify-center gap-3 mb-6 shadow-sm active:scale-95"
          >
            {loading ? <span className="text-xs">Conectando...</span> : (
              <>
                <GoogleIcon />
                <span className="font-bold">Continuar com Google</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-px bg-stone-200 dark:bg-stone-600 flex-1"></div>
            <span className="text-[10px] text-stone-400 font-black uppercase tracking-widest">ou e-mail</span>
            <div className="h-px bg-stone-200 dark:bg-stone-600 flex-1"></div>
          </div>

          <div className="flex mb-6 border-b border-stone-100 dark:border-stone-700">
            <button
              onClick={() => setAuthMode('login')}
              className={`flex-1 pb-3 text-sm font-black uppercase tracking-widest ${authMode === 'login' ? 'text-gold-500 border-b-2 border-gold-500' : 'text-stone-400'}`}
            >
              Entrar
            </button>
            <button
              onClick={() => setAuthMode('register')}
              className={`flex-1 pb-3 text-sm font-black uppercase tracking-widest ${authMode === 'register' ? 'text-gold-500 border-b-2 border-gold-500' : 'text-stone-400'}`}
            >
              Criar Conta
            </button>
          </div>

          <form onSubmit={authMode === 'login' ? handleLogin : handleRegister} className="space-y-4">
            {authMode === 'register' && (
              <div className="space-y-1">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Nome Completo</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                  <input
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-12 p-4 rounded-2xl border border-stone-200 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-stone-800 dark:text-stone-100 outline-none focus:border-gold-500 transition-all"
                    placeholder="Seu nome profissional"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 p-4 rounded-2xl border border-stone-200 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-stone-800 dark:text-stone-100 outline-none focus:border-gold-500 transition-all"
                  placeholder="exemplo@gmail.com"
                />
              </div>
            </div>

            {authMode === 'register' && (
              <div className="space-y-1">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Telefone / WhatsApp</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                  <input
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-12 p-4 rounded-2xl border border-stone-200 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-stone-800 dark:text-stone-100 outline-none focus:border-gold-500 transition-all"
                    placeholder="(00) 00000-0000"
                  />
                </div>
                <p className="text-[10px] text-stone-400 mt-1 ml-1 font-medium">Validaremos por SMS ou WhatsApp.</p>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 p-4 rounded-2xl border border-stone-200 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-stone-800 dark:text-stone-100 outline-none focus:border-gold-500 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && <div className="text-red-500 text-xs text-center border border-red-200 bg-red-50 p-3 rounded-xl animate-shake">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-stone-800 dark:bg-gold-500 text-white dark:text-stone-900 py-4 rounded-2xl font-black uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all shadow-lg"
            >
              {loading ? 'Processando...' : authMode === 'login' ? 'Acessar Plataforma' : 'Criar minha Conta'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- RENDER: VERIFICATION ---
  if (!isAuthenticated && verificationStep) {
    return (
      <div className="max-w-md mx-auto py-10 px-4">
        <div className="bg-white dark:bg-stone-800 p-10 rounded-[2.5rem] shadow-xl border border-stone-100 dark:border-stone-700 text-center animate-fade-in">
          <div className="w-16 h-16 bg-gold-100 dark:bg-gold-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-gold-600">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-2xl font-display text-stone-800 dark:text-stone-100 mb-2">Verificação Seguro</h2>
          <p className="text-stone-500 text-sm mb-8 leading-relaxed">
            Insira o código de 4 dígitos enviado para <strong>{formData.phone || formData.email}</strong>
          </p>

          <input
            className="w-full text-center text-4xl tracking-[12px] p-5 rounded-2xl border-2 border-stone-200 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 dark:text-stone-100 focus:border-gold-500 outline-none mb-8 font-mono font-black"
            placeholder="0000"
            maxLength={4}
            value={code}
            onChange={e => setCode(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm mb-6 font-bold">{error}</p>}

          <button
            onClick={handleVerify}
            disabled={loading || code.length < 4}
            className="w-full bg-gold-500 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-gold-600 active:scale-95 transition-all mb-4 shadow-lg shadow-gold-500/20"
          >
            {loading ? 'Validando...' : 'Verificar e Entrar'}
          </button>

          <button onClick={handleResendCode} className="text-xs text-stone-400 font-bold uppercase tracking-wider hover:text-gold-500 transition-colors">
            Não recebi o código
          </button>
        </div>
      </div>
    );
  }

  // --- RENDER: LOGGED IN (PROFILE DASHBOARD) ---
  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* Profile Header (Optimized) */}
      <div className="bg-white dark:bg-stone-800 rounded-[2.5rem] p-8 shadow-xl border border-stone-100 dark:border-stone-700 relative overflow-hidden group">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold-500/5 rounded-full blur-[80px] group-hover:bg-gold-500/10 transition-colors"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] group-hover:bg-emerald-500/10 transition-colors"></div>

        {isPremium && (
          <div className="absolute top-6 right-6 bg-gradient-to-r from-gold-400 to-amber-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-gold-500/20 animate-pulse z-20">
            <Crown size={12} fill="currentColor" /> PREMIUM 💎
          </div>
        )}

        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="relative">
            <div className={`w-32 h-32 rounded-[2.5rem] flex items-center justify-center text-white text-5xl font-display border-4 border-white dark:border-stone-700 shadow-2xl transform group-hover:rotate-3 transition-transform duration-500 ${isPremium ? 'bg-gradient-to-br from-gold-400 via-amber-500 to-amber-700' : 'bg-stone-400'}`}>
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-white dark:bg-stone-800 p-2 rounded-2xl shadow-lg border border-stone-100 dark:border-stone-700">
              <ShieldCheck size={20} className="text-emerald-500" />
            </div>
          </div>

          <div className="text-center md:text-left space-y-2 flex-1">
            <div>
              <h2 className="text-3xl font-display text-stone-900 dark:text-stone-100">{user?.name}</h2>
              <p className="text-stone-400 text-sm font-medium tracking-wide font-black uppercase text-[10px] tracking-[0.2em] mb-1">Braider Profissional • @{user?.publicProfile?.username || 'user'}</p>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase rounded-lg flex items-center gap-1.5">
                <ShieldCheck size={12} /> Verificado
              </span>
              <span className="px-3 py-1 bg-stone-100 dark:bg-stone-700 text-stone-500 dark:text-stone-300 text-[10px] font-bold uppercase rounded-lg">
                🛡️ {user?.verified ? 'Seguro' : 'Pendente'}
              </span>
              <span className="text-[11px] text-stone-400 font-medium">✨ Braider desde {user?.memberSince}</span>
            </div>

            {user?.publicProfile?.bio && (
              <p className="text-stone-500 dark:text-stone-400 text-sm italic max-w-md pt-1">"{user.publicProfile.bio}"</p>
            )}

            {!isPremium && (
              <div className="pt-2">
                <button onClick={() => navigate('/plans')} className="text-[10px] font-black uppercase tracking-widest bg-gold-500/10 text-gold-600 dark:text-gold-400 px-6 py-3 rounded-2xl hover:bg-gold-500 hover:text-white transition-all shadow-sm">
                  🚀 Liberar Estúdio Completo
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-stone-900 dark:bg-stone-800 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden group">
          {!isPremium && <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[2px] flex items-center justify-center z-10">
            <Lock className="text-white/50" />
          </div>}
          <div className="relative z-0">
            <p className="text-stone-400 text-[10px] font-black uppercase tracking-widest mb-1">Faturamento Total</p>
            <h3 className="text-3xl font-display text-gold-500 tracking-tight">R$ {metrics.totalRevenue.toLocaleString('pt-BR')},00</h3>
            <div className="mt-3 text-[10px] font-bold text-stone-500 flex items-center gap-1 uppercase tracking-tighter">
              <BarChart2 size={12} className="text-gold-500/50" /> Dados financeiros sincronizados
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:scale-110 transition-transform duration-700">
            <DollarSign size={80} />
          </div>
        </div>
        <div className="bg-white dark:bg-stone-800 p-6 rounded-3xl shadow-lg border border-stone-100 dark:border-stone-700">
          <p className="text-stone-500 dark:text-stone-400 text-[10px] font-black uppercase tracking-widest mb-1">Serviços Realizados</p>
          <h3 className="text-3xl font-display dark:text-stone-100">{metrics.totalServices} <span className="text-sm font-sans text-stone-400">atendimentos</span></h3>
          <div className="mt-3 text-[10px] font-bold text-emerald-500/80 uppercase tracking-tighter">Histórico de cálculo atualizado</div>
        </div>
        <div className="bg-white dark:bg-stone-800 p-6 rounded-3xl shadow-lg border border-stone-100 dark:border-stone-700">
          <p className="text-stone-500 dark:text-stone-400 text-[10px] font-black uppercase tracking-widest mb-1">Dias de Plataforma</p>
          <h3 className="text-3xl font-display dark:text-stone-100">{metrics.daysActive} <span className="text-sm font-sans text-stone-400">dias</span></h3>
          <div className="mt-3 text-[10px] font-bold text-stone-400 flex items-center gap-1 uppercase tracking-tighter">
            <Calendar size={12} /> Uso contínuo do app
          </div>
        </div>
      </div>

      {/* Premium Profile Features */}
      {isPremium && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-stone-800 to-stone-900 p-6 rounded-[2rem] text-white flex items-center justify-between shadow-xl border border-stone-700 relative overflow-hidden group">
            <div className="relative z-10">
              <h4 className="font-black text-xl text-gold-500 uppercase tracking-tight">Seu QR Code</h4>
              <p className="text-xs text-stone-400 font-medium tracking-wide mt-1">Para clientes escanearem no estúdio</p>
            </div>
            <div className="bg-white p-2 rounded-2xl relative z-10">
              <QrCode size={40} className="text-stone-900" />
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:rotate-12 transition-transform duration-500">
              <QrCode size={100} />
            </div>
          </div>
          <div className="bg-white dark:bg-stone-800 border border-gold-500/20 p-6 rounded-[2rem] flex items-center justify-between shadow-xl relative overflow-hidden group">
            <div className="relative z-10">
              <h4 className="font-black text-xl text-stone-900 dark:text-stone-100 uppercase tracking-tight">Portfólio Público</h4>
              <p className="text-[10px] font-bold text-gold-500 uppercase tracking-widest mt-1">trancapro.app/{user?.publicProfile?.username || 'user'}</p>
            </div>
            <div className="bg-gold-500/10 p-3 rounded-2xl relative z-10">
              <Globe size={32} className="text-gold-500" />
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:-rotate-12 transition-transform duration-500">
              <Globe size={100} className="text-gold-500" />
            </div>
          </div>
        </div>
      )}

      {/* Professional Information Form */}
      <div className="bg-white dark:bg-stone-800 p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-stone-100 dark:border-stone-700 space-y-10">
        <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-700 pb-6">
          <div>
            <h3 className="text-2xl font-display text-stone-900 dark:text-stone-100">Dados do Meu Negócio</h3>
            <p className="text-xs text-stone-500 mt-1 font-medium tracking-wide">Gerencie sua identidade profissional e metas.</p>
          </div>
          <div className="bg-gold-500 p-3 rounded-2xl text-stone-900 shadow-lg shadow-gold-500/20">
            <Briefcase size={24} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Nome de Exibição</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
              <input
                value={user?.name || ''}
                onChange={(e) => updateProfile({ name: e.target.value })}
                className="w-full pl-12 p-4 rounded-2xl border border-stone-200 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-stone-800 dark:text-stone-100 outline-none focus:ring-4 focus:ring-gold-500/10 focus:border-gold-500 transition-all font-bold"
                placeholder="Ex: Amanda Braids"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Telefone Profissional</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
              <input
                value={user?.phone || ''}
                onChange={(e) => updateProfile({ phone: e.target.value })}
                className="w-full pl-12 p-4 rounded-2xl border border-stone-200 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-stone-800 dark:text-stone-100 outline-none focus:ring-4 focus:ring-gold-500/10 focus:border-gold-500 transition-all font-bold"
                placeholder="(00) 00000-0000"
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Minha Biografia (Bio)</label>
            <textarea
              value={user?.publicProfile?.bio || ''}
              onChange={(e) => updatePublicProfile({ bio: e.target.value })}
              className="w-full p-5 rounded-2xl border border-stone-200 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-stone-800 dark:text-stone-100 outline-none focus:ring-4 focus:ring-gold-500/10 focus:border-gold-500 transition-all font-medium min-h-[120px] resize-none leading-relaxed"
              placeholder="Descreva seu trabalho, tipos de tranças que faz e sua proposta de valor..."
            />
            <p className="text-[10px] text-stone-400 italic ml-1">* Esta bio aparecerá no seu catálogo online para clientes.</p>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Meta Braider do Mês</label>
            <div className="relative">
              <Crown className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
              <input
                placeholder="Ex: Bater 30 atendimentos"
                value={user?.goal || ''}
                onChange={(e) => updateProfile({ goal: e.target.value })}
                className="w-full pl-12 p-4 rounded-2xl border border-stone-200 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-stone-800 dark:text-stone-100 outline-none focus:ring-4 focus:ring-gold-500/10 focus:border-gold-500 transition-all font-bold"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Gênero (Inclusividade)</label>
            <select
              value={user?.gender || 'Prefiro não dizer'}
              onChange={(e) => updateProfile({ gender: e.target.value as Gender })}
              className="w-full p-4 rounded-2xl border border-stone-200 dark:border-stone-600 bg-stone-50 dark:bg-stone-700 text-stone-800 dark:text-stone-100 outline-none focus:ring-4 focus:ring-gold-500/10 focus:border-gold-500 transition-all font-bold appearance-none"
            >
              <option value="Mulher Cis">Mulher Cis</option>
              <option value="Mulher Trans">Mulher Trans</option>
              <option value="Homem Cis">Homem Cis</option>
              <option value="Homem Trans">Homem Trans</option>
              <option value="Não-Binário">Não-Binário</option>
              <option value="Agênero">Agênero</option>
              <option value="Gênero Fluido">Gênero Fluido</option>
              <option value="Travesti">Travesti</option>
              <option value="Queer">Queer</option>
              <option value="Prefiro não dizer">Prefiro não dizer</option>
              <option value="Outro">Outro</option>
            </select>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={handleSaveProfile}
            className="w-full sm:w-auto bg-stone-900 dark:bg-gold-500 text-white dark:text-stone-900 px-12 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.03] active:scale-95 transition-all shadow-2xl shadow-stone-500/10 dark:shadow-gold-500/20"
          >
            <Save size={20} /> Salvar Alterações
          </button>

          {saveSuccess && (
            <div className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest animate-bounce flex items-center gap-2 border border-emerald-500/20">
              <ShieldCheck size={16} /> Dados salvos com sucesso!
            </div>
          )}
        </div>
      </div>

      {/* Community & Feedback Call to Action */}
      <div
        onClick={() => navigate('/feedback')}
        className="bg-stone-900 dark:bg-stone-800 p-8 rounded-[2.5rem] shadow-2xl cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all text-white flex flex-col md:flex-row items-center justify-between gap-6 group border border-stone-800"
      >
        <div className="flex items-center gap-6 text-center md:text-left flex-col md:flex-row">
          <div className="w-16 h-16 bg-white/10 rounded-[1.5rem] flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-inner">
            <MessageSquare size={32} className="text-gold-500" />
          </div>
          <div>
            <h3 className="font-display text-2xl text-white">Voz da Braider</h3>
            <p className="text-sm text-stone-400 mt-1 max-w-sm">Sua sugestão vira código. Ajude a trançar o futuro do app!</p>
          </div>
        </div>
        <div className="bg-gold-500 px-6 py-3 rounded-2xl text-stone-900 font-black uppercase tracking-widest text-xs flex items-center gap-2 shadow-lg shadow-gold-500/20 active:scale-95 transition-transform">
          Participar <MessageSquare size={16} />
        </div>
      </div>

      {/* Preferences & Logout (Final Footer) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-stone-800 p-8 rounded-[2.5rem] shadow-xl border border-stone-100 dark:border-stone-700 group hover:border-gold-500/20 transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className={`p-4 rounded-2xl transition-all duration-500 ${theme === 'dark' ? 'bg-stone-700 text-gold-500 shadow-xl shadow-gold-500/10 scale-110' : 'bg-stone-100 text-stone-600 shadow-xl shadow-black/5'}`}>
                {theme === 'dark' ? <Moon size={24} /> : <Sun size={24} />}
              </div>
              <div>
                <h3 className="font-bold text-stone-900 dark:text-stone-100">Modo de Exibição</h3>
                <p className="text-[10px] text-stone-400 font-black uppercase tracking-widest mt-0.5">{theme === 'dark' ? 'Ambiente Dark' : 'Ambiente Light'}</p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className={`w-14 h-8 rounded-full p-1 transition-all duration-500 shadow-inner relative overflow-hidden ${theme === 'dark' ? 'bg-gold-500' : 'bg-stone-200'}`}
            >
              <div className={`w-6 h-6 rounded-full bg-white shadow-2xl transform transition-transform duration-500 flex items-center justify-center ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`}>
                {theme === 'dark' ? <Moon size={10} className="text-gold-500" /> : <Sun size={10} className="text-stone-400" />}
              </div>
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-stone-800 p-8 rounded-[2.5rem] shadow-xl border border-stone-100 dark:border-stone-700 group hover:border-red-500/20 transition-all">
          <button
            onClick={logout}
            className="w-full flex items-center justify-between gap-4 text-left"
          >
            <div className="flex items-center gap-5">
              <div className="p-4 rounded-2xl bg-red-500/5 text-red-500 shadow-inner transition-all group-hover:bg-red-500 group-hover:text-white group-hover:scale-110">
                <LogOut size={24} />
              </div>
              <div>
                <h3 className="font-bold text-stone-900 dark:text-stone-100 group-hover:text-red-500 transition-colors">Encerrar Sessão</h3>
                <p className="text-[10px] text-stone-400 font-black uppercase tracking-widest mt-0.5">Sair da conta atual</p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full border border-stone-100 dark:border-stone-700 flex items-center justify-center text-stone-300 group-hover:text-red-500 transition-colors">
              <ChevronLeft size={16} className="rotate-180" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;