/**
 * Pilot Signup Form (React Island) — Pricing Pivot Update
 *
 * Interactive form that POSTs to the platform API for Stripe Checkout.
 * Uses client:load for immediate hydration.
 *
 * API: POST https://app.open-hr.work/api/pilot/checkout
 * Returns: { checkoutUrl: string } for redirect to Stripe Checkout
 *
 * Changes (OPE-719, OPE-721):
 * - Removed devicePreference field (moved to post-payment success page survey)
 * - Added hidden tier field (founding | standard)
 * - Added currency derived from locale
 * - Added founding_cap_reached error handling
 *
 * CORS: Configured in platform (OPE-369)
 * @see OPE-388 - Pilot Stripe Checkout Integration
 * @see OPE-419 - Form validation and error handling audit
 * @see OPE-719 - Pricing Pivot
 * @see OPE-721 - Post-payment device survey
 * @see DL-34   - Annual pricing model
 */

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { getCurrencyForLocale, type Locale } from '@/lib/pricing';

// Request timeout in milliseconds (15 seconds) - OPE-419
const REQUEST_TIMEOUT_MS = 15000;

interface PilotSignupFormProps {
  locale: Locale;
  apiUrl?: string;
  /** Force a specific tier; falls back to URL param ?tier= then "founding" */
  defaultTier?: 'founding' | 'standard';
}

// Privacy policy URL paths per locale (OPE-437: GDPR-compliant locale-specific links)
const privacyPolicyPaths: Record<Locale, string> = {
  fr: '/fr/legal/confidentialite/',
  'en-GB': '/en-GB/legal/privacy/',
  'en-US': '/en-US/legal/privacy/',
  de: '/de/legal/privacy/',
  es: '/es/legal/privacy/',
  it: '/it/legal/privacy/',
};

// Localized strings
const translations = {
  fr: {
    title: 'Obtenez votre RefScore',
    subtitle: 'Rejoignez les premiers membres fondateurs d\'Open HR.',
    firstName: 'Prénom',
    lastName: 'Nom',
    email: 'Email',
    reason: 'Pourquoi souhaitez-vous participer ? (optionnel)',
    submit: 'Obtenir mon RefScore',
    submitting: 'Redirection en cours...',
    success: 'Inscription réussie ! Vous allez être redirigé(e) vers le paiement.',
    errorDuplicate: 'Cette adresse email a déjà complété l\'inscription.',
    errorCapacityFounding: 'Les places Membre Fondateur sont complètes. Vous pouvez rejoindre en tant que membre Standard.',
    errorCapacity: 'Le programme a atteint sa capacité. Veuillez rejoindre la liste d\'attente.',
    errorAlreadyPaid: 'Cette adresse email a déjà complété l\'inscription.',
    errorGeneric: 'Une erreur est survenue. Veuillez réessayer.',
    errorNetwork: 'Erreur de connexion. Vérifiez votre connexion internet.',
    errorTimeout: 'La requête a expiré. Veuillez réessayer.',
    switchToStandard: 'Continuer en Standard →',
    gdprConsent: 'J\'accepte que mes données soient traitées conformément à la',
    gdprConsentLink: 'politique de confidentialité',
    validation: {
      firstNameRequired: 'Veuillez saisir votre prénom.',
      lastNameRequired: 'Veuillez saisir votre nom.',
      emailRequired: 'Veuillez saisir votre adresse email.',
      emailInvalid: 'Veuillez saisir une adresse email valide.',
      gdprRequired: 'Vous devez accepter la politique de confidentialité.',
    },
  },
  'en-GB': {
    title: 'Get Your RefScore',
    subtitle: 'Join the first Founding Members of Open HR.',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    reason: 'Why do you want to participate? (optional)',
    submit: 'Get My RefScore',
    submitting: 'Redirecting...',
    success: 'Sign up successful! Redirecting to payment.',
    errorDuplicate: 'This email address has already completed registration.',
    errorCapacityFounding: 'Founding Member spots are full. You can join as a Standard member.',
    errorCapacity: 'The programme has reached capacity. Please join the waitlist.',
    errorAlreadyPaid: 'This email address has already completed registration.',
    errorGeneric: 'An error occurred. Please try again.',
    errorNetwork: 'Connection error. Check your internet connection.',
    errorTimeout: 'The request timed out. Please try again.',
    switchToStandard: 'Continue as Standard →',
    gdprConsent: 'I agree that my data will be processed in accordance with the',
    gdprConsentLink: 'privacy policy',
    validation: {
      firstNameRequired: 'Please enter your first name.',
      lastNameRequired: 'Please enter your last name.',
      emailRequired: 'Please enter your email address.',
      emailInvalid: 'Please enter a valid email address.',
      gdprRequired: 'You must accept the privacy policy.',
    },
  },
  'en-US': {
    title: 'Get Your RefScore',
    subtitle: 'Join the first Founding Members of Open HR.',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    reason: 'Why do you want to participate? (optional)',
    submit: 'Get My RefScore',
    submitting: 'Redirecting...',
    success: 'Sign up successful! Redirecting to payment.',
    errorDuplicate: 'This email address has already completed registration.',
    errorCapacityFounding: 'Founding Member spots are full. You can join as a Standard member.',
    errorCapacity: 'The program has reached capacity. Please join the waitlist.',
    errorAlreadyPaid: 'This email address has already completed registration.',
    errorGeneric: 'An error occurred. Please try again.',
    errorNetwork: 'Connection error. Check your internet connection.',
    errorTimeout: 'The request timed out. Please try again.',
    switchToStandard: 'Continue as Standard →',
    gdprConsent: 'I agree that my data will be processed in accordance with the',
    gdprConsentLink: 'privacy policy',
    validation: {
      firstNameRequired: 'Please enter your first name.',
      lastNameRequired: 'Please enter your last name.',
      emailRequired: 'Please enter your email address.',
      emailInvalid: 'Please enter a valid email address.',
      gdprRequired: 'You must accept the privacy policy.',
    },
  },
  de: {
    title: 'Holen Sie sich Ihren RefScore',
    subtitle: 'Werden Sie eines der ersten Gründungsmitglieder von Open HR.',
    firstName: 'Vorname',
    lastName: 'Nachname',
    email: 'E-Mail',
    reason: 'Warum möchten Sie teilnehmen? (optional)',
    submit: 'Meinen RefScore holen',
    submitting: 'Weiterleitung...',
    success: 'Anmeldung erfolgreich! Weiterleitung zur Zahlung.',
    errorDuplicate: 'Diese E-Mail-Adresse hat die Registrierung bereits abgeschlossen.',
    errorCapacityFounding: 'Alle Gründungsplätze sind vergeben. Sie können als Standard-Mitglied beitreten.',
    errorCapacity: 'Das Programm hat seine Kapazität erreicht. Bitte treten Sie der Warteliste bei.',
    errorAlreadyPaid: 'Diese E-Mail-Adresse hat die Registrierung bereits abgeschlossen.',
    errorGeneric: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
    errorNetwork: 'Verbindungsfehler. Überprüfen Sie Ihre Internetverbindung.',
    errorTimeout: 'Die Anfrage ist abgelaufen. Bitte versuchen Sie es erneut.',
    switchToStandard: 'Als Standard fortfahren →',
    gdprConsent: 'Ich stimme zu, dass meine Daten gemäß der',
    gdprConsentLink: 'Datenschutzerklärung',
    gdprConsentSuffix: 'verarbeitet werden',
    validation: {
      firstNameRequired: 'Bitte geben Sie Ihren Vornamen ein.',
      lastNameRequired: 'Bitte geben Sie Ihren Nachnamen ein.',
      emailRequired: 'Bitte geben Sie Ihre E-Mail-Adresse ein.',
      emailInvalid: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
      gdprRequired: 'Sie müssen die Datenschutzerklärung akzeptieren.',
    },
  },
  es: {
    title: 'Obtén tu RefScore',
    subtitle: 'Sé uno de los primeros Miembros Fundadores de Open HR.',
    firstName: 'Nombre',
    lastName: 'Apellido',
    email: 'Correo electrónico',
    reason: '¿Por qué quieres participar? (opcional)',
    submit: 'Obtener mi RefScore',
    submitting: 'Redirigiendo...',
    success: '¡Inscripción exitosa! Redirigiendo al pago.',
    errorDuplicate: 'Esta dirección de correo ya ha completado el registro.',
    errorCapacityFounding: 'Las plazas de Miembro Fundador están completas. Puedes unirte como miembro Standard.',
    errorCapacity: 'El programa ha alcanzado su capacidad. Por favor, únete a la lista de espera.',
    errorAlreadyPaid: 'Esta dirección de correo ya ha completado el registro.',
    errorGeneric: 'Ocurrió un error. Por favor, inténtalo de nuevo.',
    errorNetwork: 'Error de conexión. Verifica tu conexión a internet.',
    errorTimeout: 'La solicitud ha expirado. Por favor, inténtalo de nuevo.',
    switchToStandard: 'Continuar como Standard →',
    gdprConsent: 'Acepto que mis datos sean tratados de acuerdo con la',
    gdprConsentLink: 'política de privacidad',
    validation: {
      firstNameRequired: 'Por favor, ingresa tu nombre.',
      lastNameRequired: 'Por favor, ingresa tu apellido.',
      emailRequired: 'Por favor, ingresa tu correo electrónico.',
      emailInvalid: 'Por favor, ingresa un correo electrónico válido.',
      gdprRequired: 'Debes aceptar la política de privacidad.',
    },
  },
  it: {
    title: 'Ottieni il tuo RefScore',
    subtitle: 'Unisciti ai primi Membri Fondatori di Open HR.',
    firstName: 'Nome',
    lastName: 'Cognome',
    email: 'Email',
    reason: 'Perché vuoi partecipare? (opzionale)',
    submit: 'Ottieni il mio RefScore',
    submitting: 'Reindirizzamento...',
    success: 'Iscrizione riuscita! Reindirizzamento al pagamento.',
    errorDuplicate: 'Questo indirizzo email ha già completato la registrazione.',
    errorCapacityFounding: 'I posti fondatori sono esauriti. Puoi iscriverti come membro Standard.',
    errorCapacity: 'Il programma ha raggiunto la capacità. Per favore unisciti alla lista d\'attesa.',
    errorAlreadyPaid: 'Questo indirizzo email ha già completato la registrazione.',
    errorGeneric: 'Si è verificato un errore. Per favore riprova.',
    errorNetwork: 'Errore di connessione. Verifica la tua connessione internet.',
    errorTimeout: 'La richiesta è scaduta. Per favore riprova.',
    switchToStandard: 'Continua come Standard →',
    gdprConsent: 'Accetto che i miei dati siano trattati in conformità con la',
    gdprConsentLink: 'informativa sulla privacy',
    validation: {
      firstNameRequired: 'Inserisci il tuo nome.',
      lastNameRequired: 'Inserisci il tuo cognome.',
      emailRequired: 'Inserisci il tuo indirizzo email.',
      emailInvalid: 'Inserisci un indirizzo email valido.',
      gdprRequired: 'Devi accettare l\'informativa sulla privacy.',
    },
  },
};

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export function PilotSignupForm({ locale, apiUrl, defaultTier }: PilotSignupFormProps) {
  const t = translations[locale] || translations['en-US'];
  const currency = getCurrencyForLocale(locale);

  // Refs for focus management (accessibility) - OPE-419
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const gdprConsentRef = useRef<HTMLInputElement>(null);

  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showSwitchToStandard, setShowSwitchToStandard] = useState(false);

  // Tier: URL param → prop → default "founding"
  const [tier, setTier] = useState<'founding' | 'standard'>(() => {
    if (defaultTier) return defaultTier;
    return 'founding';
  });

  // Read ?tier= URL param on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlTier = new URLSearchParams(window.location.search).get('tier');
      if (urlTier === 'standard') {
        setTier('standard');
      }
    }
  }, []);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    reason: '',
    gdprConsent: false,
  });
  const [fieldErrors, setFieldErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    gdprConsent?: string;
  }>({});

  // Determine API URL — uses checkout endpoint for Stripe payment flow (OPE-388)
  const api = apiUrl || (
    typeof window !== 'undefined' && window.location.hostname === 'localhost'
      ? 'http://localhost:3000/api/pilot/checkout'
      : 'https://app.open-hr.work/api/pilot/checkout'
  );

  // Email validation regex (RFC 5322 simplified)
  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = (): boolean => {
    const errors: typeof fieldErrors = {};

    if (!formData.firstName.trim()) errors.firstName = t.validation.firstNameRequired;
    if (!formData.lastName.trim()) errors.lastName = t.validation.lastNameRequired;
    if (!formData.email.trim()) {
      errors.email = t.validation.emailRequired;
    } else if (!isValidEmail(formData.email)) {
      errors.email = t.validation.emailInvalid;
    }
    if (!formData.gdprConsent) errors.gdprConsent = t.validation.gdprRequired;

    setFieldErrors(errors);

    // Focus the first field with an error for accessibility (OPE-419)
    if (Object.keys(errors).length > 0) {
      const errorOrder: Array<keyof typeof errors> = ['firstName', 'lastName', 'email', 'gdprConsent'];
      for (const field of errorOrder) {
        if (errors[field]) {
          const refMap = {
            firstName: firstNameRef,
            lastName: lastNameRef,
            email: emailRef,
            gdprConsent: gdprConsentRef,
          };
          refMap[field].current?.focus();
          break;
        }
      }
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setShowSwitchToStandard(false);

    if (formState === 'submitting') return;
    if (!validateForm()) return;

    setFormState('submitting');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          locale,
          tier,
          currency,
          source: typeof window !== 'undefined'
            ? new URLSearchParams(window.location.search).get('utm_source') || 'organic'
            : 'organic',
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json().catch(() => ({}));

        // Redirect to Stripe Checkout
        if (data.checkoutUrl) {
          window.location.href = data.checkoutUrl;
          return;
        }

        setFormState('success');
        setFormData({ firstName: '', lastName: '', email: '', reason: '', gdprConsent: false });
      } else if (response.status === 409) {
        const data = await response.json().catch(() => ({}));
        setFormState('error');

        if (data.error === 'founding_cap_reached') {
          setErrorMessage(t.errorCapacityFounding);
          setShowSwitchToStandard(true);
        } else if (data.error === 'capacity_reached') {
          setErrorMessage(t.errorCapacity);
        } else if (data.error === 'already_paid') {
          setErrorMessage(t.errorAlreadyPaid);
        } else {
          setErrorMessage(t.errorDuplicate);
        }
      } else {
        const data = await response.json().catch(() => ({}));
        setFormState('error');
        setErrorMessage(data.message || t.errorGeneric);
      }
    } catch (error) {
      clearTimeout(timeoutId);
      setFormState('error');

      if (error instanceof Error && error.name === 'AbortError') {
        setErrorMessage(t.errorTimeout);
      } else {
        setErrorMessage(t.errorNetwork);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    if (fieldErrors[name as keyof typeof fieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Success state
  if (formState === 'success') {
    return (
      <div className="mx-auto max-w-md rounded-lg bg-green-50 p-8 text-center" role="status">
        <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <p className="mt-4 text-lg font-medium text-green-800">{t.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mx-auto max-w-md space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">{t.title}</h2>
        <p className="mt-2 text-gray-600">{t.subtitle}</p>
      </div>

      {/* Error message */}
      {formState === 'error' && errorMessage && (
        <div className="rounded-md bg-red-50 p-4" role="alert" aria-live="assertive">
          <p className="text-sm text-red-700">{errorMessage}</p>
          {/* Offer switch to standard if founding is full */}
          {showSwitchToStandard && (
            <button
              type="button"
              onClick={() => {
                setTier('standard');
                setFormState('idle');
                setErrorMessage('');
                setShowSwitchToStandard(false);
              }}
              className="mt-2 text-sm font-medium text-openhr-teal-700 underline hover:text-openhr-teal-900"
            >
              {t.switchToStandard}
            </button>
          )}
        </div>
      )}

      {/* Name fields */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            {t.firstName} *
          </label>
          <input
            ref={firstNameRef}
            type="text"
            id="firstName"
            name="firstName"
            autoComplete="given-name"
            aria-required="true"
            aria-invalid={!!fieldErrors.firstName}
            aria-describedby={fieldErrors.firstName ? 'firstName-error' : undefined}
            maxLength={50}
            value={formData.firstName}
            onChange={handleChange}
            disabled={formState === 'submitting'}
            className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-1 disabled:bg-gray-100 ${
              fieldErrors.firstName
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-openhr-teal-500 focus:ring-openhr-teal-500'
            }`}
          />
          {fieldErrors.firstName && (
            <p id="firstName-error" className="mt-1 text-sm text-red-600" role="alert">
              {fieldErrors.firstName}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            {t.lastName} *
          </label>
          <input
            ref={lastNameRef}
            type="text"
            id="lastName"
            name="lastName"
            autoComplete="family-name"
            aria-required="true"
            aria-invalid={!!fieldErrors.lastName}
            aria-describedby={fieldErrors.lastName ? 'lastName-error' : undefined}
            maxLength={50}
            value={formData.lastName}
            onChange={handleChange}
            disabled={formState === 'submitting'}
            className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-1 disabled:bg-gray-100 ${
              fieldErrors.lastName
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-openhr-teal-500 focus:ring-openhr-teal-500'
            }`}
          />
          {fieldErrors.lastName && (
            <p id="lastName-error" className="mt-1 text-sm text-red-600" role="alert">
              {fieldErrors.lastName}
            </p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          {t.email} *
        </label>
        <input
          ref={emailRef}
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          aria-required="true"
          aria-invalid={!!fieldErrors.email}
          aria-describedby={fieldErrors.email ? 'email-error' : undefined}
          value={formData.email}
          onChange={handleChange}
          disabled={formState === 'submitting'}
          className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-1 disabled:bg-gray-100 ${
            fieldErrors.email
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-openhr-teal-500 focus:ring-openhr-teal-500'
          }`}
        />
        {fieldErrors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
            {fieldErrors.email}
          </p>
        )}
      </div>

      {/* Reason (optional) */}
      <div>
        <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
          {t.reason}
        </label>
        <textarea
          id="reason"
          name="reason"
          rows={3}
          maxLength={500}
          value={formData.reason}
          onChange={handleChange}
          disabled={formState === 'submitting'}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-openhr-teal-500 focus:outline-none focus:ring-1 focus:ring-openhr-teal-500 disabled:bg-gray-100"
        />
      </div>

      {/* GDPR Consent */}
      <div>
        <div className="flex items-start gap-3">
          <input
            ref={gdprConsentRef}
            type="checkbox"
            id="gdprConsent"
            name="gdprConsent"
            checked={formData.gdprConsent}
            onChange={handleChange}
            disabled={formState === 'submitting'}
            aria-required="true"
            aria-invalid={!!fieldErrors.gdprConsent}
            aria-describedby={fieldErrors.gdprConsent ? 'gdprConsent-error' : undefined}
            className={`mt-1 h-4 w-4 rounded border focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed ${
              fieldErrors.gdprConsent
                ? 'border-red-500 text-red-500 focus:ring-red-500'
                : 'border-gray-300 text-openhr-teal-900 focus:ring-openhr-teal-500'
            }`}
          />
          <label htmlFor="gdprConsent" className="text-sm text-gray-700">
            {t.gdprConsent}{' '}
            <a
              href={privacyPolicyPaths[locale]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-openhr-teal-700 underline hover:text-openhr-teal-900"
            >
              {t.gdprConsentLink}
            </a>
            {'gdprConsentSuffix' in t ? ` ${(t as typeof translations['de']).gdprConsentSuffix}` : ''}
            . *
          </label>
        </div>
        {fieldErrors.gdprConsent && (
          <p id="gdprConsent-error" className="mt-1 text-sm text-red-600" role="alert">
            {fieldErrors.gdprConsent}
          </p>
        )}
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={formState === 'submitting'}
        className="w-full rounded-md bg-openhr-teal-900 px-4 py-3 font-medium text-white transition-colors hover:bg-openhr-teal-800 focus:outline-none focus:ring-2 focus:ring-openhr-teal-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {formState === 'submitting' ? t.submitting : t.submit}
      </button>
    </form>
  );
}

export default PilotSignupForm;
