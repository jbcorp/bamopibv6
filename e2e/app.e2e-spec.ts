import { BamOpibWebV5Page } from './app.po';

describe('bam-opib-web-v5 App', function() {
  let page: BamOpibWebV5Page;

  beforeEach(() => {
    page = new BamOpibWebV5Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
