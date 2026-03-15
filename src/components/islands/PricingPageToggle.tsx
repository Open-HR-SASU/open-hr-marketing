/**
 * Pricing Page Toggle (React Island)
 *
 * Unified pricing page with Workers / Employers audience toggle.
 * Workers: Free (always). Employers: Per-assessment pricing.
 *
 * CEO Decision: 2026-03-15 — Workers are free. Always.
 *
 * @see OPE-778 - Employer B2B Portal
 */

import { useState, useEffect } from 'react';
import { PricingSection } from './PricingSection';
import { EmployerPricingSection } from './EmployerPricingSection';
import type { Locale } from '@/lib/pricing';

type Audience = 'workers' | 'employers';

interface PricingPageToggleProps {
  locale: Locale;
  defaultView?: Audience;
}

const toggleLabels: Record<Locale, { workers: string; employers: string; workersDesc: string; employersDesc: string }> = {
  fr: {
    workers: 'Travailleurs',
    employers: 'Employeurs',
    workersDesc: 'Gratuit pour tous les travailleurs',
    employersDesc: 'Tarification par evaluation pour les entreprises',
  },
  'en-GB': {
    workers: 'Workers',
    employers: 'Employers',
    workersDesc: 'Free for all workers',
    employersDesc: 'Per-assessment pricing for businesses',
  },
  'en-US': {
    workers: 'Workers',
    employers: 'Employers',
    workersDesc: 'Free for all workers',
    employersDesc: 'Per-assessment pricing for businesses',
  },
  de: {
    workers: 'Arbeitnehmer',
    employers: 'Arbeitgeber',
    workersDesc: 'Kostenlos fur alle Arbeitnehmer',
    employersDesc: 'Preis pro Bewertung fur Unternehmen',
  },
  es: {
    workers: 'Trabajadores',
    employers: 'Empleadores',
    workersDesc: 'Gratis para todos los trabajadores',
    employersDesc: 'Precio por evaluacion para empresas',
  },
  it: {
    workers: 'Lavoratori',
    employers: 'Datori di lavoro',
    workersDesc: 'Gratuito per tutti i lavoratori',
    employersDesc: 'Prezzo per valutazione per le aziende',
  },
};

export function PricingPageToggle({ locale, defaultView }: PricingPageToggleProps) {
  const [audience, setAudience] = useState<Audience>(defaultView ?? 'workers');
  const t = toggleLabels[locale] || toggleLabels['en-US'];

  // Read URL param on mount (client-side only)
  useEffect(() => {
    if (defaultView) return; // explicit prop takes precedence
    const params = new URLSearchParams(window.location.search);
    const view = params.get('view');
    if (view === 'employers') {
      setAudience('employers');
    }
  }, [defaultView]);

  // Update URL param without page reload when toggling
  function handleToggle(next: Audience) {
    setAudience(next);
    const url = new URL(window.location.href);
    if (next === 'employers') {
      url.searchParams.set('view', 'employers');
    } else {
      url.searchParams.delete('view');
    }
    window.history.replaceState({}, '', url.toString());
  }

  return (
    <div>
      {/* Audience Toggle */}
      <div className="flex flex-col items-center gap-3 pt-10">
        <div
          className="inline-flex rounded-full border border-gray-200 bg-gray-50 p-1"
          role="tablist"
          aria-label="Pricing audience"
        >
          <button
            role="tab"
            aria-selected={audience === 'workers'}
            aria-controls="panel-workers"
            onClick={() => handleToggle('workers')}
            className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-200 ${
              audience === 'workers'
                ? 'bg-openhr-teal-900 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t.workers}
          </button>
          <button
            role="tab"
            aria-selected={audience === 'employers'}
            aria-controls="panel-employers"
            onClick={() => handleToggle('employers')}
            className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-200 ${
              audience === 'employers'
                ? 'bg-openhr-teal-900 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t.employers}
          </button>
        </div>
        <p className="text-sm text-gray-500">
          {audience === 'workers' ? t.workersDesc : t.employersDesc}
        </p>
      </div>

      {/* Content Panels */}
      <div
        id="panel-workers"
        role="tabpanel"
        hidden={audience !== 'workers'}
      >
        {audience === 'workers' && <PricingSection locale={locale} />}
      </div>
      <div
        id="panel-employers"
        role="tabpanel"
        hidden={audience !== 'employers'}
      >
        {audience === 'employers' && <EmployerPricingSection locale={locale} />}
      </div>
    </div>
  );
}

export default PricingPageToggle;
