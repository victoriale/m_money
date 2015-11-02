/* Author: jyothyswarooop
** Created: 10/26/2015
** Description: .js file for live_updates page
** Associated Files: live_updates.html, live_updates.less, live_updates_logic.js
*/

//Calculate blue bar between bullets
lve_upBarHt = function(){
  var height;
  height = $($('.lve_up-bullet')[$('.lve_up-bullet').length - 1]).offset().top - $($('.lve_up-bullet')[0]).offset().top;
  $('.lve_up-line').height(height);
}

Template.live_updates_page.onRendered(function(){

  //Set initial blue bar height
  lve_upBarHt();

})

Template.live_updates_page.helpers({
  update: '10/24/2014, 12:36 PM EDT',
  comp: '[Profile]',
  city: 'United States, USA',
  featnews: '[Company]',
  stnews: 'stock price traded within a range of #69.80 - $73.09',
  featdate: 'July 31, 2015',

  yearno:[
    {index: 0, year: 2015, isCurrent: true},
    {index: 1, year: "Top Updates"},
    {index: 2, year: "2013/2014"},
    {index: 3, year: "2012/2013"},
    {index: 4, year: "2011/2010"}
  //  {index: 5, year: 2010}
  ],

  updates:[
    {index: 0, date: 'July 31, 2015', img: '', static:'[company]',    news: 'stock price traded within a range of $69.80 - $73.09.'},
    {index: 1, date: 'July 30, 2015', img: '', static:'[News Source]', news: 'published an aritcle about [Company] titled', itali:'"[Company] craters 9.3% after pricing its secondary offering."'},
    {index: 2, oneLine: true, date: 'July 29, 2015', news: '[User Name] added [Company Name] to her favorites.'},
    {index: 3, date: 'July 18, 2015', img: '', static:'[News Source]', news: 'published an article about [Company] titled', itali:'"[Company] bacon ipsum dolor amet ham flank meatball tri-tip."'},
    {index: 4, date: 'June 18, 2015', img: '', static:'[News Source]', news: 'published an article about [Company] titled', itali:'"[Company] bacon ipsum dolor amet ham flank meatball tri-tip."'}
  ]
})

//Array for tab names for Tab onClick function
lve_upTabNames = [
  "Live Upadte Feed",
  "Top Updates",
  "2013/2014",
  "2012/2013",
  "2011/2010"
];

//Tab onClick function
lve_upTab = function(a) {

    //Adjust tab css
    for(var i = 0; i < 5; i++)
    {
      var e = document.getElementById('lve_up-tab' + i);
      if(i==a)
      {
        e.className = "lve_up-eachtab_act";
        e.innerHTML = '<span class="lve_up-orngicon" id="lve_up-activeicn"><i class="fa fa-circle"></i></span><span class="lve_up-space" ></span>' + lve_upTabNames[i];
      } else {
        e.className = "lve_up-eachtab_inact";
        e.innerHTML = lve_upTabNames[i];
      }
    }

    //Set blue bar height
    lve_upBarHt();

  }
