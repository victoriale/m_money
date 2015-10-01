/* Author: Ryan Fisher
** Created: 08/04/2015
** Description: .js file for Did You Know Module
** Associated Files: dyk.html, dyk.less, dyk_logic.js
*/

Template.dyk.helpers({
  company: '[Walt Disney Company]',

  fact:[
    {
      isLeft: true,
      segment:[
        {important: true, text: '$1,000 USD'},
        {important: false, text: ' invested in Walt Disney Company on '},
        {important: true, text: 'Sep 14th, 2010'},
        {important: false, text: ' would be worth '},
        {important: true, text: '$3,371 USD'},
        {important: false, text: ' today.'}
      ]
    },
    {
      isLeft: false,
      segment:[
        {important: false, text: 'The Walt Disney Company et justo non odio commo venenatis '},
        {important: true, text: 'non rutrum sem.'},
        {important: false, text: 'In consequat nisi at diam phareta.'}
      ]
    },
    {
      isLeft: true,
      segment:[
        {important: false, text: 'The Walt Disney Company '},
        {important: true, text: 'Has Gained 25.54%'},
        {important: false, text: ' in 2015.'}
      ]
    },
    {
      isLeft: false,
      segment:[
        {important: false, text: 'Walt Disney Co reported '},
        {important: true, text: '$39.2 Billion USD'},
        {important: false, text: ' in liabilities.'}
      ]
    },
    {
      isLeft: true,
      segment:[
        {important: false, text: 'The Walt Disney Company '},
        {important: true, text: 'Had 48% Higher Revenue'},
        {important: false, text: ' in 2014. In consequat nisi at diam phareta.'}
      ]
    },
    {
      isLeft: false,
      segment:[
        {important: false, text: 'The Walt Disney Company currently '},
        {important: true, text: 'Has 175,000 People Employed'},
        {important: false, text: ' in 2015.'}
      ]
    },
    // {
    //   isLeft: true,
    //   segment:[
    //     {important: false, text: 'Placeholder text'}
    //   ]
    // },
    // {
    //   isLeft: false,
    //   segment:[
    //     {important: false, text: 'Placeholder text'}
    //   ]
    // },
  ]

});
