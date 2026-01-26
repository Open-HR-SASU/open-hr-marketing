/**
 * Login Form (React Island)
 *
 * Interactive login form that authenticates via the platform API.
 * Uses client:load for immediate hydration.
 *
 * API: POST https://app.open-hr.work/api/auth/login
 * Returns: { token: string, user: UserData } or redirects to dashboard
 *
 * CORS: Configured in platform (OPE-369)
 * @see OPE-432 - Fix app.open-hr.work/login 404
 */

import { useState, useRef, type FormEvent } from 'react';

// Request timeout in milliseconds (15 seconds)
const REQUEST_TIMEOUT_MS = 15000;

interface LoginFormProps {
  locale: 'fr' | 'en-GB' | 'en-US' | 'de' | 'es' | 'it';
  apiUrl?: string;
  callbackUrl?: string;
}

// Localized strings
const translations = {
  fr: {
    title: 'Connexion',
    subtitle: 'Connectez-vous pour acceder a votre espace',
    email: 'Adresse email',
    password: 'Mot de passe',
    submit: 'Se connecter',
    submitting: 'Connexion en cours...',
    forgotPassword: 'Mot de passe oublie ?',
    noAccount: 'Pas encore de compte ?',
    register: 'Creer un compte',
    errorInvalid: 'Email ou mot de passe incorrect.',
    errorGeneric: 'Une erreur est survenue. Veuillez reessayer.',
    errorNetwork: 'Erreur de connexion. Verifiez votre connexion internet.',
    errorTimeout: 'La requete a expire. Veuillez reessayer.',
    validation: {
      emailRequired: 'Veuillez saisir votre adresse email.',
      emailInvalid: 'Veuillez saisir une adresse email valide.',
      passwordRequired: 'Veuillez saisir votre mot de passe.',
    },
  },
  'en-GB': {
    title: 'Sign In',
    subtitle: 'Sign in to access your account',
    email: 'Email address',
    password: 'Password',
    submit: 'Sign In',
    submitting: 'Signing in...',
    forgotPassword: 'Forgot password?',
    noAccount: "Don't have an account?",
    register: 'Create account',
    errorInvalid: 'Invalid email or password.',
    errorGeneric: 'An error occurred. Please try again.',
    errorNetwork: 'Connection error. Check your internet connection.',
    errorTimeout: 'The request timed out. Please try again.',
    validation: {
      emailRequired: 'Please enter your email address.',
      emailInvalid: 'Please enter a valid email address.',
      passwordRequired: 'Please enter your password.',
    },
  },
  'en-US': {
    title: 'Sign In',
    subtitle: 'Sign in to access your account',
    email: 'Email address',
    password: 'Password',
    submit: 'Sign In',
    submitting: 'Signing in...',
    forgotPassword: 'Forgot password?',
    noAccount: "Don't have an account?",
    register: 'Create account',
    errorInvalid: 'Invalid email or password.',
    errorGeneric: 'An error occurred. Please try again.',
    errorNetwork: 'Connection error. Check your internet connection.',
    errorTimeout: 'The request timed out. Please try again.',
    validation: {
      emailRequired: 'Please enter your email address.',
      emailInvalid: 'Please enter a valid email address.',
      passwordRequired: 'Please enter your password.',
    },
  },
  de: {
    title: 'Anmelden',
    subtitle: 'Melden Sie sich an, um auf Ihr Konto zuzugreifen',
    email: 'E-Mail-Adresse',
    password: 'Passwort',
    submit: 'Anmelden',
    submitting: 'Anmeldung...',
    forgotPassword: 'Passwort vergessen?',
    noAccount: 'Noch kein Konto?',
    register: 'Konto erstellen',
    errorInvalid: 'Ungultige E-Mail oder Passwort.',
    errorGeneric: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
    errorNetwork: 'Verbindungsfehler. Uberprufen Sie Ihre Internetverbindung.',
    errorTimeout: 'Die Anfrage ist abgelaufen. Bitte versuchen Sie es erneut.',
    validation: {
      emailRequired: 'Bitte geben Sie Ihre E-Mail-Adresse ein.',
      emailInvalid: 'Bitte geben Sie eine gultige E-Mail-Adresse ein.',
      passwordRequired: 'Bitte geben Sie Ihr Passwort ein.',
    },
  },
  es: {
    title: 'Iniciar sesion',
    subtitle: 'Inicia sesion para acceder a tu cuenta',
    email: 'Correo electronico',
    password: 'Contrasena',
    submit: 'Iniciar sesion',
    submitting: 'Iniciando sesion...',
    forgotPassword: 'Olvidaste tu contrasena?',
    noAccount: 'No tienes cuenta?',
    register: 'Crear cuenta',
    errorInvalid: 'Correo o contrasena incorrectos.',
    errorGeneric: 'Ocurrio un error. Por favor, intentalo de nuevo.',
    errorNetwork: 'Error de conexion. Verifica tu conexion a internet.',
    errorTimeout: 'La solicitud ha expirado. Por favor, intentalo de nuevo.',
    validation: {
      emailRequired: 'Por favor, ingresa tu correo electronico.',
      emailInvalid: 'Por favor, ingresa un correo electronico valido.',
      passwordRequired: 'Por favor, ingresa tu contrasena.',
    },
  },
  it: {
    title: 'Accedi',
    subtitle: 'Accedi per entrare nel tuo account',
    email: 'Indirizzo email',
    password: 'Password',
    submit: 'Accedi',
    submitting: 'Accesso in corso...',
    forgotPassword: 'Password dimenticata?',
    noAccount: 'Non hai un account?',
    register: 'Crea account',
    errorInvalid: 'Email o password non validi.',
    errorGeneric: 'Si e verificato un errore. Per favore riprova.',
    errorNetwork: 'Errore di connessione. Verifica la tua connessione internet.',
    errorTimeout: 'La richiesta e scaduta. Per favore riprova.',
    validation: {
      emailRequired: 'Inserisci il tuo indirizzo email.',
      emailInvalid: 'Inserisci un indirizzo email valido.',
      passwordRequired: 'Inserisci la tua password.',
    },
  },
};

type FormState = 'idle' | 'submitting' | 'error';

export function LoginForm({ locale, apiUrl, callbackUrl }: LoginFormProps) {
  const t = translations[locale] || translations['en-US'];

  // Refs for focus management (accessibility)
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  // Determine API URL
  const api = apiUrl || (
    typeof window !== 'undefined' && window.location.hostname === 'localhost'
      ? 'http://localhost:8080/api/auth/login'
      : 'https://app.open-hr.work/api/auth/login'
  );

  // Email validation regex (RFC 5322 simplified)
  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = (): boolean => {
    const errors: typeof fieldErrors = {};

    if (!formData.email.trim()) {
      errors.email = t.validation.emailRequired;
    } else if (!isValidEmail(formData.email)) {
      errors.email = t.validation.emailInvalid;
    }
    if (!formData.password) {
      errors.password = t.validation.passwordRequired;
    }

    setFieldErrors(errors);

    // Focus the first field with an error for accessibility
    if (Object.keys(errors).length > 0) {
      if (errors.email) {
        emailRef.current?.focus();
      } else if (errors.password) {
        passwordRef.current?.focus();
      }
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Prevent double submission
    if (formState === 'submitting') {
      return;
    }

    // Validate before submitting
    if (!validateForm()) {
      return;
    }

    setFormState('submitting');

    // Set up request timeout with AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for session
        body: JSON.stringify({
          email: formData.email.toLowerCase().trim(),
          password: formData.password,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json().catch(() => ({}));

        // Redirect to callback URL or dashboard
        const redirectTo = callbackUrl || data.redirectUrl || '/app/dashboard';

        // If redirecting to platform subdomain, use full URL
        if (redirectTo.startsWith('/app')) {
          window.location.href = 'https://app.open-hr.work' + redirectTo;
        } else {
          window.location.href = redirectTo;
        }
        return;
      } else if (response.status === 401) {
        setFormState('error');
        setErrorMessage(t.errorInvalid);
      } else {
        const data = await response.json().catch(() => ({}));
        setFormState('error');
        setErrorMessage(data.message || t.errorGeneric);
      }
    } catch (error) {
      clearTimeout(timeoutId);
      setFormState('error');

      // Check if error was caused by timeout (abort)
      if (error instanceof Error && error.name === 'AbortError') {
        setErrorMessage(t.errorTimeout);
      } else {
        setErrorMessage(t.errorNetwork);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error when user starts typing
    if (fieldErrors[name as keyof typeof fieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
          <p className="mt-2 text-gray-600">{t.subtitle}</p>
        </div>

        {/* Error message */}
        {formState === 'error' && errorMessage && (
          <div className="rounded-md bg-red-50 p-4" role="alert" aria-live="assertive">
            <p className="text-sm text-red-700">{errorMessage}</p>
          </div>
        )}

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            {t.email}
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

        {/* Password */}
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              {t.password}
            </label>
            <a
              href={`/${locale}/forgot-password`}
              className="text-sm text-openhr-teal-700 hover:text-openhr-teal-900"
            >
              {t.forgotPassword}
            </a>
          </div>
          <input
            ref={passwordRef}
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            aria-required="true"
            aria-invalid={!!fieldErrors.password}
            aria-describedby={fieldErrors.password ? 'password-error' : undefined}
            value={formData.password}
            onChange={handleChange}
            disabled={formState === 'submitting'}
            className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-1 disabled:bg-gray-100 ${
              fieldErrors.password
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-openhr-teal-500 focus:ring-openhr-teal-500'
            }`}
          />
          {fieldErrors.password && (
            <p id="password-error" className="mt-1 text-sm text-red-600" role="alert">
              {fieldErrors.password}
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

        {/* Register link */}
        <p className="text-center text-sm text-gray-600">
          {t.noAccount}{' '}
          <a
            href={`/${locale}/register`}
            className="font-medium text-openhr-teal-700 hover:text-openhr-teal-900"
          >
            {t.register}
          </a>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
