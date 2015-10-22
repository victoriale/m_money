SSR.compileTemplate('head', Assets.getText('head.html'));
/*
Data to be passed:
{
  title: 'Title of the page (string)',
  description: 'Description of the page (string)',
  url: 'canonical url of the page (string)',
  other_tags: [
    {
      name: 'Tag name (string)',
      content: 'Tag content (string)'
    }
  ]
}
*/

SSR.compileTemplate('generic_page', Assets.getText('generic_page.html'));
/*
Data to be passed:

*/

SSR.compileTemplate('generic_section', Assets.getText('generic_section.html'));
/*
Data to be passed:

*/
