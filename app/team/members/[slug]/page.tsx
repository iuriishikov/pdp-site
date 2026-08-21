export {
  TeamMemberPage as default,
  generateStaticParams,
  generateMetadata,
} from '@/_pages/team-member'

/** Any slug that is not a known member is a 404, not a render attempt. */
export const dynamicParams = false
