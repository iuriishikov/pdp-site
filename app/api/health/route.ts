/**
 * Liveness probe.
 *
 * Used by the container `HEALTHCHECK`, by Compose's `service_healthy`
 * condition and by Caddy's upstream health checks — the last of which is what
 * lets a deploy swap containers without returning 502s.
 *
 * Deliberately dynamic and uncached: a prerendered 200 would keep reporting
 * healthy after the server had stopped being able to render anything.
 */
export const dynamic = 'force-dynamic'

export function GET() {
  return Response.json({ status: 'ok' }, { headers: { 'Cache-Control': 'no-store' } })
}
