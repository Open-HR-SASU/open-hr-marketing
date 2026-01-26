/**
 * Mockup Screen Translations
 *
 * i18n content for dynamic app mockup screens.
 * Supports all 6 locales: fr, en-GB, en-US, de, es, it
 *
 * GREEN Disclosure Level: Generic placeholder content only.
 * No real RefScore items, BAO taxonomy, or actual questionnaire content.
 */

import type { Locale } from '../i18n';

export interface MockupTranslations {
  // Common
  common: {
    appName: string;
    invite: string;
    back: string;
    next: string;
    previous: string;
    submit: string;
    verified: string;
    pending: string;
    completed: string;
    viewed: string;
  };
  // Questionnaire screen
  questionnaire: {
    contextLabel: string;
    candidateName: string;
    candidateRole: string;
    asRole: string;
    questionOf: string;
    minutesLeft: string;
    stemText: string;
    baoText: string;
    scale: {
      never: string;
      rarely: string;
      sometimes: string;
      often: string;
      almostAlways: string;
      notObserved: string;
    };
  };
  // Dashboard screen
  dashboard: {
    greeting: string;
    userName: string;
    subtitle: string;
    yourRefScore: string;
    references: string;
    level: string;
    levelHigh: string;
    levelModerate: string;
    basedOn: string;
    types: string;
    inviteNew: string;
    identityVerification: string;
    email: string;
    phone: string;
    idDocument: string;
    notVerified: string;
    recentActivity: string;
    completedReference: string;
    openedInvitation: string;
    invitationSent: string;
    hoursAgo: string;
    daysAgo: string;
    // Radar labels
    radar: {
      reliability: string;
      collaboration: string;
      initiative: string;
      adaptability: string;
      communication: string;
      problemSolving: string;
    };
  };
  // Invite reference screen
  invite: {
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    typeLabel: string;
    types: {
      supervisor: string;
      supervisorDesc: string;
      peer: string;
      peerDesc: string;
      directReport: string;
      directReportDesc: string;
      client: string;
      clientDesc: string;
    };
    trustConfidential: string;
    trustTime: string;
    sendInvitation: string;
  };
  // References list screen
  referencesList: {
    title: string;
    subtitle: string;
    statsCompleted: string;
    statsPending: string;
    statsTypes: string;
  };
  // Completion screen
  completion: {
    title: string;
    subtitle: string;
    referenceFor: string;
    benefitConfidential: string;
    benefitGdpr: string;
    benefitNotified: string;
    ctaText: string;
    ctaButton: string;
    footerText: string;
  };
}

const translations: Record<Locale, MockupTranslations> = {
  fr: {
    common: {
      appName: 'Open HR',
      invite: 'Inviter',
      back: 'Retour',
      next: 'Suivant',
      previous: 'Précédent',
      submit: 'Envoyer',
      verified: 'Vérifié',
      pending: 'En attente',
      completed: 'Complétée',
      viewed: 'Consultation',
    },
    questionnaire: {
      contextLabel: 'Vous donnez votre avis sur :',
      candidateName: 'Marie Dupont',
      candidateRole: 'Développeuse',
      asRole: 'En tant que superviseur',
      questionOf: 'Question {current} sur {total}',
      minutesLeft: '~{min} min restantes',
      stemText: 'À quelle fréquence avez-vous observé Marie :',
      baoText: '« Terminer le travail assigné dans les délais sans avoir besoin de rappels »',
      scale: {
        never: 'Jamais',
        rarely: 'Rarement',
        sometimes: 'Parfois',
        often: 'Souvent',
        almostAlways: 'Presque toujours',
        notObserved: 'Je n\'ai pas observé ce comportement',
      },
    },
    dashboard: {
      greeting: 'Bonjour,',
      userName: 'Jean',
      subtitle: 'Votre RefScore prend forme. Continuez !',
      yourRefScore: 'Votre RefScore',
      references: 'références',
      level: 'Niveau global',
      levelHigh: 'Élevé',
      levelModerate: 'Modéré',
      basedOn: 'Basé sur {count} références professionnelles vérifiées de {types} types différents.',
      types: 'types',
      inviteNew: 'Inviter une nouvelle référence',
      identityVerification: 'Vérification d\'identité',
      email: 'E-mail',
      phone: 'Téléphone',
      idDocument: 'Pièce d\'identité',
      notVerified: 'Non vérifiée',
      recentActivity: 'Activité récente',
      completedReference: '{name} a complété sa référence',
      openedInvitation: '{name} a ouvert votre invitation',
      invitationSent: 'Invitation envoyée à {name}',
      hoursAgo: 'Il y a {hours}h',
      daysAgo: 'Il y a {days}j',
      radar: {
        reliability: 'Fiabilité',
        collaboration: 'Collaboration',
        initiative: 'Initiative',
        adaptability: 'Adaptabilité',
        communication: 'Communication',
        problemSolving: 'Résolution',
      },
    },
    invite: {
      title: 'Inviter une référence',
      subtitle: 'Envoyez une invitation à un ancien collègue ou manager',
      nameLabel: 'Prénom et nom',
      namePlaceholder: 'Ex: Sophie Martin',
      emailLabel: 'Adresse e-mail',
      emailPlaceholder: 'Ex: sophie.martin@email.com',
      typeLabel: 'Type de référence',
      types: {
        supervisor: 'Superviseur',
        supervisorDesc: 'Manager direct',
        peer: 'Collègue',
        peerDesc: 'Même niveau',
        directReport: 'Subordonné',
        directReportDesc: 'Rapport direct',
        client: 'Client',
        clientDesc: 'Client ou partenaire',
      },
      trustConfidential: 'Les réponses sont confidentielles et anonymisées après 5 références',
      trustTime: 'Le questionnaire prend environ 5-7 minutes',
      sendInvitation: 'Envoyer l\'invitation',
    },
    referencesList: {
      title: 'Mes références',
      subtitle: 'Suivez le statut de vos demandes de référence',
      statsCompleted: 'Complétées',
      statsPending: 'En attente',
      statsTypes: 'Types',
    },
    completion: {
      title: 'Merci beaucoup !',
      subtitle: 'Votre feedback a été enregistré. Vous aidez Marie à construire un profil professionnel vérifié.',
      referenceFor: 'Référence pour',
      benefitConfidential: 'Vos réponses restent confidentielles et anonymisées',
      benefitGdpr: 'Open HR respecte le RGPD et protège vos données',
      benefitNotified: 'Marie sera notifiée que vous avez répondu',
      ctaText: 'Vous aussi, créez votre profil RefScore gratuit',
      ctaButton: 'Créer mon compte',
      footerText: 'Vous pouvez fermer cette page en toute sécurité.',
    },
  },

  'en-GB': {
    common: {
      appName: 'Open HR',
      invite: 'Invite',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      submit: 'Submit',
      verified: 'Verified',
      pending: 'Pending',
      completed: 'Completed',
      viewed: 'Viewed',
    },
    questionnaire: {
      contextLabel: 'You are providing feedback for:',
      candidateName: 'Marie Dupont',
      candidateRole: 'Developer',
      asRole: 'As their supervisor',
      questionOf: 'Question {current} of {total}',
      minutesLeft: '~{min} min left',
      stemText: 'How often did you observe Marie:',
      baoText: '"Complete assigned work on time without needing reminders"',
      scale: {
        never: 'Never',
        rarely: 'Rarely',
        sometimes: 'Sometimes',
        often: 'Often',
        almostAlways: 'Almost Always',
        notObserved: 'I did not observe this behaviour',
      },
    },
    dashboard: {
      greeting: 'Hello,',
      userName: 'Jean',
      subtitle: 'Your RefScore is taking shape. Keep going!',
      yourRefScore: 'Your RefScore',
      references: 'references',
      level: 'Overall level',
      levelHigh: 'High',
      levelModerate: 'Moderate',
      basedOn: 'Based on {count} verified professional references from {types} different types.',
      types: 'types',
      inviteNew: 'Invite a new reference',
      identityVerification: 'Identity verification',
      email: 'Email',
      phone: 'Phone',
      idDocument: 'ID Document',
      notVerified: 'Not verified',
      recentActivity: 'Recent activity',
      completedReference: '{name} completed their reference',
      openedInvitation: '{name} opened your invitation',
      invitationSent: 'Invitation sent to {name}',
      hoursAgo: '{hours}h ago',
      daysAgo: '{days}d ago',
      radar: {
        reliability: 'Reliability',
        collaboration: 'Collaboration',
        initiative: 'Initiative',
        adaptability: 'Adaptability',
        communication: 'Communication',
        problemSolving: 'Problem Solving',
      },
    },
    invite: {
      title: 'Invite a reference',
      subtitle: 'Send an invitation to a former colleague or manager',
      nameLabel: 'Full name',
      namePlaceholder: 'e.g., Sophie Martin',
      emailLabel: 'Email address',
      emailPlaceholder: 'e.g., sophie.martin@email.com',
      typeLabel: 'Reference type',
      types: {
        supervisor: 'Supervisor',
        supervisorDesc: 'Direct manager',
        peer: 'Peer',
        peerDesc: 'Same level',
        directReport: 'Direct Report',
        directReportDesc: 'Reports to you',
        client: 'Client',
        clientDesc: 'Client or partner',
      },
      trustConfidential: 'Responses are confidential and anonymised after 5 references',
      trustTime: 'The questionnaire takes about 5-7 minutes',
      sendInvitation: 'Send invitation',
    },
    referencesList: {
      title: 'My references',
      subtitle: 'Track the status of your reference requests',
      statsCompleted: 'Completed',
      statsPending: 'Pending',
      statsTypes: 'Types',
    },
    completion: {
      title: 'Thank you!',
      subtitle: 'Your feedback has been recorded. You are helping Marie build a verified professional profile.',
      referenceFor: 'Reference for',
      benefitConfidential: 'Your responses remain confidential and anonymised',
      benefitGdpr: 'Open HR complies with GDPR and protects your data',
      benefitNotified: 'Marie will be notified that you responded',
      ctaText: 'Create your own free RefScore profile',
      ctaButton: 'Create my account',
      footerText: 'You can safely close this page.',
    },
  },

  'en-US': {
    common: {
      appName: 'Open HR',
      invite: 'Invite',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      submit: 'Submit',
      verified: 'Verified',
      pending: 'Pending',
      completed: 'Completed',
      viewed: 'Viewed',
    },
    questionnaire: {
      contextLabel: 'You are providing feedback for:',
      candidateName: 'Marie Dupont',
      candidateRole: 'Developer',
      asRole: 'As their supervisor',
      questionOf: 'Question {current} of {total}',
      minutesLeft: '~{min} min left',
      stemText: 'How often did you observe Marie:',
      baoText: '"Complete assigned work on time without needing reminders"',
      scale: {
        never: 'Never',
        rarely: 'Rarely',
        sometimes: 'Sometimes',
        often: 'Often',
        almostAlways: 'Almost Always',
        notObserved: 'I did not observe this behavior',
      },
    },
    dashboard: {
      greeting: 'Hello,',
      userName: 'Jean',
      subtitle: 'Your RefScore is taking shape. Keep going!',
      yourRefScore: 'Your RefScore',
      references: 'references',
      level: 'Overall level',
      levelHigh: 'High',
      levelModerate: 'Moderate',
      basedOn: 'Based on {count} verified professional references from {types} different types.',
      types: 'types',
      inviteNew: 'Invite a new reference',
      identityVerification: 'Identity verification',
      email: 'Email',
      phone: 'Phone',
      idDocument: 'ID Document',
      notVerified: 'Not verified',
      recentActivity: 'Recent activity',
      completedReference: '{name} completed their reference',
      openedInvitation: '{name} opened your invitation',
      invitationSent: 'Invitation sent to {name}',
      hoursAgo: '{hours}h ago',
      daysAgo: '{days}d ago',
      radar: {
        reliability: 'Reliability',
        collaboration: 'Collaboration',
        initiative: 'Initiative',
        adaptability: 'Adaptability',
        communication: 'Communication',
        problemSolving: 'Problem Solving',
      },
    },
    invite: {
      title: 'Invite a reference',
      subtitle: 'Send an invitation to a former colleague or manager',
      nameLabel: 'Full name',
      namePlaceholder: 'e.g., Sophie Martin',
      emailLabel: 'Email address',
      emailPlaceholder: 'e.g., sophie.martin@email.com',
      typeLabel: 'Reference type',
      types: {
        supervisor: 'Supervisor',
        supervisorDesc: 'Direct manager',
        peer: 'Peer',
        peerDesc: 'Same level',
        directReport: 'Direct Report',
        directReportDesc: 'Reports to you',
        client: 'Client',
        clientDesc: 'Client or partner',
      },
      trustConfidential: 'Responses are confidential and anonymized after 5 references',
      trustTime: 'The questionnaire takes about 5-7 minutes',
      sendInvitation: 'Send invitation',
    },
    referencesList: {
      title: 'My references',
      subtitle: 'Track the status of your reference requests',
      statsCompleted: 'Completed',
      statsPending: 'Pending',
      statsTypes: 'Types',
    },
    completion: {
      title: 'Thank you!',
      subtitle: 'Your feedback has been recorded. You are helping Marie build a verified professional profile.',
      referenceFor: 'Reference for',
      benefitConfidential: 'Your responses remain confidential and anonymized',
      benefitGdpr: 'Open HR complies with GDPR and protects your data',
      benefitNotified: 'Marie will be notified that you responded',
      ctaText: 'Create your own free RefScore profile',
      ctaButton: 'Create my account',
      footerText: 'You can safely close this page.',
    },
  },

  de: {
    common: {
      appName: 'Open HR',
      invite: 'Einladen',
      back: 'Zurück',
      next: 'Weiter',
      previous: 'Zurück',
      submit: 'Absenden',
      verified: 'Verifiziert',
      pending: 'Ausstehend',
      completed: 'Abgeschlossen',
      viewed: 'Angesehen',
    },
    questionnaire: {
      contextLabel: 'Sie geben Feedback für:',
      candidateName: 'Marie Dupont',
      candidateRole: 'Entwicklerin',
      asRole: 'Als Vorgesetzte/r',
      questionOf: 'Frage {current} von {total}',
      minutesLeft: '~{min} Min. verbleibend',
      stemText: 'Wie oft haben Sie beobachtet, dass Marie:',
      baoText: '„Zugewiesene Arbeit pünktlich erledigt, ohne Erinnerungen zu benötigen"',
      scale: {
        never: 'Nie',
        rarely: 'Selten',
        sometimes: 'Manchmal',
        often: 'Oft',
        almostAlways: 'Fast immer',
        notObserved: 'Dieses Verhalten habe ich nicht beobachtet',
      },
    },
    dashboard: {
      greeting: 'Hallo,',
      userName: 'Jean',
      subtitle: 'Ihr RefScore nimmt Gestalt an. Weiter so!',
      yourRefScore: 'Ihr RefScore',
      references: 'Referenzen',
      level: 'Gesamtniveau',
      levelHigh: 'Hoch',
      levelModerate: 'Mittel',
      basedOn: 'Basierend auf {count} verifizierten beruflichen Referenzen aus {types} verschiedenen Typen.',
      types: 'Typen',
      inviteNew: 'Neue Referenz einladen',
      identityVerification: 'Identitätsprüfung',
      email: 'E-Mail',
      phone: 'Telefon',
      idDocument: 'Ausweisdokument',
      notVerified: 'Nicht verifiziert',
      recentActivity: 'Letzte Aktivität',
      completedReference: '{name} hat die Referenz abgeschlossen',
      openedInvitation: '{name} hat Ihre Einladung geöffnet',
      invitationSent: 'Einladung an {name} gesendet',
      hoursAgo: 'Vor {hours} Std.',
      daysAgo: 'Vor {days} Tagen',
      radar: {
        reliability: 'Zuverlässigkeit',
        collaboration: 'Zusammenarbeit',
        initiative: 'Initiative',
        adaptability: 'Anpassungsfähigkeit',
        communication: 'Kommunikation',
        problemSolving: 'Problemlösung',
      },
    },
    invite: {
      title: 'Referenz einladen',
      subtitle: 'Senden Sie eine Einladung an einen ehemaligen Kollegen oder Vorgesetzten',
      nameLabel: 'Vollständiger Name',
      namePlaceholder: 'z.B. Sophie Martin',
      emailLabel: 'E-Mail-Adresse',
      emailPlaceholder: 'z.B. sophie.martin@email.com',
      typeLabel: 'Referenztyp',
      types: {
        supervisor: 'Vorgesetzte/r',
        supervisorDesc: 'Direkter Manager',
        peer: 'Kollege/in',
        peerDesc: 'Gleiche Ebene',
        directReport: 'Direkter Mitarbeiter',
        directReportDesc: 'Berichtet an Sie',
        client: 'Kunde/Kundin',
        clientDesc: 'Kunde oder Partner',
      },
      trustConfidential: 'Antworten sind vertraulich und werden nach 5 Referenzen anonymisiert',
      trustTime: 'Der Fragebogen dauert etwa 5-7 Minuten',
      sendInvitation: 'Einladung senden',
    },
    referencesList: {
      title: 'Meine Referenzen',
      subtitle: 'Verfolgen Sie den Status Ihrer Referenzanfragen',
      statsCompleted: 'Abgeschlossen',
      statsPending: 'Ausstehend',
      statsTypes: 'Typen',
    },
    completion: {
      title: 'Vielen Dank!',
      subtitle: 'Ihr Feedback wurde aufgezeichnet. Sie helfen Marie, ein verifiziertes berufliches Profil aufzubauen.',
      referenceFor: 'Referenz für',
      benefitConfidential: 'Ihre Antworten bleiben vertraulich und anonymisiert',
      benefitGdpr: 'Open HR entspricht der DSGVO und schützt Ihre Daten',
      benefitNotified: 'Marie wird benachrichtigt, dass Sie geantwortet haben',
      ctaText: 'Erstellen Sie auch Ihr kostenloses RefScore-Profil',
      ctaButton: 'Konto erstellen',
      footerText: 'Sie können diese Seite sicher schließen.',
    },
  },

  es: {
    common: {
      appName: 'Open HR',
      invite: 'Invitar',
      back: 'Volver',
      next: 'Siguiente',
      previous: 'Anterior',
      submit: 'Enviar',
      verified: 'Verificado',
      pending: 'Pendiente',
      completed: 'Completada',
      viewed: 'Visto',
    },
    questionnaire: {
      contextLabel: 'Estás dando tu opinión sobre:',
      candidateName: 'Marie Dupont',
      candidateRole: 'Desarrolladora',
      asRole: 'Como supervisor/a',
      questionOf: 'Pregunta {current} de {total}',
      minutesLeft: '~{min} min restantes',
      stemText: '¿Con qué frecuencia observaste que Marie:',
      baoText: '«Completa el trabajo asignado a tiempo sin necesitar recordatorios»',
      scale: {
        never: 'Nunca',
        rarely: 'Raramente',
        sometimes: 'A veces',
        often: 'A menudo',
        almostAlways: 'Casi siempre',
        notObserved: 'No observé este comportamiento',
      },
    },
    dashboard: {
      greeting: 'Hola,',
      userName: 'Jean',
      subtitle: 'Tu RefScore está tomando forma. ¡Continúa!',
      yourRefScore: 'Tu RefScore',
      references: 'referencias',
      level: 'Nivel general',
      levelHigh: 'Alto',
      levelModerate: 'Moderado',
      basedOn: 'Basado en {count} referencias profesionales verificadas de {types} tipos diferentes.',
      types: 'tipos',
      inviteNew: 'Invitar nueva referencia',
      identityVerification: 'Verificación de identidad',
      email: 'Correo electrónico',
      phone: 'Teléfono',
      idDocument: 'Documento de identidad',
      notVerified: 'No verificado',
      recentActivity: 'Actividad reciente',
      completedReference: '{name} completó su referencia',
      openedInvitation: '{name} abrió tu invitación',
      invitationSent: 'Invitación enviada a {name}',
      hoursAgo: 'Hace {hours}h',
      daysAgo: 'Hace {days}d',
      radar: {
        reliability: 'Fiabilidad',
        collaboration: 'Colaboración',
        initiative: 'Iniciativa',
        adaptability: 'Adaptabilidad',
        communication: 'Comunicación',
        problemSolving: 'Resolución',
      },
    },
    invite: {
      title: 'Invitar una referencia',
      subtitle: 'Envía una invitación a un antiguo colega o manager',
      nameLabel: 'Nombre completo',
      namePlaceholder: 'Ej: Sophie Martin',
      emailLabel: 'Dirección de correo',
      emailPlaceholder: 'Ej: sophie.martin@email.com',
      typeLabel: 'Tipo de referencia',
      types: {
        supervisor: 'Supervisor/a',
        supervisorDesc: 'Manager directo',
        peer: 'Colega',
        peerDesc: 'Mismo nivel',
        directReport: 'Subordinado/a',
        directReportDesc: 'Reporta a ti',
        client: 'Cliente',
        clientDesc: 'Cliente o socio',
      },
      trustConfidential: 'Las respuestas son confidenciales y se anonimizan después de 5 referencias',
      trustTime: 'El cuestionario toma aproximadamente 5-7 minutos',
      sendInvitation: 'Enviar invitación',
    },
    referencesList: {
      title: 'Mis referencias',
      subtitle: 'Sigue el estado de tus solicitudes de referencia',
      statsCompleted: 'Completadas',
      statsPending: 'Pendientes',
      statsTypes: 'Tipos',
    },
    completion: {
      title: '¡Muchas gracias!',
      subtitle: 'Tu feedback ha sido registrado. Estás ayudando a Marie a construir un perfil profesional verificado.',
      referenceFor: 'Referencia para',
      benefitConfidential: 'Tus respuestas permanecen confidenciales y anonimizadas',
      benefitGdpr: 'Open HR cumple con el RGPD y protege tus datos',
      benefitNotified: 'Marie será notificada de que respondiste',
      ctaText: 'Tú también, crea tu perfil RefScore gratuito',
      ctaButton: 'Crear mi cuenta',
      footerText: 'Puedes cerrar esta página de forma segura.',
    },
  },

  it: {
    common: {
      appName: 'Open HR',
      invite: 'Invita',
      back: 'Indietro',
      next: 'Avanti',
      previous: 'Precedente',
      submit: 'Invia',
      verified: 'Verificato',
      pending: 'In attesa',
      completed: 'Completata',
      viewed: 'Visualizzato',
    },
    questionnaire: {
      contextLabel: 'Stai fornendo feedback per:',
      candidateName: 'Marie Dupont',
      candidateRole: 'Sviluppatrice',
      asRole: 'Come supervisore',
      questionOf: 'Domanda {current} di {total}',
      minutesLeft: '~{min} min rimanenti',
      stemText: 'Con quale frequenza hai osservato che Marie:',
      baoText: '«Completa il lavoro assegnato in tempo senza bisogno di promemoria»',
      scale: {
        never: 'Mai',
        rarely: 'Raramente',
        sometimes: 'A volte',
        often: 'Spesso',
        almostAlways: 'Quasi sempre',
        notObserved: 'Non ho osservato questo comportamento',
      },
    },
    dashboard: {
      greeting: 'Ciao,',
      userName: 'Jean',
      subtitle: 'Il tuo RefScore sta prendendo forma. Continua così!',
      yourRefScore: 'Il tuo RefScore',
      references: 'referenze',
      level: 'Livello complessivo',
      levelHigh: 'Alto',
      levelModerate: 'Moderato',
      basedOn: 'Basato su {count} referenze professionali verificate di {types} tipi diversi.',
      types: 'tipi',
      inviteNew: 'Invita una nuova referenza',
      identityVerification: 'Verifica identità',
      email: 'E-mail',
      phone: 'Telefono',
      idDocument: 'Documento d\'identità',
      notVerified: 'Non verificato',
      recentActivity: 'Attività recente',
      completedReference: '{name} ha completato la referenza',
      openedInvitation: '{name} ha aperto il tuo invito',
      invitationSent: 'Invito inviato a {name}',
      hoursAgo: '{hours}h fa',
      daysAgo: '{days}g fa',
      radar: {
        reliability: 'Affidabilità',
        collaboration: 'Collaborazione',
        initiative: 'Iniziativa',
        adaptability: 'Adattabilità',
        communication: 'Comunicazione',
        problemSolving: 'Problem Solving',
      },
    },
    invite: {
      title: 'Invita una referenza',
      subtitle: 'Invia un invito a un ex collega o manager',
      nameLabel: 'Nome completo',
      namePlaceholder: 'Es: Sophie Martin',
      emailLabel: 'Indirizzo e-mail',
      emailPlaceholder: 'Es: sophie.martin@email.com',
      typeLabel: 'Tipo di referenza',
      types: {
        supervisor: 'Supervisore',
        supervisorDesc: 'Manager diretto',
        peer: 'Collega',
        peerDesc: 'Stesso livello',
        directReport: 'Subordinato',
        directReportDesc: 'Riporta a te',
        client: 'Cliente',
        clientDesc: 'Cliente o partner',
      },
      trustConfidential: 'Le risposte sono confidenziali e anonimizzate dopo 5 referenze',
      trustTime: 'Il questionario richiede circa 5-7 minuti',
      sendInvitation: 'Invia invito',
    },
    referencesList: {
      title: 'Le mie referenze',
      subtitle: 'Segui lo stato delle tue richieste di referenza',
      statsCompleted: 'Completate',
      statsPending: 'In attesa',
      statsTypes: 'Tipi',
    },
    completion: {
      title: 'Grazie mille!',
      subtitle: 'Il tuo feedback è stato registrato. Stai aiutando Marie a costruire un profilo professionale verificato.',
      referenceFor: 'Referenza per',
      benefitConfidential: 'Le tue risposte rimangono confidenziali e anonimizzate',
      benefitGdpr: 'Open HR rispetta il GDPR e protegge i tuoi dati',
      benefitNotified: 'Marie sarà avvisata che hai risposto',
      ctaText: 'Crea anche tu il tuo profilo RefScore gratuito',
      ctaButton: 'Crea il mio account',
      footerText: 'Puoi chiudere questa pagina in sicurezza.',
    },
  },
};

export function getMockupTranslations(locale: Locale): MockupTranslations {
  return translations[locale] || translations.fr;
}

export default translations;
