/**
 * FAQ Accordion (React Island)
 *
 * Interactive collapsible FAQ sections for the pilot success page.
 * Pure client-side component with smooth CSS transitions.
 *
 * @see DL-30-T - Pilot Success Page Timeline
 */
import { useState, useCallback } from 'react';

export interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  items: FAQItem[];
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
 * Single FAQ accordion item
 */
function FAQAccordionItem({
  item,
  index,
  isOpen,
  onToggle,
  expandLabel,
  collapseLabel,
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  expandLabel: string;
  collapseLabel: string;
}) {
  const headingId = `faq-heading-${index}`;
  const panelId = `faq-panel-${index}`;

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      {/* Accordion header/trigger - Touch targets minimum 48x48px */}
      <h3>
        <button
          type="button"
          className="flex min-h-12 w-full items-center justify-between gap-4 px-4 py-4 text-left transition-colors hover:bg-gray-50"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          id={headingId}
        >
          <span className="font-display text-base font-semibold text-foreground">
            {item.question}
          </span>
          <span className="sr-only">
            {isOpen ? collapseLabel : expandLabel}
          </span>
          <ChevronIcon isOpen={isOpen} />
        </button>
      </h3>

      {/* Accordion panel/content */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={headingId}
        className={`overflow-hidden transition-all duration-200 ease-in-out ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4 text-gray-600">
          {item.answer}
        </div>
      </div>
    </div>
  );
}

/**
 * FAQ Accordion Component
 */
export default function FAQAccordion({
  items,
  expandLabel,
  collapseLabel,
}: Props) {
  // Track open state for each FAQ item
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = useCallback((index: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }, []);

  return (
    <div className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
      {items.map((item, index) => (
        <FAQAccordionItem
          key={index}
          item={item}
          index={index}
          isOpen={openItems.has(index)}
          onToggle={() => toggleItem(index)}
          expandLabel={expandLabel}
          collapseLabel={collapseLabel}
        />
      ))}
    </div>
  );
}
