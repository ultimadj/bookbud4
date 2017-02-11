import { Bookbud4Page } from './app.po';

describe('bookbud4 App', function() {
  let page: Bookbud4Page;

  beforeEach(() => {
    page = new Bookbud4Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
