import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'show',
  title: 'Show',
  type: 'document',
  fields: [
    defineField({
      name: 'venue',
      title: 'Venue',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      initialValue: 'Denmark',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
      description: 'Full street address',
    }),
    defineField({
      name: 'ticketUrl',
      title: 'Ticket URL',
      type: 'url',
      description: 'Link til billetsalg — hvis tom vises "TBA"',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Upcoming', value: 'upcoming' },
          { title: 'Sold Out', value: 'soldout' },
          { title: 'Private Event', value: 'private' },
          { title: 'Cancelled', value: 'cancelled' },
          { title: 'Past', value: 'past' },
        ],
        layout: 'radio',
      },
      initialValue: 'upcoming',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured on homepage',
      type: 'boolean',
      initialValue: false,
      description: 'Fremhæv dette show på forsiden',
    }),
    defineField({
      name: 'aftermovieUrl',
      title: 'Aftermovie URL',
      type: 'url',
      description: 'Link til aftermovie (YouTube/Vimeo) - bruges hvis status er "past"',
    }),
    defineField({
      name: 'notes',
      title: 'Internal notes',
      type: 'text',
      description: 'Kun til dig — vises ikke på siden',
      rows: 3,
    }),
  ],
  orderings: [
    {
      title: 'Date (newest first)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      title: 'Date (oldest first)',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'venue',
      subtitle: 'date',
      status: 'status',
    },
    prepare({ title, subtitle, status }) {
      const date = subtitle ? new Date(subtitle).toLocaleDateString('en-GB') : '';
      return {
        title,
        subtitle: `${date} · ${status}`,
      };
    },
  },
});
