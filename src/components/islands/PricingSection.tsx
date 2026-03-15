/**
 * Pricing Section (React Island) — Workers Are Free. Always.
 *
 * Single-card display showing that Open HR is free for all workers.
 * No subscription, no paywall, no founding member pricing.
 *
 * CEO Decision: 2026-03-15 — B2C is free, revenue from B2B employers only.
 */

import type { Locale } from '@/lib/pricing';

interface PricingSectionProps {
  locale: Locale;
}

const content: Record<Locale, {
  price: string;
  description: string;
  features: string[];
  cta: string;
  anchor: string;
}> = {
  fr: {
    price: 'Gratuit',
    description: 'Construisez votre reputation professionnelle verifiee. Sans frais. Sans conditions.',
    features: [
      'RefScore algorithmique',
      'References verifiees illimitees',
      'Profil professionnel partageable',
      'Verification d\'identite incluse',
      'Certificat verifiable W3C',
      'Support par email',
    ],
    cta: 'Obtenir mon RefScore',
    anchor: 'Gratuit pour les travailleurs. Toujours.',
  },
  'en-GB': {
    price: 'Free',
    description: 'Build your verified professional reputation. No cost. No catch.',
    features: [
      'Algorithmic RefScore',
      'Unlimited verified references',
      'Shareable professional profile',
      'Identity verification included',
      'W3C verifiable credential',
      'Email support',
    ],
    cta: 'Get Your RefScore',
    anchor: 'Free for workers. Always.',
  },
  'en-US': {
    price: 'Free',
    description: 'Build your verified professional reputation. No cost. No catch.',
    features: [
      'Algorithmic RefScore',
      'Unlimited verified references',
      'Shareable professional profile',
      'Identity verification included',
      'W3C verifiable credential',
      'Email support',
    ],
    cta: 'Get Your RefScore',
    anchor: 'Free for workers. Always.',
  },
  de: {
    price: 'Kostenlos',
    description: 'Erstellen Sie Ihr verifiziertes Berufsprofil. Keine Kosten. Keine Bedingungen.',
    features: [
      'Algorithmischer RefScore',
      'Unbegrenzte verifizierte Referenzen',
      'Teilbares Berufsprofil',
      'Identitatsverifizierung inklusive',
      'W3C-verifizierbares Zertifikat',
      'E-Mail-Support',
    ],
    cta: 'RefScore holen',
    anchor: 'Kostenlos fur Arbeitnehmer. Immer.',
  },
  es: {
    price: 'Gratis',
    description: 'Construye tu reputacion profesional verificada. Sin coste. Sin condiciones.',
    features: [
      'RefScore algoritmico',
      'Referencias verificadas ilimitadas',
      'Perfil profesional compartible',
      'Verificacion de identidad incluida',
      'Credencial verificable W3C',
      'Soporte por email',
    ],
    cta: 'Obtener mi RefScore',
    anchor: 'Gratis para trabajadores. Siempre.',
  },
  it: {
    price: 'Gratuito',
    description: 'Costruisci la tua reputazione professionale verificata. Senza costi. Senza condizioni.',
    features: [
      'RefScore algoritmico',
      'Referenze verificate illimitate',
      'Profilo professionale condivisibile',
      'Verifica dell\'identita inclusa',
      'Credenziale verificabile W3C',
      'Supporto via email',
    ],
    cta: 'Ottieni il mio RefScore',
    anchor: 'Gratuito per i lavoratori. Sempre.',
  },
};

export function PricingSection({ locale }: PricingSectionProps) {
  const t = content[locale] || content['en-US'];

  const signupUrl = 'https://app.open-hr.work/auth/login';

  return (
    <div className="py-12">
      <div className="mx-auto max-w-lg">
        {/* Single Free Card */}
        <div className="relative flex flex-col rounded-2xl border-2 border-openhr-teal-900 bg-white p-8 shadow-lg">
          {/* Free badge */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-openhr-teal-900 px-6 py-1.5 text-sm font-semibold text-white whitespace-nowrap">
            {t.anchor}
          </div>

          {/* Price */}
          <div className="mt-4 text-center">
            <span className="text-5xl font-bold text-openhr-teal-900">
              {t.price}
            </span>
          </div>

          <p className="mt-4 text-center text-gray-600">{t.description}</p>

          {/* Features */}
          <ul className="mt-8 space-y-4">
            {t.features.map((feature, i) => (
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
            href={signupUrl}
            className="mt-8 block w-full rounded-lg bg-openhr-teal-900 px-4 py-3 text-center font-medium text-white transition-colors hover:bg-openhr-teal-800 focus:outline-none focus:ring-2 focus:ring-openhr-teal-500 focus:ring-offset-2"
          >
            {t.cta}
          </a>
        </div>
      </div>
    </div>
  );
}

export default PricingSection;
