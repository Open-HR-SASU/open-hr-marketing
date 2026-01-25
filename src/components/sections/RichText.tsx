/**
 * Rich Text Renderer (React, server-rendered)
 *
 * Renders Sanity Portable Text content to HTML.
 * This is a React component used within Astro, rendered at build time.
 * No client-side JavaScript is shipped.
 */

import { PortableText as PortableTextRenderer } from '@portabletext/react';

interface RichTextProps {
  content: unknown[] | null;
  className?: string;
}

/**
 * Custom components for Portable Text rendering
 */
const portableTextComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-4 last:mb-0">{children}</p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="mb-4 text-2xl font-bold">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mb-3 text-xl font-semibold">{children}</h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="mb-2 text-lg font-semibold">{children}</h4>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="mb-4 border-l-4 border-openhr-teal-900/30 pl-4 italic text-gray-600">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="mb-4 ml-6 list-disc space-y-1">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="mb-4 ml-6 list-decimal space-y-1">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li>{children}</li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li>{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong>{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em>{children}</em>
    ),
    underline: ({ children }: { children?: React.ReactNode }) => (
      <u>{children}</u>
    ),
    'strike-through': ({ children }: { children?: React.ReactNode }) => (
      <s>{children}</s>
    ),
    code: ({ children }: { children?: React.ReactNode }) => (
      <code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm">
        {children}
      </code>
    ),
    link: ({
      value,
      children,
    }: {
      value?: { href?: string; blank?: boolean };
      children?: React.ReactNode;
    }) => {
      const href = value?.href || '#';
      const isExternal = href.startsWith('http');
      return (
        <a
          href={href}
          className="text-openhr-teal-900 underline hover:text-openhr-teal-700"
          target={value?.blank || isExternal ? '_blank' : undefined}
          rel={value?.blank || isExternal ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      );
    },
  },
};

/**
 * Rich Text Component
 * Renders Sanity Portable Text content (server-rendered, zero client JS)
 */
export function RichText({ content, className = '' }: RichTextProps) {
  if (!content || content.length === 0) return null;

  return (
    <div className={`prose prose-gray max-w-none ${className}`}>
      <PortableTextRenderer
        value={content}
        components={portableTextComponents}
      />
    </div>
  );
}
