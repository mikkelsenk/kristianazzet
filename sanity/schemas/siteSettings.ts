// @ts-nocheck
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({
      name: 'heroHeadline',
      title: 'Hero headline',
      type: 'string',
      description: 'Store tekst på forsiden',
      initialValue: 'EXPERIENCE THE HOUSE REVOLUTION',
    }),
    defineField({
      name: 'heroBackground',
      title: 'Hero background image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'featuredVideo',
      title: 'Featured video',
      type: 'object',
      fields: [
        { name: 'title', type: 'string', title: 'Title' },
        { name: 'subtitle', type: 'string', title: 'Subtitle / dato' },
        { name: 'url', type: 'url', title: 'Video URL (YouTube/Vimeo)' },
        { name: 'thumbnail', type: 'image', title: 'Thumbnail', options: { hotspot: true } },
      ],
    }),
    defineField({
      name: 'pressKitUrl',
      title: 'Press kit download URL',
      type: 'url',
    }),
    defineField({
      name: 'bookingAgent',
      title: 'Booking agent',
      type: 'object',
      fields: [
        { name: 'name', type: 'string', title: 'Name' },
        { name: 'company', type: 'string', title: 'Company' },
        { name: 'email', type: 'string', title: 'Email' },
        { name: 'phone', type: 'string', title: 'Phone' },
      ],
    }),
    defineField({
      name: 'locationsIdleBackground',
      title: 'Locations-sektion: standard baggrund',
      type: 'image',
      description: 'Fast billede bag by-navne når musen ikke er over et sted med eget billede.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'locationsSectionLabel',
      title: 'Locations-sektion: label (venstre streg)',
      type: 'string',
      description: 'Kort tekst ved den vertikale linje, fx TOUR (MG) eller PLACES.',
      initialValue: 'TOUR',
    }),
    defineField({
      name: 'rollingLocations',
      title: 'Rolling locations (outlined slider)',
      type: 'array',
      description: 'Byer/lande der ruller i slideren. Hover kan skifte baggrundsbillede.',
      of: [
        defineField({
          name: 'locationItem',
          title: 'Location item',
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Tekst (land eller by)' },
            {
              name: 'image',
              type: 'image',
              title: 'Baggrundsbillede (valgfrit)',
              options: { hotspot: true },
            },
          ],
          preview: {
            select: { title: 'label', media: 'image' },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site settings' };
    },
  },
});
