
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
            console.error("Failed to parse appointments from localStorage:", e);
         }
      }
   }, []); // Run once on mount

   return (

      <div className="space-y-6 lg:space-y-0 lg:h-[calc(100vh-8rem)] lg:flex lg:flex-col animate-fade-in pb-24 lg:pb-0">
         {/* Header */}
         <header className="flex items-center justify-between pt-4 lg:pt-0 lg:mb-8 shrink-0">
            <div className="flex items-center gap-3">
               <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gold-500/20 bg-stone-800 flex items-center justify-center text-stone-400">
                  <UserIcon size={24} />
               </div>
               <div>
                  <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold font-display">{greeting},</p>
                  <h1 className="text-xl font-bold text-white tracking-tight">
                     Operação: <span className="text-gold-500">{firstName}</span>
                  </h1>
               </div>
            </div>
            <div className="flex gap-2">
            </div>
         </header>

         {/* Desktop Grid Layout */}
         <div className="lg:flex-1 lg:grid lg:grid-cols-12 lg:gap-8 lg:min-h-0">

            {/* Left Column (Main Stats & Next Appointment) */}
            <div id="tour-dashboard-stats" className="lg:col-span-8 flex flex-col gap-6 lg:overflow-y-auto lg:pr-2 custom-scrollbar">

               {/* Next Appointment Section (Priority #1) */}
               <section className="flex-1 min-h-[350px] lg:min-h-[300px] bg-stone-900 border border-stone-800 p-6 md:p-8 rounded-[2.5rem] relative overflow-hidden flex flex-col justify-between group shadow-lg">
                  <div className="flex justify-between items-start relative z-10 w-full mb-4">
                     <div>
                        <span className="text-[10px] font-bold text-gold-500 uppercase tracking-widest mb-1 block">Fluxo de Hoje</span>
                        <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Em Execução</h3>
                     </div>
                     <div className="flex flex-col items-end gap-1">
                        <div className="bg-gold-500 text-stone-900 px-3 md:px-4 py-1.5 md:py-2 rounded-xl md:rounded-2xl text-lg md:text-xl font-black shadow-lg shadow-gold-500/20">
                           14:30
                        </div>
                        <button onClick={() => navigate('/agenda')} className="text-[9px] md:text-[10px] text-stone-600 hover:text-white font-bold uppercase tracking-widest transition-colors">Ver Completa</button>
                     </div>
                  </div>

                  <div className="flex gap-4 sm:gap-6 items-start relative z-10">
                     <div className="w-20 h-20 md:w-32 md:h-32 rounded-2xl md:rounded-3xl overflow-hidden bg-stone-800 border-2 md:border-4 border-gold-500/10 relative shadow-2xl shrink-0">
                        <img
                           src="/images/client_mariana.png"
                           alt="Mariana Silva"
                           className="w-full h-full object-cover"
                        />
                     </div>
                     <div className="space-y-1 md:space-y-2 text-left">
                        <h4 className="font-bold text-white text-lg md:text-2xl tracking-tight leading-none">Mariana Silva</h4>
                        <p className="text-[11px] md:text-sm text-stone-400 font-medium">Box Braids (Medium Length)</p>
                        <div className="flex items-center justify-start gap-2 md:gap-4 pt-1 md:pt-2">
                           <div className="bg-stone-800 px-2 md:px-3 py-1 md:py-1.5 rounded-lg flex items-center gap-1.5 text-[9px] md:text-xs font-bold text-stone-300 border border-stone-700">
                              <Sparkles size={10} className="text-gold-500" /> 4.5h
                           </div>
                           <div className="bg-stone-800 px-2 md:px-3 py-1 md:py-1.5 rounded-lg flex items-center gap-1.5 text-[9px] md:text-xs font-bold text-stone-300 border border-stone-700">
                              <DollarSign size={10} className="text-emerald-500" /> R$ 350
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-6 md:mt-8 relative z-10 w-full">
                     <button className="py-3 md:py-4 rounded-xl md:rounded-2xl bg-stone-800/80 hover:bg-stone-800 text-white text-xs md:text-sm font-bold transition-all flex items-center justify-center gap-2 border border-stone-700/50 backdrop-blur-sm sm:order-last">
                        <Smile size={18} /> Mensagem
                     </button>
                     <button onClick={() => navigate('/ia')} className="py-3 md:py-4 rounded-xl md:rounded-2xl bg-gradient-to-r from-gold-500 to-amber-500 hover:from-gold-400 hover:to-amber-400 text-stone-950 text-xs md:text-sm font-bold transition-all flex flex-col items-center justify-center gap-0.5 shadow-[0_4px_12px_rgb(217,119,6,0.3)] relative group sm:order-first">
                        <div className="flex items-center gap-2">
                           <Sparkles size={16} /> <span>Atender com Zuri</span>
                        </div>
                        <span className="text-[9px] md:text-[10px] opacity-80 font-medium uppercase tracking-wider">Assistente IA Ativada</span>

                        {/* Pulse Effect */}
                        <div className="absolute inset-0 rounded-xl md:rounded-2xl ring-2 ring-gold-400/50 animate-ping opacity-0 group-hover:opacity-100 duration-1000"></div>
                     </button>
                  </div>

                  {/* Decorative Gradient */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
               </section>

               {/* Metric Cards Row (Context) */}
               <div ref={metricsRef} className="grid grid-cols-2 gap-4 shrink-0">
                  <button
                     onClick={() => navigate('/financeiro')}
                     className="bg-stone-900 border border-stone-800 p-5 rounded-[2rem] flex flex-col justify-between h-40 text-left active:scale-[0.98] transition-transform hover:bg-stone-800/50"
                  >
                     <div className="flex justify-between items-start text-stone-500">
                        <span className="text-[11px] font-bold uppercase tracking-wider">Ganhos do Mês</span>
                        <div className="p-2 bg-emerald-500/10 rounded-lg">
                           <DollarSign size={14} className="text-emerald-500" />
                        </div>
                     </div>
                     <div>
                        <h4 className="text-2xl md:text-3xl font-bold text-emerald-500 tracking-tight leading-none mb-2">R$ {monthlyEarnings.toLocaleString('pt-BR')},00</h4>
                        <p className="text-[10px] text-emerald-500 flex items-center gap-1 font-bold">
                           <TrendingUp size={10} /> +12.5% <span className="text-stone-500 font-normal uppercase tracking-tighter">vs mês passado</span>
                        </p>
                     </div>
                  </button>
                  <button
                     onClick={() => navigate('/agenda')}
                     className="bg-stone-900 border border-stone-800 p-5 rounded-[2rem] flex flex-col justify-between h-40 text-left active:scale-[0.98] transition-transform hover:bg-stone-800/50"
                  >
                     <div className="flex justify-between items-start text-stone-500">
                        <span className="text-[11px] font-bold uppercase tracking-wider">Agendamentos</span>
                        <div className="p-2 bg-gold-500/10 rounded-lg">
                           <Calendar size={14} className="text-gold-500" />
                        </div>
                     </div>
                     <div>
                        <h4 className="text-2xl md:text-3xl font-bold text-gold-500 tracking-tight leading-none mb-2">42</h4>
                        <p className="text-[10px] text-emerald-500 flex items-center gap-1 font-bold">
                           <TrendingUp size={10} /> +15% <span className="text-stone-500 font-normal uppercase tracking-tighter">da meta</span>
                        </p>
                     </div>
                  </button>
               </div>
            </div>

            {/* Right Column (Quick Actions Sidebar) */}
            <div className="lg:col-span-4 lg:h-full">
               <section className="bg-stone-900/50 border border-stone-800 p-6 rounded-[2.5rem] lg:h-full lg:flex lg:flex-col">
                  <h3 className="text-[11px] font-bold text-stone-500 px-1 uppercase tracking-[0.2em] mb-4">Módulos do Sistema</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:flex-1 lg:content-start">
                     {[
                        { icon: Calculator, label: 'Calculadora', desc: 'Estimar tempo e valor', path: '/precificacao' },
                        { icon: BookOpen, label: 'Materiais', desc: 'Gerir estoque de cabelo', path: '/materiais' },
                        { icon: Sparkles, label: 'Estúdio IA', desc: 'Visualizar estilos', path: '/ia' },
                        { icon: DollarSign, label: 'Financeiro', desc: 'Lucro e despesas', path: '/financeiro' },
                        { icon: GraduationCap, label: 'Aprender', desc: 'Blog e conteúdos', path: '/blog' },
                     ].map((item, i) => (
                        <button
                           key={i}
                           onClick={() => navigate(item.path)}
                           className="bg-stone-900 border border-stone-800 p-4 lg:p-6 rounded-[2rem] flex flex-col lg:flex-row items-center lg:gap-4 text-center lg:text-left active:scale-95 transition-all hover:border-gold-500/20 hover:bg-stone-800/80 group"
                        >
                           <div className="w-12 h-12 lg:w-14 lg:h-14 bg-stone-800/50 rounded-2xl flex items-center justify-center mb-2 lg:mb-0 border border-stone-700/30 shadow-inner group-hover:bg-stone-800 group-hover:border-gold-500/30 transition-all">
                              <item.icon size={20} className="text-gold-500" />
                           </div>
                           <div>
                              <span className="text-sm font-bold text-stone-200 block group-hover:text-white">{item.label}</span>
                              <span className="text-[10px] text-stone-500 font-bold uppercase tracking-tight group-hover:text-stone-400">{item.desc}</span>
                           </div>
                        </button>
                     ))}

                     {/* Desktop only extra items */}
                     <div className="hidden lg:block mt-auto pt-4 border-t border-stone-800">
                        <div className="bg-stone-800/50 rounded-2xl p-4 flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                              <Users size={18} className="text-green-500" />
                           </div>
                           <div>
                              <p className="text-xs font-bold text-white">Expansão de Carteira</p>
                              <p className="text-[10px] text-stone-500">+3 novos registros</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </section>
            </div>
         </div>

      </div>
   );
};

export default Dashboard;
