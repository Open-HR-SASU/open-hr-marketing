import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const locales = ['fr', 'en-GB'];
const pages = ['/', '/about/', '/pricing/', '/pilot/'];

for (const locale of locales) {
  for (const page of pages) {
    test(`a11y: /${locale}${page}`, async ({ page: browserPage }) => {
      await browserPage.goto(`/${locale}${page}`);
      await browserPage.waitForLoadState('networkidle');

      const results = await new AxeBuilder({ page: browserPage })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      expect(results.violations).toEqual([]);
    });
  }
}
