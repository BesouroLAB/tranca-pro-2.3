/// <reference types="vite/client" />

declare module '*.mdx' {
    import { ComponentType } from 'react';
    const component: ComponentType;
    export const frontmatter: Record<string, unknown>;
    export default component;
}
