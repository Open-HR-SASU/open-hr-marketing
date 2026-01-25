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
  name: 'navigationItem',
  title: 'Navigation Item',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Link',
      type: 'string',
      description: 'Use /page for internal links (locale will be added automatically)',
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
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Display order in navigation',
    }),
    defineField({
      name: 'isButton',
      title: 'Display as Button',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isExternal',
      title: 'External Link',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'label',
      href: 'href',
      language: 'language',
    },
    prepare({title, href, language}) {
      return {
        title: title,
        subtitle: `${language} · ${href}`,
      }
    },
  },
})
