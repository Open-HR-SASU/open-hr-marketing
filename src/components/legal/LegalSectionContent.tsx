/**
 * Legal Section Content (React)
 *
 * Renders section content based on displayType:
 * - text: Portable text with optional inline tables
 * - contact: Contact information card
 * - rights: Rights list with icons
 * - subsections: Nested subsections
 */
import { PortableText } from '@portabletext/react';
import type { Locale } from '@/lib/i18n';
import type {
  LegalSection,
  LegalContactInfo,
  LegalRight,
  LegalSubsection,
  InlineTable,
} from '@/lib/sanity/fetchers';

// =============================================================================
// PORTABLE TEXT COMPONENTS
// =============================================================================

/**
 * Inline table renderer for Portable Text
 */
function InlineTableRenderer({ value }: { value: InlineTable }) {
  if (!value.headers || !value.rows) return null;

  return (
    <div className="my-4 overflow-x-auto">
      {value.caption && (
        <p className="mb-2 text-sm font-medium text-gray-500">{value.caption}</p>
      )}
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            {value.headers.map((header, i) => (
              <th
                key={i}
                scope="col"
                className="px-4 py-3 text-left font-medium text-gray-700"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {value.rows.map((row) => (
            <tr key={row._key}>
              {row.cells.map((cell, i) => (
                <td key={i} className="whitespace-normal px-4 py-3 text-gray-600">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Portable text components for legal content
 */
const legalPortableTextComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-4 last:mb-0 text-gray-700">{children}</p>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mb-3 mt-6 text-lg font-semibold text-foreground first:mt-0">{children}</h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="mb-2 mt-4 font-semibold text-foreground first:mt-0">{children}</h4>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="mb-4 border-l-4 border-openhr-teal-200 pl-4 italic text-gray-600">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="mb-4 ml-6 list-disc space-y-1 text-gray-700">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="mb-4 ml-6 list-decimal space-y-1 text-gray-700">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => <li>{children}</li>,
    number: ({ children }: { children?: React.ReactNode }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => <em>{children}</em>,
    underline: ({ children }: { children?: React.ReactNode }) => <u>{children}</u>,
    code: ({ children }: { children?: React.ReactNode }) => (
      <code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm">{children}</code>
    ),
    link: ({
      value,
      children,
    }: {
      value?: { href?: string };
      children?: React.ReactNode;
    }) => {
      const href = value?.href || '#';
      const isExternal = href.startsWith('http');
      return (
        <a
          href={href}
          className="text-openhr-teal-900 underline hover:text-openhr-teal-700"
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    inlineTable: InlineTableRenderer,
  },
};

// =============================================================================
// DISPLAY TYPE COMPONENTS
// =============================================================================

/**
 * Contact card display
 */
function ContactCard({ info }: { info: LegalContactInfo }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
      {info.companyName && (
        <p className="text-lg font-semibold text-foreground">{info.companyName}</p>
      )}
      {info.legalForm && <p className="text-sm text-gray-600">{info.legalForm}</p>}
      {info.capital && (
        <p className="text-sm text-gray-600">Capital social : {info.capital}</p>
      )}

      {info.address && (
        <address className="mt-3 whitespace-pre-line not-italic text-gray-700">
          {info.address}
        </address>
      )}

      <div className="mt-4 space-y-1 text-sm">
        {info.rcs && (
          <p>
            <span className="font-medium">RCS :</span> {info.rcs}
          </p>
        )}
        {info.euid && (
          <p>
            <span className="font-medium">EUID :</span> {info.euid}
          </p>
        )}
        {info.vat && (
          <p>
            <span className="font-medium">TVA :</span> {info.vat}
          </p>
        )}
      </div>

      {(info.email || info.phone || info.website) && (
        <div className="mt-4 space-y-1 border-t border-gray-200 pt-4 text-sm">
          {info.email && (
            <p>
              <a
                href={`mailto:${info.email}`}
                className="text-openhr-teal-900 hover:underline"
              >
                {info.email}
              </a>
            </p>
          )}
          {info.phone && (
            <p>
              <a
                href={`tel:${info.phone.replace(/\s/g, '')}`}
                className="text-openhr-teal-900 hover:underline"
              >
                {info.phone}
              </a>
            </p>
          )}
          {info.website && (
            <p>
              <a
                href={info.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-openhr-teal-900 hover:underline"
              >
                {info.website}
              </a>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Rights list display
 */
function RightsList({ rights }: { rights: LegalRight[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {rights.map((right) => (
        <div
          key={right._key}
          className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4"
        >
          {right.icon && (
            <span className="flex-shrink-0 text-2xl" aria-hidden="true">
              {right.icon}
            </span>
          )}
          <div>
            <p className="font-semibold text-foreground">{right.name}</p>
            {right.description && (
              <p className="mt-1 text-sm text-gray-600">{right.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Subsections display
 */
function SubsectionsList({
  subsections,
}: {
  subsections: LegalSubsection[];
}) {
  return (
    <div className="space-y-6">
      {subsections.map((sub) => (
        <div key={sub._key}>
          <h3 className="mb-2 font-semibold text-foreground">
            {sub.subNumber && (
              <span className="mr-2 font-mono text-sm text-gray-400">
                {sub.subNumber}
              </span>
            )}
            {sub.subTitle}
          </h3>
          {sub.subContent && (
            <div className="text-gray-700">
              <PortableText
                value={sub.subContent as Parameters<typeof PortableText>[0]['value']}
                components={legalPortableTextComponents}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

interface Props {
  section: LegalSection;
  locale: Locale;
}

/**
 * Legal Section Content Component
 * Routes to appropriate display type renderer
 */
export function LegalSectionContent({ section, locale }: Props) {
  const displayType = section.displayType ?? 'text';

  switch (displayType) {
    case 'contact':
      return section.contactInfo ? (
        <ContactCard info={section.contactInfo} />
      ) : null;

    case 'rights':
      return section.rights && section.rights.length > 0 ? (
        <RightsList rights={section.rights} />
      ) : null;

    case 'subsections':
      return section.subsections && section.subsections.length > 0 ? (
        <SubsectionsList subsections={section.subsections} />
      ) : null;

    case 'text':
    case 'table':
    default:
      return section.content && section.content.length > 0 ? (
        <PortableText
          value={section.content as Parameters<typeof PortableText>[0]['value']}
          components={legalPortableTextComponents}
        />
      ) : null;
  }
}
