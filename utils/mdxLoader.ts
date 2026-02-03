// MDX Content Loader - Static Import Strategy
// Maps slugs to dynamically imported MDX modules

// Import all MDX files at build time (Vite glob import)
const mdxModules = import.meta.glob('/content/blog/**/*.mdx', { eager: true }) as Record<string, { default: React.ComponentType; frontmatter?: Record<string, unknown> }>;

export interface MDXContent {
    Component: React.ComponentType;
    frontmatter: Record<string, unknown>;
}

/**
 * Get MDX content by silo and slug
 * @example getMdxContent('estilos', 'guia-completo-tipos-de-trancas')
 */
export function getMdxContent(silo: string, slug: string): MDXContent | null {
    // Find matching MDX file
    const matchingPath = Object.keys(mdxModules).find(path => {
        const normalizedPath = path.toLowerCase();
        return normalizedPath.includes(`/${silo}/`) && normalizedPath.includes(slug);
    });

    if (!matchingPath) {
        console.warn(`MDX not found for: ${silo}/${slug}`);
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
    // Find matching MDX file by ID in filename
    const matchingPath = Object.keys(mdxModules).find(path => {
        const filename = path.split('/').pop() || '';
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
