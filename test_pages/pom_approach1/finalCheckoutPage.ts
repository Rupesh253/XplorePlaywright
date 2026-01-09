import { Page } from '@playwright/test';

export class FinalCheckoutPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  private get paymentInformation_label() {
    return this.page.locator('[data-test="payment-info-value"]');
  }
  private get shippingInformation_label() {
    return this.page.locator('[data-test="shipping-info-value"]');
  }
  private get itemsTotal_label() {
    return this.page.locator('[data-test="subtotal-label"]');
  }
  private get tax_label() {
    return this.page.locator('[data-test="tax-label"]');
  }
  private get total_label() {
    return this.page.locator('[data-test="total-label"]');
  }
  private get finish_button() {
    return this.page.locator('#finish').getByRole('button');
  }
  private get cancel_button() {
    return this.page.locator('#cancel').getByRole('button');
  }
  public async getItemsTotalPrice() {
    return await this.itemsTotal_label.innerText.toString().split('$')[1];
  }
  public async getTaxPrice() {
    return await this.tax_label.innerText.toString().split('$')[1];
  }
  public async getTotalPrice() {
    return await this.total_label.innerText.toString().split('$')[1];
  }

  public async doFinish() {
    await this.finish_button.click();
  }
  public async moveBack() {
    await this.cancel_button.click();
  }
}
