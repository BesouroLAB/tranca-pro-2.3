import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    BookOpen,
    Search,
    ArrowRight,
    Calendar,
    User,
    Tag,
    ChevronLeft,
    Sparkles,
    Calculator,
    ShieldCheck,
    Scissors
} from 'lucide-react';

import { SILOS, BLOG_POSTS } from '../data/blogData';
import StickyFooterCTA from './StickyFooterCTA';

const BlogHome = () => {
    const navigate = useNavigate(); // Ensuring navigate is available
    const { siloId } = useParams(); // Read URL param
    const [searchQuery, setSearchQuery] = useState('');
    const [activeSilo, setActiveSilo] = useState(siloId || 'all');

    // Update activeSilo if URL changes
    React.useEffect(() => {
        if (siloId) {
            setActiveSilo(siloId);
        } else {
            setActiveSilo('all');
        }
    }, [siloId]);

    const filteredArticles = BLOG_POSTS.filter(art => {
        const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSilo = activeSilo === 'all' || art.silo.toLowerCase() === activeSilo?.toLowerCase();
        return matchesSearch && matchesSilo;
    });

    return (
        <div className="min-h-screen bg-stone-900 text-stone-100 font-sans pb-20">
            {/* Header / Nav */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-stone-900/80 backdrop-blur-md border-b border-stone-800">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors group"
                    >
                        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-bold uppercase tracking-widest">Voltar para Home</span>
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gold-500 rounded-lg flex items-center justify-center text-stone-900">
                            <BookOpen size={18} />
                        </div>
                        <span className="font-display italic text-xl">Blog Trança Pro</span>
                    </div>
                    <div className="w-32 hidden md:block"></div> {/* Spacer */}
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-40 pb-20 bg-gradient-to-b from-stone-800 to-stone-900">
                <div className="container mx-auto px-6 text-center space-y-8">
                    <h1 className="text-5xl md:text-7xl font-display italic text-white tracking-tight">
                        Conhecimento técnico <span className="text-gold-500 block md:inline">para quem não brinca de trançar.</span>
                    </h1>
                    <p className="text-xl text-stone-400 max-w-2xl mx-auto leading-relaxed">
                        Tudo sobre gestão, técnica e saúde capilar para elevar o nível do seu estúdio de tranças.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-500 group-focus-within:text-gold-500 transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Pesquisar por técnicas, precificação..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-stone-950 border border-stone-800 rounded-2xl py-5 pl-16 pr-6 focus:border-gold-500 outline-none transition-all placeholder:text-stone-700 text-lg"
                        />
                    </div>
                </div>
            </section>

            {/* Cluster Navigation Cards */}
            <section className="py-16 bg-stone-900">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <span className="text-xs font-black uppercase tracking-widest text-gold-500">Explore por Categoria</span>
                        <h2 className="text-3xl md:text-4xl font-display italic text-white mt-2">Escolha Seu Caminho de Aprendizado</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {SILOS.map((silo) => {
                            const SiloIcon = silo.icon;
                            const siloPostCount = BLOG_POSTS.filter(p => p.silo === silo.id).length;
                            const pillarPost = BLOG_POSTS.find(p => p.silo === silo.id && p.type === 'pillar');

                            return (
                                <div
                                    key={silo.id}
                                    onClick={() => navigate(`/blog/${silo.id}`)}
                                    className="group cursor-pointer bg-stone-800/30 border border-stone-700 rounded-3xl p-8 hover:border-gold-500/50 hover:bg-stone-800/50 transition-all duration-300"
                                >
                                    <div className={`w-16 h-16 rounded-2xl ${silo.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                        <SiloIcon className={silo.color} size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold-400 transition-colors">
                                        {silo.name}
                                    </h3>
                                    <p className="text-sm text-stone-400 mb-4 line-clamp-2">
                                        {pillarPost?.excerpt || `Tudo sobre ${silo.name.toLowerCase()}`}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-stone-500 font-bold uppercase tracking-wider">
                                            {siloPostCount} artigos
                                        </span>
                                        <ArrowRight className="text-gold-500 group-hover:translate-x-1 transition-transform" size={16} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>


            {/* Silo Selection */}
            <section className="py-12 sticky top-20 z-40 bg-stone-900/90 backdrop-blur-sm border-b border-stone-800">
                <div className="container mx-auto px-6 flex items-center gap-4 overflow-x-auto no-scrollbar pb-2">
                    <button
                        onClick={() => setActiveSilo('all')}
                        className={`px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${activeSilo === 'all' ? 'bg-gold-500 text-stone-900 shadow-lg shadow-gold-500/20' : 'bg-stone-800 text-stone-400 hover:bg-stone-700'}`}
                    >
                        Todos os Artigos
                    </button>
                    {SILOS.map(silo => (
                        <button
                            key={silo.id}
                            onClick={() => setActiveSilo(silo.id)}
                            className={`flex items-center gap-3 px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${activeSilo === silo.id ? 'bg-gold-500 text-stone-900 shadow-lg shadow-gold-500/20' : 'bg-stone-800 text-stone-400 hover:bg-stone-700'}`}
                        >
                            <silo.icon size={16} />
                            {silo.name}
                        </button>
                    ))}
                </div>
            </section>

            {/* Articles Grid */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    {filteredArticles.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-stone-500 text-xl">Nenhum artigo encontrado para sua busca.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {filteredArticles.map((art, i) => (
                                <article
                                    key={art.id}
                                    onClick={() => navigate(`/blog/${art.silo}/${art.slug}`)}
                                    className="group bg-stone-800/50 border border-stone-800 rounded-[2.5rem] overflow-hidden hover:border-gold-500/30 hover:shadow-2xl transition-all duration-500 flex flex-col cursor-pointer"
                                >
                                    <div className="aspect-[16/10] overflow-hidden relative">
                                        <img
                                            src={art.image}
                                            alt={art.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-6 left-6">
                                            <span className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest border border-gold-500/20 shadow-lg backdrop-blur-md ${SILOS.find(s => s.id === art.silo)?.bg} ${SILOS.find(s => s.id === art.silo)?.color}`}>
                                                {SILOS.find(s => s.id === art.silo)?.name}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4 text-[10px] text-stone-500 font-bold uppercase tracking-widest">
                                                <span className="flex items-center gap-1.5"><Calendar size={12} /> {art.date}</span>
                                                <span className="flex items-center gap-1.5"><User size={12} /> {art.author}</span>
                                            </div>
                                            <h3 className="text-2xl font-display italic text-white leading-tight group-hover:text-gold-500 transition-colors">
                                                {art.title}
                                            </h3>
                                            <p className="text-stone-400 text-sm leading-relaxed line-clamp-3">
                                                {art.excerpt}
                                            </p>
                                        </div>
                                        <div
                                            className="w-fit flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-gold-500 hover:text-white transition-colors"
                                        >
                                            Ler Artigo Completo <ArrowRight size={14} />
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter / CTA */}
            <section className="py-20 container mx-auto px-6">
                <div className="bg-gradient-to-br from-gold-500 to-amber-600 rounded-[3.5rem] p-12 md:p-20 text-center space-y-8 shadow-2xl overflow-hidden relative group">
                    <div className="absolute inset-0 bg-stone-900/10 pointer-events-none"></div>
                    <div className="absolute top-0 right-0 p-12 scale-150 opacity-10 -rotate-12 group-hover:rotate-12 transition-transform duration-1000">
                        <Sparkles size={200} />
                    </div>

                    <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                        <h2 className="text-4xl md:text-5xl font-display italic text-stone-900 leading-tight">
                            Receba Dicas Exclusivas de Gestão e Estilo.
                        </h2>
                        <p className="text-stone-900/70 text-lg font-medium">
                            Conhecimento técnico para quem não brinca de trançar.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <input
                                type="email"
                                placeholder="Seu melhor e-mail..."
                                className="flex-1 bg-white/20 border border-white/30 rounded-2xl p-5 outline-none placeholder:text-stone-900/50 text-stone-900 font-bold"
                            />
                            <button className="bg-stone-900 text-gold-500 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all">
                                Assinar Grátis
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 text-center border-t border-stone-800 mt-20">
                <p className="text-[10px] text-stone-600 font-black uppercase tracking-[0.3em]">
                    © 2026 Trança Pro • Blog Oficial
                </p>
            </footer>
            <StickyFooterCTA onStart={() => navigate('/?start=true')} />
        </div>
    );
};

export default BlogHome;
