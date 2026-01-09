import { Page } from '@playwright/test';
export class WelcomePage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  private get menu_button() {
    return this.page.locator('#react-burger-menu-btn');
  }
  private get leftSidebar_nav() {
    return this.page.locator('.bm-menu');
  }
  private get allItems_anchor() {
    return this.leftSidebar_nav.locator('#inventory_sidebar_link');
  }
  private get about_anchor() {
    return this.leftSidebar_nav.locator('#about_sidebar_link');
  }
  private get logOut_anchor() {
    return this.leftSidebar_nav.locator('#logout_sidebar_link');
  }
  private get resetAppState_anchor() {
    return this.leftSidebar_nav.locator('#reset_sidebar_link');
  }
  private get cart_button() {
    return this.page.locator('.shopping_cart_link');
  }
  private get cartItemsCount_bagde() {
    return this.page.locator('.shopping_cart_badge');
  }
  private get heading_label() {
    return this.page.locator('.app_logo');
  }
  private get sort_select() {
    return this.page.locator('.product_sort_container');
  }
  private sortByText_option(text: string) {
    return this.sort_select.selectOption(text);
  }
  private addToCartByProductName(productName: string) {
    return this.page
      .getByText(/^${productName}$/i)
      .getByText(/^Add to cart$/i)
      .getByRole('button')
      .first();
  }
  private removeProductFromCart(partialProductName: string) {
    return this.page
      .getByText(/^${partialProductName}$/i)
      .getByText(/^Remove$/i)
      .getByRole('button')
      .first();
  }
  private getCompleteProductName(partialProductName: string) {
    return this.page
      .getByText(/^${partialProductName}$/i)
      .locator('.inventory_item_name')
      .innerText();
  }
  private getCompleteProductDescription(partialProductName: string) {
    return this.page
      .getByText(/^${partialProductName}$/i)
      .locator('.inventory_item_desc')
      .innerText();
  }
  private getPrice(partialProductName: string) {
    return this.page
      .getByText(/^${partialProductName}$/i)
      .locator('.inventory_item_price')
      .innerText();
  }
  private getAllItems() {
    return this.page.locator('.inventory_item');
  }
  public async getAllItemsCount() {
    return this.getAllItems().count;
  }
  public async getAllItemNames() {
    return this.page.locator('.inventory_item_name').allInnerTexts;
  }
  public async getAllItemsDescriptions() {
    return this.page.locator('.inventory_item_desc').allInnerTexts;
  }
  public async getAllItemsPrices() {
    return this.page.locator('.inventory_item_price').allInnerTexts;
  }
  private get footer() {
    return this.page.locator('footer');
  }
  private get twitter_anchor() {
    return this.footer.getByText(/twitter/i);
  }
  private get facebook_anchor() {
    return this.footer.getByText(/facebook/i);
  }
  private get linkedIn_anchor() {
    return this.footer.getByText(/linkedin/i);
  }
  private get termsAndConditions_label() {
    return this.page.locator('.footer_copy');
  }
}
