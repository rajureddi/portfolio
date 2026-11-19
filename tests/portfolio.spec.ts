import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('portrait supports ASCII, the original photo, pause, and keyboard perspective', async ({
  page,
}) => {
  await page.goto('/')
  const portrait = page.locator('.portrait')
  const photo = portrait.getByRole('img', { name: 'Raju Bandam', exact: true })
  await expect(portrait).toHaveAttribute('data-image', 'ready')
  await expect(portrait).toHaveAttribute('data-mode', 'ascii')
  await expect(portrait.getByRole('button', { name: 'ASCII', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
  await expect
    .poll(() =>
      portrait.locator('canvas').evaluate((canvas) => {
        const context = canvas.getContext('2d')
        if (!context || !canvas.width || !canvas.height) return false
        return context
          .getImageData(0, 0, canvas.width, canvas.height)
          .data.some((value, index) => index % 4 === 3 && value > 0)
      }),
    )
    .toBe(true)

  await portrait.getByRole('button', { name: 'Photo', exact: true }).click()
  await expect(portrait).toHaveAttribute('data-mode', 'photo')
  await expect(photo).toHaveCSS('opacity', '1')
  await expect
    .poll(() => photo.evaluate((image) => image.complete && image.naturalWidth > 0))
    .toBe(true)
  await expect(portrait.getByRole('button', { name: 'Pause portrait animation' })).toBeDisabled()

  await portrait.getByRole('button', { name: 'ASCII', exact: true }).click()
  await portrait.getByRole('button', { name: 'Pause portrait animation' }).click()
  await expect(portrait.getByRole('button', { name: 'Play portrait animation' })).toHaveAttribute(
    'aria-pressed',
    'false',
  )
  await page.mouse.move(0, 0)
  const stage = portrait.getByRole('group', { name: 'Interactive portrait of Raju Bandam' })
  await stage.focus()
  const plane = portrait.locator('.portrait-depth-plane')
  const before = await plane.evaluate((element) => getComputedStyle(element).transform)
  await page.keyboard.press('ArrowRight')
  await expect
    .poll(() => plane.evaluate((element) => getComputedStyle(element).transform))
    .not.toBe(before)
  await expect(stage).toBeFocused()
})

test('education journey reveals each academic record and supports keyboard navigation', async ({
  page,
}) => {
  await page.goto('/')
  const journey = page.getByTestId('education-journey')
  const university = page.getByTestId('edu-stage-university')
  const college = page.getByTestId('edu-stage-college')
  const school = page.getByTestId('edu-stage-school')
  await journey.scrollIntoViewIfNeeded()
  await expect(university).toHaveAttribute('aria-selected', 'true')
  const universityRecord = page.getByTestId('edu-record-university')
  await expect(universityRecord).toBeVisible()
  await expect(
    universityRecord.getByRole('heading', {
      name: 'B.Tech in Computer Science & Engineering (AIML)',
    }),
  ).toBeVisible()
  await expect(universityRecord).toContainText('Malla Reddy University, Hyderabad')
  await expect(universityRecord).toContainText('2022–2026')
  await expect(
    universityRecord.getByRole('img', { name: 'Academic result: CGPA 8.7' }),
  ).toBeVisible()

  await college.click()
  const collegeRecord = page.getByTestId('edu-record-college')
  await expect(college).toHaveAttribute('aria-selected', 'true')
  await expect(universityRecord).not.toBeVisible()
  await expect(collegeRecord.getByRole('heading', { name: 'Intermediate · MPC' })).toBeVisible()
  await expect(collegeRecord).toContainText('SR Junior College')
  await expect(collegeRecord).toContainText('2020–2022')
  await expect(collegeRecord.getByRole('img', { name: 'Academic result: 90.1%' })).toBeVisible()

  await school.click()
  const schoolRecord = page.getByTestId('edu-record-school')
  await expect(schoolRecord.getByRole('heading', { name: 'SSC', exact: true })).toBeVisible()
  await expect(schoolRecord).toContainText('ZPSS T/EM Chennur')
  await expect(schoolRecord).toContainText('2020')
  await expect(schoolRecord.getByRole('img', { name: 'Academic result: CGPA 10' })).toBeVisible()
  await expect(journey.getByRole('tabpanel')).toHaveCount(1)

  await school.focus()
  await page.keyboard.press('Home')
  await expect(university).toBeFocused()
  await expect(university).toHaveAttribute('aria-selected', 'true')
  await page.keyboard.press('ArrowDown')
  await expect(college).toBeFocused()
  await expect(collegeRecord).toBeVisible()
  await page.keyboard.press('End')
  await expect(school).toBeFocused()
  await expect(schoolRecord).toBeVisible()
  await page.keyboard.press('Tab')
  await expect(schoolRecord).toBeFocused()
})

test('toolkit categories and technology chips reveal their practical uses', async ({ page }) => {
  await page.goto('/')
  const explorer = page.locator('.stack-explorer')
  await explorer.scrollIntoViewIfNeeded()
  const intelligentSystems = explorer.getByRole('tab', { name: /Intelligent systems/ })
  const productEngineering = explorer.getByRole('tab', { name: /Product engineering/ })
  const tools = explorer.getByRole('tab', { name: /Tools & deployment/ })
  await expect(intelligentSystems).toHaveAttribute('aria-selected', 'true')
  await expect(explorer.locator('.stack-featured strong')).toHaveText('Python')

  const modelTools = explorer.getByRole('group', { name: 'Intelligent systems technologies' })
  await modelTools.getByRole('button', { name: /YOLO/ }).click()
  await expect(explorer.locator('.stack-featured strong')).toHaveText('YOLO')
  await expect(explorer.locator('.stack-featured')).toContainText(
    'Recognizing objects in real-time camera feeds.',
  )
  await modelTools.getByRole('button', { name: /BERT/ }).focus()
  await expect(modelTools.getByRole('button', { name: /BERT/ })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
  await expect(explorer.locator('.stack-featured')).toContainText(
    'Understanding context and extracting meaning from text.',
  )

  await productEngineering.click()
  await expect(explorer.getByRole('tabpanel')).toHaveAccessibleName(/Product engineering/)
  const productTools = explorer.getByRole('group', { name: 'Product engineering technologies' })
  await productTools.getByRole('button', { name: /React/ }).click()
  await expect(explorer.locator('.stack-featured strong')).toHaveText('React')
  await expect(explorer.locator('.stack-featured')).toContainText(
    'Composing responsive interfaces from reusable parts.',
  )
  await expect(modelTools).toHaveCount(0)

  await tools.click()
  const deploymentTools = explorer.getByRole('group', { name: 'Tools & deployment technologies' })
  await deploymentTools.getByRole('button', { name: /MediaPipe/ }).click()
  await expect(explorer.locator('.stack-featured')).toContainText(
    'Bringing multimodal AI pipelines onto the device.',
  )
  await tools.focus()
  await page.keyboard.press('ArrowLeft')
  await expect(productEngineering).toBeFocused()
  await expect(productEngineering).toHaveAttribute('aria-selected', 'true')
  await expect(explorer.locator('.stack-featured strong')).toHaveText('Java')
  await page.keyboard.press('Home')
  await expect(intelligentSystems).toBeFocused()

  await explorer.getByRole('button', { name: 'Pause technology orbit' }).click()
  await expect(explorer.getByRole('button', { name: 'Play technology orbit' })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
  await expect(explorer.locator('.stack-visual')).toHaveClass(/stack-motion-paused/)
})

test('project filters keep all 14 real projects accessible', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.project-card')).toHaveCount(4)
  await page.getByRole('button', { name: 'Explore all 14 projects' }).click()
  await expect(page.locator('.project-row')).toHaveCount(10)
  await page.getByRole('button', { name: 'On-device AI', exact: true }).click()
  await expect(page.locator('.project-card')).toHaveCount(2)
  await expect(page.locator('.project-row')).toHaveCount(2)
  await expect(page.locator('.project-row').filter({ hasText: 'LocalMind' })).toBeVisible()
  await page.getByRole('button', { name: 'Computer vision', exact: true }).click()
  await expect(page.locator('.project-card')).toHaveCount(1)
  await expect(page.locator('.project-row')).toHaveCount(4)
  await page.getByRole('button', { name: 'Applications', exact: true }).click()
  await expect(page.locator('.project-card')).toHaveCount(1)
  await expect(page.locator('.project-row')).toHaveCount(4)
  await page.getByRole('button', { name: 'Show selected work' }).click()
  await expect(page.locator('.project-card')).toHaveCount(4)
  await expect(page.locator('.project-row')).toHaveCount(0)
})

test('project detail dialog has a real source link and restores keyboard focus', async ({
  page,
}) => {
  await page.goto('/')
  const trigger = page.getByRole('button', { name: 'Explore AuraOnDevice AI HUB', exact: true })
  await trigger.click()
  const dialog = page.getByRole('dialog', { name: 'AuraOnDevice AI HUB' })
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole('link', { name: 'Explore the source' })).toHaveAttribute(
    'href',
    'https://github.com/rajureddi/AuraOnDevice-AI_HUB',
  )
  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
  await expect(trigger).toBeFocused()
})

test('resume download and deep links work', async ({ page, request }) => {
  await page.goto('/resume/')
  const dialog = page.getByRole('dialog', { name: 'Raju Bandam' })
  await expect(dialog).toBeVisible()
  const downloadEvent = page.waitForEvent('download')
  await dialog.getByRole('link', { name: 'Download résumé' }).click()
  const download = await downloadEvent
  expect(download.suggestedFilename()).toBe('Raju-Bandam-Resume.pdf')
  const response = await request.get('/RAJU_BANDAM_RESUME__.pdf')
  expect(response.status()).toBe(200)
  expect(response.headers()['content-type']).toContain('application/pdf')
  expect((await response.body()).subarray(0, 4).toString()).toBe('%PDF')
  await page.goto('/projects/')
  await expect(page.locator('.project-row')).toHaveCount(10)
})

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`layout fits a ${width}px viewport`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    await expect(page.locator('.portrait')).toHaveAttribute('data-image', 'ready')
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    const heading = await page.getByRole('heading', { level: 1 }).boundingBox()
    expect(heading?.x).toBeGreaterThanOrEqual(0)
    expect((heading?.x ?? 0) + (heading?.width ?? 0)).toBeLessThanOrEqual(width)
    const portrait = await page.locator('.portrait').boundingBox()
    const baseline = await page.locator('.hero-baseline').boundingBox()
    expect((portrait?.y ?? 0) + (portrait?.height ?? 0)).toBeLessThanOrEqual((baseline?.y ?? 0) + 2)
  })
}

test('mobile navigation contains focus and closes with Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const toggle = page.getByRole('button', { name: 'Open navigation' })
  await toggle.click()
  const nav = page.getByRole('navigation', { name: 'Mobile navigation' })
  await expect(nav.getByRole('link', { name: '01 Work' })).toBeFocused()
  for (let index = 0; index < 8; index += 1) {
    await page.keyboard.press('Tab')
    expect(
      await page.evaluate(() => !!document.activeElement?.closest('#mobile-nav, .menu-toggle')),
    ).toBe(true)
  }
  await page.keyboard.press('Escape')
  await expect(nav).not.toBeVisible()
  await expect(toggle).toBeFocused()
})

test('short mobile menu remains scrollable', async ({ page }) => {
  await page.setViewportSize({ width: 600, height: 320 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Open navigation' }).click()
  const contact = page
    .getByRole('navigation', { name: 'Mobile navigation' })
    .getByRole('link', { name: '04 Contact' })
  await contact.focus()
  await expect(contact).toBeInViewport()
  await contact.click()
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).not.toBeVisible()
})

test('email contact copies the address', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.goto('/')
  await page.getByRole('button', { name: 'Copy email address' }).click()
  await expect(page.locator('.copy-status')).toHaveText('COPIED!')
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('rajubandam694@gmail.com')
  await expect(page.locator('.email-link')).toHaveAttribute(
    'href',
    'mailto:rajubandam694@gmail.com',
  )
})

test('email contact handles unavailable clipboard access', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: () => Promise.reject(new Error('Clipboard unavailable')) },
    })
  })
  await page.goto('/')
  await page.getByRole('button', { name: 'Copy email address' }).click()
  await expect(page.locator('.copy-status')).toHaveText('USE THE EMAIL LINK')
})

test('reduced motion starts paused', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.locator('.portrait')).toHaveAttribute('data-image', 'ready')
  await expect(page.getByRole('button', { name: 'Play portrait animation' })).toHaveAttribute(
    'aria-pressed',
    'false',
  )
  await page.locator('.stack-explorer').scrollIntoViewIfNeeded()
  await expect(page.locator('.stack-visual')).toHaveClass(/stack-motion-paused/)
  await expect(page.getByRole('button', { name: 'Pause technology orbit' })).toHaveCount(0)
})

test('unavailable canvas preserves the visible original photograph', async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext
    HTMLCanvasElement.prototype.getContext = function (...args) {
      if (args[0] === '2d') return null
      return Reflect.apply(original, this, args)
    } as typeof original
  })
  await page.goto('/')
  const portrait = page.locator('.portrait')
  await expect(portrait).toHaveAttribute('data-image', 'ready')
  await expect(portrait).toHaveAttribute('data-mode', 'photo')
  const photo = portrait.getByRole('img', { name: 'Raju Bandam', exact: true })
  await expect(photo).toBeVisible()
  await expect(photo).toHaveCSS('opacity', '1')
  await expect
    .poll(() => photo.evaluate((image) => image.complete && image.naturalWidth > 0))
    .toBe(true)
  await expect(portrait.getByRole('button', { name: 'ASCII', exact: true })).toBeDisabled()
  await expect(portrait.getByRole('button', { name: 'Photo', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
})

test('main page and project dialog pass accessibility checks', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.portrait')).toHaveAttribute('data-image', 'ready')
  for (const section of ['#work', '#about', '#toolkit', '#contact']) {
    await page.locator(section).scrollIntoViewIfNeeded()
  }
  await page.waitForTimeout(800)
  const pageResult = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze()
  expect(
    pageResult.violations.map(({ id, nodes }) => ({
      id,
      targets: nodes.map((node) => ({ target: node.target, summary: node.failureSummary })),
    })),
  ).toEqual([])
  await page.getByRole('button', { name: 'Explore AuraOnDevice AI HUB', exact: true }).click()
  const dialogResult = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze()
  expect(
    dialogResult.violations.map(({ id, nodes }) => ({
      id,
      targets: nodes.map((node) => node.target),
    })),
  ).toEqual([])
})
