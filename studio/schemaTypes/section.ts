import {defineType, defineField} from 'sanity'

const SECTION_TYPES = [
  {title: 'Hero', value: 'hero'},
  {title: 'Hero with Mockup', value: 'heroMockup'},
  {title: 'Features', value: 'features'},
  {title: 'CTA', value: 'cta'},
  {title: 'Content', value: 'content'},
  {title: 'Pricing', value: 'pricing'},
  {title: 'Testimonials', value: 'testimonials'},
  {title: 'FAQ', value: 'faq'},
  {title: 'Stats', value: 'stats'},
  {title: 'Process', value: 'process'},
  {title: 'How It Works', value: 'howItWorks'},
  {title: 'Reference Experience', value: 'referenceExperience'},
  {title: 'App Preview', value: 'appPreview'},
]

const BACKGROUND_STYLES = [
  {title: 'Default (White)', value: 'default'},
  {title: 'Light Gray', value: 'light'},
  {title: 'Dark', value: 'dark'},
  {title: 'Brand (Teal)', value: 'brand'},
  {title: 'Gradient', value: 'gradient'},
]

const LOCALES = [
  {title: 'French', value: 'fr'},
  {title: 'English (UK)', value: 'en-GB'},
  {title: 'English (US)', value: 'en-US'},
  {title: 'German', value: 'de'},
  {title: 'Spanish', value: 'es'},
  {title: 'Italian', value: 'it'},
]

export default defineType({
  name: 'section',
  title: 'Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      description: 'For internal reference only (not displayed on site)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sectionType',
      title: 'Section Type',
      type: 'string',
      options: {
        list: SECTION_TYPES,
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
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      description: 'Small text above the heading',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'ctaText',
      title: 'Primary CTA Text',
      type: 'string',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Primary CTA Link',
      type: 'string',
      description: 'Use /page for internal links (locale will be added automatically)',
    }),
    defineField({
      name: 'ctaText2',
      title: 'Secondary CTA Text',
      type: 'string',
    }),
    defineField({
      name: 'ctaLink2',
      title: 'Secondary CTA Link',
      type: 'string',
    }),
    defineField({
      name: 'backgroundStyle',
      title: 'Background Style',
      type: 'string',
      options: {
        list: BACKGROUND_STYLES,
      },
      initialValue: 'default',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'icon', type: 'string', title: 'Icon'},
            {name: 'heading', type: 'string', title: 'Heading'},
            {name: 'description', type: 'text', title: 'Description'},
            {name: 'link', type: 'string', title: 'Link'},
            {name: 'linkLabel', type: 'string', title: 'Link Label'},
          ],
        },
      ],
      hidden: ({document}) => !['features', 'process', 'howItWorks'].includes(document?.sectionType as string),
    }),
    defineField({
      name: 'anchor',
      title: 'Anchor ID',
      type: 'string',
      description: 'For in-page navigation (e.g., #features)',
    }),
    defineField({
      name: 'hideMobile',
      title: 'Hide on Mobile',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'showPilotSignup',
      title: 'Show Pilot Signup Form',
      type: 'boolean',
      hidden: ({document}) => document?.sectionType !== 'appPreview',
    }),
    defineField({
      name: 'pilotSignupUrl',
      title: 'Pilot Signup URL',
      type: 'string',
      hidden: ({document}) => document?.sectionType !== 'appPreview',
    }),
    // Mockup fields for visual section types
    defineField({
      name: 'mockupImage',
      title: 'Mockup Image',
      type: 'image',
      description: 'Single app screenshot for hero mockup sections',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Describe the image for accessibility',
        },
      ],
      hidden: ({document}) => document?.sectionType !== 'heroMockup',
    }),
    defineField({
      name: 'mockupImages',
      title: 'Mockup Images',
      type: 'array',
      description: 'Multiple app screenshots (up to 3 recommended)',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              description: 'Optional caption below the mockup',
            },
          ],
        },
      ],
      hidden: ({document}) => !['appPreview', 'referenceExperience'].includes(document?.sectionType as string),
    }),
    defineField({
      name: 'flowSteps',
      title: 'Flow Steps',
      type: 'array',
      description: 'Step-by-step flow with mockups (for reference experience)',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'stepNumber', type: 'number', title: 'Step Number'},
            {name: 'title', type: 'string', title: 'Step Title'},
            {name: 'description', type: 'text', title: 'Description', rows: 2},
            {
              name: 'mockupImage',
              type: 'image',
              title: 'Mockup Image',
              options: {hotspot: true},
              fields: [
                {name: 'alt', type: 'string', title: 'Alt Text'},
              ],
            },
          ],
          preview: {
            select: {
              title: 'title',
              stepNumber: 'stepNumber',
              media: 'mockupImage',
            },
            prepare({title, stepNumber, media}) {
              return {
                title: `${stepNumber}. ${title || 'Untitled Step'}`,
                media,
              }
            },
          },
        },
      ],
      hidden: ({document}) => document?.sectionType !== 'referenceExperience',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      sectionType: 'sectionType',
      language: 'language',
    },
    prepare({title, sectionType, language}) {
      return {
        title: title,
        subtitle: `${sectionType} · ${language}`,
      }
    },
  },
})
