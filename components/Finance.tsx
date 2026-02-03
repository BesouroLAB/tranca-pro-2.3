
import React, { useState, useEffect } from 'react';
import { Transaction } from '../types';
import { Plus, DollarSign, Settings, Globe, TrendingUp, TrendingDown, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Finance = () => {
   const navigate = useNavigate();
   const [transactions, setTransactions] = useState<Transaction[]>([]);

   // Force reset mock data for 'success vibe' update
   const FINANCE_VERSION = 'v2_high_profit';

   useEffect(() => {
      const savedVersion = localStorage.getItem('finance_version');
      const saved = localStorage.getItem('transactions');

      if (saved && savedVersion === FINANCE_VERSION) {
         setTransactions(JSON.parse(saved));
      } else {
         const mockTransactions: Transaction[] = [
            { id: '1', name: 'Mariana Silva - Box Braids', category: 'Serviço', date: '2026-10-12', paymentMethod: 'PIX', value: 450, type: 'income' },
            { id: '2', name: 'Carla Dias - Goddess Braids', category: 'Serviço', date: '2026-10-12', paymentMethod: 'Crédito', value: 550, type: 'income' },
            { id: '3', name: 'Compra de Jumbo (Atacado)', category: 'Materiais', date: '2026-10-11', paymentMethod: 'Débito', value: 250, type: 'expense' },
            { id: '4', name: 'Ana Paula - Nagô Design', category: 'Serviço', date: '2026-10-10', paymentMethod: 'Dinheiro', value: 280, type: 'income' },
            { id: '5', name: 'Juliana - Knotless Full', category: 'Serviço', date: '2026-10-09', paymentMethod: 'PIX', value: 620, type: 'income' },
            { id: '6', name: 'Workshop Ministrado', category: 'Serviço', date: '2026-10-08', paymentMethod: 'PIX', value: 1200, type: 'income' },
            { id: '7', name: 'Aluguel Studio', category: 'Aluguel', date: '2026-10-05', paymentMethod: 'Boleto', value: 800, type: 'expense' },
            { id: '8', name: 'Vanessa - Manutenção', category: 'Serviço', date: '2026-10-04', paymentMethod: 'Dinheiro', value: 180, type: 'income' },
         ];
         setTransactions(mockTransactions);
         localStorage.setItem('transactions', JSON.stringify(mockTransactions));
         localStorage.setItem('finance_version', FINANCE_VERSION);
      }
   }, []);

   const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.value, 0);
   const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.value, 0);
   const balance = totalIncome - totalExpense;

   return (
      <div className="space-y-8 animate-fade-in pb-24">
         {/* Header Style Reference Image 4 */}
         <header className="flex items-center justify-between pt-4 lg:pt-0">
            <div className="flex items-center gap-3">
               <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gold-500/20 bg-stone-800 flex items-center justify-center">
                  <span className="text-xl">👩🏾‍🦱</span>
               </div>
               <div>
                  <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">Trança Pro</p>
                  <h1 className="text-xl font-bold text-white tracking-tight">Financeiro</h1>
               </div>
            </div>
            <div className="flex gap-2">
               <button className="w-10 h-10 bg-stone-800/50 rounded-full flex items-center justify-center text-stone-300 border border-stone-700/50 shadow-sm active:scale-90 transition-transform">
                  <Globe size={18} />
               </button>
               <button onClick={() => navigate('/configuracoes')} className="w-10 h-10 bg-stone-800/50 rounded-full flex items-center justify-center text-stone-300 border border-stone-700/50 shadow-sm active:scale-90 transition-transform">
                  <Settings size={18} />
               </button>
            </div>
         </header>

         <div className="px-1 space-y-1">
            <h2 className="text-2xl font-bold text-white tracking-tight">Controle Financeiro</h2>
            <p className="text-stone-500 text-sm">Acompanhe a saúde do seu estúdio em tempo real.</p>
         </div>

         {/* Saldo Total Card (Image 4 Style) */}
         <div className="bg-stone-900 border border-stone-800 p-8 rounded-[2.5rem] space-y-6 relative overflow-hidden shadow-xl group">
            <div className="flex justify-between items-start relative z-10 w-full">
               <div>
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-[0.2em] mb-1 block">Saldo em Caixa (Lucro)</span>
                  <div className="flex items-center gap-2">
                     <div className="p-1 px-2 bg-emerald-500/10 rounded-md border border-emerald-500/20">
                        <span className="text-[10px] font-bold text-emerald-500 uppercase">Saudável</span>
                     </div>
                  </div>
               </div>
               <div className="p-3 bg-stone-800 rounded-2xl border border-stone-700/50 shadow-inner group-hover:scale-110 transition-transform">
                  <DollarSign size={20} className="text-gold-500" />
               </div>
            </div>

            <div className="relative z-10">
               <h3 className="text-5xl font-black text-white tracking-tighter mb-2">
                  R$ {balance.toLocaleString('pt-BR')},00
               </h3>
               <div className="bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-2xl flex gap-3 items-center">
                  <TrendingUp size={16} className="text-emerald-500 shrink-0" />
                  <p className="text-xs text-stone-400 leading-relaxed">
                     Este é o seu **Lucro Real**: o que sobrou dos seus atendimentos após pagar todas as despesas e materiais do mês.
                  </p>
               </div>
            </div>

            {/* Backdrop Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-gold-500/10 transition-colors"></div>
         </div>

         {/* Resumo grid (Image 4) */}
         <div className="grid grid-cols-2 gap-4">
            <div className="bg-stone-900 border border-stone-800 p-5 rounded-[2rem] space-y-4 relative overflow-hidden">
               <div className="flex justify-between items-start italic z-10 relative">
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-widest">Receitas</span>
                  <TrendingUp size={14} className="text-emerald-500" />
               </div>
               <div className="z-10 relative">
                  <h4 className="text-xl font-bold text-white tracking-tight">R$ {totalIncome.toLocaleString('pt-BR')},00</h4>
                  {/* Mini Sparkline Chart Mock */}
                  <svg className="w-full h-8 mt-2 opacity-50 overflow-visible" viewBox="0 0 100 20">
                     <path d="M0,20 L10,18 L25,12 L40,15 L60,8 L80,10 L100,2" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
                  </svg>
               </div>
            </div>
            <div className="bg-stone-900 border border-stone-800 p-5 rounded-[2rem] space-y-4 relative overflow-hidden">
               <div className="flex justify-between items-start italic z-10 relative">
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-widest">Despesas</span>
                  <TrendingDown size={14} className="text-rose-500" />
               </div>
               <div className="z-10 relative">
                  <h4 className="text-xl font-bold text-white tracking-tight">R$ {totalExpense.toLocaleString('pt-BR')},00</h4>
                  {/* Mini Sparkline Chart Mock */}
                  <svg className="w-full h-8 mt-2 opacity-50 overflow-visible" viewBox="0 0 100 20">
                     <path d="M0,2 L15,10 L30,8 L50,15 L70,12 L100,18" fill="none" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
                  </svg>
               </div>
            </div>
         </div>

         {/* Transações Recentes (Image 4 Style) */}
         <section className="space-y-4">
            <h3 className="text-lg font-bold text-white tracking-tight px-1">Transações Recentes</h3>
            <div className="space-y-3">
               {[
                  { name: 'Mariana Silva - Box Braids', category: 'Atendimento', value: 350, type: 'income', img: '/images/client_mariana.png' },
                  { name: 'Compra de Materiais - X-Pression', category: 'Shopping', value: 150, type: 'expense', icon: ShoppingCart },
                  { name: 'Ana Paula - Trança Nagô', category: 'Atendimento', value: 200, type: 'income', img: '/images/client_ana.png' },
               ].map((t, i) => (
                  <div key={i} className="bg-stone-900/40 border border-stone-800/40 p-4 rounded-3xl flex items-center justify-between active:scale-[0.98] transition-all">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl overflow-hidden bg-stone-800 flex items-center justify-center border border-stone-700/50">
                           {t.img ? (
                              <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
                           ) : (
                              <t.icon size={20} className="text-stone-500" />
                           )}
                        </div>
                        <div>
                           <h4 className="text-sm font-bold text-white tracking-tight leading-none mb-1">{t.name}</h4>
                           <p className="text-[10px] text-stone-500 uppercase tracking-widest font-medium">{t.category}</p>
                        </div>
                     </div>
                     <span className={`text-sm font-black tracking-tight ${t.type === 'income' ? 'text-emerald-500' : 'text-stone-500'}`}>
                        {t.type === 'income' ? '+' : '-'} R$ {t.value.toFixed(0)},00
                     </span>
                  </div>
               ))}
            </div>
         </section>

         {/* Floating Action Button handled by MobileBottomNav */}
      </div>
   );
};

export default Finance;
