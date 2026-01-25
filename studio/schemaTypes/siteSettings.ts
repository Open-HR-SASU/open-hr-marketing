import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      initialValue: 'Open HR',
    }),
    defineField({
      name: 'defaultLocale',
      title: 'Default Locale',
      type: 'string',
      initialValue: 'fr',
    }),
    defineField({
      name: 'seo',
      title: 'Default SEO',
      type: 'object',
      fields: [
        {name: 'metaTitle', type: 'string', title: 'Default Meta Title'},
        {name: 'metaDescription', type: 'text', title: 'Default Meta Description'},
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        {name: 'twitter', type: 'url', title: 'Twitter/X'},
        {name: 'linkedin', type: 'url', title: 'LinkedIn'},
        {name: 'instagram', type: 'url', title: 'Instagram'},
        {name: 'youtube', type: 'url', title: 'YouTube'},
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      }
    },
  },
})
