import Link from 'next/link'

/**
 * Shown for unknown URLs, including team member slugs that do not exist.
 * Rendered inside the root layout, so it keeps the site shell and footer.
 */
export default function NotFound() {
  return (
    <div style={{ paddingTop: 100, width: '100%' }}>
      <h1>Page not found</h1>

      <p style={{ fontFamily: 'var(--font-martin-mono)', fontSize: 20 }}>
        The page you were looking for is not here. <Link href="/">Go to the homepage</Link>.
      </p>
    </div>
  )
}
