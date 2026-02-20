/**
 * Pricing Section (React Island) — Annual Flat-Fee Model
 *
 * Founding Member + Standard two-card display.
 * Live slot counter fetched from /api/founding/slots-remaining.
 *
 * CTA language LOCKED: "Get Your RefScore" / "Claim Your Profile" — NOT "Subscribe"
 *
 * @see OPE-719 - Pricing Pivot
 * @see OPE-722 - Founding Member atomic counter
 * @see DL-34   - Annual pricing model
 * @see DL-35   - Psychological rounding multi-currency
 */

import { useState, useEffect } from 'react';
import { TIERS, formatAnnualPrice, getCurrencyForLocale, getAnnualLabel, type Locale } from '@/lib/pricing';

interface PricingSectionProps {
  locale: Locale;
}

interface SlotsData {
  remaining: number;
  isFull: boolean;
}

const content: Record<Locale, {
  founding: {
    badge: ((n: number) => string) | string;
    badgeFull: string;
    description: string;
    features: string[];
    cta: string;
    ctaFull: string;
    monthlyEquiv: string;
    anchor: string;
  };
  standard: {
    badge: string;
    description: string;
    features: string[];
    cta: string;
    monthlyEquiv: string;
    anchor: string;
  };
  perYear: string;
  renewalDisclosure: string;
  cancelInfo: string;
  capDisclosure: string;
}> = {
  fr: {
    founding: {
      badge: (n: number) => `${n} places fondateurs restantes`,
      badgeFull: 'Places fondateurs épuisées',
      description: 'Accès à vie au tarif fondateur. Votre RefScore, pour toujours.',
      features: [
        'Accès au RefScore annuel',
        'Références vérifiées illimitées',
        'Profil professionnel partageable',
        'Tarif fondateur garanti à vie',
        'Support prioritaire',
      ],
      cta: 'Obtenir mon RefScore',
      ctaFull: 'Rejoindre en Standard',
      monthlyEquiv: 'Moins d\'€1/mois',
      anchor: 'Réservé aux 100 premiers membres.',
    },
    standard: {
      badge: 'Standard',
      description: 'Le tarif après les places fondateurs. Rejoignez à tout moment.',
      features: [
        'Accès au RefScore annuel',
        'Références vérifiées illimitées',
        'Profil professionnel partageable',
        'Support par email',
      ],
      cta: 'Obtenir mon RefScore',
      monthlyEquiv: '~€2/mois',
      anchor: 'Accès illimité.',
    },
    perYear: '/an',
    renewalDisclosure: 'Votre abonnement se renouvelle automatiquement chaque année au même tarif. Annulation possible à tout moment depuis votre espace personnel. L\'annulation prend effet à la fin de la période en cours.',
    cancelInfo: "Conformément à l'article L221-28 13° du Code de la consommation, en finalisant votre paiement pour un service numérique dont vous demandez l'exécution immédiate, vous reconnaissez expressément perdre votre droit de rétractation de 14 jours dès le début de cette exécution.",
    capDisclosure: 'Limité aux 100 premiers membres fondateurs. Plafond appliqué à la commande.',
  },
  'en-GB': {
    founding: {
      badge: (n: number) => `${n} founding spots remaining`,
      badgeFull: 'Founding spots filled',
      description: 'Lifetime access at the founding rate. Your RefScore, forever.',
      features: [
        'Annual RefScore access',
        'Unlimited verified references',
        'Shareable professional profile',
        'Founding rate locked for life',
        'Priority support',
      ],
      cta: 'Get Your RefScore',
      ctaFull: 'Join as Standard',
      monthlyEquiv: 'Less than £1/month',
      anchor: 'Reserved for the first 100 members.',
    },
    standard: {
      badge: 'Standard',
      description: 'The rate after founding spots are gone. Join any time.',
      features: [
        'Annual RefScore access',
        'Unlimited verified references',
        'Shareable professional profile',
        'Email support',
      ],
      cta: 'Get Your RefScore',
      monthlyEquiv: '~£1.67/month',
      anchor: 'Unlimited access.',
    },
    perYear: '/year',
    renewalDisclosure: 'Your membership renews automatically each year at the same rate. Cancel any time from your account. Cancellation takes effect at the end of the current period.',
    cancelInfo: 'Under the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013, by completing payment for a digital service and requesting immediate performance, you expressly acknowledge losing your 14-day right to cancel.',
    capDisclosure: 'Limited to the first 100 founding members. Cap enforced at checkout.',
  },
  'en-US': {
    founding: {
      badge: (n: number) => `${n} founding spots remaining`,
      badgeFull: 'Founding spots filled',
      description: 'Lifetime access at the founding rate. Your RefScore, forever.',
      features: [
        'Annual RefScore access',
        'Unlimited verified references',
        'Shareable professional profile',
        'Founding rate locked for life',
        'Priority support',
      ],
      cta: 'Get Your RefScore',
      ctaFull: 'Join as Standard',
      monthlyEquiv: 'Less than $1/month',
      anchor: 'Reserved for the first 100 members.',
    },
    standard: {
      badge: 'Standard',
      description: 'The rate after founding spots are gone. Join any time.',
      features: [
        'Annual RefScore access',
        'Unlimited verified references',
        'Shareable professional profile',
        'Email support',
      ],
      cta: 'Get Your RefScore',
      monthlyEquiv: '~$2/month',
      anchor: 'Unlimited access.',
    },
    perYear: '/year',
    renewalDisclosure: 'Your membership renews automatically each year at the same rate. Cancel any time from your account. Cancellation takes effect at the end of the current period.',
    cancelInfo: '',
    capDisclosure: 'Limited to the first 100 founding members. Cap enforced at checkout.',
  },
  de: {
    founding: {
      badge: (n: number) => `Noch ${n} Gründungsplätze verfügbar`,
      badgeFull: 'Gründungsplätze vergeben',
      description: 'Lebenslanger Zugang zum Gründungstarif. Ihr RefScore, für immer.',
      features: [
        'Jährlicher RefScore-Zugang',
        'Unbegrenzte verifizierte Referenzen',
        'Teilbares Berufsprofil',
        'Gründungstarif dauerhaft gesichert',
        'Prioritäts-Support',
      ],
      cta: 'RefScore holen',
      ctaFull: 'Als Standard beitreten',
      monthlyEquiv: 'Weniger als €1/Monat',
      anchor: 'Reserviert für die ersten 100 Mitglieder.',
    },
    standard: {
      badge: 'Standard',
      description: 'Der Tarif nach den Gründungsplätzen. Jederzeit beitreten.',
      features: [
        'Jährlicher RefScore-Zugang',
        'Unbegrenzte verifizierte Referenzen',
        'Teilbares Berufsprofil',
        'E-Mail-Support',
      ],
      cta: 'RefScore holen',
      monthlyEquiv: '~€2/Monat',
      anchor: 'Unbegrenzter Zugang.',
    },
    perYear: '/Jahr',
    renewalDisclosure: 'Ihre Mitgliedschaft verlängert sich automatisch jährlich zum gleichen Preis. Jederzeit kündbar über Ihr Konto. Die Kündigung wird zum Ende der laufenden Periode wirksam.',
    cancelInfo: 'Gemäß § 356 Abs. 5 BGB verlangen Sie mit dem Abschluss der Zahlung für einen digitalen Dienst ausdrücklich die sofortige Ausführung und bestätigen den Verlust Ihres 14-tägigen Widerrufsrechts ab Beginn der Ausführung.',
    capDisclosure: 'Begrenzt auf die ersten 100 Gründungsmitglieder. Limit wird beim Bezahlvorgang durchgesetzt.',
  },
  es: {
    founding: {
      badge: (n: number) => `${n} plazas fundadoras restantes`,
      badgeFull: 'Plazas fundadoras agotadas',
      description: 'Acceso de por vida al precio fundador. Tu RefScore, para siempre.',
      features: [
        'Acceso anual al RefScore',
        'Referencias verificadas ilimitadas',
        'Perfil profesional compartible',
        'Precio fundador garantizado de por vida',
        'Soporte prioritario',
      ],
      cta: 'Obtener mi RefScore',
      ctaFull: 'Unirse como Standard',
      monthlyEquiv: 'Menos de €1/mes',
      anchor: 'Reservado para los primeros 100 miembros.',
    },
    standard: {
      badge: 'Estándar',
      description: 'El precio después de las plazas fundadoras. Únete cuando quieras.',
      features: [
        'Acceso anual al RefScore',
        'Referencias verificadas ilimitadas',
        'Perfil profesional compartible',
        'Soporte por email',
      ],
      cta: 'Obtener mi RefScore',
      monthlyEquiv: '~€2/mes',
      anchor: 'Acceso ilimitado.',
    },
    perYear: '/año',
    renewalDisclosure: 'Tu membresía se renueva automáticamente cada año al mismo precio. Cancela cuando quieras desde tu cuenta. La cancelación se hace efectiva al final del período en curso.',
    cancelInfo: 'Conforme al art. 103.m) del Real Decreto Legislativo 1/2007 (TRLGDCU), al solicitar la ejecución inmediata del servicio digital, reconoces expresamente perder tu derecho de desistimiento de 14 días desde el inicio de la ejecución.',
    capDisclosure: 'Limitado a los primeros 100 miembros fundadores. Límite aplicado en el momento del pago.',
  },
  it: {
    founding: {
      badge: (n: number) => `${n} posti fondatori rimasti`,
      badgeFull: 'Posti fondatori esauriti',
      description: 'Accesso a vita alla tariffa fondatrice. Il tuo RefScore, per sempre.',
      features: [
        'Accesso annuale al RefScore',
        'Referenze verificate illimitate',
        'Profilo professionale condivisibile',
        'Tariffa fondatrice garantita a vita',
        'Supporto prioritario',
      ],
      cta: 'Ottieni il mio RefScore',
      ctaFull: 'Iscriviti come Standard',
      monthlyEquiv: 'Meno di €1/mese',
      anchor: 'Riservato ai primi 100 membri.',
    },
    standard: {
      badge: 'Standard',
      description: 'La tariffa dopo i posti fondatori. Iscriviti quando vuoi.',
      features: [
        'Accesso annuale al RefScore',
        'Referenze verificate illimitate',
        'Profilo professionale condivisibile',
        'Supporto via email',
      ],
      cta: 'Ottieni il mio RefScore',
      monthlyEquiv: '~€2/mese',
      anchor: 'Accesso illimitato.',
    },
    perYear: '/anno',
    renewalDisclosure: 'La tua iscrizione si rinnova automaticamente ogni anno allo stesso prezzo. Annulla quando vuoi dal tuo account. La cancellazione ha effetto alla fine del periodo in corso.',
    cancelInfo: 'Ai sensi dell\'art. 59, comma 1, lett. o) del Codice del Consumo (D.Lgs. 206/2005), richiedendo l\'esecuzione immediata del servizio digitale, riconosci espressamente di perdere il diritto di recesso di 14 giorni dall\'inizio dell\'esecuzione.',
    capDisclosure: 'Limitato ai primi 100 membri fondatori. Limite applicato al momento dell\'acquisto.',
  },
};

// Helper to render the scarcity badge text
function getBadgeText(
  badge: ((n: number) => string) | string,
  badgeFull: string,
  n: number,
  isFull: boolean,
): string {
  if (isFull) return badgeFull;
  if (typeof badge === 'function') return badge(n);
  return badge;
}

export function PricingSection({ locale }: PricingSectionProps) {
  const t = content[locale] || content['en-US'];
  const currency = getCurrencyForLocale(locale);
  const perYear = t.perYear;

  const foundingTier = TIERS.founding[currency];
  const standardTier = TIERS.standard[currency];

  const [slots, setSlots] = useState<SlotsData | null>(null);

  useEffect(() => {
    const apiBase =
      typeof window !== 'undefined' && window.location.hostname === 'localhost'
        ? 'http://localhost:3000'
        : 'https://app.open-hr.work';

    fetch(`${apiBase}/api/founding/slots-remaining`)
      .then((r) => r.json())
      .then((data: SlotsData) => setSlots(data))
      .catch(() => null); // Fail silently — don't break the pricing page
  }, []);

  const foundingIsFull = slots?.isFull ?? false;
  const slotsRemaining = slots?.remaining ?? foundingTier.cap ?? 100;

  const pilotUrl = `/${locale}/pilot/`;

  return (
    <div className="py-12">
      {/* Pricing Cards */}
      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">

        {/* ── Founding Member ───────────────────────────────────────────── */}
        <div className="relative flex flex-col rounded-2xl border-2 border-openhr-teal-900 bg-white p-8 shadow-lg">
          {/* Scarcity badge */}
          <div
            className={`absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-sm font-semibold whitespace-nowrap ${
              foundingIsFull
                ? 'bg-gray-500 text-white'
                : 'bg-openhr-teal-900 text-white'
            }`}
          >
            {getBadgeText(t.founding.badge, t.founding.badgeFull, slotsRemaining, foundingIsFull)}
          </div>

          <h3 className="text-xl font-bold text-gray-900">
            {TIERS.founding.name[locale]}
          </h3>
          <p className="mt-2 text-gray-600">{t.founding.description}</p>

          {/* Price */}
          <div className="mt-6">
            <span className="text-4xl font-bold text-gray-900">
              {formatAnnualPrice(foundingTier.amount, locale)}
            </span>
            <span className="text-gray-600">{perYear}</span>
            <p className="mt-1 text-sm text-openhr-teal-700 font-medium">
              {t.founding.monthlyEquiv}
            </p>
          </div>

          {/* Features */}
          <ul className="mt-8 flex-grow space-y-4">
            {t.founding.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <svg
                  className="h-5 w-5 flex-shrink-0 text-openhr-teal-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          {foundingIsFull ? (
            <a
              href={pilotUrl + '?tier=standard'}
              className="mt-8 block w-full rounded-lg border border-gray-400 bg-white px-4 py-3 text-center font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              {t.founding.ctaFull}
            </a>
          ) : (
            <a
              href={pilotUrl}
              className="mt-8 block w-full rounded-lg bg-openhr-teal-900 px-4 py-3 text-center font-medium text-white transition-colors hover:bg-openhr-teal-800 focus:outline-none focus:ring-2 focus:ring-openhr-teal-500 focus:ring-offset-2"
            >
              {t.founding.cta}
            </a>
          )}

          <p className="mt-3 text-center text-xs text-gray-500">{t.founding.anchor}</p>
        </div>

        {/* ── Standard ──────────────────────────────────────────────────── */}
        <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="absolute -top-px" /> {/* spacer to align with founding card */}
          <span className="inline-block self-start rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
            {t.standard.badge}
          </span>

          <h3 className="mt-4 text-xl font-bold text-gray-900">
            {TIERS.standard.name[locale]}
          </h3>
          <p className="mt-2 text-gray-600">{t.standard.description}</p>

          {/* Price */}
          <div className="mt-6">
            <span className="text-4xl font-bold text-gray-900">
              {formatAnnualPrice(standardTier.amount, locale)}
            </span>
            <span className="text-gray-600">{perYear}</span>
            <p className="mt-1 text-sm text-gray-500">{t.standard.monthlyEquiv}</p>
          </div>

          {/* Features */}
          <ul className="mt-8 flex-grow space-y-4">
            {t.standard.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <svg
                  className="h-5 w-5 flex-shrink-0 text-openhr-teal-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href={pilotUrl + '?tier=standard'}
            className="mt-8 block w-full rounded-lg border border-openhr-teal-900 bg-white px-4 py-3 text-center font-medium text-openhr-teal-900 transition-colors hover:bg-openhr-teal-50 focus:outline-none focus:ring-2 focus:ring-openhr-teal-500 focus:ring-offset-2"
          >
            {t.standard.cta}
          </a>

          <p className="mt-3 text-center text-xs text-gray-500">{t.standard.anchor}</p>
        </div>
      </div>

      {/* Legal disclosures */}
      <div className="mx-auto mt-8 max-w-2xl space-y-2 text-center text-xs leading-relaxed text-gray-500">
        <p>{t.renewalDisclosure}</p>
        {/* California ARL (Bus. & Prof. Code § 17601(c)) requires auto-renewal terms to be
            "clear and conspicuous" — set off from surrounding text by symbols or marks.
            EN-US renders in a bordered box to satisfy the visual prominence requirement.
            All other locales render as plain paragraph text (EU/UK law has no equivalent
            visual requirement for pricing page disclosures). */}
        {t.cancelInfo && (
          locale === 'en-US' ? (
            <div className="mt-3 rounded-md border border-gray-300 bg-gray-50 px-4 py-3 text-left text-xs leading-relaxed text-gray-700">
              <p className="font-semibold text-gray-800">Auto-Renewal Terms</p>
              <p className="mt-1">{t.cancelInfo}</p>
            </div>
          ) : (
            <p>{t.cancelInfo}</p>
          )
        )}
        <p>{t.capDisclosure}</p>
      </div>
    </div>
  );
}

export default PricingSection;
