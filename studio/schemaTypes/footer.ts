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
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
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
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short description shown in footer',
    }),
    defineField({
      name: 'columns',
      title: 'Link Columns',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Column Title'},
            {
              name: 'links',
              type: 'array',
              title: 'Links',
              of: [
                {
                  type: 'object',
                  fields: [
                    {name: 'label', type: 'string', title: 'Label'},
                    {name: 'href', type: 'string', title: 'Link'},
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'platform', type: 'string', title: 'Platform'},
            {name: 'url', type: 'url', title: 'URL'},
          ],
        },
      ],
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright Text',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      language: 'language',
    },
    prepare({language}) {
      return {
        title: `Footer (${language})`,
      }
    },
  },
})
