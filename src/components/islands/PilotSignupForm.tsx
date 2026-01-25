/**
 * Pilot Signup Form (React Island)
 *
 * Interactive form that POSTs to the platform API.
 * Uses client:load for immediate hydration.
 *
 * API: POST https://app.open-hr.work/api/pilot/signup
 * CORS: Configured in platform (OPE-369)
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
    errorGeneric: 'Une erreur est survenue. Veuillez reessayer.',
    errorNetwork: 'Erreur de connexion. Verifiez votre connexion internet.',
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
    errorGeneric: 'An error occurred. Please try again.',
    errorNetwork: 'Connection error. Check your internet connection.',
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
    errorGeneric: 'An error occurred. Please try again.',
    errorNetwork: 'Connection error. Check your internet connection.',
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
    errorGeneric: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
    errorNetwork: 'Verbindungsfehler. Uberprufen Sie Ihre Internetverbindung.',
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
    errorGeneric: 'Ocurrio un error. Por favor, intentalo de nuevo.',
    errorNetwork: 'Error de conexion. Verifica tu conexion a internet.',
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
    errorGeneric: 'Si e verificato un errore. Per favore riprova.',
    errorNetwork: 'Errore di connessione. Verifica la tua connessione internet.',
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

  // Determine API URL
  const api = apiUrl || (
    typeof window !== 'undefined' && window.location.hostname === 'localhost'
      ? 'http://localhost:3000/api/pilot/signup'
      : 'https://app.open-hr.work/api/pilot/signup'
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setErrorMessage('');

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
        setFormState('success');
        // Reset form
        setFormData({ firstName: '', lastName: '', email: '', reason: '' });
      } else if (response.status === 409) {
        setFormState('error');
        setErrorMessage(t.errorDuplicate);
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
    <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-6">
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
            required
            maxLength={50}
            value={formData.firstName}
            onChange={handleChange}
            disabled={formState === 'submitting'}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-openhr-teal-500 focus:outline-none focus:ring-1 focus:ring-openhr-teal-500 disabled:bg-gray-100"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            {t.lastName} *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            maxLength={50}
            value={formData.lastName}
            onChange={handleChange}
            disabled={formState === 'submitting'}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-openhr-teal-500 focus:outline-none focus:ring-1 focus:ring-openhr-teal-500 disabled:bg-gray-100"
          />
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
          required
          value={formData.email}
          onChange={handleChange}
          disabled={formState === 'submitting'}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-openhr-teal-500 focus:outline-none focus:ring-1 focus:ring-openhr-teal-500 disabled:bg-gray-100"
        />
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
