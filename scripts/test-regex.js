const md = `Some text $$E=mc^2$$ more text`;
const re = /(\${1,2})(?!\$)((?:\\.|[^\\])+)\\\1/;
const m = re.exec(md);
console.log('Match:', m ? m[0] : 'none');

// Try the inline rule
const inlineRule = /^(\${1,2})(?!\$)((?:\\.|[^\\n])*?(?:\\.|[^\\n\$]))\1(?=[\s?!\.,:？！。，：]|$)/;
const m2 = inlineRule.exec('E=mc^2$$');
console.log('Inline at end:', m2 ? m2[0] : 'none');

// With $$ in middle of line
const inlineRule2 = /^(\${1,2})(?!\$)((?:\\.|[^\\n])*?(?:\\.|[^\\n\$]))\1(?=[\s?!\.,:？！。，：]|$)/;
const m3 = inlineRule2.exec(' some $$E=mc^2$$');
console.log('Inline $$ in middle:', m3 ? m3[0] : 'none');

// What about $$...$$ at end of line
const m4 = inlineRule2.exec('$$E=mc^2$$');
console.log('Inline $$...$$ standalone:', m4 ? m4[0] : 'none');

// What about nonStandard
const nsRule = /^(\${1,2})(?!\$)((?:\\.|[^\\n])*?(?:\\.|[^\\n\$]))\1$/;
const m5 = nsRule.exec('$$E=mc^2$$');
console.log('NonStandard standalone:', m5 ? m5[0] : 'none');

const m6 = nsRule.exec('E=mc^2$$');
console.log('NonStandard content only:', m6 ? m6[0] : 'none');
