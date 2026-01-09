import { Page } from '@playwright/test';

export class CompletedCheckoutPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  private get header_label() {
    return this.page.locator('.complete-header');
  }
  private get title_label() {
    return this.page.locator('.title');
  }
  private get backHome_button() {
    return this.page.locator('#back-to-products');
  }
  public async doBackHome() {
    await this.backHome_button.click();
  }
}
