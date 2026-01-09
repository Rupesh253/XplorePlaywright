import { Page } from '@playwright/test';

export class CartPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  private get cartItem() {
    return this.page.locator('.cart_item');
  }
  private cartItemByProductName(productName: string) {
    return this.cartItem.locator('.inventory_item_name').getByText(/${productName}/i).first();
  }
  public clickProduct(productName: string){
    this.cartItemByProductName(productName).click();
  }
  private get continueShopping_button() {
    return this.page.locator('#continue-shopping');
  }
  private get checkout_button() {
    return this.page.locator('#checkout');
  }
  public async doCheckout(){
    await this.checkout_button.click();
  }
  public async doContinueShopping(){
    await this.continueShopping_button.click();
  }
}
