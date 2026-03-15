/**
 * How It Works Toggle (React Island)
 *
 * Audience toggle for Workers vs Employers on the how-it-works page.
 * Workers: Free B2C flow (sign up → invite references → get RefScore → share credential)
 * Employers: B2B flow (create assessment → candidate nominates → references respond → get report)
 *
 * CEO Decision: 2026-03-15 — Workers are free. Always.
 *
 * Dr. Sapiens: Process accurately reflects the psychometric pipeline.
 * Dr. Claude: Clean toggle, consistent with pricing page pattern.
 * Luke: Workers path reinforces "Free. Always." Employer path drives B2B.
 */

import { useState, useEffect } from 'react';
import type { Locale } from '@/lib/pricing';

type Audience = 'workers' | 'employers';

interface HowItWorksToggleProps {
  locale: Locale;
}

interface Step {
  number: number;
  title: string;
  description: string;
}

interface AudienceContent {
  workers: string;
  employers: string;
  workersDesc: string;
  employersDesc: string;
  workerSteps: Step[];
  employerSteps: Step[];
  workerCta: string;
  workerCtaLabel: string;
  employerCta: string;
  employerCtaLabel: string;
}

const content: Record<Locale, AudienceContent> = {
  'en-GB': {
    workers: 'Workers',
    employers: 'Employers',
    workersDesc: 'Build your verified professional reputation — free, always.',
    employersDesc: 'Structured reference data to inform your hiring decisions.',
    workerSteps: [
      { number: 1, title: 'Sign up for free', description: 'Create your Open HR account in seconds. No payment required — ever.' },
      { number: 2, title: 'Invite your references', description: 'Ask colleagues, managers, or clients to provide a verified professional reference.' },
      { number: 3, title: 'They complete a short questionnaire', description: 'Your references answer a confidential, psychometrically validated questionnaire — about 5 minutes.' },
      { number: 4, title: 'Receive your RefScore credential', description: 'Get a verified, tamper-proof credential with your RefScore, top strengths, and work styles. Share it with any employer.' },
    ],
    employerSteps: [
      { number: 1, title: 'Create an assessment', description: 'Select a tier (Essential, Professional, or Executive) and invite a candidate to be assessed.' },
      { number: 2, title: 'Candidate nominates references', description: 'The candidate invites 3-10 professional references who know their work.' },
      { number: 3, title: 'References complete the questionnaire', description: 'Each reference answers a confidential, psychometrically validated questionnaire — identity-verified for trust.' },
      { number: 4, title: 'Receive the employer report', description: 'Get a structured, one-page report with the candidate\'s RefScore, category breakdown, and confidence level.' },
    ],
    workerCta: 'https://app.open-hr.work/auth/login',
    workerCtaLabel: 'Get Your RefScore — Free',
    employerCta: '/employers',
    employerCtaLabel: 'Learn more',
  },
  'en-US': {
    workers: 'Workers',
    employers: 'Employers',
    workersDesc: 'Build your verified professional reputation — free, always.',
    employersDesc: 'Structured reference data to inform your hiring decisions.',
    workerSteps: [
      { number: 1, title: 'Sign up for free', description: 'Create your Open HR account in seconds. No payment required — ever.' },
      { number: 2, title: 'Invite your references', description: 'Ask colleagues, managers, or clients to provide a verified professional reference.' },
      { number: 3, title: 'They complete a short questionnaire', description: 'Your references answer a confidential, psychometrically validated questionnaire — about 5 minutes.' },
      { number: 4, title: 'Receive your RefScore credential', description: 'Get a verified, tamper-proof credential with your RefScore, top strengths, and work styles. Share it with any employer.' },
    ],
    employerSteps: [
      { number: 1, title: 'Create an assessment', description: 'Select a tier (Essential, Professional, or Executive) and invite a candidate to be assessed.' },
      { number: 2, title: 'Candidate nominates references', description: 'The candidate invites 3-10 professional references who know their work.' },
      { number: 3, title: 'References complete the questionnaire', description: 'Each reference answers a confidential, psychometrically validated questionnaire — identity-verified for trust.' },
      { number: 4, title: 'Receive the employer report', description: 'Get a structured, one-page report with the candidate\'s RefScore, category breakdown, and confidence level.' },
    ],
    workerCta: 'https://app.open-hr.work/auth/login',
    workerCtaLabel: 'Get Your RefScore — Free',
    employerCta: '/employers',
    employerCtaLabel: 'Learn more',
  },
  fr: {
    workers: 'Travailleurs',
    employers: 'Employeurs',
    workersDesc: 'Construisez votre reputation professionnelle verifiee — gratuitement, toujours.',
    employersDesc: 'Des donnees de reference structurees pour eclairer vos decisions d\'embauche.',
    workerSteps: [
      { number: 1, title: 'Inscrivez-vous gratuitement', description: 'Creez votre compte Open HR en quelques secondes. Aucun paiement requis — jamais.' },
      { number: 2, title: 'Invitez vos references', description: 'Demandez a vos collegues, managers ou clients de fournir une reference professionnelle verifiee.' },
      { number: 3, title: 'Ils completent un court questionnaire', description: 'Vos references repondent a un questionnaire confidentiel et valide psychometriquement — environ 5 minutes.' },
      { number: 4, title: 'Recevez votre certificat RefScore', description: 'Obtenez un certificat verifie et infalsifiable avec votre RefScore, vos forces et vos styles de travail. Partagez-le avec n\'importe quel employeur.' },
    ],
    employerSteps: [
      { number: 1, title: 'Creez une evaluation', description: 'Selectionnez un niveau (Essentiel, Professionnel ou Dirigeant) et invitez un candidat a etre evalue.' },
      { number: 2, title: 'Le candidat designe ses references', description: 'Le candidat invite 3 a 10 references professionnelles qui connaissent son travail.' },
      { number: 3, title: 'Les references completent le questionnaire', description: 'Chaque reference repond a un questionnaire confidentiel et valide psychometriquement — identite verifiee pour la confiance.' },
      { number: 4, title: 'Recevez le rapport employeur', description: 'Obtenez un rapport structure d\'une page avec le RefScore du candidat, les categories et le niveau de confiance.' },
    ],
    workerCta: 'https://app.open-hr.work/auth/login',
    workerCtaLabel: 'Obtenir mon RefScore — Gratuit',
    employerCta: '/employers',
    employerCtaLabel: 'En savoir plus',
  },
  de: {
    workers: 'Arbeitnehmer',
    employers: 'Arbeitgeber',
    workersDesc: 'Erstellen Sie Ihr verifiziertes Berufsprofil — kostenlos, immer.',
    employersDesc: 'Strukturierte Referenzdaten fur Ihre Einstellungsentscheidungen.',
    workerSteps: [
      { number: 1, title: 'Kostenlos registrieren', description: 'Erstellen Sie Ihr Open HR Konto in Sekunden. Keine Zahlung erforderlich — nie.' },
      { number: 2, title: 'Referenzen einladen', description: 'Bitten Sie Kollegen, Vorgesetzte oder Kunden, eine verifizierte professionelle Referenz abzugeben.' },
      { number: 3, title: 'Fragebogen ausfullen', description: 'Ihre Referenzen beantworten einen vertraulichen, psychometrisch validierten Fragebogen — etwa 5 Minuten.' },
      { number: 4, title: 'RefScore-Zertifikat erhalten', description: 'Erhalten Sie ein verifiziertes, falschungssicheres Zertifikat mit Ihrem RefScore, Starken und Arbeitsstilen.' },
    ],
    employerSteps: [
      { number: 1, title: 'Bewertung erstellen', description: 'Wahlen Sie ein Paket (Basis, Professionell oder Exekutiv) und laden Sie einen Kandidaten zur Bewertung ein.' },
      { number: 2, title: 'Kandidat benennt Referenzen', description: 'Der Kandidat ladt 3-10 professionelle Referenzen ein, die seine Arbeit kennen.' },
      { number: 3, title: 'Referenzen fullen den Fragebogen aus', description: 'Jede Referenz beantwortet einen vertraulichen, psychometrisch validierten Fragebogen — identitatsverifiziert.' },
      { number: 4, title: 'Arbeitgeberbericht erhalten', description: 'Erhalten Sie einen strukturierten einseitigen Bericht mit dem RefScore des Kandidaten und Kategorieaufschlusselung.' },
    ],
    workerCta: 'https://app.open-hr.work/auth/login',
    workerCtaLabel: 'RefScore holen — Kostenlos',
    employerCta: '/employers',
    employerCtaLabel: 'Mehr erfahren',
  },
  es: {
    workers: 'Trabajadores',
    employers: 'Empleadores',
    workersDesc: 'Construye tu reputacion profesional verificada — gratis, siempre.',
    employersDesc: 'Datos de referencia estructurados para tus decisiones de contratacion.',
    workerSteps: [
      { number: 1, title: 'Registrate gratis', description: 'Crea tu cuenta Open HR en segundos. Sin pago requerido — nunca.' },
      { number: 2, title: 'Invita a tus referencias', description: 'Pide a colegas, gerentes o clientes que proporcionen una referencia profesional verificada.' },
      { number: 3, title: 'Completan un breve cuestionario', description: 'Tus referencias responden un cuestionario confidencial y validado psicometricamente — unos 5 minutos.' },
      { number: 4, title: 'Recibe tu credencial RefScore', description: 'Obtiene una credencial verificada e infalsificable con tu RefScore, fortalezas y estilos de trabajo.' },
    ],
    employerSteps: [
      { number: 1, title: 'Crear una evaluacion', description: 'Selecciona un nivel (Esencial, Profesional o Ejecutivo) e invita a un candidato a ser evaluado.' },
      { number: 2, title: 'El candidato designa referencias', description: 'El candidato invita a 3-10 referencias profesionales que conocen su trabajo.' },
      { number: 3, title: 'Las referencias completan el cuestionario', description: 'Cada referencia responde un cuestionario confidencial y validado psicometricamente — con identidad verificada.' },
      { number: 4, title: 'Recibir el informe del empleador', description: 'Obtiene un informe estructurado de una pagina con el RefScore del candidato y desglose por categorias.' },
    ],
    workerCta: 'https://app.open-hr.work/auth/login',
    workerCtaLabel: 'Obtener mi RefScore — Gratis',
    employerCta: '/employers',
    employerCtaLabel: 'Saber mas',
  },
  it: {
    workers: 'Lavoratori',
    employers: 'Datori di lavoro',
    workersDesc: 'Costruisci la tua reputazione professionale verificata — gratis, sempre.',
    employersDesc: 'Dati di referenza strutturati per le tue decisioni di assunzione.',
    workerSteps: [
      { number: 1, title: 'Registrati gratis', description: 'Crea il tuo account Open HR in pochi secondi. Nessun pagamento richiesto — mai.' },
      { number: 2, title: 'Invita le tue referenze', description: 'Chiedi a colleghi, manager o clienti di fornire una referenza professionale verificata.' },
      { number: 3, title: 'Completano un breve questionario', description: 'Le tue referenze rispondono a un questionario confidenziale e validato psicometricamente — circa 5 minuti.' },
      { number: 4, title: 'Ricevi la tua credenziale RefScore', description: 'Ottieni una credenziale verificata e a prova di manomissione con il tuo RefScore, punti di forza e stili di lavoro.' },
    ],
    employerSteps: [
      { number: 1, title: 'Crea una valutazione', description: 'Seleziona un livello (Essenziale, Professionale o Dirigente) e invita un candidato a essere valutato.' },
      { number: 2, title: 'Il candidato nomina le referenze', description: 'Il candidato invita 3-10 referenze professionali che conoscono il suo lavoro.' },
      { number: 3, title: 'Le referenze completano il questionario', description: 'Ogni referenza risponde a un questionario confidenziale e validato psicometricamente — con identita verificata.' },
      { number: 4, title: 'Ricevi il report per il datore di lavoro', description: 'Ottieni un report strutturato di una pagina con il RefScore del candidato e la suddivisione per categorie.' },
    ],
    workerCta: 'https://app.open-hr.work/auth/login',
    workerCtaLabel: 'Ottieni il mio RefScore — Gratuito',
    employerCta: '/employers',
    employerCtaLabel: 'Scopri di piu',
  },
};

export function HowItWorksToggle({ locale }: HowItWorksToggleProps) {
  const [audience, setAudience] = useState<Audience>('workers');
  const t = content[locale] || content['en-US'];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('view') === 'employers') setAudience('employers');
  }, []);

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

  const steps = audience === 'workers' ? t.workerSteps : t.employerSteps;
  const ctaHref = audience === 'workers' ? t.workerCta : `/${locale}${t.employerCta}`;
  const ctaLabel = audience === 'workers' ? t.workerCtaLabel : t.employerCtaLabel;

  return (
    <div className="py-12">
      {/* Audience Toggle */}
      <div className="flex flex-col items-center gap-3">
        <div
          className="inline-flex rounded-full border border-gray-200 bg-gray-50 p-1"
          role="tablist"
          aria-label="How it works audience"
        >
          <button
            role="tab"
            aria-selected={audience === 'workers'}
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

      {/* Steps */}
      <div className="mx-auto mt-12 max-w-3xl space-y-8">
        {steps.map((step) => (
          <div key={step.number} className="flex gap-6">
            {/* Step number */}
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-openhr-teal-900 text-lg font-bold text-white">
              {step.number}
            </div>
            {/* Content */}
            <div className="flex-1 pt-1">
              <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
              <p className="mt-1 text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 text-center">
        <a
          href={ctaHref}
          className="inline-block rounded-lg bg-openhr-teal-900 px-8 py-3 font-medium text-white transition-colors hover:bg-openhr-teal-800 focus:outline-none focus:ring-2 focus:ring-openhr-teal-500 focus:ring-offset-2"
        >
          {ctaLabel}
        </a>
      </div>
    </div>
  );
}

export default HowItWorksToggle;
