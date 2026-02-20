import { defineType, defineField } from 'sanity'

const LANGUAGES = [
  { title: 'Français', value: 'fr' },
  { title: 'English (UK)', value: 'en-GB' },
  { title: 'English (US)', value: 'en-US' },
  { title: 'Deutsch', value: 'de' },
  { title: 'Italiano', value: 'it' },
  { title: 'Español', value: 'es' },
]

const RESOURCE_TYPES = [
  { title: 'White Paper', value: 'whitepaper' },
  { title: 'Case Study', value: 'case-study' },
  { title: 'Technical Guide', value: 'technical-guide' },
  { title: 'Industry Report', value: 'industry-report' },
  { title: 'Product Sheet', value: 'product-sheet' },
  { title: 'Press Release', value: 'press-release' },
]

export default defineType({
  name: 'downloadableResource',
  title: 'Downloadable Resource',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: { list: LANGUAGES },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'resourceType',
      title: 'Resource Type',
      type: 'string',
      options: { list: RESOURCE_TYPES, layout: 'dropdown' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().max(500),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      description: 'Resource card and OG image. Minimum 1200×800px recommended.',
      type: 'image',
      options: {
        hotspot: true,
        metadata: ['lqip', 'dimensions'],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bunnyUrl',
      title: 'Bunny CDN File URL',
      description: 'Full HTTPS URL to the file on Bunny Edge Storage.',
      type: 'url',
      validation: (rule) => rule.required().uri({ scheme: ['https'] }),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'pageCount',
      title: 'Page Count',
      type: 'number',
    }),
    defineField({
      name: 'fileSizeLabel',
      title: 'File Size',
      description: 'Human-readable label, e.g. "1.2 MB"',
      type: 'string',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
        list: [
          { title: 'RefScore', value: 'refscore' },
          { title: 'ProScore', value: 'proscore' },
          { title: 'People Science', value: 'people-science' },
          { title: 'HR Tech', value: 'hr-tech' },
          { title: 'Employment Reference', value: 'employment-reference' },
          { title: 'Psychometrics', value: 'psychometrics' },
        ],
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      description: 'Pin to the top of the resource library.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'gated',
      title: 'Gated Download',
      description: 'Require email capture before download. Requires Go backend integration (future OPE).',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: (rule) => rule.max(70),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: (rule) => rule.max(160),
        }),
        defineField({
          name: 'ogImage',
          title: 'OG Image',
          description: 'Defaults to cover image if not set.',
          type: 'image',
          options: { hotspot: true },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      resourceType: 'resourceType',
      language: 'language',
      media: 'coverImage',
    },
    prepare({ title, resourceType, language, media }) {
      return {
        title: title || 'Untitled Resource',
        subtitle: `${resourceType?.toUpperCase()} · ${language?.toUpperCase()}`,
        media,
      }
    },
  },
})
