
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
      const targetMonthly = 3280; // Matching Finance Income Sum

      const duration = 1500; // 1.5s animation
      const steps = 60;
      let currentStep = 0;

      const timer = setInterval(() => {
         currentStep++;
         const progress = currentStep / steps;

         setDisplayValue(Math.floor(targetToday * progress));
         setMonthlyEarnings(Math.floor(targetMonthly * progress));

         if (currentStep >= steps) {
            setDisplayValue(targetToday);
            setMonthlyEarnings(targetMonthly);
            clearInterval(timer);
         }
      }, duration / steps);

      return () => clearInterval(timer);
   }, [todaysAppointments, isVisible]);

   // Lógica para saudação dinâmica e neutra
   const [greeting] = useState(() => {
      const hours = new Date().getHours();
      if (hours < 12) return 'Bom dia';
      if (hours < 18) return 'Boa tarde';
      return 'Boa noite';
   });

   const firstName = user?.name ? user.name.split(' ')[0] : 'Profissional';

   useEffect(() => {
      // Read appointments directly from localStorage to ensure dashboard is live
      // Read appointments directly from localStorage to ensure dashboard is live
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
                  .slice(0, 3); // Only show top 3 next

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

         {/* Bento Grid Layout (Mobile: 1 col, Tablet: 2 cols, Desktop: 4 cols) */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

            {/* [A] Next Appointment (Hero) - Span 2 cols */}
            <section id="tour-dashboard-stats" className="md:col-span-2 bg-gradient-to-br from-stone-900 to-stone-800 border border-stone-700 p-5 rounded-[2.5rem] relative overflow-hidden shadow-2xl flex flex-col justify-between min-h-[280px]">
               <div className="relative z-10 flex justify-between items-start">
                  <div>
                     <span className="text-[10px] font-bold text-gold-500 uppercase tracking-widest mb-1 block">Em Execução</span>
                     <h3 className="text-2xl font-bold text-white tracking-tight leading-none">Mariana Silva</h3>
                     <p className="text-xs text-stone-400 mt-1">Box Braids • 4.5h</p>
                  </div>
                  <div className="bg-stone-950/50 backdrop-blur-md border border-stone-700 px-3 py-1.5 rounded-xl">
                     <span className="text-lg font-black text-white">14:30</span>
                  </div>
               </div>

               <div className="relative z-10 flex gap-4 mt-4">
                  <div className="w-16 h-16 rounded-2xl bg-stone-800 overflow-hidden border border-stone-600">
                     <img src="/images/client_mariana.png" alt="Client" className="w-full h-full object-cover opacity-80" />
                  </div>
                  <div className="flex-1 space-y-2">
                     <div className="flex gap-2">
                        <span className="px-2 py-1 rounded-lg bg-stone-800 text-[10px] font-bold text-stone-300 border border-stone-700">R$ 350</span>
                        <span className="px-2 py-1 rounded-lg bg-stone-800 text-[10px] font-bold text-stone-300 border border-stone-700">Confirmado</span>
                     </div>
                     <div className="flex gap-2">
                        <button className="flex-1 py-1.5 bg-white text-stone-900 text-[10px] font-bold uppercase tracking-wide rounded-lg hover:bg-stone-200">Mensagem</button>
                        <button onClick={() => navigate('/ia')} className="w-8 h-8 flex items-center justify-center bg-gold-500 text-stone-900 rounded-lg hover:bg-gold-400"><Sparkles size={14} /></button>
                     </div>
                  </div>
               </div>

               {/* Decorative */}
               <div className="absolute top-0 right-0 w-40 h-40 bg-gold-500/10 rounded-full blur-[60px] translate-x-10 -translate-y-10"></div>
            </section>

            {/* [B] Financial Summary - Span 1 col */}
            <section onClick={() => navigate('/financeiro')} className="bg-stone-900/50 border border-stone-800 p-5 rounded-[2.5rem] hover:bg-stone-800/50 transition-colors cursor-pointer group flex flex-col justify-between h-full min-h-[200px]">
               <div className="flex justify-between items-start">
                  <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-500 group-hover:scale-110 transition-transform">
                     <DollarSign size={20} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 py-1 px-2 bg-emerald-500/5 rounded-lg">+12.5%</span>
               </div>
               <div>
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest block mb-1">Faturamento Mês</span>
                  <h3 className="text-2xl font-black text-white">R$ {monthlyEarnings.toLocaleString('pt-BR')}</h3>
                  <p className="text-[10px] text-stone-600 mt-1">Meta: R$ 3.800,00</p>
               </div>
            </section>

            {/* [C] Stock Alert (NEW) - Span 1 col */}
            <section onClick={() => navigate('/materiais')} className="bg-stone-900/50 border border-stone-800 p-5 rounded-[2.5rem] hover:bg-stone-800/50 transition-colors cursor-pointer group flex flex-col justify-between h-full min-h-[200px]">
               <div className="flex justify-between items-start">
                  <div className="p-3 bg-red-500/10 rounded-2xl text-red-500 group-hover:scale-110 transition-transform">
                     <BookOpen size={20} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-red-500 py-1 px-2 bg-red-500/5 rounded-lg animate-pulse">! Atenção</span>
               </div>
               <div>
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest block mb-1">Estoque Crítico</span>
                  <h3 className="text-xl font-bold text-white leading-tight">Jumbo Preto</h3>
                  <p className="text-[10px] text-stone-400 mt-1">Restam apenas 2 pacotes</p>
               </div>
            </section>

            {/* [D] Daily Checklist - Span 2 cols (Vertical/List) */}
            <section className="bg-stone-900 border border-stone-800 p-5 rounded-[2.5rem] flex flex-col md:col-span-2 lg:row-span-1">
               <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold text-stone-500 uppercase tracking-widest flex items-center gap-2">
                     <ScanLine size={14} /> Tarefas do Dia
                  </h3>
                  <span className="text-[10px] font-bold text-stone-600 bg-stone-800 px-2 py-1 rounded-lg">2/4 Feito</span>
               </div>
               <div className="space-y-2 flex-1">
                  {[
                     { label: 'Confirmar Mariana (14:30)', checked: true },
                     { label: 'Comprar Jumbo (Urgente)', checked: false },
                     { label: 'Responder DM Instagram', checked: false }
                  ].map((task, i) => (
                     <label key={i} className="flex items-center gap-3 p-3 rounded-xl bg-stone-800/30 border border-stone-800 hover:bg-stone-800 transition-all cursor-pointer group">
                        <input
                           type="checkbox"
                           defaultChecked={task.checked}
                           className="w-4 h-4 rounded-md border-2 border-stone-600 checked:bg-gold-500 checked:border-gold-500 transition-all cursor-pointer"
                        />
                        <span className={`text-xs font-medium ${task.checked ? 'text-stone-500 line-through' : 'text-stone-300'}`}>
                           {task.label}
                        </span>
                     </label>
                  ))}
               </div>
            </section>

            {/* [E] AI Assistant - Span 1 col */}
            <section onClick={() => navigate('/ia')} className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border border-purple-500/30 p-5 rounded-[2.5rem] hover:border-purple-500/60 transition-all cursor-pointer group flex flex-col justify-between h-full min-h-[180px]">
               <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300">
                     <Sparkles size={18} />
                  </div>
                  <span className="px-2 py-1 bg-purple-500/10 rounded-lg text-[9px] font-bold text-purple-300 uppercase">Consultor IA</span>
               </div>
               <div>
                  <p className="text-white font-bold text-sm leading-tight mb-2">Dúvida sobre qual pomada usar?</p>
                  <p className="text-[10px] text-purple-300 font-medium">Pergunte para a Zuri →</p>
               </div>
            </section>

            {/* [F] Quick Actions Grid - Span 1 col */}
            <section className="bg-stone-900 border border-stone-800 p-5 rounded-[2.5rem] flex flex-col justify-between">
               <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-3 block">Ações Rápidas</span>
               <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => navigate('/agenda')} className="flex flex-col items-center justify-center gap-1 p-3 bg-stone-800 rounded-2xl hover:bg-stone-700 transition-colors">
                     <Calendar size={18} className="text-stone-300" />
                     <span className="text-[8px] font-bold text-stone-400 uppercase">Novo</span>
                  </button>
                  <button onClick={() => navigate('/materiais')} className="flex flex-col items-center justify-center gap-1 p-3 bg-stone-800 rounded-2xl hover:bg-stone-700 transition-colors">
                     <Calculator size={18} className="text-stone-300" />
                     <span className="text-[8px] font-bold text-stone-400 uppercase">Calc</span>
                  </button>
                  <button onClick={() => navigate('/blog')} className="flex flex-col items-center justify-center gap-1 p-3 bg-stone-800 rounded-2xl hover:bg-stone-700 transition-colors col-span-2">
                     <GraduationCap size={18} className="text-stone-300" />
                     <span className="text-[8px] font-bold text-stone-400 uppercase">Aprender</span>
                  </button>
               </div>
            </section>

         </div>
      </div>
   );
};

export default Dashboard;
