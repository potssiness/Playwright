import { Locator, Page } from '@playwright/test';

/**
 * Base class for all page objects.
 *
 * This class contains shared helper utilities that can be reused by every
 * concrete page object in the UI library.
 */
export abstract class BasePage {
  constructor(protected page: Page) {}

  /**
   * Tries a list of selectors in order and returns the first existing locator.
   *
   * This is useful for implementing page-level healing/fallback logic when
   * a primary selector is brittle or may change.
   */
  public async healingLocator(selectors: string[]): Promise<Locator> {
    for (const selector of selectors) {
      const locator = this.page.locator(selector).first();
      if (await locator.count() > 0) return locator;
    }

    throw new Error(`Healing locator could not find any of: ${selectors.join(', ')}`);
  }
}
