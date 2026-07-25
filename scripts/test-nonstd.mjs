import { marked } from "marked";
import KatexRenderer from "marked-katex-extension";

// Test with nonStandard: true to see if original text is preserved
const md = `Some text $$E=mc^2$$ more text.`;

marked.use(KatexRenderer({
  throwOnError: false,
  displayMode: true,
  nonStandard: true,
}));

const html = await marked.parse(md, { async: true });
console.log('Input:', JSON.stringify(md));
console.log('Output:', html);
console.log('Has raw $$:', html.includes('$$E=mc^2$$'));
