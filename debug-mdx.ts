// Debug script to test MDX loading
const mdxModules = import.meta.glob(['/content/blog/**/*.mdx', '../content/blog/**/*.mdx'], { eager: true });

console.log('=== MDX DEBUG ===');
console.log('Total modules loaded:', Object.keys(mdxModules).length);
console.log('Module paths:', Object.keys(mdxModules));

// Test getMdxById logic
const testId = '101';
const matchingPath = Object.keys(mdxModules).find(path => {
    const normalizedPath = path.replace(/\\/g, '/');
    const filename = normalizedPath.split('/').pop() || '';
    console.log('Testing path:', path, '-> filename:', filename);
    return filename.startsWith(`${testId}-`);
});

console.log('Match for ID 101:', matchingPath);

export { };
