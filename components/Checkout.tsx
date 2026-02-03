import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Crown, Zap, Shield, Sparkles, TrendingUp, Lock, CreditCard, ArrowRight } from 'lucide-react';

const Checkout = () => {
    const navigate = useNavigate();

    const features = [
        { icon: Sparkles, text: 'Assistente IA Zuri Ilimitada' },
        { icon: TrendingUp, text: 'Relatórios Avançados de Desempenho' },
        { icon: Shield, text: 'Backup Automático na Nuvem' },
        { icon: Crown, text: 'Suporte Prioritário 24/7' },
        { icon: Zap, text: 'Automação de Lembretes por WhatsApp' },
        { icon: Lock, text: 'Acesso a Cursos Exclusivos' }
    ];

    return (
        <div className="min-h-screen bg-stone-900 text-stone-100 font-sans pb-20">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-stone-900/80 backdrop-blur-md border-b border-stone-800">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-stone-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
                    >
                        ← Voltar
                    </button>
                    <div className="flex items-center gap-2">
                        <Crown className="text-gold-500" size={24} />
                        <span className="font-display italic text-xl">Trança Pro Premium</span>
                    </div>
                    <div className="w-20"></div>
                </div>
            </header>

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-6 max-w-5xl">
                    {/* Hero */}
                    <div className="text-center space-y-6 mb-16">
                        <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/30 px-6 py-2 rounded-full">
                            <Zap size={16} className="text-gold-500" />
                            <span className="text-xs font-black uppercase tracking-widest text-gold-500">Oferta Especial</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display italic text-white leading-tight">
                            Desbloqueie Todo o <span className="text-gold-500">Potencial</span>
                        </h1>
                        <p className="text-xl text-stone-400 max-w-2xl mx-auto">
                            Transforme seu estúdio em uma máquina de lucro com ferramentas profissionais e automação completa.
                        </p>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {/* Mensal */}
                        <div className="bg-stone-800/50 border border-stone-700 rounded-3xl p-8 space-y-6">
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-stone-500 mb-2">Plano Mensal</h3>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-black text-white">R$ 49</span>
                                    <span className="text-stone-500">/mês</span>
                                </div>
                            </div>
                            <ul className="space-y-3">
                                {features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-stone-300">
                                        <Check size={18} className="text-gold-500 shrink-0" />
                                        <span className="text-sm">{feature.text}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full py-4 bg-stone-700 hover:bg-stone-600 text-white rounded-2xl font-bold transition-all">
                                Escolher Mensal
                            </button>
                        </div>

                        {/* Anual - Destaque */}
                        <div className="bg-gradient-to-br from-gold-500 to-amber-600 rounded-3xl p-8 space-y-6 relative overflow-hidden shadow-2xl shadow-gold-500/20">
                            <div className="absolute top-4 right-4 bg-white text-amber-700 px-4 py-1 rounded-full text-xs font-black uppercase">
                                Economize 40%
                            </div>
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-amber-900 mb-2">Plano Anual</h3>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-black text-stone-900">R$ 29</span>
                                    <span className="text-amber-900">/mês</span>
                                </div>
                                <p className="text-sm text-amber-900 mt-2">Cobrado R$ 348/ano</p>
                            </div>
                            <ul className="space-y-3">
                                {features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-stone-900">
                                        <Check size={18} className="text-amber-900 shrink-0" />
                                        <span className="text-sm font-medium">{feature.text}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full py-4 bg-stone-900 hover:bg-stone-800 text-white rounded-2xl font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2 shadow-xl">
                                Assinar Agora <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Simulação de Pagamento */}
                    <div className="bg-stone-800/30 border border-stone-700 rounded-3xl p-8 md:p-12 space-y-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-display italic text-white mb-2">Finalizar Assinatura</h2>
                            <p className="text-stone-500 text-sm">Preencha os dados para começar</p>
                        </div>

                        <div className="space-y-6">
                            {/* Dados Pessoais */}
                            <div className="space-y-4">
                                <label className="block">
                                    <span className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Nome Completo</span>
                                    <input
                                        type="text"
                                        placeholder="Maria Silva Santos"
                                        className="w-full bg-stone-900 border border-stone-700 text-white p-4 rounded-xl focus:border-gold-500 outline-none transition-all"
                                    />
                                </label>
                                <label className="block">
                                    <span className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Email</span>
                                    <input
                                        type="email"
                                        placeholder="maria@exemplo.com"
                                        className="w-full bg-stone-900 border border-stone-700 text-white p-4 rounded-xl focus:border-gold-500 outline-none transition-all"
                                    />
                                </label>
                            </div>

                            {/* Dados do Cartão */}
                            <div className="space-y-4 pt-6 border-t border-stone-700">
                                <div className="flex items-center gap-2 mb-4">
                                    <CreditCard className="text-gold-500" size={20} />
                                    <span className="text-xs font-bold uppercase tracking-widest text-stone-500">Dados do Cartão</span>
                                </div>
                                <label className="block">
                                    <span className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Número do Cartão</span>
                                    <input
                                        type="text"
                                        placeholder="0000 0000 0000 0000"
                                        className="w-full bg-stone-900 border border-stone-700 text-white p-4 rounded-xl focus:border-gold-500 outline-none transition-all"
                                    />
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <label className="block">
                                        <span className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">Validade</span>
                                        <input
                                            type="text"
                                            placeholder="MM/AA"
                                            className="w-full bg-stone-900 border border-stone-700 text-white p-4 rounded-xl focus:border-gold-500 outline-none transition-all"
                                        />
                                    </label>
                                    <label className="block">
                                        <span className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 block">CVV</span>
                                        <input
                                            type="text"
                                            placeholder="000"
                                            className="w-full bg-stone-900 border border-stone-700 text-white p-4 rounded-xl focus:border-gold-500 outline-none transition-all"
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Botão de Confirmação */}
                            <button className="w-full py-5 bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-stone-900 rounded-2xl font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-3 shadow-xl shadow-gold-500/20 mt-8">
                                <Shield size={20} />
                                Confirmar Pagamento Seguro
                                <ArrowRight size={20} />
                            </button>

                            <p className="text-center text-xs text-stone-600 mt-4">
                                🔒 Pagamento 100% seguro. Cancele quando quiser.
                            </p>
                        </div>
                    </div>

                    {/* FAQ & Legal */}
                    <div className="mt-16 pb-10 text-center space-y-4">
                        <p className="text-stone-500 text-sm">
                            Dúvidas? Entre em contato: <a href="mailto:suporte@trancapro.com" className="text-gold-500 hover:underline">suporte@trancapro.com</a>
                        </p>
                        <div className="flex items-center justify-center gap-6 text-[10px] uppercase font-bold tracking-widest text-stone-600">
                            <button onClick={() => navigate('/termos')} className="hover:text-gold-500 transition-colors">Termos de Uso</button>
                            <button onClick={() => navigate('/privacidade')} className="hover:text-gold-500 transition-colors">Política de Privacidade</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Checkout;
