import React from 'react';

// MDX Content Loader - Static Import Strategy
// Maps slugs to dynamically imported MDX modules

// Import all MDX files at build time (Vite glob import)
const mdxModules = import.meta.glob([
    '/content/blog/**/*.mdx',
    './content/blog/**/*.mdx',
    '../content/blog/**/*.mdx',
    './src/content/blog/**/*.mdx'
], { eager: true }) as Record<string, any>;

if (Object.keys(mdxModules).length === 0) {
    console.warn('[mdxLoader] No MDX files found by Vite glob!');
}

export interface MDXContent {
    Component: React.ComponentType<{ components?: Record<string, React.ComponentType<any> | React.FC<any>> }>;
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
        const matches = normalizedPath.includes(`/${silo}/`) && normalizedPath.includes(slug);
        return matches;
    });

    if (!matchingPath) {
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
    const matchingKey = Object.keys(mdxModules).find(key => {
        const parts = key.split('/');
        const filename = parts[parts.length - 1];
        return filename.startsWith(`${id}-`);
    });

    if (!matchingKey) {
        return null;
    }

    const module = mdxModules[matchingKey];

    // Safety check for the component
    let Component = module.default;

    if (!Component && typeof module === 'function') {
        Component = module;
    }

    if (!Component) {
        // Fallback: try to find anything that looks like a React component
        Component = module.Content || module.Main || (() => React.createElement('div', null, 'Error: Invalid MDX exports'));
    }

    return {
        Component,
        frontmatter: module.frontmatter || {}
    };
}

/**
 * Get all available MDX paths (for debugging)
 */
export function getAllMdxPaths(): string[] {
    return Object.keys(mdxModules);
}
