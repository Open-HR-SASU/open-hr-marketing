import {defineType, defineField, defineArrayMember} from 'sanity'

/**
 * Legal Document Schema
 *
 * Designed by Dr. Claude (CDO) for progressive disclosure UX:
 * - Collapsible sections with clear visual hierarchy
 * - Auto-generated table of contents
 * - Quick summary for Bilal GTM "16-year-old test"
 * - Proper legal metadata (version, dates, status)
 *
 * Section types support varied content density:
 * - text: Rich text blocks
 * - table: Data tables (hosting, cookies, etc.)
 * - list: Bullet/numbered lists
 * - contact: Contact information cards
 * - rights: User rights with icons
 *
 * @see OPE-398 through OPE-403 (Legal page audit issues)
 */

const LOCALES = [
  {title: 'French', value: 'fr'},
  {title: 'English (UK)', value: 'en-GB'},
  {title: 'English (US)', value: 'en-US'},
  {title: 'German', value: 'de'},
  {title: 'Spanish', value: 'es'},
  {title: 'Italian', value: 'it'},
]

const DOCUMENT_STATUS = [
  {title: 'Draft', value: 'draft'},
  {title: 'In Review', value: 'review'},
  {title: 'Active', value: 'active'},
  {title: 'Archived', value: 'archived'},
]

const LEGAL_DOCUMENT_TYPES = [
  {title: 'Legal Notice (Mentions Légales)', value: 'legal-notice'},
  {title: 'Privacy Policy', value: 'privacy'},
  {title: 'Cookie Policy', value: 'cookies'},
  {title: 'Terms of Service', value: 'terms'},
  {title: 'Terms of Use', value: 'terms-of-use'},
  {title: 'Acceptable Use Policy', value: 'acceptable-use'},
]

const SECTION_DISPLAY_TYPES = [
  {title: 'Text (Rich Content)', value: 'text'},
  {title: 'Table (Data Grid)', value: 'table'},
  {title: 'Contact Card', value: 'contact'},
  {title: 'Rights List (with icons)', value: 'rights'},
  {title: 'Subsections (Nested)', value: 'subsections'},
]

export default defineType({
  name: 'legalDocument',
  title: 'Legal Document',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'metadata', title: 'Metadata & SEO'},
    {name: 'settings', title: 'Display Settings'},
  ],
  fields: [
    // === METADATA GROUP ===
    defineField({
      name: 'title',
      title: 'Document Title',
      type: 'string',
      description: 'The full title of the legal document',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL path (e.g., "privacy" for /legal/privacy)',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'documentType',
      title: 'Document Type',
      type: 'string',
      options: {
        list: LEGAL_DOCUMENT_TYPES,
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: LOCALES,
      },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),

    // === VERSION & STATUS (Legal Compliance) ===
    defineField({
      name: 'version',
      title: 'Version',
      type: 'string',
      description: 'Semantic version (e.g., 1.0, 1.1, 2.0)',
      initialValue: '1.0',
      validation: (Rule) => Rule.required(),
      group: 'metadata',
    }),
    defineField({
      name: 'status',
      title: 'Document Status',
      type: 'string',
      options: {
        list: DOCUMENT_STATUS,
        layout: 'radio',
      },
      initialValue: 'active',
      validation: (Rule) => Rule.required(),
      group: 'metadata',
    }),
    defineField({
      name: 'effectiveDate',
      title: 'Effective Date',
      type: 'date',
      description: 'Date when this version becomes effective',
      validation: (Rule) => Rule.required(),
      group: 'metadata',
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'date',
      description: 'Date of last content update',
      validation: (Rule) => Rule.required(),
      group: 'metadata',
    }),

    // === QUICK SUMMARY (Bilal GTM: 16-year-old test) ===
    defineField({
      name: 'quickSummary',
      title: 'Quick Summary',
      type: 'object',
      description: 'Plain-language summary for progressive disclosure (shown first, expandable)',
      group: 'content',
      fields: [
        defineField({
          name: 'heading',
          title: 'Summary Heading',
          type: 'string',
          description: 'e.g., "En bref" or "TL;DR"',
          initialValue: 'En bref',
        }),
        defineField({
          name: 'points',
          title: 'Key Points',
          type: 'array',
          description: '3-5 bullet points a 16-year-old can understand',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                {name: 'icon', type: 'string', title: 'Icon', description: 'Emoji or icon name (e.g., 🔒)'},
                {name: 'text', type: 'string', title: 'Point Text'},
              ],
              preview: {
                select: {
                  icon: 'icon',
                  text: 'text',
                },
                prepare({icon, text}) {
                  return {
                    title: `${icon || '•'} ${text}`,
                  }
                },
              },
            }),
          ],
          validation: (Rule) => Rule.min(3).max(6),
        }),
      ],
    }),

    // === SECTIONS (Progressive Disclosure) ===
    defineField({
      name: 'sections',
      title: 'Document Sections',
      type: 'array',
      description: 'Legal document sections (displayed as accordion on frontend)',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'legalSection',
          title: 'Section',
          fields: [
            defineField({
              name: 'sectionNumber',
              title: 'Section Number',
              type: 'string',
              description: 'e.g., "1", "2.1", "3.4.2"',
            }),
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'anchor',
              title: 'Anchor ID',
              type: 'slug',
              description: 'For TOC navigation (auto-generated from title)',
              options: {
                source: 'title',
                maxLength: 50,
              },
            }),
            defineField({
              name: 'displayType',
              title: 'Display Type',
              type: 'string',
              options: {
                list: SECTION_DISPLAY_TYPES,
              },
              initialValue: 'text',
            }),
            defineField({
              name: 'defaultExpanded',
              title: 'Expanded by Default',
              type: 'boolean',
              description: 'If true, section is open on page load',
              initialValue: false,
            }),

            // === TEXT CONTENT ===
            defineField({
              name: 'content',
              title: 'Content',
              type: 'array',
              of: [
                {type: 'block'},
                {
                  type: 'object',
                  name: 'inlineTable',
                  title: 'Inline Table',
                  fields: [
                    {name: 'caption', type: 'string', title: 'Table Caption'},
                    {
                      name: 'headers',
                      type: 'array',
                      title: 'Column Headers',
                      of: [{type: 'string'}],
                    },
                    {
                      name: 'rows',
                      type: 'array',
                      title: 'Rows',
                      of: [
                        {
                          type: 'object',
                          fields: [
                            {
                              name: 'cells',
                              type: 'array',
                              title: 'Cells',
                              of: [{type: 'string'}],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  preview: {
                    select: {caption: 'caption'},
                    prepare({caption}) {
                      return {title: `📊 ${caption || 'Table'}`}
                    },
                  },
                },
              ],
              hidden: ({parent}) => parent?.displayType === 'contact' || parent?.displayType === 'rights',
            }),

            // === CONTACT CARD ===
            defineField({
              name: 'contactInfo',
              title: 'Contact Information',
              type: 'object',
              fields: [
                {name: 'companyName', type: 'string', title: 'Company Name'},
                {name: 'legalForm', type: 'string', title: 'Legal Form'},
                {name: 'capital', type: 'string', title: 'Share Capital'},
                {name: 'address', type: 'text', title: 'Address', rows: 3},
                {name: 'rcs', type: 'string', title: 'RCS Number'},
                {name: 'euid', type: 'string', title: 'EUID'},
                {name: 'vat', type: 'string', title: 'VAT Number'},
                {name: 'email', type: 'string', title: 'Email'},
                {name: 'phone', type: 'string', title: 'Phone'},
                {name: 'website', type: 'url', title: 'Website'},
              ],
              hidden: ({parent}) => parent?.displayType !== 'contact',
            }),

            // === RIGHTS LIST ===
            defineField({
              name: 'rights',
              title: 'Rights List',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    {name: 'icon', type: 'string', title: 'Icon', description: 'Emoji or icon name'},
                    {name: 'name', type: 'string', title: 'Right Name'},
                    {name: 'description', type: 'text', title: 'Description', rows: 2},
                  ],
                  preview: {
                    select: {icon: 'icon', name: 'name'},
                    prepare({icon, name}) {
                      return {title: `${icon || '⚖️'} ${name}`}
                    },
                  },
                }),
              ],
              hidden: ({parent}) => parent?.displayType !== 'rights',
            }),

            // === SUBSECTIONS ===
            defineField({
              name: 'subsections',
              title: 'Subsections',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    {name: 'subNumber', type: 'string', title: 'Subsection Number'},
                    {name: 'subTitle', type: 'string', title: 'Subsection Title'},
                    {
                      name: 'subContent',
                      type: 'array',
                      title: 'Content',
                      of: [{type: 'block'}],
                    },
                  ],
                  preview: {
                    select: {num: 'subNumber', title: 'subTitle'},
                    prepare({num, title}) {
                      return {title: `${num || ''} ${title || 'Subsection'}`}
                    },
                  },
                }),
              ],
              hidden: ({parent}) => parent?.displayType !== 'subsections',
            }),
          ],
          preview: {
            select: {
              number: 'sectionNumber',
              title: 'title',
              displayType: 'displayType',
            },
            prepare({number, title, displayType}) {
              const typeIcons: Record<string, string> = {
                text: '📝',
                table: '📊',
                contact: '📇',
                rights: '⚖️',
                subsections: '📂',
              }
              return {
                title: `${number ? `${number}. ` : ''}${title}`,
                subtitle: typeIcons[displayType] || '📝',
              }
            },
          },
        }),
      ],
    }),

    // === FOOTER NOTE ===
    defineField({
      name: 'footerNote',
      title: 'Footer Note',
      type: 'text',
      description: 'Legal citation or compliance note (e.g., LCEN reference)',
      rows: 2,
      group: 'content',
    }),

    // === SEO ===
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'metadata',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Override the document title for SEO',
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.max(160),
        }),
        defineField({
          name: 'noIndex',
          title: 'No Index',
          type: 'boolean',
          description: 'Prevent search engines from indexing this page',
          initialValue: false,
        }),
      ],
    }),

    // === DISPLAY SETTINGS ===
    defineField({
      name: 'showToc',
      title: 'Show Table of Contents',
      type: 'boolean',
      description: 'Display sticky TOC on desktop',
      initialValue: true,
      group: 'settings',
    }),
    defineField({
      name: 'showVersionBadge',
      title: 'Show Version Badge',
      type: 'boolean',
      description: 'Display version and date badges at top',
      initialValue: true,
      group: 'settings',
    }),
    defineField({
      name: 'expandFirstSection',
      title: 'Expand First Section',
      type: 'boolean',
      description: 'Automatically expand the first section on load',
      initialValue: true,
      group: 'settings',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
      documentType: 'documentType',
      status: 'status',
      version: 'version',
    },
    prepare({title, language, documentType, status, version}) {
      const statusEmoji: Record<string, string> = {
        draft: '📝',
        review: '👀',
        active: '✅',
        archived: '📦',
      }
      return {
        title: title,
        subtitle: `${statusEmoji[status] || ''} v${version} · ${documentType} · ${language}`,
      }
    },
  },
  orderings: [
    {
      title: 'Document Type',
      name: 'documentTypeAsc',
      by: [{field: 'documentType', direction: 'asc'}],
    },
    {
      title: 'Language',
      name: 'languageAsc',
      by: [{field: 'language', direction: 'asc'}],
    },
    {
      title: 'Last Updated',
      name: 'lastUpdatedDesc',
      by: [{field: 'lastUpdated', direction: 'desc'}],
    },
  ],
})
