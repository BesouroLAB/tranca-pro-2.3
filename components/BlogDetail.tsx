import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, User, Share2, BookOpen, ArrowRight, Clock } from 'lucide-react';
import { MDXProvider } from '@mdx-js/react';

import { BLOG_POSTS, SILOS, BlogPostMeta } from '../data/blogData';
import { getMdxById, getAllMdxPaths } from '../utils/mdxLoader';

// Simple Error Boundary
class ErrorBoundary extends React.Component<{ children: React.ReactNode; fallback: (error: Error) => React.ReactNode }, { hasError: boolean; error: Error | null }> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    render() {
        if (this.state.hasError && this.state.error) {
            return this.props.fallback(this.state.error);
        }
        return this.props.children;
    }
}

// Custom MDX components for rich rendering
const mdxComponents = {
    h1: (props: any) => <h1 className="text-4xl font-display italic text-white mt-12 mb-6" {...props} />,
    h2: (props: any) => <h2 className="text-2xl font-display italic text-white mt-10 mb-4 border-l-4 border-gold-500 pl-4" {...props} />,
    h3: (props: any) => <h3 className="text-xl font-bold text-stone-200 mt-8 mb-3" {...props} />,
    p: (props: any) => <p className="text-stone-400 leading-relaxed mb-6 text-lg" {...props} />,
    ul: (props: any) => <ul className="list-none space-y-3 mb-8 ml-4" {...props} />,
    ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
        <ol className="list-decimal list-inside text-stone-300 mb-6 space-y-2 pl-4" {...props} />
    ),
    li: (props: any) => (
        <li className="flex gap-3 text-stone-400">
            <span className="text-gold-500 mt-1.5 flex-shrink-0">•</span>
            <span {...props} />
        </li>
    ),
    strong: (props: any) => <strong className="font-black text-gold-400" {...props} />,
    blockquote: (props: any) => (
        <blockquote className="border-l-4 border-gold-500 bg-stone-800/50 p-6 my-8 rounded-r-2xl italic text-stone-300" {...props} />
    ),
    a: (props: any) => <a className="text-gold-500 font-bold hover:underline transition-all" {...props} />,
    table: (props: any) => (
        <div className="overflow-hidden my-10 rounded-3xl border border-stone-800 shadow-2xl bg-stone-900/50">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[500px]" {...props} />
            </div>
        </div>
    ),
    thead: (props: any) => <thead className="bg-stone-950/80 border-b border-stone-800" {...props} />,
    tbody: (props: any) => <tbody className="divide-y divide-stone-800/50" {...props} />,
    th: (props: any) => <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-gold-500 whitespace-nowrap" {...props} />,
    tr: (props: any) => <tr className="group hover:bg-stone-800/30 transition-colors" {...props} />,
    td: (props: any) => <td className="p-5 text-sm text-stone-300 leading-relaxed group-hover:text-stone-100 transition-colors align-top" {...props} />,
};

// Moving CTABanner outside to be stable
const CTABanner = ({ text, link }: { text: string; link: string }) => {
    const navigate = useNavigate();
    return (
        <div className="bg-gradient-to-r from-gold-500/20 to-amber-600/10 border border-gold-500/30 rounded-[2.5rem] p-10 my-12 text-center relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <h4 className="text-white text-lg font-display italic mb-6 relative z-10">Pronta para profissionalizar seu salão?</h4>
            <button
                onClick={() => navigate(link)}
                className="inline-flex items-center gap-3 bg-gold-500 text-stone-950 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-xl shadow-gold-500/30 relative z-10"
            >
                {text} <ArrowRight size={16} />
            </button>
        </div>
    );
};

const BlogDetail = () => {
    const { silo, slug } = useParams();
    const navigate = useNavigate();

    // Find post by slug in metadata
    const post = BLOG_POSTS.find(p => p.slug === slug);
    const siloData = SILOS.find(s => s.id.toLowerCase() === silo?.toLowerCase());

    // Try to load MDX content
    const mdxContent = post ? getMdxById(post.id) : null;
    const MdxComponent = mdxContent?.Component;

    // Merge CTABanner with other components
    const componentsWithCTA = {
        ...mdxComponents,
        CTABanner
    };

    console.log('[BlogDetail] MDX loaded:', !!MdxComponent, 'ID:', post?.id);

    if (!post) {
        return (
            <div className="min-h-screen bg-stone-900 text-white flex items-center justify-center flex-col gap-4">
                <h1 className="text-3xl font-display">Artigo não encontrado</h1>
                <button onClick={() => navigate('/blog')} className="text-gold-500 hover:underline">Voltar para o Blog</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-900 text-stone-100 font-sans pb-20">
            {/* Nav */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-stone-900/80 backdrop-blur-md border-b border-stone-800">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/blog')}
                        className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors group"
                    >
                        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-bold uppercase tracking-widest">Voltar para o Blog</span>
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gold-500 rounded-lg flex items-center justify-center text-stone-900">
                            <BookOpen size={18} />
                        </div>
                        <span className="font-display italic text-xl hidden sm:inline">Blog Trança Pro</span>
                    </div>
                    <button className="p-2 text-stone-400 hover:text-gold-500 transition-colors">
                        <Share2 size={20} />
                    </button>
                </div>
            </header>

            <main className="pt-32">
                <div className="container mx-auto px-6 max-w-4xl space-y-12">
                    {/* Header Info */}
                    <div className="space-y-6 text-center">
                        <div className="flex items-center justify-center gap-3">
                            <span className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest border border-gold-500/20 ${siloData?.bg} ${siloData?.color}`}>
                                {siloData?.name}
                            </span>
                            {post.type === 'pillar' && (
                                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-gold-500/20 text-gold-500 border border-gold-500/30">
                                    Artigo Pilar
                                </span>
                            )}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-display italic text-white leading-tight">
                            {post.title}
                        </h1>
                        <div className="flex items-center justify-center gap-6 text-[10px] text-stone-500 font-bold uppercase tracking-widest">
                            <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</span>
                            <span className="flex items-center gap-1.5"><User size={12} /> {post.author}</span>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="aspect-video rounded-[3rem] overflow-hidden border border-stone-800 shadow-2xl">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    </div>

                    {/* Content - MDX or Fallback */}
                    <article className="prose prose-invert prose-gold max-w-none min-h-[400px]">
                        {post ? (
                            MdxComponent ? (
                                <ErrorBoundary fallback={(error) => (
                                    <div className="p-8 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500">
                                        <h3 className="font-bold mb-2">Erro ao renderizar conteúdo MDX:</h3>
                                        <pre className="text-xs overflow-auto whitespace-pre-wrap">{error.message}</pre>
                                        <div className="mt-4 text-xs opacity-50">Verifique se todos os componentes customizados estão mapeados.</div>
                                    </div>
                                )}>
                                    <MdxComponent components={componentsWithCTA} />
                                </ErrorBoundary>
                            ) : (
                                <div className="text-center py-20 text-stone-500 bg-stone-800/20 rounded-[3rem] border border-stone-800">
                                    <BookOpen size={48} className="mx-auto mb-4 opacity-20" />
                                    <p className="text-xl font-display italic">Artigo em Elaboração</p>
                                    <p className="text-sm mt-2 opacity-60">Este conteúdo está sendo preparado e estará disponível em breve.</p>
                                </div>
                            )
                        ) : (
                            <div className="text-center py-20">
                                <p>Artigo não identificado.</p>
                            </div>
                        )}
                    </article>

                    {/* Footer CTA */}
                    <div className="pt-20 border-t border-stone-800">
                        <div className="bg-stone-800/30 rounded-[3rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="space-y-2">
                                <h3 className="text-2xl font-display italic text-white">Pronta para profissionalizar seu estúdio?</h3>
                                <p className="text-stone-500">Use o Trança Pro para gerenciar toda sua operação.</p>
                            </div>
                            <button
                                onClick={() => navigate('/?start=true')}
                                className="bg-gold-500 text-stone-900 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-gold-500/10"
                            >
                                Testar Grátis <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </main >

            <footer className="py-12 text-center border-t border-stone-800 mt-20">
                <p className="text-[10px] text-stone-600 font-black uppercase tracking-[0.3em]">
                    © 2026 Trança Pro • Blog Oficial
                </p>
            </footer>
        </div >
    );
};

export default BlogDetail;
