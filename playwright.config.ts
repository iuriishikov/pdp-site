import { defineConfig, devices } from '@playwright/test'

const PORT = 3210
const baseURL = `http://127.0.0.1:${PORT}`

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  // Guards against a `.only` left behind in a spec reducing CI to one test.
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['html'], ['list']] : 'list',

  use: {
    baseURL,
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /**
   * Runs the assembled standalone bundle — the same artefact the Docker image
   * serves — rather than the dev server or `next start`. That way the suite
   * also proves the standalone layout is complete: a missing `.next/static`
   * or `public/` copy shows up as broken assets here instead of in production.
   */
  webServer: {
    command: 'pnpm run build:standalone && pnpm run start',
    url: `${baseURL}/api/health`,
    env: { PORT: String(PORT), HOSTNAME: '127.0.0.1' },
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
})
