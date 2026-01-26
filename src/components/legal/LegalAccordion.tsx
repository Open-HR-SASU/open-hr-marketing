/**
 * Legal Accordion (React Island)
 *
 * Interactive collapsible sections for legal documents.
 * Uses CSS-only animation for smooth expand/collapse.
 */
import { useState, useCallback } from 'react';
import type { Locale } from '@/lib/i18n';
import type { LegalSection } from '@/lib/sanity/fetchers';
import { LegalSectionContent } from './LegalSectionContent';

interface LegalSectionWithExpanded extends LegalSection {
  isExpanded: boolean;
}

interface Props {
  sections: LegalSectionWithExpanded[];
  locale: Locale;
  expandLabel: string;
  collapseLabel: string;
}

/**
 * Chevron icon for accordion toggle
 */
function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className={`h-5 w-5 flex-shrink-0 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

/**
 * Single accordion item
 */
function AccordionItem({
  section,
  isOpen,
  onToggle,
  locale,
  expandLabel,
  collapseLabel,
}: {
  section: LegalSection;
  isOpen: boolean;
  onToggle: () => void;
  locale: Locale;
  expandLabel: string;
  collapseLabel: string;
}) {
  const anchor = section.anchor?.current ?? section._key;
  const headingId = `heading-${anchor}`;
  const panelId = `panel-${anchor}`;

  return (
    <div
      id={anchor}
      className="scroll-mt-24 border-b border-gray-200 last:border-b-0"
    >
      {/* Accordion header/trigger - G15: Touch targets minimum 48x48px */}
      <h2>
        <button
          type="button"
          className="flex min-h-12 w-full items-center justify-between gap-4 px-4 py-3 text-left transition-colors hover:bg-gray-50"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          id={headingId}
        >
          <span className="flex items-baseline gap-3">
            {section.sectionNumber && (
              <span className="flex-shrink-0 font-mono text-sm text-gray-400">
                {section.sectionNumber}.
              </span>
            )}
            <span className="font-display text-lg font-semibold text-foreground">
              {section.title}
            </span>
          </span>
          <span className="sr-only">
            {isOpen ? collapseLabel : expandLabel}
          </span>
          <ChevronIcon isOpen={isOpen} />
        </button>
      </h2>

      {/* Accordion panel/content */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={headingId}
        className={`overflow-hidden transition-all duration-200 ease-in-out ${
          isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pb-6">
          <LegalSectionContent section={section} locale={locale} />
        </div>
      </div>
    </div>
  );
}

/**
 * Legal Accordion Component
 */
export default function LegalAccordion({
  sections,
  locale,
  expandLabel,
  collapseLabel,
}: Props) {
  // Track open state for each section
  const [openSections, setOpenSections] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    sections.forEach((section) => {
      if (section.isExpanded) {
        initial.add(section._key);
      }
    });
    return initial;
  });

  const toggleSection = useCallback((key: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  return (
    <div className="divide-y divide-gray-200 rounded-lg border border-gray-200">
      {sections.map((section) => (
        <AccordionItem
          key={section._key}
          section={section}
          isOpen={openSections.has(section._key)}
          onToggle={() => toggleSection(section._key)}
          locale={locale}
          expandLabel={expandLabel}
          collapseLabel={collapseLabel}
        />
      ))}
    </div>
  );
}
