// MDX Content Loader - Static Import Strategy
// Maps slugs to dynamically imported MDX modules

// Import all MDX files at build time (Vite glob import)
// We use relative path to ensure Vite finds them regardless of root config
const mdxModules = import.meta.glob(['/content/blog/**/*.mdx', '../content/blog/**/*.mdx'], { eager: true }) as Record<string, { default: React.ComponentType; frontmatter?: Record<string, unknown> }>;

console.log('MDX Modules loaded:', Object.keys(mdxModules).length);
if (Object.keys(mdxModules).length === 0) {
    console.error('CRITICAL: No MDX modules found in /content/blog or ../content/blog. Check project structure.');
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
    // Busca robusta: ignora prefixos de caminho (../ ou /content) e foca no final
    // Procura por ".../silo/slug.mdx" ou ".../silo/ID-slug.mdx"
    const matchingPath = Object.keys(mdxModules).find(path => {
        const normalizedPath = path.toLowerCase().replace(/\\/g, '/');
        // Verifica se o caminho contém o silo e termina com o slug (permitindo ID numérico antes)
        return normalizedPath.includes(`/${silo}/`) && normalizedPath.includes(slug);
    });

    if (!matchingPath) {
        console.warn(`MDX not found for: ${silo}/${slug}. Available paths:`, Object.keys(mdxModules));
        return null;
    }

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
    // Busca robusta por ID: procura arquivo que comece com o ID no nome
    const matchingPath = Object.keys(mdxModules).find(path => {
        const normalizedPath = path.replace(/\\/g, '/');
        const filename = normalizedPath.split('/').pop() || '';
        return filename.startsWith(`${id}-`);
    });

    if (!matchingPath) {
        console.warn(`MDX not found for ID: ${id}`);
        return null;
    }

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
