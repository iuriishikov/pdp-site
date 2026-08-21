import type { TeamMember } from './types'

const YELENA_BIO =
  'Organizational development consultant, expert in building effective teams and developing competencies of first leaders. Former partner of the BIOSS Institute (Institute for Organizational and Social Studies of the National School of Government of Great Britain - a world leader in building effective organizational structures and assessing the management potential of global leaders, works with government and large commercial organizations in the U.S., UK and other countries).\n' +
  'Author of a monograph on the technology of the assessment center "Personnel assessment by the method of the assessment center. Best HR-strategies" (published in 2013 by Mann, Ivanov and Ferber).\n' +
  'Experience of successful work in organizational consulting for large international and national corporations, quasi-sector, government structures for more than 20 years.'

const IRINA_SUMMARY =
  'Highly experienced COO. More than 20 years of experience in management, board membership and entrepreneurship'

/** Names her explicitly, since search results appear without page context. */
const IRINA_SEO_DESCRIPTION = `Irina Kondratova is highly experienced COO. More than 20 years of experience in management, board membership and entrepreneurship`

const MARZHAN_BIO =
  "Marzhan Nazarova is an HR expert with more than 10 years of experience in improving recruitment, talent management and assessment processes. Leader of compensation management practice at PDP (Performance Development Partners). Experience in performance management, compensation and benefits, employee engagement and corporate culture, employer image, and diversity and inclusion. Over 7 years of experience managing teams. Served as HR Manager at All Movers US Inc. in Charlotte, USA. Former Head of HR Consulting Department at Samruk Kazyna Corporate University (currently Samruk Business Academy) and Senior Lecturer at Narikbayev KazGYU University (currently MNU University) in Astana, Kazakhstan. Created a digital employee assessment platform, including general testing, 360-degree assessments and HR surveys, which is currently used by more than 30 leading national companies in the Republic of Kazakhstan. Developed engagement surveys for a group of national companies and an outplacement program for a major national oil company. Received Master's degree in Human Resource Management from Georgetown University, Washington DC in 2014."

/**
 * The team roster.
 *
 * Order is meaningful: it drives both the "Our team" list on the homepage and
 * the order of the member pages in the sitemap.
 */
export const teamMembers = [
  {
    slug: 'yelena-baryshnikova',
    name: 'Yelena Baryshnikova',
    role: 'CEO',
    summary:
      'Elena Baryshnikova – Managing Partner, leader of the organizational effectiveness practice. The full version of the CV is downloaded',
    contactUrl: 'https://t.me/elenabaryshnikov',
    photo: {
      src: '/elena-baryshnikova.jpg',
      width: 1066,
      height: 1600,
      alt: 'Yelena Baryshnikova',
    },
    bio: [{ kind: 'text', value: YELENA_BIO }],
    seo: {
      description: YELENA_BIO,
      ogDescription: YELENA_BIO,
      ogImageAlt: 'Elena baryshnikova',
    },
  },
  {
    slug: 'irina-kondratova',
    name: 'Irina Kondratova',
    role: 'Leader of the Digital Operations practice',
    summary:
      'Irina Kondratova is a Partner and leader of the Digital Operations practice. Photo and short resume. The full version of the CV is downloaded',
    contactUrl: 'https://t.me/KondrIr',
    photo: {
      src: '/irina-kondratova.jpg',
      width: 854,
      height: 1280,
      alt: 'Irina Kondratova',
    },
    bio: [
      { kind: 'paragraph', value: IRINA_SUMMARY },
      {
        kind: 'list',
        items: [
          'Digital Operational (DigOps) & Performance management',
          'Data and analytics (D&A) strategy and operating model design',
          'Analytics and business intelligence (ABI)',
        ],
      },
    ],
    seo: {
      description: IRINA_SEO_DESCRIPTION,
      ogDescription: IRINA_SEO_DESCRIPTION,
      ogImageAlt: 'Irina kondratova',
    },
  },
  {
    slug: 'marzhan-nazarova',
    name: 'Marzhan Nazarova',
    role: 'Remuneration management practice leader',
    summary:
      'Marzhan Nazarova is a leader in the remuneration management practice. Photo and short resume. The full version of the CV is downloaded',
    contactUrl: 'https://www.linkedin.com/in/marzhan-nazarova-513950123/',
    photo: {
      src: '/marzhan-nazarova.png',
      width: 600,
      height: 600,
      alt: 'Marzhan Nazarova',
    },
    bio: [{ kind: 'text', value: `${MARZHAN_BIO}\n` }],
    seo: {
      description: `${MARZHAN_BIO}\n`,
      ogDescription: MARZHAN_BIO,
      ogImageAlt: 'Marzhan Nazarova',
      keywords: [
        'compensation management expert',
        'C&B expert',
        'Compensations and benefits expert',
        'HR consulting',
        'HR services',
        'Marzhan Nazarova',
      ],
    },
  },
] as const satisfies readonly TeamMember[]

export type TeamMemberSlug = (typeof teamMembers)[number]['slug']

/** Look a member up by URL segment. Returns `undefined` for unknown slugs. */
export function findTeamMember(slug: string): TeamMember | undefined {
  return teamMembers.find((member) => member.slug === slug)
}
