import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import showsJson from '../data/shows.json';

const projectId = import.meta.env.SANITY_PROJECT_ID;
const dataset = import.meta.env.SANITY_DATASET || 'production';
const apiVersion = '2024-01-01';

export const useSanity = Boolean(projectId);

export const sanityClient = useSanity
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlFor(source: any) {
  if (!builder) return '';
  return builder.image(source);
}

export interface Show {
  id: string;
  venue: string;
  date: string;
  city: string;
  country: string;
  address: string;
  ticketUrl?: string | null;
  status?: 'upcoming' | 'soldout' | 'private' | 'past' | 'cancelled';
  featured?: boolean;
  aftermovieUrl?: string | null;
}

export async function getShows(): Promise<Show[]> {
  if (!sanityClient) {
    return showsJson as Show[];
  }

  const query = `*[_type == "show" && status != "past" && status != "cancelled"] | order(date asc) {
    "id": _id,
    venue,
    date,
    city,
    country,
    address,
    ticketUrl,
    status,
    featured,
    aftermovieUrl
  }`;

  try {
    const shows = await sanityClient.fetch<Show[]>(query);
    return shows;
  } catch (error) {
    console.error('Sanity fetch failed, falling back to JSON:', error);
    return showsJson as Show[];
  }
}

export async function getSiteSettings() {
  if (!sanityClient) return null;

  try {
    return await sanityClient.fetch(`*[_type == "siteSettings"][0]`);
  } catch (error) {
    console.error('Sanity site settings fetch failed:', error);
    return null;
  }
}
