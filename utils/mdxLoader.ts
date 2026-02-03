// MDX Content Loader - Static Import Strategy
// Maps slugs to dynamically imported MDX modules

// Import all MDX files at build time (Vite glob import)
// We use relative path to ensure Vite finds them regardless of root config
const mdxModules = import.meta.glob(['/content/blog/**/*.mdx', '../content/blog/**/*.mdx'], { eager: true }) as Record<string, { default: React.ComponentType; frontmatter?: Record<string, unknown> }>;

console.log('[mdxLoader] MDX Modules loaded:', Object.keys(mdxModules).length);
console.log('[mdxLoader] Paths:', Object.keys(mdxModules));

if (Object.keys(mdxModules).length === 0) {
    console.error('[mdxLoader] CRITICAL: No MDX modules found in /content/blog or ../content/blog. Check project structure.');
}

export interface MDXContent {
    Component: React.ComponentType;
    frontmatter: Record<string, unknown>;
}

/**
 * Get MDX content by silo and slug
 * @example getMdxContent('estilos', 'guia-completo-tipos-de-trancas')
 */
export function getMdxContent(silo: string, slug: string): MDXContent | null {
    console.log('[getMdxContent] Searching for:', { silo, slug });

    // Busca robusta: ignora prefixos de caminho (../ ou /content) e foca no final
    // Procura por ".../silo/slug.mdx" ou ".../silo/ID-slug.mdx"
    const matchingPath = Object.keys(mdxModules).find(path => {
        const normalizedPath = path.toLowerCase().replace(/\\/g, '/');
        const matches = normalizedPath.includes(`/${silo}/`) && normalizedPath.includes(slug);
        console.log(`[getMdxContent] Testing: ${path} -> ${matches}`);
        return matches;
    });

    if (!matchingPath) {
        console.warn(`[getMdxContent] MDX not found for: ${silo}/${slug}`);
        console.warn('[getMdxContent] Available paths:', Object.keys(mdxModules));
        return null;
    }

    console.log('[getMdxContent] Found match:', matchingPath);
    const module = mdxModules[matchingPath];
    return {
        Component: module.default,
        frontmatter: module.frontmatter || {}
    };
}

/**
 * Get MDX content by post ID
 * @example getMdxById('101')
 */
export function getMdxById(id: string): MDXContent | null {
    console.log('[getMdxById] Searching for ID:', id);
    console.log('[getMdxById] Available paths:', Object.keys(mdxModules));

    // Busca robusta por ID: procura arquivo que comece com o ID no nome
    const matchingPath = Object.keys(mdxModules).find(path => {
        const normalizedPath = path.replace(/\\/g, '/');
        const filename = normalizedPath.split('/').pop() || '';
        const matches = filename.startsWith(`${id}-`);
        console.log(`[getMdxById] Testing: ${filename} -> ${matches}`);
        return matches;
    });

    if (!matchingPath) {
        console.error(`[getMdxById] MDX not found for ID: ${id}`);
        console.error('[getMdxById] Available files:', Object.keys(mdxModules).map(p => p.split('/').pop()));
        return null;
    }

    console.log('[getMdxById] Found match:', matchingPath);
    const module = mdxModules[matchingPath];
    return {
        Component: module.default,
        frontmatter: module.frontmatter || {}
    };
}

/**
 * Get all available MDX paths (for debugging)
 */
export function getAllMdxPaths(): string[] {
    return Object.keys(mdxModules);
}
