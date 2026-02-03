import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Calculator, Ruler, Calendar, Sparkles, Check } from 'lucide-react';

interface TourStep {
    path: string;
    targetId: string;
    title: string;
    description: string;
    icon: any;
    position?: 'center' | 'bottom';
}

const STEPS: TourStep[] = [
    {
        path: '/dashboard',
        targetId: 'tour-dashboard-stats',
        title: "Sua Central de Comando",
        description: "Aqui você tem uma visão geral do seu negócio: faturamento, próximos clientes e atalhos rápidos.",
        icon: Sparkles,
        position: 'center'
    },
    {
        path: '/precificacao',
        targetId: 'tour-pricing-form',
        title: "Simulador de Lucratividade",
        description: "Nunca mais tenha dúvida se está tendo lucro. Calcule o preço exato do seu serviço.",
        icon: Calculator,
        position: 'center'
    },
    {
        path: '/materiais',
        targetId: 'tour-materials-form',
        title: "Otimização de Insumos",
        description: "Evite desperdício! Saiba exatamente quantos pacotes de Jumbo ou Orgânico comprar.",
        icon: Ruler,
        position: 'center'
    },
    {
        path: '/agenda',
        targetId: 'tour-agenda-view',
        title: "Gestão Operacional",
        description: "Controle absoluto sobre horários e fluxo de clientes com automação de lembretes.",
        icon: Calendar,
        position: 'center'
    },
    {
        path: '/ia',
        targetId: 'tour-ai-menu',
        title: "Zuri: Assistente Analítica",
        description: "Tire dúvidas sobre saúde capilar e negócios 24h por dia com nossa Inteligência Artificial.",
        icon: Sparkles,
        position: 'center'
    }
];

const OnboardingTour = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isActive, setIsActive] = useState(false);
    const [isReady, setIsReady] = useState(false); // Elemento alvo existe no DOM?
    const [currentStep, setCurrentStep] = useState(0);
    const [spotlight, setSpotlight] = useState<{ x: number, y: number, w: number, h: number } | null>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [retryCount, setRetryCount] = useState(0);
    const MAX_RETRIES = 10;

    useEffect(() => {
        const shouldStartTour = localStorage.getItem('trancaProTour');

        if (shouldStartTour === 'true') {
            // If on landing page, do NOT start/show tour yet.
            if (location.pathname === '/') {
                setIsActive(false);
                return;
            }

            // Sync step with current URL
            const stepIndex = STEPS.findIndex(s => s.path === location.pathname);
            if (stepIndex !== -1) {
                setCurrentStep(stepIndex);
                setIsActive(true);
            } else {
                // If we are on a page that is NOT a step (e.g. Blog), pause the tour (don't show)
                // But do NOT redirect/harass the user.
                setIsActive(false);
            }
        }
    }, [location]);

    // Handle Window Resize e detectar Mobile
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Polling para verificar se o elemento alvo existe no DOM
    useEffect(() => {
        if (!isActive) {
            setIsReady(false);
            setRetryCount(0);
            return;
        }

        const step = STEPS[currentStep];
        if (!step) return;

        const checkElement = () => {
            const target = document.getElementById(step.targetId);
            if (target) {
                setIsReady(true);
                setRetryCount(0);
            } else if (retryCount < MAX_RETRIES) {
                setRetryCount(prev => prev + 1);
            } else {
                // Máximo de tentativas atingido, mostrar tour sem spotlight
                setIsReady(true);
            }
        };

        const timer = setTimeout(checkElement, 200);
        return () => clearTimeout(timer);
    }, [isActive, currentStep, retryCount]);

    // Update Spotlight Position Logic
    useEffect(() => {
        if (!isActive || !isReady) return;

        const step = STEPS[currentStep];
        const target = document.getElementById(step.targetId);

        if (target) {
            const rect = target.getBoundingClientRect();
            const padding = 12;

            setSpotlight({
                x: rect.left - padding,
                y: rect.top - padding,
                w: rect.width + (padding * 2),
                h: rect.height + (padding * 2)
            });
        } else {
            // Fallback: centralizado na tela
            setSpotlight({
                x: window.innerWidth / 2 - 150,
                y: window.innerHeight / 3 - 100,
                w: 300,
                h: 200
            });
        }
    }, [currentStep, isActive, isReady, isMobile]);


    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            setIsTransitioning(true);
            const nextStep = currentStep + 1;
            navigate(STEPS[nextStep].path);
            setTimeout(() => {
                setCurrentStep(nextStep);
                setIsTransitioning(false);
            }, 600);
        } else {
            handleComplete();
        }
    };

    const handleComplete = () => {
        localStorage.removeItem('trancaProTour');
        localStorage.setItem('trancaProTourCompleted', 'true');
        setIsActive(false);
        navigate('/dashboard');
    };

    const handleSkip = () => {
        if (window.confirm("Deseja pular o tour?")) {
            handleComplete();
        }
    };

    if (!isActive || !isReady || !spotlight) return null;

    const step = STEPS[currentStep];

    // SVG Path to create cutout (donut hole)
    const overlayPath = `
        M0 0 H${window.innerWidth} V${window.innerHeight} H0 Z 
        M${spotlight.x} ${spotlight.y} 
        h${spotlight.w} v${spotlight.h} h-${spotlight.w} z
    `;

    // Tooltip Position: Mobile = fixo embaixo, Desktop = dinâmico
    const tooltipStyle = isMobile
        ? { bottom: 24, left: '50%', transform: 'translateX(-50%)' }
        : {
            top: Math.min(spotlight.y + spotlight.h + 20, window.innerHeight - 320),
            left: Math.max(16, Math.min(spotlight.x + spotlight.w / 2, window.innerWidth - 200)),
            transform: 'translateX(-50%)'
        };

    return (
        <div className="fixed inset-0 z-[200] pointer-events-none font-sans">
            {/* SVG Overlay for Spotlight Effect */}
            <svg className="absolute inset-0 w-full h-full pointer-events-auto transition-all duration-500 ease-in-out">
                <path
                    d={overlayPath}
                    fill="rgba(28, 25, 23, 0.90)"
                    fillRule="evenodd"
                />
            </svg>

            {/* Glowing Border around Target */}
            <div
                className="absolute border-2 border-gold-500 shadow-[0_0_40px_rgba(234,179,8,0.6)] rounded-3xl pointer-events-none transition-all duration-500 ease-in-out"
                style={{
                    left: spotlight.x,
                    top: spotlight.y,
                    width: spotlight.w,
                    height: spotlight.h,
                }}
            />

            {/* Tooltip Card */}
            <div
                className={`
                    absolute w-[92%] max-w-md pointer-events-auto
                    transition-all duration-500 ease-in-out
                    ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
                    ${isMobile ? '' : ''}
                `}
                style={tooltipStyle as React.CSSProperties}
            >
                <div className="bg-stone-900 border border-gold-500/30 rounded-[2rem] p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl">
                    {/* Progress */}
                    <div className="flex gap-1 mb-4">
                        {STEPS.map((_, i) => (
                            <div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= currentStep ? 'bg-gold-500' : 'bg-stone-700'}`} />
                        ))}
                    </div>

                    <div className="flex flex-col items-center text-center space-y-4 relative z-10">
                        <div className="w-14 h-14 bg-gold-500/10 rounded-2xl flex items-center justify-center text-gold-500 border border-gold-500/20 shadow-[0_0_20px_rgba(234,179,8,0.15)]">
                            <step.icon size={28} />
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                            <p className="text-stone-400 text-sm leading-relaxed">{step.description}</p>
                        </div>

                        <div className="pt-2 w-full flex flex-col gap-2">
                            <button
                                onClick={handleNext}
                                className="w-full bg-gold-500 hover:bg-gold-400 text-stone-950 font-bold uppercase tracking-widest text-xs py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
                            >
                                {currentStep === STEPS.length - 1 ? 'Concluir' : 'Próximo'}
                                {currentStep === STEPS.length - 1 ? <Check size={16} /> : <ArrowRight size={16} />}
                            </button>
                            <button onClick={handleSkip} className="text-[10px] text-stone-500 hover:text-stone-300 uppercase tracking-wider font-bold py-2">
                                Pular Tour
                            </button>
                        </div>
                    </div>

                    {/* BG Effects */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>
                </div>
            </div>
        </div>
    );
};

export default OnboardingTour;
