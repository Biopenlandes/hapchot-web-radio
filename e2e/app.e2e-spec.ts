import { HapchotWebRadioPage } from './app.po';

describe('hapchot-web-radio App', function() {
  let page: HapchotWebRadioPage;

  beforeEach(() => {
    page = new HapchotWebRadioPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
