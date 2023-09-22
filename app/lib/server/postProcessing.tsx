import { load } from 'cheerio';
import { rehype } from 'rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';

`use server`;

export async function rehypeHTML(htmlString: string) {
  return await rehype()
    .use(rehypeHighlight)
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(htmlString);
}

export async function parseTOC(htmlString: string) {
  const $ = load(htmlString);
  let headings: { id: string; text: string; depth: number }[] = [];

  $('[id]').each((_, element) => {
    const id = $(element).attr('id') ?? '';
    const text = $(element).text() ?? '';

    if (id !== '' && element.tagName.toLowerCase().startsWith('h')) {
      const depth = element.tagName.charCodeAt(1) - 48;
      headings.push({ id, text, depth });
    }
  });

  headings = filterHeadings(headings);

  return headings;
}

function filterHeadings(headings) {
  headings.shift(); // remove the title

  // find the number of headings at each depth
  let depth: number[] = [];
  for (const heading in headings) {
    depth.push(heading.depth);
  }

  // filter the headings based on the depth
  if (depth[1] > 2 && depth[1] < 8) {
    headings = headings.filter((heading) => heading.depth === 1);
  } else if (depth[1] + depth[2] < 8) {
    headings = headings.filter((heading) => heading.depth <= 2);
  } else if (headings.length > 2 && headings.length < 8) {
    return headings;
  }
  return [];
}
