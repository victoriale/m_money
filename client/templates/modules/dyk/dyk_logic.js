/* Author: Ryan Fisher
** Created: 08/04/2015
** Description: .js file for Did You Know Module
** Associated Files: dyk.html, dyk.less, dyk_logic.js
*/

Template.dyk.helpers({
  company: function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return '';
    }
    return data.c_name;
  },

  dykInfo: function(){
    var info = Session.get('did_you_know');
    if(typeof info == 'undefined' || typeof info.facts == 'undefined'){
      return '';
    }
    return info.facts;
  },

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
  ]

});
