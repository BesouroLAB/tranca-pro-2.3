
import React, { useState, useEffect } from 'react';
import { Transaction } from '../types';
import {
   Plus,
   DollarSign,
   Settings,
   TrendingUp,
   TrendingDown,
   ShoppingCart,
   Calendar,
   ArrowUpRight,
   ArrowDownRight,
   Filter,
   Download,
   CreditCard,
   Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
   AreaChart,
   Area,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   ResponsiveContainer,
   BarChart,
   Bar,
   Cell
} from 'recharts';

const Finance = () => {
   const navigate = useNavigate();
   const [transactions, setTransactions] = useState<Transaction[]>([]);

   // Modern High-Profit Mock Data
   const CHART_DATA = [
      { name: 'Sem 1', income: 1050, expense: 300 },
      { name: 'Sem 2', income: 1350, expense: 450 },
      { name: 'Sem 3', income: 980, expense: 350 },
      { name: 'Sem 4', income: 1470, expense: 550 },
   ];

   const FINANCE_VERSION = 'v3_premium_4kplus';

   useEffect(() => {
      const savedVersion = localStorage.getItem('finance_version');
      const saved = localStorage.getItem('transactions');

      if (saved && savedVersion === FINANCE_VERSION) {
         setTransactions(JSON.parse(saved));
      } else {
         // Updated Mock to reach 4k-5k range
         const mockTransactions: Transaction[] = [
            { id: '1', name: 'Mariana Silva - Box Braids', category: 'Serviço', date: '2026-10-12', paymentMethod: 'PIX', value: 650, type: 'income' },
            { id: '2', name: 'Carla Dias - Goddess Braids', category: 'Serviço', date: '2026-10-12', paymentMethod: 'Crédito', value: 850, type: 'income' },
            { id: '3', name: 'Repos. Materiais Fevereiro', category: 'Materiais', date: '2026-10-11', paymentMethod: 'Débito', value: 450, type: 'expense' },
            { id: '4', name: 'Ana Paula - Nagô Master Design', category: 'Serviço', date: '2026-10-10', paymentMethod: 'Dinheiro', value: 450, type: 'income' },
            { id: '5', name: 'Julia - Knotless Full', category: 'Serviço', date: '2026-10-09', paymentMethod: 'PIX', value: 750, type: 'income' },
            { id: '6', name: 'Workshop Braiding Presencial', category: 'Educação', date: '2026-10-08', paymentMethod: 'PIX', value: 1500, type: 'income' },
            { id: '7', name: 'Aluguel Studio Premium', category: 'Infra', date: '2026-10-05', paymentMethod: 'Boleto', value: 1200, type: 'expense' },
            { id: '8', name: 'Beatriz - Manutenção Boho', category: 'Serviço', date: '2026-10-04', paymentMethod: 'PIX', value: 650, type: 'income' },
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
      <div className="space-y-8 animate-fade-in pb-24 lg:pb-8">
         {/* Header */}
         <header className="flex items-center justify-between pt-4 lg:pt-0">
            <div className="flex items-center gap-3">
               <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                  <DollarSign size={28} />
               </div>
               <div>
                  <h1 className="text-2xl font-black text-white tracking-tight">Centro Financeiro</h1>
                  <p className="text-[10px] text-stone-500 uppercase tracking-widest font-black">Performance & Lucratividade</p>
               </div>
            </div>
            <div className="flex gap-2">
               <button className="w-12 h-12 bg-stone-900 border border-stone-800 rounded-2xl flex items-center justify-center text-stone-400 hover:text-white transition-all">
                  <Download size={20} />
               </button>
               <button onClick={() => navigate('/configuracoes')} className="w-12 h-12 bg-stone-900 border border-stone-800 rounded-2xl flex items-center justify-center text-stone-400 hover:text-white transition-all">
                  <Settings size={20} />
               </button>
            </div>
         </header>

         {/* Main Balance Card - Glassmorphism & Brutalist mix */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-stone-950 border border-stone-800 p-8 rounded-[3rem] relative overflow-hidden shadow-2xl flex flex-col justify-between min-h-[320px] group">
               <div className="relative z-10 space-y-1">
                  <div className="flex items-center gap-2">
                     <span className="text-[10px] font-black text-stone-500 uppercase tracking-[0.3em]">Saldo Disponível</span>
                     <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        <TrendingUp size={10} /> +12% vs mês ant.
                     </span>
                  </div>
                  <h2 className="text-6xl font-black text-white tracking-tighter">
                     R$ {balance.toLocaleString('pt-BR')} <span className="text-stone-700">.00</span>
                  </h2>
               </div>

               <div className="relative z-10 grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-stone-900/50 border border-stone-800 p-6 rounded-[2rem] flex flex-col gap-2">
                     <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Receitas</span>
                        <ArrowUpRight size={16} className="text-emerald-500" />
                     </div>
                     <span className="text-2xl font-black text-white">R$ {totalIncome.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="bg-stone-900/50 border border-stone-800 p-6 rounded-[2rem] flex flex-col gap-2">
                     <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Despesas</span>
                        <ArrowDownRight size={16} className="text-rose-500" />
                     </div>
                     <span className="text-2xl font-black text-white">R$ {totalExpense.toLocaleString('pt-BR')}</span>
                  </div>
               </div>

               {/* Subtle Data Pattern Overlay */}
               <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none overflow-hidden">
                  <svg width="100%" height="100%">
                     <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                     </pattern>
                     <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
               </div>
            </div>

            {/* Quick Actions Column */}
            <div className="space-y-4">
               <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-stone-950 p-6 rounded-[2.5rem] flex items-center justify-between group transition-all shadow-xl shadow-emerald-500/10">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                        <Plus size={24} />
                     </div>
                     <span className="font-black uppercase tracking-widest text-xs">Lançar Receita</span>
                  </div>
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
               </button>

               <button className="w-full bg-stone-900 border border-stone-800 p-6 rounded-[2.5rem] flex items-center justify-between group transition-all text-white">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-stone-800 rounded-2xl flex items-center justify-center text-rose-500">
                        <TrendingDown size={24} />
                     </div>
                     <span className="font-black uppercase tracking-widest text-xs">Nova Despesa</span>
                  </div>
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
               </button>

               <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/20 p-6 rounded-[2.5rem] flex flex-col justify-between h-full min-h-[120px]">
                  <div className="flex justify-between items-start">
                     <Zap size={20} className="text-indigo-400" />
                     <span className="text-[9px] font-black text-indigo-400 uppercase tracking-tighter">Zuri Insights</span>
                  </div>
                  <p className="text-[11px] text-indigo-200/80 font-medium leading-relaxed">
                     Seu ticket médio subiu **R$ 42** após a última atualização de preços.
                  </p>
               </div>
            </div>
         </div>

         {/* Analytics Section */}
         <div className="bg-stone-900 border border-stone-800 p-8 rounded-[3rem] shadow-xl overflow-hidden">
            <div className="flex items-center justify-between mb-8">
               <div>
                  <h3 className="text-xl font-black text-white tracking-tight">Fluxo de Caixa Mensal</h3>
                  <p className="text-xs text-stone-500 font-medium">Comparativo de entrada e saída por semana</p>
               </div>
               <div className="flex bg-stone-950 p-1.5 rounded-xl border border-stone-800">
                  <button className="px-3 py-1.5 bg-stone-800 text-white text-[10px] font-black rounded-lg uppercase tracking-tight">Mensal</button>
                  <button className="px-3 py-1.5 text-stone-500 text-[10px] font-black rounded-lg uppercase tracking-tight hover:text-white transition-colors">Anual</button>
               </div>
            </div>

            <div className="h-[300px] w-full mt-6">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={CHART_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                     <defs>
                        <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                           <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" stroke="#292524" vertical={false} />
                     <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#78716c', fontSize: 10, fontWeight: 'bold' }}
                        dy={10}
                     />
                     <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#78716c', fontSize: 10 }}
                     />
                     <Tooltip
                        contentStyle={{ backgroundColor: '#1c1917', border: '1px solid #44403c', borderRadius: '12px' }}
                        itemStyle={{ color: '#fff' }}
                     />
                     <Area type="monotone" dataKey="income" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorIncome)" />
                     <Area type="monotone" dataKey="expense" stroke="#f43f5e" strokeWidth={2} fill="transparent" strokeDasharray="5 5" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* List and Details */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <section className="space-y-4">
               <div className="flex items-center justify-between px-2">
                  <h3 className="text-lg font-black text-white tracking-tight">Últimas Atividades</h3>
                  <button className="text-[10px] font-black text-emerald-500 uppercase tracking-widest hover:text-emerald-400 transition-colors">Ver Todas</button>
               </div>
               <div className="space-y-2">
                  {transactions.slice(0, 5).map((t, i) => (
                     <div key={i} className="bg-stone-900/40 border border-stone-800/40 p-5 rounded-3xl flex items-center justify-between group hover:bg-stone-900 transition-all border-l-4" style={{ borderLeftColor: t.type === 'income' ? '#10b981' : '#f43f5e' }}>
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-stone-950 rounded-2xl flex items-center justify-center text-stone-500 group-hover:bg-stone-800 transition-colors border border-stone-800">
                              {t.category === 'Materiais' ? <ShoppingCart size={20} /> : <Calendar size={20} />}
                           </div>
                           <div>
                              <h4 className="text-sm font-bold text-white tracking-tight">{t.name}</h4>
                              <div className="flex items-center gap-2 mt-0.5">
                                 <span className="text-[9px] text-stone-600 font-bold uppercase tracking-tighter">{t.date}</span>
                                 <span className="w-1 h-1 rounded-full bg-stone-700"></span>
                                 <span className="text-[9px] text-stone-600 font-bold uppercase tracking-tighter">{t.paymentMethod}</span>
                              </div>
                           </div>
                        </div>
                        <span className={`text-sm font-black tracking-tight ${t.type === 'income' ? 'text-emerald-500' : 'text-stone-300'}`}>
                           {t.type === 'income' ? '+' : '-'} R$ {t.value.toFixed(0)}
                        </span>
                     </div>
                  ))}
               </div>
            </section>

            <section className="bg-stone-900 border border-stone-800 p-8 rounded-[3rem] shadow-xl space-y-6">
               <h3 className="text-lg font-black text-white tracking-tight">Distribuição de Ganhos</h3>
               <div className="h-[220px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                     <BarChart
                        data={[
                           { name: 'Box Braids', val: 1800 },
                           { name: 'Nagô', val: 1200 },
                           { name: 'Knotless', val: 1600 },
                           { name: 'Cursos', val: 2500 },
                        ]}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                     >
                        <XAxis dataKey="name" hide />
                        <Tooltip
                           contentStyle={{ backgroundColor: '#1c1917', border: '1px solid #44403c', borderRadius: '12px' }}
                           itemStyle={{ color: '#fff' }}
                        />
                        <Bar dataKey="val" radius={[10, 10, 0, 0]} barSize={40}>
                           {[0, 1, 2, 3].map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={['#10b981', '#34d399', '#059669', '#14b8a6'][index % 4]} />
                           ))}
                        </Bar>
                     </BarChart>
                  </ResponsiveContainer>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800">
                     <span className="text-[9px] font-bold text-stone-600 uppercase tracking-widest block mb-1">Melhor Categoria</span>
                     <span className="text-sm font-black text-white">Tranças Master</span>
                  </div>
                  <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800">
                     <span className="text-[9px] font-bold text-stone-600 uppercase tracking-widest block mb-1">Crescimento Mensal</span>
                     <span className="text-sm font-black text-white">+28.5%</span>
                  </div>
               </div>
            </section>
         </div>
      </div>
   );
};

const ChevronRight = ({ size, className }: { size: number, className: string }) => (
   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m9 18 6-6-6-6" />
   </svg>
);

export default Finance;
