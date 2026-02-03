import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, User, Share2, BookOpen, ArrowRight, Clock } from 'lucide-react';
import { MDXProvider } from '@mdx-js/react';

import { BLOG_POSTS, SILOS, BlogPostMeta } from '../data/blogData';
import { getMdxById } from '../utils/mdxLoader';

// Custom MDX components for rich rendering
const mdxComponents = {
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1 className="text-4xl font-display italic text-white mt-12 mb-6" {...props} />
    ),
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2 className="text-2xl font-display italic text-gold-500 mt-10 mb-4 border-b border-stone-800 pb-2" {...props} />
    ),
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3 className="text-xl font-bold text-white mt-8 mb-3" {...props} />
    ),
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p className="text-stone-300 leading-relaxed mb-4" {...props} />
    ),
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
        <ul className="list-disc list-inside text-stone-300 mb-6 space-y-2 pl-4" {...props} />
    ),
    ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
        <ol className="list-decimal list-inside text-stone-300 mb-6 space-y-2 pl-4" {...props} />
    ),
    li: (props: React.HTMLAttributes<HTMLLIElement>) => (
        <li className="text-stone-300" {...props} />
    ),
    strong: (props: React.HTMLAttributes<HTMLElement>) => (
        <strong className="text-white font-bold" {...props} />
    ),
    blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
        <blockquote className="border-l-4 border-gold-500 pl-6 py-2 my-6 italic text-stone-400 bg-stone-800/30 rounded-r-xl" {...props} />
    ),
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
        <a className="text-gold-500 hover:text-gold-400 underline underline-offset-2 transition-colors" {...props} />
    ),
    table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
        <div className="overflow-x-auto my-6">
            <table className="w-full text-left bg-stone-800 rounded-xl overflow-hidden" {...props} />
        </div>
    ),
    thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
        <thead className="bg-gold-500 text-stone-900" {...props} />
    ),
    th: (props: React.ThHTMLAttributes<HTMLTableHeaderCellElement>) => (
        <th className="p-4 font-bold" {...props} />
    ),
    td: (props: React.TdHTMLAttributes<HTMLTableDataCellElement>) => (
        <td className="p-4 border-b border-stone-700 text-stone-300" {...props} />
    ),
    // Custom CTA component
    CTABanner: ({ text, link }: { text: string; link: string }) => (
        <div className="bg-gradient-to-r from-gold-500/20 to-gold-600/10 border border-gold-500/30 rounded-2xl p-8 my-10 text-center">
            <a
                href={link}
                className="inline-flex items-center gap-3 bg-gold-500 text-stone-900 px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-xl shadow-gold-500/20"
            >
                {text} <ArrowRight size={16} />
            </a>
        </div>
    )
};

const BlogDetail = () => {
    const { silo, slug } = useParams();
    const navigate = useNavigate();

    console.log('[BlogDetail] Params:', { silo, slug });

    // Find post by slug in metadata
    const post = BLOG_POSTS.find(p => p.slug === slug);
    const siloData = SILOS.find(s => s.id === silo);
    console.log('[BlogDetail] Post found:', post?.title, 'ID:', post?.id);

    // Try to load MDX content
    const mdxContent = post ? getMdxById(post.id) : null;
    const MdxComponent = mdxContent?.Component;
    console.log('[BlogDetail] MDX loaded:', !!MdxComponent, 'Content:', mdxContent);

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
                    <article className="prose prose-invert prose-gold max-w-none">
                        {MdxComponent ? (
                            <MDXProvider components={mdxComponents}>
                                <MdxComponent />
                            </MDXProvider>
                        ) : (
                            <div className="text-center py-20 text-stone-500">
                                <p>Conteúdo em desenvolvimento.</p>
                                <p className="text-sm mt-2">Este artigo está sendo preparado pela equipe Trança Pro.</p>
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
            </main>

            <footer className="py-12 text-center border-t border-stone-800 mt-20">
                <p className="text-[10px] text-stone-600 font-black uppercase tracking-[0.3em]">
                    © 2026 Trança Pro • Blog Oficial
                </p>
            </footer>
        </div>
    );
};

export default BlogDetail;
