import { marked } from "marked";
import KatexRenderer from "marked-katex-extension";

const md = `Some text before $$E=mc^2$$ after text.`;

marked.use(KatexRenderer({
  throwOnError: false,
  displayMode: true,
  nonStandard: true,
}));

const html = await marked.parse(md, { async: true });
console.log('Input:', JSON.stringify(md));
console.log('Output:', html.trim());

// Check for both katex and raw
console.log('Has katex:', html.includes('katex'));
console.log('Has raw $:', html.includes('$E=mc^2$'));
console.log('Has raw $$:', html.includes('$$E=mc^2$$'));
