import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronLeft, BookOpen, Clock, User } from 'lucide-react';
import { BLOG_POSTS, SILOS, BlogPostMeta } from '../data/blogData';

const SiloLanding = () => {
    const { silo } = useParams();
    const navigate = useNavigate();

    // Find silo data
    const siloData = SILOS.find(s => s.id.toLowerCase() === silo?.toLowerCase());
    const siloPosts = BLOG_POSTS.filter(p => p.silo.toLowerCase() === silo?.toLowerCase());
    const pillarPost = siloPosts.find(p => p.type === 'pillar');
    const satellitePosts = siloPosts.filter(p => p.type === 'satellite');

    if (!siloData) {
        return (
            <div className="min-h-screen bg-stone-900 text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-display italic mb-4">Categoria não encontrada</h1>
                    <button onClick={() => navigate('/blog')} className="text-gold-500 hover:underline">
                        Voltar para o Blog
                    </button>
                </div>
            </div>
        );
    }

    const Icon = siloData.icon;

    return (
        <div className="min-h-screen bg-stone-900 text-stone-100 font-sans pb-20">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-stone-900/80 backdrop-blur-md border-b border-stone-800">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/blog')}
                        className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors group"
                    >
                        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-bold uppercase tracking-widest">Todas as Categorias</span>
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gold-500 rounded-lg flex items-center justify-center text-stone-900">
                            <BookOpen size={18} />
                        </div>
                        <span className="font-display italic text-xl hidden sm:inline">Blog Trança Pro</span>
                    </div>
                    <div className="w-32"></div>
                </div>
            </header>

            <main className="pt-32 px-6">
                <div className="container mx-auto max-w-6xl">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl mb-6 ${siloData.bg}`}>
                            <Icon className={siloData.color} size={24} />
                            <span className={`text-sm font-black uppercase tracking-widest ${siloData.color}`}>
                                {siloData.name}
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display italic text-white mb-6 leading-tight">
                            Tudo sobre <span className="text-gold-500">{siloData.name}</span>
                        </h1>
                        <p className="text-xl text-stone-400 max-w-2xl mx-auto">
                            Guias completos, tutoriais práticos e dicas profissionais para dominar {siloData.name.toLowerCase()}.
                        </p>
                    </div>

                    {/* Pillar Post (Featured) */}
                    {pillarPost && (
                        <div className="mb-20">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-500/30"></div>
                                <span className="text-xs font-black uppercase tracking-widest text-gold-500">Artigo Pilar</span>
                                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-500/30"></div>
                            </div>

                            <div
                                onClick={() => navigate(`/blog/${pillarPost.silo}/${pillarPost.slug}`)}
                                className="group cursor-pointer"
                            >
                                <div className="bg-gradient-to-br from-stone-800/50 to-stone-900/50 border border-stone-700 rounded-[3rem] overflow-hidden hover:border-gold-500/50 transition-all duration-300">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        {/* Image */}
                                        <div className="aspect-video md:aspect-square overflow-hidden">
                                            <img
                                                src={pillarPost.image}
                                                alt={pillarPost.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        {/* Content */}
                                        <div className="p-8 md:p-12 flex flex-col justify-center">
                                            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest mb-4 w-fit ${siloData.bg} ${siloData.color} border border-gold-500/20`}>
                                                <Icon size={14} />
                                                {siloData.name}
                                            </span>
                                            <h2 className="text-3xl md:text-4xl font-display italic text-white mb-4 group-hover:text-gold-400 transition-colors">
                                                {pillarPost.title}
                                            </h2>
                                            <p className="text-stone-400 mb-6">
                                                {pillarPost.excerpt}
                                            </p>
                                            <div className="flex items-center gap-4 text-xs text-stone-500 font-bold uppercase tracking-widest mb-6">
                                                <span className="flex items-center gap-1"><User size={12} /> {pillarPost.author}</span>
                                            </div>
                                            <button className="flex items-center gap-2 text-gold-500 hover:text-gold-400 font-bold text-sm transition-colors">
                                                Ler Artigo Completo <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Satellite Posts Grid */}
                    {satellitePosts.length > 0 && (
                        <div>
                            <div className="flex items-center gap-2 mb-8">
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-stone-700"></div>
                                <span className="text-xs font-black uppercase tracking-widest text-stone-500">Mais Artigos</span>
                                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-stone-700"></div>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {satellitePosts.map((post) => (
                                    <div
                                        key={post.id}
                                        onClick={() => navigate(`/blog/${post.silo}/${post.slug}`)}
                                        className="group cursor-pointer"
                                    >
                                        <div className="bg-stone-800/30 border border-stone-700 rounded-3xl overflow-hidden hover:border-gold-500/50 transition-all duration-300">
                                            <div className="aspect-video overflow-hidden">
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="p-6">
                                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold-400 transition-colors line-clamp-2">
                                                    {post.title}
                                                </h3>
                                                <p className="text-sm text-stone-400 mb-4 line-clamp-2">
                                                    {post.excerpt}
                                                </p>
                                                <div className="flex items-center justify-between text-xs text-stone-500 font-bold uppercase tracking-widest">
                                                    <span className="flex items-center gap-1"><User size={10} /> {post.author}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CTA Section */}
                    <div className="mt-20 bg-gradient-to-r from-gold-500/10 to-amber-600/10 border border-gold-500/30 rounded-[3rem] p-12 text-center">
                        <h3 className="text-3xl font-display italic text-white mb-4">
                            Aprenda na Prática com o Trança Pro
                        </h3>
                        <p className="text-stone-400 mb-8 max-w-2xl mx-auto">
                            Ferramentas profissionais, calculadoras automáticas e IA para te ajudar a dominar {siloData.name.toLowerCase()}.
                        </p>
                        <button
                            onClick={() => navigate('/?start=true')}
                            className="inline-flex items-center gap-3 bg-gold-500 text-stone-900 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-xl shadow-gold-500/20"
                        >
                            Começar Grátis <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </main>

            <footer className="py-12 text-center border-t border-stone-800 mt-20">
                <p className="text-[10px] text-stone-600 font-black uppercase tracking-[0.3em]">
                    © 2026 Trança Pro • Blog Oficial
                </p>
            </footer>
        </div>
    );
};

export default SiloLanding;
