/**
 * Estimate reading time from Portable Text blocks.
 *
 * @see OPE-774
 */

interface PortableTextSpan {
  _type: 'span';
  text?: string;
}

interface PortableTextBlock {
  _type: string;
  children?: PortableTextSpan[];
}

const WORDS_PER_MINUTE = 200;

function extractText(blocks: PortableTextBlock[]): string {
  return blocks
    .filter((block) => block._type === 'block' && block.children)
    .flatMap((block) => block.children!.map((child) => child.text || ''))
    .join(' ');
}

export function estimateReadingTime(body: PortableTextBlock[]): number {
  if (!body || body.length === 0) return 1;
  const text = extractText(body);
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}
