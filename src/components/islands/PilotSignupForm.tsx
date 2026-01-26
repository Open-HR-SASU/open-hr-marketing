/**
 * Pilot Signup Form (React Island)
 *
 * Interactive form that POSTs to the platform API for Stripe Checkout.
 * Uses client:load for immediate hydration.
 *
 * API: POST https://app.open-hr.work/api/pilot/checkout
 * Returns: { checkoutUrl: string } for redirect to Stripe Checkout
 *
 * CORS: Configured in platform (OPE-369)
 * @see OPE-388 - Pilot Stripe Checkout Integration
 * @see DL-33 - Pilot Pricing Decision (€5/month grandfathered)
 */

import { useState, type FormEvent } from 'react';

interface PilotSignupFormProps {
  locale: 'fr' | 'en-GB' | 'en-US' | 'de' | 'es' | 'it';
  apiUrl?: string;
}

// Localized strings
const translations = {
  fr: {
    title: 'Rejoignez le programme pilote',
    subtitle: 'Soyez parmi les premiers a decouvrir Open HR.',
    firstName: 'Prenom',
    lastName: 'Nom',
    email: 'Email',
    reason: 'Pourquoi souhaitez-vous participer ? (optionnel)',
    submit: 'S\'inscrire',
    submitting: 'Inscription en cours...',
    success: 'Inscription reussie ! Vous recevrez un email de confirmation.',
    errorDuplicate: 'Cette adresse email est deja inscrite.',
    errorCapacity: 'Le programme pilote a atteint sa capacite. Veuillez rejoindre la liste d\'attente.',
    errorAlreadyPaid: 'Cette adresse email a deja complete l\'inscription pilote.',
    errorGeneric: 'Une erreur est survenue. Veuillez reessayer.',
    errorNetwork: 'Erreur de connexion. Verifiez votre connexion internet.',
    validation: {
      firstNameRequired: 'Veuillez saisir votre prenom.',
      lastNameRequired: 'Veuillez saisir votre nom.',
      emailRequired: 'Veuillez saisir votre adresse email.',
      emailInvalid: 'Veuillez saisir une adresse email valide.',
    },
  },
  'en-GB': {
    title: 'Join the Pilot Programme',
    subtitle: 'Be among the first to discover Open HR.',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    reason: 'Why do you want to participate? (optional)',
    submit: 'Sign Up',
    submitting: 'Signing up...',
    success: 'Sign up successful! You will receive a confirmation email.',
    errorDuplicate: 'This email address is already registered.',
    errorCapacity: 'The pilot programme has reached capacity. Please join the waitlist.',
    errorAlreadyPaid: 'This email address has already completed pilot registration.',
    errorGeneric: 'An error occurred. Please try again.',
    errorNetwork: 'Connection error. Check your internet connection.',
    validation: {
      firstNameRequired: 'Please enter your first name.',
      lastNameRequired: 'Please enter your last name.',
      emailRequired: 'Please enter your email address.',
      emailInvalid: 'Please enter a valid email address.',
    },
  },
  'en-US': {
    title: 'Join the Pilot Program',
    subtitle: 'Be among the first to discover Open HR.',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    reason: 'Why do you want to participate? (optional)',
    submit: 'Sign Up',
    submitting: 'Signing up...',
    success: 'Sign up successful! You will receive a confirmation email.',
    errorDuplicate: 'This email address is already registered.',
    errorCapacity: 'The pilot program has reached capacity. Please join the waitlist.',
    errorAlreadyPaid: 'This email address has already completed pilot registration.',
    errorGeneric: 'An error occurred. Please try again.',
    errorNetwork: 'Connection error. Check your internet connection.',
    validation: {
      firstNameRequired: 'Please enter your first name.',
      lastNameRequired: 'Please enter your last name.',
      emailRequired: 'Please enter your email address.',
      emailInvalid: 'Please enter a valid email address.',
    },
  },
  de: {
    title: 'Am Pilotprogramm teilnehmen',
    subtitle: 'Gehoren Sie zu den Ersten, die Open HR entdecken.',
    firstName: 'Vorname',
    lastName: 'Nachname',
    email: 'E-Mail',
    reason: 'Warum mochten Sie teilnehmen? (optional)',
    submit: 'Anmelden',
    submitting: 'Anmeldung...',
    success: 'Anmeldung erfolgreich! Sie erhalten eine Bestatigungs-E-Mail.',
    errorDuplicate: 'Diese E-Mail-Adresse ist bereits registriert.',
    errorCapacity: 'Das Pilotprogramm hat seine Kapazitat erreicht. Bitte treten Sie der Warteliste bei.',
    errorAlreadyPaid: 'Diese E-Mail-Adresse hat die Pilotregistrierung bereits abgeschlossen.',
    errorGeneric: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
    errorNetwork: 'Verbindungsfehler. Uberprufen Sie Ihre Internetverbindung.',
    validation: {
      firstNameRequired: 'Bitte geben Sie Ihren Vornamen ein.',
      lastNameRequired: 'Bitte geben Sie Ihren Nachnamen ein.',
      emailRequired: 'Bitte geben Sie Ihre E-Mail-Adresse ein.',
      emailInvalid: 'Bitte geben Sie eine gultige E-Mail-Adresse ein.',
    },
  },
  es: {
    title: 'Unete al programa piloto',
    subtitle: 'Se de los primeros en descubrir Open HR.',
    firstName: 'Nombre',
    lastName: 'Apellido',
    email: 'Correo electronico',
    reason: 'Por que quieres participar? (opcional)',
    submit: 'Inscribirse',
    submitting: 'Inscribiendo...',
    success: 'Inscripcion exitosa! Recibiras un correo de confirmacion.',
    errorDuplicate: 'Esta direccion de correo ya esta registrada.',
    errorCapacity: 'El programa piloto ha alcanzado su capacidad. Por favor, unete a la lista de espera.',
    errorAlreadyPaid: 'Esta direccion de correo ya ha completado el registro piloto.',
    errorGeneric: 'Ocurrio un error. Por favor, intentalo de nuevo.',
    errorNetwork: 'Error de conexion. Verifica tu conexion a internet.',
    validation: {
      firstNameRequired: 'Por favor, ingresa tu nombre.',
      lastNameRequired: 'Por favor, ingresa tu apellido.',
      emailRequired: 'Por favor, ingresa tu correo electronico.',
      emailInvalid: 'Por favor, ingresa un correo electronico valido.',
    },
  },
  it: {
    title: 'Unisciti al programma pilota',
    subtitle: 'Sii tra i primi a scoprire Open HR.',
    firstName: 'Nome',
    lastName: 'Cognome',
    email: 'Email',
    reason: 'Perche vuoi partecipare? (opzionale)',
    submit: 'Iscriviti',
    submitting: 'Iscrizione in corso...',
    success: 'Iscrizione riuscita! Riceverai un\'email di conferma.',
    errorDuplicate: 'Questo indirizzo email e gia registrato.',
    errorCapacity: 'Il programma pilota ha raggiunto la capacita. Per favore unisciti alla lista d\'attesa.',
    errorAlreadyPaid: 'Questo indirizzo email ha gia completato la registrazione pilota.',
    errorGeneric: 'Si e verificato un errore. Per favore riprova.',
    errorNetwork: 'Errore di connessione. Verifica la tua connessione internet.',
    validation: {
      firstNameRequired: 'Inserisci il tuo nome.',
      lastNameRequired: 'Inserisci il tuo cognome.',
      emailRequired: 'Inserisci il tuo indirizzo email.',
      emailInvalid: 'Inserisci un indirizzo email valido.',
    },
  },
};

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export function PilotSignupForm({ locale, apiUrl }: PilotSignupFormProps) {
  const t = translations[locale] || translations['en-US'];

  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    reason: '',
  });
  const [fieldErrors, setFieldErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
  }>({});

  // Determine API URL - uses checkout endpoint for Stripe payment flow (OPE-388)
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

    if (!formData.firstName.trim()) {
      errors.firstName = t.validation.firstNameRequired;
    }
    if (!formData.lastName.trim()) {
      errors.lastName = t.validation.lastNameRequired;
    }
    if (!formData.email.trim()) {
      errors.email = t.validation.emailRequired;
    } else if (!isValidEmail(formData.email)) {
      errors.email = t.validation.emailInvalid;
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validate before submitting
    if (!validateForm()) {
      return;
    }

    setFormState('submitting');

    try {
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          locale,
          source: typeof window !== 'undefined'
            ? new URLSearchParams(window.location.search).get('utm_source') || 'organic'
            : 'organic',
        }),
      });

      if (response.ok) {
        const data = await response.json().catch(() => ({}));

        // If API returns a checkout URL, redirect to Stripe Checkout
        // This enables future payment integration (OPE-388)
        if (data.checkoutUrl) {
          window.location.href = data.checkoutUrl;
          return;
        }

        setFormState('success');
        // Reset form
        setFormData({ firstName: '', lastName: '', email: '', reason: '' });
      } else if (response.status === 409) {
        // Handle specific 409 errors
        const data = await response.json().catch(() => ({}));
        setFormState('error');
        if (data.error === 'capacity_reached') {
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
      setFormState('error');
      setErrorMessage(t.errorNetwork);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error when user starts typing
    if (fieldErrors[name as keyof typeof fieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Success state
  if (formState === 'success') {
    return (
      <div className="mx-auto max-w-md rounded-lg bg-green-50 p-8 text-center">
        <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-700">{errorMessage}</p>
        </div>
      )}

      {/* Name fields */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            {t.firstName} *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
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
            type="text"
            id="lastName"
            name="lastName"
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
          type="email"
          id="email"
          name="email"
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
