
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Camera, Sparkles, ChevronRight, Zap, Target } from 'lucide-react';

const ScanHub = () => {
    const navigate = useNavigate();

    const options = [
        {
            id: 'career',
            title: 'Escanear Carreira',
            desc: 'Um raio-x do seu nível profissional e habilidades.',
            icon: Award,
            color: 'gold',
            path: '/escaneamento/carreira',
            badge: 'Nível & Progresso'
        },
        {
            id: 'photo',
            title: 'Escanear Trabalho',
            desc: 'Mentoria da Zuri analisando a foto das suas tranças.',
            icon: Camera,
            color: 'emerald',
            path: '/escaneamento/foto',
            badge: 'Análise Técnica'
        }
    ];

    return (
        <div className="max-w-4xl mx-auto py-10 px-4 space-y-10 animate-fade-in">
            <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 bg-gold-500/10 text-gold-600 dark:text-gold-400 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-gold-500/20">
                    <Zap size={14} /> Centro de Escaneamento
                </div>
                <h1 className="text-4xl font-display text-stone-900 dark:text-stone-100 italic">
                    Onde você quer <span className="text-gold-500">evoluir</span> hoje?
                </h1>
                <p className="text-stone-500 dark:text-stone-400 max-w-lg mx-auto leading-relaxed">
                    Utilize nossas ferramentas de análise para otimizar sua operação ou receber feedbacks imediatos sobre sua técnica.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {options.map((option) => (
                    <button
                        key={option.id}
                        onClick={() => navigate(option.path)}
                        className="bg-white dark:bg-stone-800 p-8 rounded-[3rem] shadow-xl border border-stone-100 dark:border-stone-700 text-left group hover:scale-[1.02] active:scale-95 transition-all relative overflow-hidden flex flex-col h-full"
                    >
                        {/* Decorative Gradients */}
                        <div className={`absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity ${option.color === 'gold' ? 'bg-gold-500' : 'bg-emerald-500'}`}></div>

                        <div className="mb-8 flex justify-between items-start relative z-10">
                            <div className={`p-5 rounded-[1.5rem] shadow-lg transition-transform group-hover:rotate-6 ${option.color === 'gold' ? 'bg-gold-500 text-stone-900 shadow-gold-500/20' : 'bg-emerald-500 text-white shadow-emerald-500/20'}`}>
                                <option.icon size={32} />
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg ${option.color === 'gold' ? 'bg-gold-500/10 text-gold-600' : 'bg-emerald-500/10 text-emerald-600'}`}>
                                {option.badge}
                            </span>
                        </div>

                        <div className="space-y-3 flex-1 relative z-10">
                            <h3 className="text-2xl font-display text-stone-900 dark:text-stone-100 group-hover:text-gold-500 transition-colors">
                                {option.title}
                            </h3>
                            <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
                                {option.desc}
                            </p>
                        </div>

                        <div className="mt-8 pt-6 border-t border-stone-50 dark:border-stone-700/50 flex items-center justify-between relative z-10">
                            <span className="text-xs font-black uppercase tracking-widest text-stone-400 group-hover:text-stone-900 dark:group-hover:text-stone-100 transition-colors">Iniciar Escaneamento</span>
                            <div className="w-10 h-10 rounded-full bg-stone-50 dark:bg-stone-700 flex items-center justify-center text-stone-400 group-hover:bg-gold-500 group-hover:text-white transition-all shadow-inner">
                                <ChevronRight size={20} />
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            {/* Trust Badge/Info */}
            <div className="bg-stone-950 dark:bg-stone-900/50 border border-stone-800 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-0">
                        <Target size={32} className="text-gold-500" />
                    </div>
                </div>
                <div className="flex-1 text-center md:text-left relative z-10">
                    <h4 className="text-white font-bold text-lg mb-1">Aprendizado Contínuo</h4>
                    <p className="text-stone-500 text-sm max-w-sm">
                        Quanto mais você escaneia, mais precisas ficam as sugestões da Zuri para o seu negócio.
                    </p>
                </div>
                <div className="relative z-10">
                    <div className="flex -space-x-3">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-stone-950 bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center shadow-lg">
                                <span className="text-white text-xs font-bold">★</span>
                            </div>
                        ))}
                        <div className="w-10 h-10 rounded-full border-2 border-stone-950 bg-gold-500 flex items-center justify-center text-[10px] font-black text-stone-900">
                            +1k
                        </div>
                    </div>
                    <p className="text-[9px] text-stone-600 font-bold uppercase tracking-widest mt-2 text-center md:text-right">Trancistas Ativas</p>
                </div>

                {/* Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl"></div>
            </div>
        </div>
    );
};

export default ScanHub;
