import { UdemyAngular2Page } from './app.po';

describe('udemy-angular2 App', () => {
  let page: UdemyAngular2Page;

  beforeEach(() => {
    page = new UdemyAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
