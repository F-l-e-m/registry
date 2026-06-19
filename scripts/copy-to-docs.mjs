import { cpSync, rmSync, writeFileSync } from 'node:fs';

rmSync('docs', { recursive: true, force: true });
cpSync('dist', 'docs', { recursive: true });
cpSync('dist/index.html', 'docs/404.html');
writeFileSync('docs/.nojekyll', '');

console.log('docs/ готова для GitHub Pages');
