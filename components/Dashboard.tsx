
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
   Sparkles,
   Calculator,
   Calendar,
   DollarSign,
   BookOpen,
   MapPin,
   ScanLine,
   TrendingUp,
   Smile,
   Users,
   BarChart3,
   User as UserIcon,
   GraduationCap
} from 'lucide-react';
import { useAuth } from './AuthContext';
import { Appointment } from '../types';

const Dashboard = () => {
   const { user } = useAuth();
   const navigate = useNavigate();

   // Quick actions for dashboard
   const quickActions = [
      { icon: BookOpen, label: 'Hub de Conhecimento', path: '/aprender', color: 'from-blue-500 to-cyan-500' },
      { icon: GraduationCap, label: 'Blog Técnico', path: '/blog', color: 'from-purple-500 to-pink-500' }
   ];
   const [todaysAppointments, setTodaysAppointments] = useState<Appointment[]>([]);
   const [nextAppointments, setNextAppointments] = useState<Appointment[]>([]);
   const [displayValue, setDisplayValue] = useState(0);
   const [monthlyEarnings, setMonthlyEarnings] = useState(0);
   const [displayBalance, setDisplayBalance] = useState(0);
   const metricsRef = useRef<HTMLDivElement>(null);
   const [isVisible, setIsVisible] = useState(false);

   // Observer for scroll animation
   useEffect(() => {
      const observer = new IntersectionObserver(
         ([entry]) => {
            if (entry.isIntersecting) {
               setIsVisible(true);
            }
         },
         { threshold: 0.2 }
      );

      if (metricsRef.current) {
         observer.observe(metricsRef.current);
      }

      return () => {
         if (metricsRef.current) {
            observer.unobserve(metricsRef.current);
         }
      };
   }, []);

   // Animation Effect for Revenue - only triggers when visible
   useEffect(() => {
      if (!isVisible) return;

      const targetToday = todaysAppointments.length * 150 || 450;
      // Use the state monthlyEarnings (which now holds the real balance) as target
      // Fallback 2230 matches the Finance.tsx mock balance (Income 3280 - Expense 1050)
      const targetMonthly = monthlyEarnings || 2230;

      const duration = 1500; // 1.5s animation
      const steps = 60;
      let currentStep = 0;

      const timer = setInterval(() => {
         currentStep++;
         const progress = currentStep / steps;

         if (currentStep >= steps) {
            setDisplayValue(targetToday);
            setDisplayBalance(targetMonthly);
            clearInterval(timer);
         } else {
            setDisplayValue(Math.floor(targetToday * progress));
            setDisplayBalance(Math.floor(targetMonthly * progress));
         }
      }, duration / steps);

      // FIX: The previous logic was "setMonthlyEarnings" inside the loop. 
      // But now we calculate "monthlyEarnings" (Balance) in the other useEffect.
      // So we should introduce a "displayBalance" state separate from "monthlyEarnings".

      return () => clearInterval(timer);
   }, [todaysAppointments, isVisible, monthlyEarnings]);

   // Lógica para saudação dinâmica e neutra
   const [greeting] = useState(() => {
      const hours = new Date().getHours();
      if (hours < 12) return 'Bom dia';
      if (hours < 18) return 'Boa tarde';
      return 'Boa noite';
   });

   const firstName = user?.name ? user.name.split(' ')[0] : 'Profissional';

   useEffect(() => {
      // Logic to read from localStorage transactions (matching Finance.tsx)
      const savedTransactions = localStorage.getItem('transactions');
      if (savedTransactions) {
         try {
            const parsedTransactions = JSON.parse(savedTransactions);
            if (Array.isArray(parsedTransactions)) {
               const totalIncome = parsedTransactions.filter((t: any) => t.type === 'income').reduce((acc, t) => acc + t.value, 0);
               const totalExpense = parsedTransactions.filter((t: any) => t.type === 'expense').reduce((acc, t) => acc + t.value, 0);
               const realBalance = totalIncome - totalExpense;

               // Store calculated Revenue (Faturamento) for animation
               setMonthlyEarnings(totalIncome);
            }
         } catch (e) {
            console.error('Failed to parse transactions:', e);
         }
      }

      // Read appointments directly from localStorage
      const saved = localStorage.getItem('appointments');
      if (saved) {
         try {
            const allAppts = JSON.parse(saved);
            if (Array.isArray(allAppts)) {
               const today = new Date().toISOString().split('T')[0];

               const todayList = (allAppts as Appointment[])
                  .filter(a => a.date === today)
                  .sort((a, b) => a.time.localeCompare(b.time));

               const nextList = (allAppts as Appointment[])
                  .filter(a => a.date > today)
                  .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
                  .slice(0, 3);

               setTodaysAppointments(todayList);
               setNextAppointments(nextList);
            }
         } catch (e) {
            console.error('Failed to parse appointments:', e);
         }
      }
   }, []);

   return (
      <div className="space-y-6 pb-8">
         {/* Header */}
         <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-white tracking-tight">
               {greeting}, {firstName}! 👋
            </h1>
            <p className="text-sm text-stone-600 dark:text-stone-400 font-medium">
               Aqui está um resumo do seu estúdio hoje
            </p>
         </div>

         {/* Bento Grid Layout v3 - High Density & Zoning */}
         <div ref={metricsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

            {/* [A] Next Appointment (Hero) - Span 2 cols */}
            <section id="tour-dashboard-stats" className="md:col-span-2 md:order-1 bg-stone-900 border border-stone-800 p-6 rounded-[2.5rem] relative overflow-hidden shadow-2xl flex flex-col justify-between min-h-[280px] group">
               <div className="flex justify-between items-start relative z-10">
                  <div>
                     <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-800 border border-stone-700 text-[10px] font-bold text-gold-500 uppercase tracking-widest mb-3 shadow-lg">
                        Próximo Atendimento • 14:30 — Hoje
                     </span>
                     <h3 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-none mb-2">Mariana Silva</h3>
                     <p className="text-base text-stone-400 font-medium flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-stone-600"></span>
                        Box Braids (Medium Length)
                     </p>
                  </div>

                  {/* Client Photo Container - Detached from background */}
                  <div className="relative w-20 h-20 md:w-24 md:h-24 transition-transform group-hover:scale-105 duration-500">
                     <div className="absolute inset-0 bg-gold-500/20 rounded-full blur-2xl"></div>
                     <img src="/images/client_mariana.png" alt="Client" className="w-full h-full rounded-full object-cover border-4 border-stone-800 shadow-xl relative z-10" />
                     <div className="absolute -bottom-1 -right-1 bg-stone-900 text-gold-500 text-[10px] font-bold px-2 py-0.5 rounded-full border border-stone-700 z-20 shadow-lg">VIP</div>
                  </div>
               </div>

               <div className="relative z-10 flex flex-col md:flex-row items-end gap-4 mt-6">
                  <div className="flex-1 w-full grid grid-cols-2 gap-3">
                     <div className="bg-stone-800/50 p-3 rounded-2xl border border-stone-700/50 backdrop-blur-sm">
                        <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-1">Horário</span>
                        <span className="text-xl font-black text-white">14:30</span>
                     </div>
                     <div className="bg-stone-800/50 p-3 rounded-2xl border border-stone-700/50 backdrop-blur-sm">
                        <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-1">Valor</span>
                        <span className="text-xl font-black text-emerald-400">R$ 350</span>
                     </div>
                  </div>

                  <div className="flex gap-2 w-full md:w-auto">

                     <button onClick={() => navigate('/ia')} className="flex-1 md:flex-none h-12 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 transition-all active:scale-95 hover:shadow-indigo-500/40">
                        <Sparkles size={18} />
                        <span className="text-xs uppercase tracking-wide">AJUDA DA ZURI</span>
                     </button>
                  </div>
               </div>

               {/* Subtle texture overlay for Hero */}
               <div className="absolute inset-0 bg-gradient-to-b from-transparent to-stone-950/20 pointer-events-none"></div>
            </section>

            {/* [D] Daily Checklist - Span 2 cols */}
            <section className="bg-stone-900 border border-stone-800 p-6 rounded-[2.5rem] flex flex-col md:col-span-2 lg:row-span-1 md:order-4 shadow-xl relative overflow-hidden">
               <div className="flex items-center justify-between mb-5 relative z-10">
                  <h3 className="text-sm font-black text-stone-400 uppercase tracking-widest flex items-center gap-2">
                     <ScanLine size={16} /> Tarefas do Dia
                  </h3>
                  <span className="text-[10px] font-bold text-stone-300 bg-stone-950 border border-stone-800 px-2 py-1 rounded-lg">2/4 Concluído</span>
               </div>
               <div className="space-y-2.5 flex-1 relative z-10">
                  {[
                     { label: 'Confirmar Mariana (14:30)', checked: true, priority: 'high' },
                     { label: 'Comprar Jumbo (Urgente)', checked: false, priority: 'high' },
                     { label: 'Responder DM Instagram', checked: false, priority: 'normal' },
                     { label: 'Lançar gastos da semana', checked: false, priority: 'normal' }
                  ].map((task, i) => (
                     <label key={i} className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all cursor-pointer group ${task.checked ? 'bg-stone-800/40 border-stone-800 opacity-50' : 'bg-stone-800/60 border-stone-700 hover:bg-stone-800 hover:border-stone-600'}`}>
                        <div className="relative flex items-center justify-center">
                           <input
                              type="checkbox"
                              defaultChecked={task.checked}
                              className="peer appearance-none w-5 h-5 rounded-md border-2 border-stone-600 checked:bg-gold-500 checked:border-gold-500 transition-all cursor-pointer bg-stone-900"
                           />
                           <Sparkles size={10} className="absolute text-stone-900 opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                        </div>
                        <div className="flex-1">
                           <span className={`text-xs md:text-sm font-bold block ${task.checked ? 'text-stone-500 line-through' : 'text-stone-200'}`}>
                              {task.label}
                           </span>
                        </div>
                        {!task.checked && task.priority === 'high' && (
                           <div className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
                        )}
                     </label>
                  ))}
               </div>
               {/* Pattern overlay */}
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
            </section>

            {/* [B] CRM Widget (NEW) - Span 1 col */}
            <section onClick={() => navigate('/crm')} className="bg-rose-950/20 border border-rose-500/20 p-6 rounded-[2.5rem] hover:border-rose-500/40 transition-all cursor-pointer group flex flex-col justify-between h-full min-h-[200px] md:order-2 relative overflow-hidden shadow-xl shadow-rose-900/10 hover:shadow-rose-900/20">
               <div className="flex justify-between items-start relative z-10">
                  <div className="p-3 bg-rose-500/10 rounded-2xl text-rose-400 group-hover:scale-110 transition-transform border border-rose-500/10 shadow-inner">
                     <Users size={24} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-rose-400 py-1 px-2 bg-rose-500/5 rounded-lg border border-rose-500/10">CRM</span>
               </div>
               <div className="relative z-10">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-widest block mb-1">Base de Clientes</span>
                  <h3 className="text-3xl font-black text-white tracking-tight">142</h3>
                  <div className="flex items-center gap-2 mt-2">
                     <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded flex items-center gap-1">
                        <TrendingUp size={10} /> +5
                     </span>
                     <span className="text-[10px] text-stone-500 uppercase tracking-wide">Novos este mês</span>
                  </div>
               </div>
               {/* Decorative blob */}
               <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-rose-500/10 rounded-full blur-[40px] group-hover:bg-rose-500/20 transition-all"></div>
            </section>

            {/* [C] Financial Summary - Span 1 col */}
            <section onClick={() => navigate('/financeiro')} className="bg-emerald-950/20 border border-emerald-500/20 p-6 rounded-[2.5rem] hover:border-emerald-500/40 transition-all cursor-pointer group flex flex-col justify-between h-full min-h-[200px] md:order-3 relative overflow-hidden shadow-xl shadow-emerald-900/10 hover:shadow-emerald-900/20">
               <div className="flex justify-between items-start relative z-10">
                  <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-400 group-hover:scale-110 transition-transform border border-emerald-500/10 shadow-inner">
                     <DollarSign size={24} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 py-1 px-2 bg-emerald-500/5 rounded-lg border border-emerald-500/10">Financeiro</span>
               </div>

               <div className="relative z-10">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-widest block mb-1">Faturamento Mês</span>
                  <h3 className="text-3xl font-black text-white tracking-tight">R$ {displayBalance.toLocaleString('pt-BR')}</h3>
                  <div className="flex justify-between items-end mt-2">
                     <div className="flex flex-col">
                        <span className="text-[10px] text-stone-500 uppercase tracking-wide">Atendimentos</span>
                        <span className="text-sm font-bold text-white">24 <span className="text-stone-600 text-[10px]">/ 40</span></span>
                     </div>
                     <div className="w-16 h-16 relative">
                        {/* Mini Progress Circle Placeholder */}
                        <svg className="w-full h-full transform -rotate-90">
                           <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-stone-800" />
                           <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="175" strokeDashoffset="26" className="text-emerald-500 drop-shadow-[0_0_4px_rgba(16,185,129,0.5)]" />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-emerald-400">85%</span>
                     </div>
                  </div>
               </div>
               {/* Decorative blob */}
               <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-[40px] group-hover:bg-emerald-500/20 transition-all"></div>
            </section>



            {/* [E] AI Assistant - Span 1 col */}
            <section onClick={() => navigate('/ia')} className="bg-gradient-to-br from-indigo-950 to-purple-950 border border-indigo-500/20 p-6 rounded-[2.5rem] hover:border-indigo-500/40 transition-all cursor-pointer group flex flex-col justify-between h-full min-h-[180px] md:order-5 relative overflow-hidden shadow-2xl shadow-indigo-900/20">
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
               <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-[60px]"></div>

               <div className="flex justify-between items-start relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                     <Sparkles size={22} />
                  </div>
                  <span className="px-2 py-1 bg-white/10 rounded-lg text-[9px] font-bold text-white uppercase tracking-widest border border-white/10">Zuri AI</span>
               </div>
               <div className="relative z-10">
                  <p className="text-white font-bold text-sm leading-tight mb-3 opacity-90 drop-shadow-lg">"Qual o tempo de pausa do relaxamento?"</p>
                  <div className="flex items-center gap-2 text-indigo-200 text-xs font-bold uppercase tracking-wide group-hover:text-white transition-colors">
                     <span>Perguntar agora</span> <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">→</div>
                  </div>
               </div>
            </section>

            {/* [F] Stock Alert - Span 1 col */}
            <section onClick={() => navigate('/estoque')} className="bg-red-950/20 border border-red-500/20 p-6 rounded-[2.5rem] hover:border-red-500/40 transition-all cursor-pointer group flex flex-col justify-between h-full min-h-[180px] md:order-6 relative overflow-hidden shadow-xl shadow-red-900/10">
               <div className="flex justify-between items-start relative z-10">
                  <div className="p-2.5 bg-red-500/10 rounded-xl text-red-500 group-hover:scale-110 transition-transform border border-red-500/10 shadow-inner">
                     <BookOpen size={20} />
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-red-500 py-1 px-2 bg-red-500/5 rounded-lg border border-red-500/10 animate-pulse">! Crítico</span>
               </div>
               <div className="relative z-10">
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest block mb-1">Controle de Estoque</span>
                  <h3 className="text-lg font-black text-white leading-tight">Jumbo Preto</h3>
                  <p className="text-[10px] text-red-400 mt-1 font-medium">Restam 2 pacotes</p>
               </div>
               {/* Decorative blob */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-[40px] group-hover:bg-red-500/10 transition-all"></div>
            </section>

            {/* [G] Quick Actions + Knowledge - Span 4 cols (Row 3) */}
            <div className="md:col-span-2 lg:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-4 md:order-7">
               {/* Lounge Widget - Cyan (Education) */}
               <section onClick={() => navigate('/aprender')} className="bg-cyan-950/20 border border-cyan-500/20 p-5 rounded-[2rem] flex items-center justify-between cursor-pointer hover:bg-cyan-900/20 hover:border-cyan-500/40 transition-all group shadow-xl">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform border border-cyan-500/10">
                        <BookOpen size={24} />
                     </div>
                     <div>
                        <h4 className="text-white font-bold text-base">Hub de Conhecimento</h4>
                        <p className="text-[10px] text-stone-500 uppercase tracking-wide opacity-80 group-hover:opacity-100">Cursos e Aulas</p>
                     </div>
                  </div>
               </section>

               {/* Blog Widget - Violet (News) */}
               <section onClick={() => navigate('/blog')} className="bg-violet-950/20 border border-violet-500/20 p-5 rounded-[2rem] flex items-center justify-between cursor-pointer hover:bg-violet-900/20 hover:border-violet-500/40 transition-all group shadow-xl">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform border border-violet-500/10">
                        <GraduationCap size={24} />
                     </div>
                     <div>
                        <h4 className="text-white font-bold text-base">Blog Técnico</h4>
                        <p className="text-[10px] text-stone-500 uppercase tracking-wide opacity-80 group-hover:opacity-100">Artigos e Dicas</p>
                     </div>
                  </div>
               </section>

               {/* Tools Actions */}
               <div className="md:col-span-2 grid grid-cols-2 gap-4">
                  <button onClick={() => navigate('/agenda')} className="bg-stone-900 border border-stone-800 p-5 rounded-[2rem] flex items-center gap-3 hover:bg-stone-800 transition-colors group text-left shadow-lg">
                     <div className="w-10 h-10 rounded-xl bg-stone-800 flex items-center justify-center text-stone-400 group-hover:text-white group-hover:bg-stone-700 transition-colors border border-stone-700">
                        <Calendar size={20} />
                     </div>
                     <div>
                        <span className="text-stone-300 font-bold block text-sm group-hover:text-white">Novo Agendamento</span>
                        <span className="text-[9px] text-stone-600 uppercase tracking-widest">Agenda</span>
                     </div>
                  </button>
                  <button onClick={() => navigate('/materiais')} className="bg-stone-900 border border-stone-800 p-5 rounded-[2rem] flex items-center gap-3 hover:bg-stone-800 transition-colors group text-left shadow-lg">
                     <div className="w-10 h-10 rounded-xl bg-stone-800 flex items-center justify-center text-stone-400 group-hover:text-white group-hover:bg-stone-700 transition-colors border border-stone-700">
                        <Calculator size={20} />
                     </div>
                     <div>
                        <span className="text-stone-300 font-bold block text-sm group-hover:text-white">Calculadora</span>
                        <span className="text-[9px] text-stone-600 uppercase tracking-widest">Materiais</span>
                     </div>
                  </button>
               </div>
            </div>

         </div>
      </div>
   );
};

export default Dashboard;
