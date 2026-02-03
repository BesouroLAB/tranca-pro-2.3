
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
    Sparkles,
    Calculator,
    Calendar,
    DollarSign,
    BookOpen,
    Crown,
    Check,
    ArrowRight,
    Star,
    TrendingUp,
    ChevronRight,
    Briefcase,
    Zap,
    Bot,
    Target,
    MapPin,
    Heart,
    Scissors,
    Plus,
    Minus,
    ChevronDown,
    X,
    Info
} from 'lucide-react';
import { useAuth } from './AuthContext';
import StickyFooterCTA from './StickyFooterCTA';

const LandingPage = () => {
    const navigate = useNavigate();
    const { updateProfile } = useAuth();
    const [isVisible, setIsVisible] = useState(false);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [userName, setUserName] = useState('');
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [selectedStyle, setSelectedStyle] = useState<{ title: string, desc: string, image: string } | null>(null);

    const STYLE_DESCRIPTIONS: Record<string, { desc: string, image: string }> = {
        'Box Braids e Knotless': {
            desc: "As Box Braids são tranças individuais e versáteis, ideais para proteção e crescimento. A técnica Knotless (sem nó) é a evolução moderna: começa com o próprio cabelo, eliminando a tração na raiz e o peso excessivo. É a escolha #1 para quem busca conforto e naturalidade.",
            image: "/images/blog/box-braids.png"
        },
        'Trança Nagô e Raiz': {
            desc: "A base de tudo. As tranças rasteiras (Cornrows) são obras de arte geométricas feitas rente ao couro cabeludo. Fundamentais para penteados complexos ou como base para técnicas como Entrelace. Exigem precisão e criatividade nas partições.",
            image: "https://placehold.co/800x600/292524/dca54c?text=Tranca+Nago"
        },
        'Gypsy Braids e Boho': {
            desc: "O estilo do momento. Mistura tranças finas com fios soltos e cacheados (orgânicos ou humanos), criando um visual 'cigano', leve e despojado. Requer manutenção específica para os cachos não embolarem, sendo um serviço de alto valor agregado.",
            image: "/images/blog/gypsy-braids.png"
        },
        'Entrelace e Crochet Braids': {
            desc: "Técnicas de extensão onde o cabelo sintético é costurado (Entrelace) ou aplicado com agulha (Crochet) sobre uma base de trança nagô. Permite mudar radicalmente a textura e cor do cabelo em poucas horas, com acabamento imperceptível.",
            image: "https://placehold.co/800x600/292524/dca54c?text=Entrelace"
        },
        'Tranças Infantis e Masculinas': {
            desc: "Mercados com particularidades próprias. O infantil exige rapidez e sensibilidade (tensão zero). O masculino foca em desenhos geométricos e praticidade. Ambos são excelentes para recorrência semanal ou quinzenal.",
            image: "https://placehold.co/800x600/292524/dca54c?text=Tranca+Infantil"
        },
        'Faux Locs & Twists': {
            desc: "Para quem ama a estética dos Dreads sem o compromisso definitivo. Os Faux Locs 'encapam' o cabelo, enquanto os Twists usam apenas duas pernas para torcer. Estilos protetores com visual urbano e cheio de atitude.",
            image: "https://placehold.co/800x600/292524/dca54c?text=Penteados"
        }
    };

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const [searchParams] = useSearchParams();
    useEffect(() => {
        if (searchParams.get('start') === 'true') {
            setShowOnboarding(true);
        }
    }, [searchParams]);

    const handleStart = () => {
        setShowOnboarding(true);
        // navigate('/dashboard');
    };

    const handleFinishOnboarding = () => {
        if (userName.trim()) {
            updateProfile({ name: userName });
            localStorage.setItem('trancaProTour', 'true');
            navigate('/dashboard');
        }
    };

    return (
        <div className="min-h-screen bg-stone-900 overflow-x-hidden text-stone-100 font-sans selection:bg-gold-500 selection:text-stone-900">
            {/* Onboarding Modal */}
            {showOnboarding && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-stone-950/90 backdrop-blur-xl animate-fade-in">
                    <div className="w-full max-w-md bg-stone-900 border border-stone-800 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="relative z-10 space-y-8 text-center">
                            <div className="w-20 h-20 bg-gold-500/20 rounded-3xl flex items-center justify-center mx-auto mb-2 border border-gold-500/30 rotate-3">
                                <Sparkles size={32} className="text-gold-500" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-display text-white italic">Como podemos te chamar?</h2>
                                <p className="text-sm text-stone-500 mt-2">Configure seu ambiente de trabalho.</p>
                            </div>
                            <input
                                type="text"
                                placeholder="Seu nome profissional..."
                                autoFocus
                                value={userName}
                                onChange={e => setUserName(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleFinishOnboarding()}
                                className="w-full bg-stone-950 border border-stone-800 text-white p-6 rounded-2xl focus:border-gold-500 outline-none transition-all placeholder:text-stone-700 text-center text-xl font-bold"
                            />
                            <button
                                onClick={handleFinishOnboarding}
                                disabled={!userName.trim()}
                                className="w-full py-5 bg-gold-500 text-stone-950 font-black rounded-2xl shadow-xl shadow-gold-500/20 active:scale-[0.98] transition-all uppercase tracking-widest text-xs disabled:opacity-50"
                            >
                                Entrar no Estúdio
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Style Modal */}
            {selectedStyle && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-stone-950/80 backdrop-blur-md animate-fade-in" onClick={() => setSelectedStyle(null)}>
                    <div className="w-full max-w-2xl bg-stone-900 border border-stone-700 rounded-[2rem] overflow-hidden shadow-2xl relative" onClick={e => e.stopPropagation()}>
                        <button
                            onClick={() => setSelectedStyle(null)}
                            className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors z-20"
                        >
                            <X size={20} />
                        </button>

                        <div className="grid md:grid-cols-2">
                            <div className="h-64 md:h-auto relative">
                                <img src={selectedStyle.image} alt={selectedStyle.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gold-500/10 mix-blend-multiply"></div>
                            </div>
                            <div className="p-8 space-y-6 flex flex-col justify-center">
                                <div>
                                    <div className="flex items-center gap-2 text-gold-500 mb-2">
                                        <Info size={16} />
                                        <span className="text-xs font-black uppercase tracking-widest">Guia de Estilo</span>
                                    </div>
                                    <h3 className="text-3xl font-display italic text-white leading-tight">{selectedStyle.title}</h3>
                                </div>
                                <p className="text-stone-400 leading-relaxed text-sm">
                                    {selectedStyle.desc}
                                </p>
                                <button
                                    onClick={() => {
                                        setSelectedStyle(null);
                                        handleStart();
                                    }}
                                    className="w-full py-4 bg-gold-500 text-stone-900 font-black rounded-xl uppercase tracking-widest text-xs hover:scale-105 transition-transform"
                                >
                                    Quero Gerenciar esse Estilo
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 1. HERO SECTION */}
            <section className="relative min-h-screen flex items-center pt-20 lg:pt-0 overflow-hidden">
                {/* Visual Decor */}
                <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-gold-500/5 to-transparent pointer-events-none" />
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <div className={`lg:col-span-7 space-y-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full backdrop-blur-md">
                                <Zap size={14} className="text-gold-500 animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gold-400">Inteligência de Negócio para Trancistas</span>
                            </div>

                            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.85] tracking-tighter text-white italic">
                                A <span className="text-gold-500">Infraestrutura<sup className="text-3xl lg:text-5xl -top-8 ml-1">BR</sup> Digital</span> para Trancistas Profissionais.
                            </h1>

                            <p className="text-xl sm:text-2xl text-stone-400 max-w-2xl leading-relaxed">
                                Elimine a incerteza financeira. Controle seu <strong>fluxo de caixa</strong>, estoque técnico e produtividade com o ecossistema <strong>Trança Pro</strong>.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <button
                                    onClick={handleStart}
                                    className="group flex items-center justify-center gap-4 bg-gold-500 text-stone-950 px-10 py-6 text-xl font-black uppercase tracking-widest rounded-2xl hover:shadow-[0_0_50px_rgba(234,179,8,0.3)] transition-all duration-500"
                                >
                                    USAR GRÁTIS
                                    <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                                </button>
                                <button
                                    onClick={() => navigate('/blog')}
                                    className="group flex items-center justify-center gap-4 bg-white/5 border border-white/10 text-white px-10 py-6 text-xl font-black uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all duration-500"
                                >
                                    <BookOpen size={24} className="text-gold-500" />
                                    Blog
                                </button>
                            </div>
                            <p className="text-sm text-stone-500 font-medium">Disponível para Android e iOS.</p>

                            <div className="flex items-center gap-8 pt-6">
                                <div className="flex -space-x-4">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-12 h-12 rounded-full border-4 border-stone-900 shadow-xl bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-white font-bold text-sm">
                                            {String.fromCharCode(65 + i)}
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5 mb-1">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} className="text-gold-500 fill-gold-500" />)}
                                    </div>
                                    <p className="text-sm text-stone-400 font-medium">
                                        <span className="text-white font-black">+2.500</span> trancistas no topo
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className={`lg:col-span-5 relative transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                            <div className="relative group">
                                {/* Main Hero Image - Braids Closeup */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-gold-500 to-amber-600 rounded-[3rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                                <div className="relative rounded-[3rem] overflow-hidden aspect-square border-2 border-white/10 shadow-2xl">
                                    <img
                                        src="/hero-braids.png"
                                        alt="Tranças box braids profissionais em close-up"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent"></div>
                                </div>

                                {/* Floating App Mockup - No Hands */}
                                <div className="absolute -right-8 -bottom-8 w-48 lg:w-56 transform hover:scale-105 transition-transform duration-500 z-20 shadow-2xl rounded-3xl overflow-hidden border-2 border-white/10">
                                    <img src="/app-mockup.png" alt="Interface do App Trança Pro" className="w-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. DORES SECTION */}
            <section className="py-32 bg-stone-100 text-stone-900">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center space-y-12">
                        <h2 className="text-4xl sm:text-5xl font-display italic">Você ama trançar, mas odeia a parte chata do negócio?</h2>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { q: "Você ainda chuta o valor da Mão de obra e acaba pagando para trabalhar?", icon: DollarSign },
                                { q: "Compra pacotes de Jumbo a mais (prejuízo) ou a menos (desespero) na hora de fechar um cabelo?", icon: Briefcase },
                                { q: "Perde clientes porque esqueceu de anotar na agenda de papel?", icon: Calendar }
                            ].map((item, i) => (
                                <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-stone-200 hover:scale-105 transition-transform">
                                    <div className="w-12 h-12 bg-stone-900 text-gold-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg rotate-3">
                                        <item.icon size={24} />
                                    </div>
                                    <p className="text-lg font-medium leading-relaxed italic">" {item.q} "</p>
                                </div>
                            ))}
                        </div>

                        <div className="pt-8">
                            <p className="text-2xl font-display text-stone-800">
                                A solução é simples: Transforme seu talento em uma empresa lucrativa com o <strong>Sistema de gestão para trancistas</strong> mais completo do mercado.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. FUNCIONALIDADES SECTION */}
            <section className="py-32 bg-stone-900 text-white relative">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-24">
                        <div className="bg-gold-500/10 text-gold-500 w-fit mx-auto px-4 py-2 rounded-lg text-xs font-black tracking-widest uppercase mb-4 border border-gold-500/20">
                            Core Modules
                        </div>
                        <h2 className="text-5xl font-display italic">Eixo Central da sua Operação</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-12">
                            <div className="flex gap-6 group">
                                <div className="w-16 h-16 bg-stone-800 rounded-3xl flex items-center justify-center shrink-0 border border-stone-700 group-hover:bg-gold-500 group-hover:text-stone-900 transition-all duration-500 shadow-xl">
                                    <Calculator size={32} />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-display text-gold-500">Calculadora de Preços Inteligente</h3>
                                    <p className="text-stone-400 leading-relaxed">
                                        Nunca mais tenha dúvida de quanto cobrar por <strong>Box Braids</strong>, <strong>Nagô</strong> ou <strong>Entrelace</strong>. Nossa calculadora considera seu tempo, custo do material e a margem de lucro desejada. Preço justo para a cliente, lucro real para você.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6 group">
                                <div className="w-16 h-16 bg-stone-800 rounded-3xl flex items-center justify-center shrink-0 border border-stone-700 group-hover:bg-gold-500 group-hover:text-stone-900 transition-all duration-500 shadow-xl">
                                    <Scissors size={32} />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-display text-gold-500">Calculadora de Materiais (Exclusivo)</h3>
                                    <p className="text-stone-400 leading-relaxed">
                                        Vai fazer <strong>Faux Locs</strong> ou <strong>Goddess Braids</strong>? Informe o estilo e o comprimento, e o app diz exatamente quantos pacotes de fibra ou linha para tranças você precisa comprar. Adeus prejuízo!
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6 group">
                                <div className="w-16 h-16 bg-stone-800 rounded-3xl flex items-center justify-center shrink-0 border border-stone-700 group-hover:bg-gold-500 group-hover:text-stone-900 transition-all duration-500 shadow-xl">
                                    <Calendar size={32} />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-display text-gold-500">Agenda Digital e Financeiro</h3>
                                    <p className="text-stone-400 leading-relaxed">
                                        Tenha uma <strong>agenda para trancistas</strong> que organiza seus horários e envia lembretes. Acompanhe entradas e saídas no <strong>Controle de Caixa Diário</strong> e saiba exatamente quanto você lucrou no mês.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6 group">
                                <div className="w-16 h-16 bg-stone-800 rounded-3xl flex items-center justify-center shrink-0 border border-stone-700 group-hover:bg-gold-500 group-hover:text-stone-900 transition-all duration-500 shadow-xl">
                                    <Bot size={32} />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-display text-gold-500">Estúdio IA e Escaneamento Profissional</h3>
                                    <p className="text-stone-400 leading-relaxed">
                                        Sua consultora virtual 24h. Use nossa Inteligência Artificial para analisar o perfil da cliente, sugerir estilos baseados em visagismo e tirar dúvidas sobre saúde capilar (como evitar alopecia por tração).
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-stone-800 to-stone-950 p-12 rounded-[4rem] border border-stone-700 shadow-3xl text-center space-y-8 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 group-hover:rotate-45 transition-transform duration-1000">
                                <Briefcase size={200} />
                            </div>
                            <h4 className="text-3xl font-display text-white relative z-10">Engenharia de Resultados</h4>
                            <p className="text-stone-400 relative z-10">Sistematize sua operação para focar na excelência técnica: <span className="text-gold-500 font-bold">Trançar.</span></p>
                            <button onClick={handleStart} className="bg-white/5 border border-white/10 hover:bg-gold-500 hover:text-stone-900 transition-all px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest relative z-10 shadow-2xl">
                                Testar Demo Grátis
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. EDUCACIONAL SECTION - PREMIUM REDESIGN */}
            <section className="py-40 bg-gradient-to-b from-stone-100 via-white to-stone-50 text-stone-900 overflow-hidden relative">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>
                <div className="absolute top-20 right-10 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-20 left-10 w-72 h-72 bg-amber-500/5 rounded-full blur-[100px]"></div>

                <div className="container mx-auto px-6 relative z-10">
                    {/* Section Header */}
                    <div className="text-center mb-24">
                        <div className="inline-flex items-center gap-2 bg-stone-900 text-gold-500 px-6 py-3 rounded-full text-[10px] font-black tracking-[0.3em] uppercase mb-8 shadow-xl">
                            <BookOpen size={14} />
                            Academia Trança Pro
                        </div>
                        <h2 className="text-5xl md:text-7xl font-display italic text-stone-900 leading-[0.95] mb-6">
                            O Conhecimento é<br />
                            <span className="bg-gradient-to-r from-gold-600 via-amber-500 to-gold-600 bg-clip-text text-transparent">
                                sua maior Fibra.
                            </span>
                        </h2>
                        <p className="text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed">
                            Do marketing digital à finalização perfeita. Transformamos você em uma <strong className="text-stone-800">autoridade no mercado afro.</strong>
                        </p>
                    </div>

                    {/* Feature Cards Grid */}
                    <div className="grid lg:grid-cols-3 gap-8 mb-20">
                        {/* Card 1 */}
                        <div className="group bg-white rounded-[2.5rem] p-10 shadow-xl border border-stone-200 hover:border-gold-500/30 hover:shadow-2xl hover:shadow-gold-500/10 transition-all duration-500 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gold-500/10 to-transparent rounded-bl-full"></div>
                            <div className="w-16 h-16 bg-gradient-to-br from-gold-500 to-amber-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-gold-500/30 group-hover:scale-110 transition-transform">
                                <Target size={28} />
                            </div>
                            <h3 className="text-2xl font-display italic text-stone-900 mb-3">Técnicas Avançadas</h3>
                            <p className="text-stone-500 leading-relaxed mb-6">
                                Masterclasses com trancistas renomadas. Knotless, Butterfly Locs, Gypsy e muito mais.
                            </p>
                            <div className="flex items-center gap-2 text-gold-600 font-bold text-sm group-hover:gap-4 transition-all">
                                <span>Explorar</span>
                                <ArrowRight size={16} />
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="group bg-stone-900 text-white rounded-[2.5rem] p-10 shadow-xl border border-stone-800 hover:border-gold-500/30 hover:shadow-2xl hover:shadow-gold-500/10 transition-all duration-500 relative overflow-hidden lg:-translate-y-6">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gold-500/20 to-transparent rounded-bl-full"></div>
                            <div className="w-16 h-16 bg-gradient-to-br from-gold-500 to-amber-600 rounded-2xl flex items-center justify-center text-stone-900 mb-6 shadow-lg shadow-gold-500/30 group-hover:scale-110 transition-transform">
                                <TrendingUp size={28} />
                            </div>
                            <h3 className="text-2xl font-display italic mb-3">Marketing Digital</h3>
                            <p className="text-stone-400 leading-relaxed mb-6">
                                Domine Instagram, TikTok e WhatsApp Business. Atraia clientes todos os dias.
                            </p>
                            <div className="flex items-center gap-2 text-gold-500 font-bold text-sm group-hover:gap-4 transition-all">
                                <span>Ver Aulas</span>
                                <ArrowRight size={16} />
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="group bg-white rounded-[2.5rem] p-10 shadow-xl border border-stone-200 hover:border-gold-500/30 hover:shadow-2xl hover:shadow-gold-500/10 transition-all duration-500 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gold-500/10 to-transparent rounded-bl-full"></div>
                            <div className="w-16 h-16 bg-gradient-to-br from-gold-500 to-amber-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-gold-500/30 group-hover:scale-110 transition-transform">
                                <MapPin size={28} />
                            </div>
                            <h3 className="text-2xl font-display italic text-stone-900 mb-3">Mapeador de Lojas</h3>
                            <p className="text-stone-500 leading-relaxed mb-6">
                                Encontre fornecedores de cabelo e cosméticos afro perto de você com os melhores preços.
                            </p>
                            <div className="flex items-center gap-2 text-gold-600 font-bold text-sm group-hover:gap-4 transition-all">
                                <span>Localizar</span>
                                <ArrowRight size={16} />
                            </div>
                        </div>
                    </div>

                    {/* CTA Banner */}
                    <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 rounded-[3rem] p-12 md:p-16 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(234,179,8,0.15),transparent_50%)]"></div>
                        <div className="absolute top-1/2 right-10 -translate-y-1/2 opacity-10">
                            <Sparkles size={200} />
                        </div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="text-center md:text-left">
                                <h3 className="text-3xl md:text-4xl font-display italic text-white mb-3">
                                    Evolua sua Técnica na Seção <span className="text-gold-500">"Aprenda"</span>
                                </h3>
                                <p className="text-stone-400 text-lg">
                                    Do <strong className="text-white">Kit para Iniciante</strong> até técnicas avançadas de precificação.
                                </p>
                            </div>
                            <button
                                onClick={() => navigate('/aprender')}
                                className="bg-gold-500 text-stone-900 px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-gold-500/20 hover:scale-105 transition-all flex items-center gap-3 whitespace-nowrap"
                            >
                                Acessar Hub <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* BLOG SECTION - DRAMATIC REDESIGN */}
            <section className="py-40 bg-stone-900 text-white relative overflow-hidden">
                {/* Wave Transition from previous section */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-stone-50 to-transparent"></div>
                <svg className="absolute top-0 left-0 right-0 w-full h-24" viewBox="0 0 1440 96" preserveAspectRatio="none">
                    <path
                        fill="#fafaf9"
                        d="M0,0 L1440,0 L1440,32 Q1200,96 720,64 Q240,32 0,80 L0,0 Z"
                    />
                </svg>

                {/* Background Decorations */}
                <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[150px]"></div>
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px]"></div>

                <div className="container mx-auto px-6 relative z-10 pt-16">
                    {/* Section Header */}
                    <div className="text-center mb-24">
                        <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 px-6 py-3 rounded-full text-[10px] font-black tracking-[0.3em] uppercase mb-8">
                            <BookOpen size={14} className="text-gold-500" />
                            <span className="text-stone-300">Blog Trança Pro</span>
                        </div>
                        <h2 className="text-5xl md:text-8xl font-display italic text-white leading-[0.9] mb-8">
                            Conteúdo que<br />
                            <span className="relative inline-block">
                                <span className="bg-gradient-to-r from-gold-400 via-amber-400 to-gold-500 bg-clip-text text-transparent">
                                    Transforma
                                </span>
                                <Sparkles className="absolute -right-10 -top-4 text-gold-500 animate-pulse" size={24} />
                            </span>
                        </h2>
                        <p className="text-xl text-stone-400 max-w-2xl mx-auto leading-relaxed">
                            Artigos escritos por especialistas para você dominar a <strong className="text-white">gestão</strong>, <strong className="text-white">técnica</strong> e <strong className="text-white">saúde capilar</strong>.
                        </p>
                    </div>

                    {/* Category Cards - Horizontal Scroll on Mobile */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
                        {[
                            {
                                title: 'Técnicas e Estilos',
                                desc: 'Box Braids, Faux Locs, Knotless e mais.',
                                icon: Scissors,
                                link: '/blog/estilos',
                                gradient: 'from-amber-500 to-orange-600'
                            },
                            {
                                title: 'Gestão e Finanças',
                                desc: 'Precificação, MEI, controle financeiro.',
                                icon: Briefcase,
                                link: '/blog/gestao',
                                gradient: 'from-emerald-500 to-teal-600'
                            },
                            {
                                title: 'Materiais e Produtos',
                                desc: 'Jumbo, pomadas, melhores marcas.',
                                icon: Sparkles,
                                link: '/blog/materiais',
                                gradient: 'from-rose-500 to-pink-600'
                            },
                            {
                                title: 'Saúde Capilar',
                                desc: 'Alopecia, lavagem, cuidados essenciais.',
                                icon: Heart,
                                link: '/blog/saude',
                                gradient: 'from-sky-500 to-blue-600'
                            }
                        ].map((cluster, i) => (
                            <button
                                key={i}
                                onClick={() => navigate(cluster.link)}
                                className="group text-left bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 hover:border-gold-500/30 transition-all relative overflow-hidden active:scale-[0.98]"
                            >
                                <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${cluster.gradient} opacity-20 rounded-full blur-2xl group-hover:opacity-40 group-hover:scale-150 transition-all duration-500`}></div>
                                <div className={`w-14 h-14 bg-gradient-to-br ${cluster.gradient} rounded-2xl flex items-center justify-center text-white mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                                    <cluster.icon size={24} />
                                </div>
                                <h3 className="text-lg font-display italic text-white mb-2">{cluster.title}</h3>
                                <p className="text-sm text-stone-400 leading-relaxed">{cluster.desc}</p>
                                <div className="mt-5 text-xs font-bold text-gold-500 uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                                    Explorar <ArrowRight size={12} />
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Featured Articles - 3 Column Grid */}
                    <div className="space-y-12">
                        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                            <div className="space-y-2">
                                <h3 className="text-4xl font-display italic">Artigos em <span className="text-gold-500">Destaque</span></h3>
                                <p className="text-stone-500">Conteúdo técnico atualizado para o seu negócio.</p>
                            </div>
                            <button
                                onClick={() => navigate('/blog')}
                                className="text-xs font-black uppercase tracking-widest text-gold-500 flex items-center gap-2 hover:gap-4 transition-all"
                            >
                                Ver Todos <ArrowRight size={14} />
                            </button>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: 'Box Braids vs. Knotless: Guia Técnico Completo',
                                    excerpt: 'Domine as técnicas mais pedidas. Diferenças, custos e tempos de execução.',
                                    category: 'Estilos',
                                    link: '/blog/estilos/box-braids-ou-knotless',
                                    image: '/images/blog/box-braids.png'
                                },
                                {
                                    title: 'O Cálculo Correto para Parar de Pagar para Trabalhar',
                                    excerpt: 'Estratégias de precificação que fazem você lucrar de verdade.',
                                    category: 'Gestão',
                                    link: '/blog/gestao/como-precificar-trancas-sem-prejuizo',
                                    image: '/images/blog/precificacao-trancas.jpg'
                                },
                                {
                                    title: 'Alopecia por Tração: Prevenção e Tratamento',
                                    excerpt: 'Como identificar e o que fazer se sua cliente apresentar falhas.',
                                    category: 'Saúde',
                                    link: '/blog/saude/alopecia-por-tracao-sintomas-tratamento',
                                    image: '/images/blog/alopecia.png'
                                }
                            ].map((post, i) => (
                                <button
                                    key={i}
                                    onClick={() => navigate(post.link)}
                                    className="group text-left bg-stone-800/50 rounded-[2.5rem] overflow-hidden border border-stone-700 hover:border-gold-500/30 hover:shadow-2xl hover:shadow-gold-500/10 transition-all active:scale-[0.98]"
                                >
                                    <div className="aspect-[16/10] overflow-hidden bg-stone-800 relative">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent"></div>
                                    </div>
                                    <div className="p-8 space-y-4">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gold-500 bg-gold-500/10 px-3 py-1.5 rounded-lg border border-gold-500/20">
                                            {post.category}
                                        </span>
                                        <h4 className="text-xl font-display italic text-white group-hover:text-gold-500 transition-colors leading-tight">
                                            {post.title}
                                        </h4>
                                        <p className="text-stone-400 text-sm leading-relaxed line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                        <div className="pt-2 flex items-center gap-2 text-gold-500 font-bold uppercase tracking-widest text-xs group-hover:gap-4 transition-all">
                                            Ler Artigo <ArrowRight size={14} />
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* CTA to Blog */}
                    <div className="mt-20 text-center">
                        <button
                            onClick={() => navigate('/blog')}
                            className="inline-flex items-center gap-3 bg-gradient-to-r from-gold-500 to-amber-500 text-stone-900 px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-xl shadow-gold-500/20"
                        >
                            <BookOpen size={20} />
                            Acessar Blog Completo
                        </button>
                    </div>
                </div>
            </section>

            {/* 5. SEO / ESTILOS SECTION */}
            <section className="py-32 bg-stone-900 text-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20 space-y-4">
                        <h2 className="text-4xl sm:text-5xl font-display italic">Domine Todos os Estilos</h2>
                        <p className="text-stone-400 text-lg max-w-2xl mx-auto italic">
                            O Trança Pro já vem configurado para te ajudar com os principais serviços do mercado:
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        {[
                            'Box Braids e Knotless',
                            'Trança Nagô e Raiz',
                            'Gypsy Braids e Boho',
                            'Entrelace e Crochet Braids',
                            'Tranças Infantis e Masculinas',
                            'Faux Locs & Twists'
                        ].map((style, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedStyle({
                                    title: style,
                                    desc: STYLE_DESCRIPTIONS[style]?.desc || "Estilo popular e rentável.",
                                    image: STYLE_DESCRIPTIONS[style]?.image || ""
                                })}
                                className="bg-stone-800 border border-stone-700 px-8 py-6 rounded-3xl text-lg font-display text-gold-400 hover:bg-gold-500 hover:text-stone-900 hover:scale-110 active:scale-95 transition-all shadow-lg text-center"
                            >
                                {style}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. FAQ SECTION */}
            <section className="py-32 bg-stone-50 text-stone-900 overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto space-y-12">
                        <div className="text-center space-y-4">
                            <h2 className="text-4xl sm:text-5xl font-display italic">Perguntas <span className="text-gold-500">Frequentes</span></h2>
                            <p className="text-stone-500">Tudo o que você precisa saber sobre o Trança Pro.</p>
                        </div>

                        <div className="space-y-4">
                            {[
                                {
                                    q: "O Trança Pro é gratuito?",
                                    a: "Sim! Oferecemos uma versão gratuita poderosa com calculadora de preços, agenda e gestão de materiais. Temos também planos Premium para quem deseja insights avançados de lucratividade e ferramentas de IA ilimitadas."
                                },
                                {
                                    q: "O app funciona para quem atende em domicílio?",
                                    a: "Com certeza! Você pode gerenciar sua agenda, calcular seus custos de deslocamento na precificação e organizar seus materiais de qualquer lugar pelo celular."
                                },
                                {
                                    q: "Como a Inteligência Artificial (Zuri) ajuda no meu dia a dia?",
                                    a: "A Zuri pode sugerir estilos baseados no visagismo da cliente, tirar dúvidas técnicas sobre tricologia e até ajudar a criar legendas para o seu Instagram profissional."
                                },
                                {
                                    q: "Meus dados estão seguros?",
                                    a: "Sim. Seus dados de financeiro e clientes são criptografados e armazenados de forma segura. Você tem controle total sobre suas informações."
                                },
                                {
                                    q: "Preciso baixar o app na Play Store ou App Store?",
                                    a: "O Trança Pro é um Web App moderno. Você não precisa baixar nada, basta acessar pelo navegador e 'adicionar à tela inicial' para ter a experiência de um aplicativo nativo sem ocupar espaço no celular."
                                }
                            ].map((item, i) => (
                                <div key={i} className="border border-stone-200 rounded-3xl overflow-hidden bg-white shadow-sm transition-all hover:shadow-md">
                                    <button
                                        onClick={() => toggleFaq(i)}
                                        className="w-full flex items-center justify-between p-6 text-left"
                                    >
                                        <span className="font-bold text-lg text-stone-800">{item.q}</span>
                                        <div className={`transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}>
                                            {openFaq === i ? <Minus size={20} className="text-gold-500" /> : <Plus size={20} className="text-stone-400" />}
                                        </div>
                                    </button>
                                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <div className="p-6 pt-0 text-stone-600 leading-relaxed border-t border-stone-50">
                                            {item.a}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. PROVA SOCIAL & ENCERRAMENTO */}
            <section className="py-32 bg-white text-stone-900">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto space-y-24 text-center">
                        <div className="bg-stone-50 border border-stone-100 p-12 rounded-[4rem] shadow-3xl relative">
                            <div className="text-6xl text-gold-500 opacity-20 absolute -top-4 left-10 italic">"</div>
                            <p className="text-2xl font-display leading-relaxed text-stone-800 mb-8 italic">
                                "Antes eu não sabia como <strong>precificar tranças</strong> e vivia no vermelho. O Trança Pro organizou minha vida e hoje meu estúdio lucra 3x mais."
                            </p>
                            <div className="flex items-center justify-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold-500 to-amber-600 flex items-center justify-center text-stone-900 font-black text-xl shadow-lg">
                                    TS
                                </div>
                                <div className="text-left">
                                    <p className="font-black text-xs uppercase tracking-widest text-stone-900">Tainá S.</p>
                                    <p className="text-xs text-stone-500 font-bold">Especialista em Afro — Luanda Studio</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-10">
                            <div className="space-y-4">
                                <h2 className="text-5xl sm:text-6xl font-display italic">Organize. Execute. Lucre.</h2>
                                <p className="text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed">
                                    Tecnologia de ponta, design premium e gestão simplificada. O <strong>Salon management software</strong> feito por quem entende de tranças.
                                </p>
                            </div>
                            <button
                                onClick={handleStart}
                                className="inline-flex items-center gap-4 bg-stone-900 text-gold-500 px-12 py-6 rounded-2xl text-xl font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-stone-900/10"
                            >
                                Começar Agora — É Grátis
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-20 bg-stone-950 border-t border-white/5 text-center space-y-6">
                <div className="flex justify-center gap-8 mb-4">
                    <button onClick={() => navigate('/privacidade')} className="text-stone-500 hover:text-gold-500 transition-colors">Políticas</button>
                    <button onClick={() => navigate('/termos')} className="text-stone-500 hover:text-gold-500 transition-colors">Termos</button>
                    <button onClick={() => window.location.href = 'mailto:suporte@trancapro.com'} className="text-stone-500 hover:text-gold-500 transition-colors">Suporte</button>
                </div>
                <p className="text-[10px] text-stone-600 font-black uppercase tracking-[0.3em]">
                    © 2026 Trança Pro • Feito com <Heart size={10} className="inline text-gold-500" /> para trancistas.
                </p>
            </footer>
            <StickyFooterCTA onStart={handleStart} />
        </div>
    );
};

export default LandingPage;
