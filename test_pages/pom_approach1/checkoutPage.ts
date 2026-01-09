import { Page } from '@playwright/test';

export class CheckoutPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  private get firstName_textbox() {
    return this.page.locator('#first-name').getByRole('textbox');
  }
  private get lastName_textbox() {
    return this.page.locator('#last-name').getByRole('textbox');
  }
  private get postalCode_textbox() {
    return this.page.locator('#postal-code').getByRole('textbox');
  }
  private get continue_button() {
    return this.page.locator('#continue').getByRole('button');
  }
  private get cancel_button() {
    return this.page.locator('#cancel').getByRole('button');
  }

  public async fillOutPersonalInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstName_textbox.fill(firstName);
    await this.lastName_textbox.fill(lastName);
    await this.postalCode_textbox.fill(postalCode);
  }
  public async proceedFurther() {
    await this.continue_button.click();
  }
  public async moveBack() {
    await this.cancel_button.click();
  }
}
