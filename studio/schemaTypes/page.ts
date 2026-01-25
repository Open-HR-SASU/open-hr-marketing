import {defineType, defineField} from 'sanity'

const LOCALES = [
  {title: 'French', value: 'fr'},
  {title: 'English (UK)', value: 'en-GB'},
  {title: 'English (US)', value: 'en-US'},
  {title: 'German', value: 'de'},
  {title: 'Spanish', value: 'es'},
  {title: 'Italian', value: 'it'},
]

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: LOCALES,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'section'}]}],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
      slug: 'slug.current',
    },
    prepare({title, language, slug}) {
      return {
        title: title,
        subtitle: `${language} · /${slug}`,
      }
    },
  },
})
