# Sanity CMS Content Changes - OPE-440 & OPE-443

**Date:** 2026-01-26
**Author:** Dr. Sarah Sapiens (I-O Psychologist)
**Project ID:** `tbkdha33`
**Dataset:** `production`
**Workspace:** `open-hr-marketing`

---

## EXECUTION STATUS: COMPLETE

Both OPE-440 and OPE-443 have been successfully implemented via Sanity MCP tools. All 18 document patches have been applied and published.

---

## OPE-440: Remove "No Bias" Claim (CRITICAL - Scientifically Indefensible)

### Status: COMPLETE - Published

### Scientific Rationale

The claim "No fake testimonials, no bias" is **scientifically indefensible** for the following reasons:

1. **All measurement contains bias** - Even the most rigorously designed psychometric instruments cannot eliminate all sources of bias. Claiming "no bias" misrepresents the capabilities of any assessment system.

2. **Reference ratings have documented biases** - Research consistently shows:
   - Leniency bias (raters inflate ratings)
   - Halo effects (global impressions color specific ratings)
   - Similar-to-me bias (raters favor those like themselves)
   - Recency effects (recent behaviors weighted more heavily)

3. **Structured methods *reduce* but do not *eliminate* bias** - Our structured interview protocols minimize common rating biases but cannot claim zero bias.

4. **Legal liability** - Absolute claims about bias-free assessment could create legal exposure if challenged.

### Replacement Language

The corrected language accurately describes our methodology: structured questions designed to **minimize** (not eliminate) common rating biases. This is scientifically defensible and aligned with I-O Psychology best practices.

### Documents Updated (Workers Page - Features Section, feature key "f2")

| Locale | Section ID | Status |
|--------|------------|--------|
| `fr` | `83d9250d-4e42-4e0f-8d15-71fd3b364a8e` | PUBLISHED |
| `en-GB` | `d0540ed6-531f-4ede-a145-1b759bb2e239` | PUBLISHED |
| `en-US` | `4f981592-79ac-4e6c-9d45-5d329e8502b1` | PUBLISHED |
| `de` | `8c899b7c-4611-4077-98f6-ddfaab05add9` | PUBLISHED |
| `es` | `eff1a15b-fc23-49fd-a648-78bcdfbc69cd` | PUBLISHED |
| `it` | `acca788d-2757-40a6-baec-60d1a2297b87` | PUBLISHED |

### Content Changes Applied

#### French (fr)
- **Before:** "Nous contactons vos anciens collegues via des entretiens structures. Pas de faux temoignages, pas de biais."
- **After:** "Temoignages authentiques de collegues verifies. Notre methodologie structuree reduit les biais de notation courants."

#### English (en-GB, en-US)
- **Before:** "We contact your former colleagues through structured interviews. No fake testimonials, no bias."
- **After:** "Authentic testimonials from verified colleagues. Structured questions designed to minimize common rating biases."

#### German (de)
- **Before:** "Wir kontaktieren Ihre ehemaligen Kollegen uber strukturierte Gesprache. Keine falschen Aussagen, keine Voreingenommenheit."
- **After:** "Authentische Referenzen von verifizierten Kollegen. Strukturierte Fragen zur Minimierung gangiger Bewertungsverzerrungen."

#### Spanish (es)
- **Before:** "Contactamos a tus antiguos colegas mediante entrevistas estructuradas. Sin testimonios falsos, sin sesgos."
- **After:** "Testimonios autenticos de colegas verificados. Preguntas estructuradas disenadas para minimizar los sesgos de calificacion comunes."

#### Italian (it)
- **Before:** "Contattiamo i tuoi ex colleghi attraverso interviste strutturate. Nessuna testimonianza falsa, nessun pregiudizio."
- **After:** "Testimonianze autentiche da colleghi verificati. Domande strutturate progettate per minimizzare i comuni errori di valutazione."

---

## OPE-443: Add Decision-Support Framing

### Status: COMPLETE - Published

### Scientific Rationale

RefScore should be positioned as a **decision-support tool**, not a decision-making tool. This framing:

1. **Acknowledges predictive limits** - No assessment perfectly predicts job performance (typical validity r = 0.26-0.29 for structured references)

2. **Preserves human judgment** - The final hiring decision remains with humans who can integrate multiple data sources

3. **Reduces liability** - Positioning as "decision support" rather than "decision maker" reduces legal exposure

4. **Aligns with I-O best practices** - Professional standards recommend using assessments as one input among many

### Implementation

Added decision-support disclaimer to the `body` field of all CTA sections on both Workers and How It Works pages. This places the disclaimer prominently before the call-to-action.

### Documents Updated (CTA Sections - body field)

#### Workers Page CTA Sections
| Locale | Section ID | Status |
|--------|------------|--------|
| `fr` | `83e2c76d-a3c5-4ffb-a421-d18e971b6a44` | PUBLISHED |
| `en-GB` | `a4224174-7ffd-4eb5-9d6d-850304669cd1` | PUBLISHED |
| `en-US` | `5ecf203e-f985-4c83-a77c-ad8dbf0dd0b2` | PUBLISHED |
| `de` | `20f85478-1f97-4518-97b4-95483e4635c9` | PUBLISHED |
| `es` | `4336aa67-d29b-458a-b21e-8f9c845ce9c7` | PUBLISHED |
| `it` | `a6845847-1d01-4c3d-8fa5-db7a29f6d25a` | PUBLISHED |

#### How It Works Page CTA Sections
| Locale | Section ID | Status |
|--------|------------|--------|
| `fr` | `1a6b3b52-2796-4df4-8ac9-2046b188393d` | PUBLISHED |
| `en-GB` | `3719b007-6170-4746-a125-8f669dbd8d50` | PUBLISHED |
| `en-US` | `8a512632-d516-4a05-8e1d-0f910716b7b1` | PUBLISHED |
| `de` | `f83e01ec-c510-491d-9af5-865381225d16` | PUBLISHED |
| `es` | `626ef3fd-4cdc-45b6-8a9a-87185e5e71de` | PUBLISHED |
| `it` | `7ad4361a-395e-4841-b619-d504ab4e9eb7` | PUBLISHED |

### Content Added

#### English (en-GB, en-US)
> RefScore is a decision-support tool. It provides structured reference data to inform, not replace, human hiring judgment.

#### French (fr)
> Le RefScore est un outil d'aide a la decision. Il fournit des donnees de reference structurees pour eclairer, et non remplacer, le jugement humain en matiere d'embauche.

#### German (de)
> RefScore ist ein Entscheidungsunterstutzungstool. Es liefert strukturierte Referenzdaten zur Unterstutzung, nicht zum Ersatz, menschlicher Einstellungsentscheidungen.

#### Spanish (es)
> RefScore es una herramienta de apoyo a la toma de decisiones. Proporciona datos de referencia estructurados para informar, no reemplazar, el juicio humano en la contratacion.

#### Italian (it)
> RefScore e uno strumento di supporto decisionale. Fornisce dati di riferimento strutturati per informare, non sostituire, il giudizio umano nelle assunzioni.

---

## Post-Implementation Steps

### Required: Rebuild Marketing Site

The marketing site fetches content from Sanity at **build time**. To see changes on the live site:

```bash
# Option 1: Trigger via GitHub Actions (recommended)
# Push to main branch or manually trigger workflow

# Option 2: Manual rebuild
cd /Users/johnathenevans/Open-HR/00-ACTIVE-PROJECTS/marketing
npm run build
```

### Verification Checklist

- [x] FR Workers page - Features section updated (verified via GROQ query)
- [x] FR Workers page - CTA section updated (verified via GROQ query)
- [x] All 6 locale versions of Workers Features sections patched and published
- [x] All 12 CTA sections (Workers + How It Works, 6 locales each) patched and published
- [ ] Marketing site rebuilt to fetch updated content
- [ ] Visual QA on live site for all 6 locales

---

## Summary

| Issue | Documents Updated | Status |
|-------|-------------------|--------|
| OPE-440 (Remove "no bias" claim) | 6 | PUBLISHED |
| OPE-443 (Add decision-support framing) | 12 | PUBLISHED |
| **Total** | **18** | **COMPLETE** |

---

## References

- SIOP Principles for the Validation and Use of Personnel Selection Procedures
- Uniform Guidelines on Employee Selection Procedures (1978)
- Meta-analysis of reference check validity (Schmidt & Hunter, 1998; Taylor et al., 2004)
- APA Standards for Educational and Psychological Testing
