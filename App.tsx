import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home as HomeIcon,
  Calculator,
  Calendar,
  DollarSign,
  BookOpen,
  MapPin,
  Sparkles,
  Settings,
  Menu,
  X,
  ScanLine,
  Users
} from 'lucide-react';
import { ThemeProvider } from './components/ThemeContext';
import { AuthProvider } from './components/AuthContext';

// Components
import LandingPage from './components/LandingPage';
import OnboardingTour from './components/OnboardingTour';
import Dashboard from './components/Dashboard';
import BlogHome from './components/BlogHome';
import BlogDetail from './components/BlogDetail';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import PricingCalculator from './components/PricingCalculator';
import Agenda from './components/Agenda';
import Finance from './components/Finance';
import MaterialsCalculator from './components/MaterialsCalculator';
import Learn from './components/Learn';
import Stores from './components/Stores';
import AiHub from './components/AiHub';
import PremiumInsights from './components/PremiumInsights';
import ProfessionalScan from './components/ProfessionalScan';
import PhotoAnalysis from './components/PhotoAnalysis';
import ScanHub from './components/ScanHub';
import Plans from './components/Plans';
import SettingsPage from './components/SettingsPage';
import MobileBottomNav from './components/MobileBottomNav';
import Clientes from './components/Clientes';
import Checkout from './components/Checkout';

// Fix: Make children required as Layout is a wrapper
const Layout = ({ children }: { children?: React.ReactNode }) => {
  // CRITICAL: All hooks MUST be declared BEFORE any conditional returns
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showQuickAction, setShowQuickAction] = useState(false);
  const mainRef = React.useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Don't show layout on landing page or blog
  const isLandingPage = location.pathname === '/';
  const isBlogPage = location.pathname.startsWith('/blog');

  useEffect(() => {
    const handleFabClick = () => setShowQuickAction(true);
    window.addEventListener('fab-click', handleFabClick);
    return () => window.removeEventListener('fab-click', handleFabClick);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname]);

  // Early return AFTER all hooks
  if (isLandingPage || isBlogPage) {
    return <>{children}</>;
  }

  const menuItems = [
    { icon: HomeIcon, label: 'Painel de Controle', path: '/dashboard' },
    { icon: Calculator, label: 'Simulador de Margem', path: '/precificacao' },
    { icon: Calendar, label: 'Gestão de Fluxo', path: '/agenda' },
    { icon: DollarSign, label: 'Controle de Caixa', path: '/financeiro' },
    { icon: ScanLine, label: 'Análise de Carreira', path: '/escaneamento' },
    { icon: BookOpen, label: 'Hub de Conhecimento', path: '/aprender' },
    { icon: Calculator, label: 'Insumos e Estoque', path: '/materiais' },
    { icon: MapPin, label: 'Rede de Fornecedores', path: '/lojas' },
    { icon: Sparkles, label: 'Estúdio IA', path: '/ia' },
    { icon: DollarSign, label: 'Planos', path: '/planos' },
    { icon: Settings, label: 'Configurações', path: '/configuracoes' },
  ];

  return (
    <div className="flex h-screen fixed inset-0 overflow-hidden bg-stone-50 dark:bg-[#1c1917] text-stone-800 dark:text-stone-100 font-sans transition-colors duration-300">
      {/* Mobile Header - Simplified */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700 flex items-center justify-between px-4 z-[50]">
        <h1 className="text-xl font-medium tracking-tight text-stone-800 dark:text-gold-400">Trança Pro</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/configuracoes')}
            className="w-10 h-10 flex items-center justify-center text-stone-500 hover:text-gold-500 transition-colors rounded-full active:bg-stone-100 dark:active:bg-stone-700"
          >
            <Settings size={22} />
          </button>
        </div>
      </div>

      <aside className={`
        fixed inset-y-0 left-0 z-[90] w-64 bg-white dark:bg-stone-800 border-r border-stone-200 dark:border-stone-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen flex flex-col overflow-y-auto custom-scrollbar
        ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
      `}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-stone-100 dark:border-stone-700">
          <h1 className="text-xl font-bold tracking-tight text-stone-900 dark:text-gold-400">Trança Pro</h1>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-stone-500">
            <X size={20} />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path === '/ia' && location.pathname.startsWith('/ia'));
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-4 px-4 py-2 text-sm font-medium rounded-xl transition-all ${isActive
                  ? 'bg-stone-100 dark:bg-stone-700 text-gold-600 dark:text-gold-400'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-700'
                  }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto">
          <div className="bg-gradient-to-br from-gold-400 via-gold-500 to-amber-600 rounded-2xl p-6 text-white shadow-2xl shadow-gold-500/30 border-2 border-gold-300">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <DollarSign size={18} className="text-amber-600" />
              </div>
              <p className="text-xs font-black uppercase tracking-widest text-white">Seja Premium</p>
            </div>
            <h3 className="font-black text-xl mb-3 text-white drop-shadow-md">Desbloqueie Tudo</h3>
            <p className="text-xs text-amber-100 mb-4 font-medium">Acesso completo + IA ilimitada</p>
            <button
              onClick={() => {
                navigate('/checkout');
                setIsSidebarOpen(false);
              }}
              className="w-full bg-white text-amber-700 text-xs py-3 rounded-xl font-black uppercase tracking-widest hover:bg-amber-50 transition-all shadow-lg"
            >
              Ver Planos
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      {/* Main Content Area - Scrollable */}
      <main ref={mainRef} className="flex-1 lg:pt-8 pt-16 px-4 lg:px-8 pb-24 lg:pb-8 overflow-y-auto h-screen scroll-smooth">
        <div className="max-w-7xl mx-auto min-h-full">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav onMenuClick={() => setIsSidebarOpen(true)} />

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[80] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Quick Action Modal (FAB Trigger) */}
      {showQuickAction && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowQuickAction(false)}
        >
          <div
            className="w-full max-w-md bg-stone-900 border border-stone-800 rounded-[2.5rem] p-8 space-y-6 shadow-2xl relative overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-bold text-white tracking-tight">Ações Rápidas</h3>
              <button onClick={() => setShowQuickAction(false)} className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center text-stone-500 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => { navigate('/agenda'); setShowQuickAction(false); }}
                className="p-6 bg-stone-800/50 border border-stone-700/50 rounded-3xl flex flex-col items-center gap-3 active:scale-95 transition-all text-center"
              >
                <div className="w-12 h-12 bg-gold-500/20 rounded-2xl flex items-center justify-center text-gold-500">
                  <Calendar size={24} />
                </div>
                <span className="text-xs font-bold text-stone-200">Novo Agendamento</span>
              </button>

              <button
                onClick={() => { navigate('/clientes'); setShowQuickAction(false); }}
                className="p-6 bg-stone-800/50 border border-stone-700/50 rounded-3xl flex flex-col items-center gap-3 active:scale-95 transition-all text-center"
              >
                <div className="w-12 h-12 bg-gold-500/20 rounded-2xl flex items-center justify-center text-gold-500">
                  <Users size={24} />
                </div>
                <span className="text-xs font-bold text-stone-200">Adicionar Cliente</span>
              </button>

              <button
                onClick={() => { navigate('/financeiro'); setShowQuickAction(false); }}
                className="p-6 bg-stone-800/50 border border-stone-700/50 rounded-3xl flex flex-col items-center gap-3 active:scale-95 transition-all text-center"
              >
                <div className="w-12 h-12 bg-gold-500/20 rounded-2xl flex items-center justify-center text-gold-500">
                  <DollarSign size={24} />
                </div>
                <span className="text-xs font-bold text-stone-200">Lançar Ganho</span>
              </button>

              <button
                onClick={() => { navigate('/ia'); setShowQuickAction(false); }}
                className="p-6 bg-stone-800/50 border border-stone-700/50 rounded-3xl flex flex-col items-center gap-3 active:scale-95 transition-all text-center"
              >
                <div className="w-12 h-12 bg-gold-500/20 rounded-2xl flex items-center justify-center text-gold-500">
                  <Sparkles size={24} />
                </div>
                <span className="text-xs font-bold text-stone-200">Consultar Zuri</span>
              </button>

              <button
                onClick={() => { navigate('/escaneamento'); setShowQuickAction(false); }}
                className="p-6 bg-stone-800 border border-gold-500/30 rounded-3xl flex flex-col items-center gap-3 active:scale-95 transition-all text-center group col-span-2"
              >
                <div className="w-12 h-12 bg-gold-500 rounded-2xl flex items-center justify-center text-stone-900 shadow-lg shadow-gold-500/20 group-hover:scale-110 transition-transform">
                  <ScanLine size={24} />
                </div>
                <span className="text-xs font-bold text-stone-200">Escaneamento Profissional</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Layout>
            <OnboardingTour />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/blog" element={<BlogHome />} />
              <Route path="/blog/categoria/:siloId" element={<BlogHome />} />
              <Route path="/blog/:silo/:slug" element={<BlogDetail />} />
              <Route path="/termos" element={<Terms />} />
              <Route path="/privacidade" element={<Privacy />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/precificacao" element={<PricingCalculator />} />
              <Route path="/agenda" element={<Agenda />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/financeiro" element={<Finance />} />
              <Route path="/materiais" element={<MaterialsCalculator />} />
              <Route path="/aprender" element={<Learn />} />
              <Route path="/lojas" element={<Stores />} />
              <Route path="/ia" element={<AiHub />} />
              <Route path="/premium-insights" element={<PremiumInsights />} />
              <Route path="/escaneamento" element={<ScanHub />} />
              <Route path="/escaneamento/carreira" element={<ProfessionalScan />} />
              <Route path="/escaneamento/foto" element={<PhotoAnalysis />} />
              <Route path="/planos" element={<Plans />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/configuracoes" element={<SettingsPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;