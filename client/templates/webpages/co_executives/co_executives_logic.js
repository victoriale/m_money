/* Author: Ryan Fisher
** Created: 08/10/2015
** Description: .js file for Company Page - Executives
** Associated Files: co_executives.html, co_executives.less, co_executives_logic.js
*/

Template.co_executives.helpers({
  executive: 'Mark Zuckerberg',
  company: 'Facebook, Inc.',

  exec:[
    {bgc: '#f2f2f2', num: 1, location: 'Menlo Park, CA', name: 'Mark Zuckerberg', shares: '38.3 Million', position: 'Cheif Executive Officer and Chairman', update: '07/30/2015'},
    {bgc: '#ffffff', num: 2, location: 'Menlo Park, CA', name: 'David Wehner', shares: '32 Million', position: 'Cheif Financial Officer', update: '07/30/2015'},
    {bgc: '#f2f2f2', num: 3, location: 'Menlo Park, CA', name: 'Sheryl Sandberg', shares: '30 Million', position: 'Cheif Operating Officer and Director', update: '07/30/2015'}
  ],

  feat:[
    {name: 'Exxon Mobil Corp.', stockprice: '46.69', stockdiff: '+0.39 (+0.85%)'},
    {name: 'Johnson & Johnson', stockprice: '99.55', stockdiff: '+0.18 (+0.18%)'},
    {name: 'Facebook Inc', stockprice: '94.31', stockdiff: '+2.68 (+2.76%)'},
    {name: 'Wells Fargo & Co', stockprice: '58.07', stockdiff: '+0.18 (+0.13%)'}
  ],

  exec2:[
    {bgc: '#ffffff', num: 4, location: 'Menlo Park, CA', name: 'Michael Schroepfer', shares: '25 Million', position: 'Cheif Technology Officer and Vice President', update: '07/30/2015'},
    {bgc: '#f2f2f2', num: 5, location: 'Menlo Park, CA', name: 'Colin Stretch', shares: '10 Million', position: 'Vice President and General Counsel', update: '07/30/2015'}
  ]

});

//This handles the events on button clicks of 1,2,3 and 200
Template.co_executives.events({
    //This function is called when user presses the button "1" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .coex-nav-1': function()
    {
        $(".coex-nav-1").css("background-color","#3098ff");
        $(".coex-nav-1").css("color","#ffffff");
        $(".coex-nav-2").css("background-color","#ffffff");
        $(".coex-nav-2").css("color","#000000");
        $(".coex-nav-3").css("background-color","#ffffff");
        $(".coex-nav-3").css("color","#000000");
        $(".coex-nav-200").css("background-color","#ffffff");
        $(".coex-nav-200").css("color","#000000");
    },
    //This function is called when user presses the button "2" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .coex-nav-2': function()
    {
        $(".coex-nav-2").css("background-color","#3098ff");
        $(".coex-nav-2").css("color","#ffffff");
        $(".coex-nav-1").css("background-color","#ffffff");
        $(".coex-nav-1").css("color","#000000");
        $(".coex-nav-3").css("background-color","#ffffff");
        $(".coex-nav-3").css("color","#000000");
        $(".coex-nav-200").css("background-color","#ffffff");
        $(".coex-nav-200").css("color","#000000");
    },
    //This function is called when user presses the button "3" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .coex-nav-3': function()
    {
        $(".coex-nav-3").css("background-color","#3098ff");
        $(".coex-nav-3").css("color","#ffffff");
        $(".coex-nav-2").css("background-color","#ffffff");
        $(".coex-nav-2").css("color","#000000");
        $(".coex-nav-1").css("background-color","#ffffff");
        $(".coex-nav-1").css("color","#000000");
        $(".coex-nav-200").css("background-color","#ffffff");
        $(".coex-nav-200").css("color","#000000");
    },
    //This function is called when user presses the button "200" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .coex-nav-200': function()
    {
        $(".coex-nav-200").css("background-color","#3098ff");
        $(".coex-nav-200").css("color","#ffffff");
        $(".coex-nav-2").css("background-color","#ffffff");
        $(".coex-nav-2").css("color","#000000");
        $(".coex-nav-3").css("background-color","#ffffff");
        $(".coex-nav-3").css("color","#000000");
        $(".coex-nav-1").css("background-color","#ffffff");
        $(".coex-nav-1").css("color","#000000");
    }
});
