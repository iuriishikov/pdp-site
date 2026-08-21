import { expect, test } from '@playwright/test'

const MEMBERS = [
  { slug: 'yelena-baryshnikova', name: 'Yelena Baryshnikova', role: 'CEO' },
  {
    slug: 'irina-kondratova',
    name: 'Irina Kondratova',
    role: 'Leader of the Digital Operations practice',
  },
  {
    slug: 'marzhan-nazarova',
    name: 'Marzhan Nazarova',
    role: 'Remuneration management practice leader',
  },
]

test.describe('homepage', () => {
  test('serves the headline and every section heading', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle('PDP (Performance Development Partners)')
    await expect(page.getByRole('heading', { name: 'PRACTISES' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Our team' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Our clients' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Contact Us' })).toBeVisible()
  })

  test('includes the practice copy in the served HTML', async ({ request }) => {
    // This copy sits inside scroll-reveal blocks. It must be present in the
    // response body itself, not injected later by script, or crawlers and
    // no-JavaScript readers never see it.
    const html = await (await request.get('/')).text()

    expect(html).toContain('Organizational Effectiveness Practice')
    expect(html).toContain('Executive Search Practice')
    expect(html).toContain('Talent Management Practice')
    expect(html).toContain('Remuniration Practice')
    expect(html).toContain('was created in 2004 and is operating now in 3 continents')
  })

  test('links to each team member', async ({ page }) => {
    await page.goto('/')

    for (const member of MEMBERS) {
      await expect(page.locator(`a[href="/team/members/${member.slug}"]`)).toHaveCount(1)
    }
  })

  test('names every client logo for assistive technology', async ({ page }) => {
    await page.goto('/')

    // autoFill duplicates the row, so each logo appears more than once.
    await expect(page.getByRole('img', { name: 'Microsoft' }).first()).toBeAttached()
    await expect(page.getByRole('img', { name: 'Nestlé' }).first()).toBeAttached()
  })
})

test.describe('team member pages', () => {
  for (const member of MEMBERS) {
    test(`${member.slug} renders and is titled`, async ({ page }) => {
      await page.goto(`/team/members/${member.slug}`)

      await expect(page).toHaveTitle(member.name)
      await expect(page.getByRole('heading', { name: member.role })).toBeVisible()
      await expect(page.getByText(member.name, { exact: true }).first()).toBeVisible()
      await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible()
    })
  }

  test('an unknown member is a 404', async ({ request }) => {
    const response = await request.get('/team/members/not-a-real-person')

    expect(response.status()).toBe(404)
  })
})

test.describe('contact form', () => {
  test('enables Send only once every field is filled', async ({ page }) => {
    await page.goto('/')

    const send = page.getByRole('button', { name: 'Send' })
    await expect(send).toBeDisabled()

    await page.getByLabel('Who are you?').fill('Ada')
    await page.getByLabel('Subject').fill('Hello')
    await expect(send).toBeDisabled()

    await page.getByLabel('Text').fill('A message.')
    await expect(send).toBeEnabled()
  })
})

test.describe('site plumbing', () => {
  test('serves robots.txt pointing at the sitemap', async ({ request }) => {
    const body = await (await request.get('/robots.txt')).text()

    expect(body).toContain('Sitemap:')
    expect(body).toContain('/sitemap.xml')
  })

  test('lists every page in the sitemap', async ({ request }) => {
    const body = await (await request.get('/sitemap.xml')).text()

    for (const member of MEMBERS) {
      expect(body).toContain(`/team/members/${member.slug}`)
    }
  })

  test('reports healthy', async ({ request }) => {
    const response = await request.get('/api/health')

    expect(response.status()).toBe(200)
    expect(await response.json()).toEqual({ status: 'ok' })
  })
})
