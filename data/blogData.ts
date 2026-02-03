import { Scissors, Calculator, Sparkles, ShieldCheck } from 'lucide-react';

export const SILOS = [
    { id: 'estilos', name: 'Técnicas e Estilos', icon: Scissors, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { id: 'gestao', name: 'Gestão e Finanças', icon: Calculator, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { id: 'materiais', name: 'Materiais e Produtos', icon: Sparkles, color: 'text-violet-500', bg: 'bg-violet-500/10' },
    { id: 'saude', name: 'Saúde Capilar', icon: ShieldCheck, color: 'text-rose-500', bg: 'bg-rose-500/10' },
];

export interface BlogPostMeta {
    id: string;
    slug: string;
    silo: 'estilos' | 'gestao' | 'materiais' | 'saude';
    title: string;
    excerpt: string;
    image: string;
    author: string;
    role?: string;
    date: string;
    type: 'pillar' | 'satellite';
}

// SLIM INDEX - Conteúdo completo vive nos arquivos MDX
export const BLOG_POSTS: BlogPostMeta[] = [
    // --- CLUSTER 1: ESTILOS (Técnicas) ---
    {
        id: '101',
        slug: 'guia-completo-tipos-de-trancas',
        silo: 'estilos',
        title: 'Tranças Afro: Os Principais Tipos, Nomes e Tendências para 2026',
        excerpt: 'Conheça os principais tipos de tranças afro: Box Braids, Nagô, Faux Locs e mais. Descubra qual estilo dura mais e como precificar cada um.',
        image: '/images/blog/estilos-trancas.png',
        author: 'Equipe Trança Pro',
        date: '02 Fev 2026',
        type: 'pillar'
    },
    {
        id: '102',
        slug: 'tudo-sobre-faux-locs',
        silo: 'estilos',
        title: 'Faux Locs: Técnica Completa e Calculadora de Materiais',
        excerpt: 'Butterfly, Soft ou Goddess? Entenda as diferenças técnicas e pare de desperdiçar dinheiro comprando cabelo a mais.',
        image: '/images/blog/faux-locs.png',
        author: 'Sarah Monteiro',
        role: 'Master Braider',
        date: '05 Fev 2026',
        type: 'satellite'
    },
    {
        id: '103',
        slug: 'box-braids-ou-knotless',
        silo: 'estilos',
        title: 'Box Braids vs. Knotless Braids: Guia Técnico Completo',
        excerpt: 'Domine as técnicas mais pedidas do momento. Diferenças, tempos de execução e como vender cada estilo.',
        image: '/images/blog/box-braids.png',
        author: 'Sarah Monteiro',
        role: 'Master Braider',
        date: '02 Fev 2026',
        type: 'satellite'
    },

    // --- CLUSTER 2: GESTÃO (Finanças) ---
    {
        id: '201',
        slug: 'guia-negocios-trancista-sucesso',
        silo: 'gestao',
        title: 'De Trancista a Empresária: O Guia Completo de Gestão para um Salão Rentável',
        excerpt: 'Aprenda a gerir seu salão, organizar a agenda, formalizar o negócio (MEI) e lucrar de verdade.',
        image: '/images/blog/gestao-trancista.png',
        author: 'Equipe Trança Pro',
        date: '02 Fev 2026',
        type: 'pillar'
    },
    {
        id: '202',
        slug: 'como-precificar-trancas-sem-prejuizo',
        silo: 'gestao',
        title: 'Como Precificar Tranças: O Cálculo Correto para Parar de Pagar para Trabalhar',
        excerpt: 'Aprenda o cálculo correto de como precificar tranças e usar a Calculadora do Trança Pro.',
        image: '/images/blog/precificacao-trancas.png',
        author: 'Equipe Trança Pro',
        date: '02 Fev 2026',
        type: 'satellite'
    },
    {
        id: '203',
        slug: 'kit-trancista-iniciante-lista-materiais',
        silo: 'gestao',
        title: 'Kit Trancista Iniciante: A Lista Completa do Que Você Precisa',
        excerpt: 'Materiais essenciais, melhores marcas de Jumbo e o que você NÃO precisa comprar agora.',
        image: '/images/blog/kit-trancista.png',
        author: 'Equipe Trança Pro',
        date: '02 Fev 2026',
        type: 'satellite'
    },

    // --- CLUSTER 3: MATERIAIS (Produtos) ---
    {
        id: '301',
        slug: 'guia-fibras-jumbo-organico-biofibra',
        silo: 'materiais',
        title: 'Guia de Materiais: Jumbo, Kanekalon, Orgânico e Biofibra',
        excerpt: 'Entenda as diferenças, qual a melhor fibra para cada estilo de trança e como calcular a quantidade certa.',
        image: '/images/blog/guia-fibras.png',
        author: 'Equipe Trança Pro',
        date: '02 Fev 2026',
        type: 'pillar'
    },
    {
        id: '302',
        slug: 'melhores-pomadas-modeladoras',
        silo: 'materiais',
        title: 'Melhores Pomadas Modeladoras para Tranças',
        excerpt: 'Ranking das pomadas que não deixam resíduo branco e garantem acabamento impecável.',
        image: '/images/blog/pomadas.png',
        author: 'Equipe Trança Pro',
        date: '02 Fev 2026',
        type: 'satellite'
    },
    {
        id: '303',
        slug: 'melhores-marcas-jumbo',
        silo: 'materiais',
        title: 'Melhores Marcas de Jumbo: Comparativo Completo',
        excerpt: 'Ser Mulher, Super X ou Zhang Hair? Comparamos preço, qualidade e rendimento.',
        image: '/images/blog/marcas-jumbo.png',
        author: 'Equipe Trança Pro',
        date: '02 Fev 2026',
        type: 'satellite'
    },

    // --- CLUSTER 4: SAÚDE (Capilar) ---
    {
        id: '401',
        slug: 'guia-completo-saude-capilar-trancas',
        silo: 'saude',
        title: 'Saúde Capilar com Tranças: O Guia Completo de Cuidados, Riscos e Prevenção',
        excerpt: 'Trança estraga o cabelo? Descubra como manter a saúde capilar em dia e evitar a quebra.',
        image: '/images/blog/saude-capilar.png',
        author: 'Equipe Trança Pro',
        date: '02 Fev 2026',
        type: 'pillar'
    },
    {
        id: '402',
        slug: 'alopecia-por-tracao-sintomas-tratamento',
        silo: 'saude',
        title: 'Alopecia por Tração: Sintomas, Tratamento e Prevenção',
        excerpt: 'Como identificar, prevenir e o que fazer se sua cliente apresentar falhas no couro cabeludo.',
        image: '/images/blog/alopecia.png',
        author: 'Dra. Luiza Dermato',
        role: 'Tricologista',
        date: '07 Fev 2026',
        type: 'satellite'
    },
    {
        id: '403',
        slug: 'como-lavar-e-secar-trancas-corretamente',
        silo: 'saude',
        title: 'Como Lavar as Tranças: O Passo a Passo para Higienizar sem Estragar',
        excerpt: 'Passo a passo para higienizar o couro cabeludo, evitar o frizz e secar corretamente.',
        image: '/images/blog/lavar-trancas.png',
        author: 'Equipe Trança Pro',
        date: '02 Fev 2026',
        type: 'satellite'
    }
];

// Helper to get post by slug
export const getPostBySlug = (slug: string): BlogPostMeta | undefined => {
    return BLOG_POSTS.find(p => p.slug === slug);
};

// Helper to get posts by silo
export const getPostsBySilo = (silo: string): BlogPostMeta[] => {
    return BLOG_POSTS.filter(p => p.silo === silo);
};

// Helper to get pillar posts
export const getPillarPosts = (): BlogPostMeta[] => {
    return BLOG_POSTS.filter(p => p.type === 'pillar');
};
