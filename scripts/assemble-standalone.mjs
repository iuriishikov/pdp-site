import { cp, stat } from 'node:fs/promises'
import { join } from 'node:path'

/**
 * Completes the `output: 'standalone'` bundle so it can actually be served.
 *
 * `next build` writes `.next/standalone` with `server.js`, a `package.json`
 * and a traced `node_modules` — but deliberately not `public/` or
 * `.next/static`, because it cannot know how you intend to serve them. Copying
 * them in is what the Dockerfile's two extra COPY lines do; doing the same
 * here means `pnpm start:standalone` and the end-to-end suite run against the
 * same layout that ships.
 */

const root = process.cwd()
const standalone = join(root, '.next', 'standalone')

async function exists(path) {
  try {
    await stat(path)
    return true
  } catch {
    return false
  }
}

if (!(await exists(standalone))) {
  console.error(
    'No .next/standalone directory. Run `next build` with `output: "standalone"` first.',
  )
  process.exit(1)
}

await cp(join(root, '.next', 'static'), join(standalone, '.next', 'static'), {
  recursive: true,
})

if (await exists(join(root, 'public'))) {
  await cp(join(root, 'public'), join(standalone, 'public'), { recursive: true })
}

console.log('Assembled .next/standalone (added .next/static and public).')
