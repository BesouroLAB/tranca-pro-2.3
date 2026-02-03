import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, Plus, Users, BarChart3, Menu } from 'lucide-react';

interface MobileBottomNavProps {
    onMenuClick: () => void;
}

const MobileBottomNav = ({ onMenuClick }: MobileBottomNavProps) => {
    const location = useLocation();

    const navItems = [
        { icon: Home, label: 'Início', path: '/dashboard' },
        { icon: Calendar, label: 'Agenda', path: '/agenda' },
        { icon: Users, label: 'Clientes', path: '/clientes' },
        { icon: BarChart3, label: 'Relatórios', path: '/financeiro' },
    ];

    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
            {/* Background com Blur e Borda Fina */}
            <div
                className="bg-stone-900/95 backdrop-blur-md border-t border-stone-800 pb-safe transition-all duration-300"
                style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
            >
                <nav className="flex items-center justify-between h-20 px-4 relative">
                    {/* Botões da Esquerda */}
                    <div className="flex w-2/5 justify-around items-center">
                        <Link
                            to="/dashboard"
                            onClick={() => navigator.vibrate?.(10)}
                            className={`flex flex-col items-center justify-center space-y-1 transition-all ${location.pathname === '/dashboard' ? 'text-gold-500' : 'text-stone-500'}`}
                        >
                            <Home size={22} strokeWidth={location.pathname === '/dashboard' ? 2.5 : 2} />
                            <span className="text-[10px] font-bold uppercase tracking-tighter">Início</span>
                        </Link>

                        <Link
                            to="/clientes"
                            onClick={() => navigator.vibrate?.(10)}
                            className={`flex flex-col items-center justify-center space-y-1 transition-all ${location.pathname === '/clientes' ? 'text-gold-500' : 'text-stone-500'}`}
                        >
                            <Users size={22} strokeWidth={location.pathname === '/clientes' ? 2.5 : 2} />
                            <span className="text-[10px] font-bold uppercase tracking-tighter">Clientes</span>
                        </Link>
                    </div>

                    <div className="absolute left-1/2 -translate-x-1/2 -top-6">
                        <button
                            onClick={() => {
                                navigator.vibrate?.(15);
                                window.dispatchEvent(new CustomEvent('fab-click'));
                            }}
                            className="w-16 h-16 bg-gold-500 text-stone-900 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(217,119,6,0.4)] border-4 border-stone-900 active:scale-95 transition-transform"
                        >
                            <Plus size={32} strokeWidth={3} />
                        </button>
                    </div>

                    {/* Botões da Direita */}
                    <div className="flex w-2/5 justify-around items-center">
                        <Link
                            to="/financeiro"
                            onClick={() => navigator.vibrate?.(10)}
                            className={`flex flex-col items-center justify-center space-y-1 transition-all ${location.pathname === '/financeiro' ? 'text-gold-500' : 'text-stone-500'}`}
                        >
                            <BarChart3 size={22} strokeWidth={location.pathname === '/financeiro' ? 2.5 : 2} />
                            <span className="text-[10px] font-bold uppercase tracking-tighter">Relatórios</span>
                        </Link>

                        <button
                            onClick={() => {
                                navigator.vibrate?.(10);
                                onMenuClick();
                            }}
                            className="flex flex-col items-center justify-center space-y-1 text-stone-500 active:text-gold-500 transition-all"
                        >
                            <Menu size={22} strokeWidth={2} />
                            <span className="text-[10px] font-bold uppercase tracking-tighter">Menu</span>
                        </button>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default MobileBottomNav;
