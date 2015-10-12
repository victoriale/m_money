/*Author: Sri Sindhusha Kuchipudi
 Created: 10/05/2015
 Description: .less file for directory_page
 Associated Files: directory_page.html, directory_page.less, directory_page_logic.js
 */
 //variable to change the tile color
 var color="white";

 Template.directory_page.onRendered(function () {
 $(".dir_pg-tp-btn2").css({"background-color":"#3098ff","font-family":"HN-B"});
 });
 //for changing the color of the button on click
 Template.directory_page.events({
   'click .dir_pg-tp-btn1': function()
   {
       $(".dir_pg-tp-btn1").css({"background-color":"#3098ff","font-family":"HN-B"});
        $(".dir_pg-tp-btn2").css({"background-color":"#999999","font-family":"HN"});
   },
   'click .dir_pg-tp-btn2': function()
   {
       $(".dir_pg-tp-btn2").css({"background-color":"#3098ff","font-family":"HN-B"});
        $(".dir_pg-tp-btn1").css({"background-color":"#999999","font-family":"HN"});
   },
 });

 //helpers
 Template.directory_page.helpers({
   //to print a to z
   atoz:[
     {az: '#', vln:true},
     {az: 'A', vln:true},{az: 'B', vln:true}, {az: 'C', vln:true},{az: 'D', vln:true},{az: 'E', vln:true},{az: 'F', vln:true},{az: 'G', vln:true},{az: 'H', vln:true},{az: 'I', vln:true},{az: 'J', vln:true},{az: 'K', vln:true},{az: 'L', vln:true},{az: 'M', vln:true},
     {az: 'N', vln:true},{az:'O', vln:true},{az: 'P', vln:true}, {az: 'Q', vln:true}, {az: 'R', vln:true}, {az: 'S', vln:true}, {az: 'T', vln:true}, {az: 'U', vln:true}, {az: 'V', vln:true},{az: 'W', vln:true},{az: 'X', vln:true}, {az: 'Y', vln:true}, {az: 'Z', vln:true}, {az: 'Newly Added', color:true, vln:false}],
     location:'United States',
     //to print the content in tiles
     tiles:[
       {LastUpdated: '{year-month-date, timestamp}',Pname:'{Profile Name}',Cname:'Company', Market:'{MARKET:Ticker}',city:'{City,ST}',Sector:'{Sector}',indus:'{Industry}',Ceo:'{CEO}',set:true},
       {LastUpdated: '{year-month-date, timestamp}',Pname:'{Profile Name}', Cname:'Executive', Market:'{Affiliated Company}',city:'{City,ST}',Sector:'{Position}',indus:'{Years at Position}'},
       {LastUpdated: '{year-month-date, timestamp}',Pname:'{Location Name}', Cname:'Location', Market:'Territory {State}',city:'{City,ST}',Sector:'{Company Count}',indus:'{Executive Count}'},
       {LastUpdated: '{year-month-date, timestamp}',Pname:'{Profile Name}',Cname:'Company', Market:'{MARKET:Ticker}',city:'{City,ST}',Sector:'{Sector}',indus:'{Industry}',Ceo:'{CEO}',set:true},
       {LastUpdated: '{year-month-date, timestamp}',Pname:'{Profile Name}', Cname:'Executive', Market:'{Affiliated Company}',city:'{City,ST}',Sector:'{Position}',indus:'{Years at Position}'},
       {LastUpdated: '{year-month-date, timestamp}',Pname:'{Location Name}', Cname:'Location', Market:'Territory {State}',city:'{City,ST}',Sector:'{Company Count}',indus:'{Executive Count}'},
       {LastUpdated: '{year-month-date, timestamp}',Pname:'{Profile Name}',Cname:'Company', Market:'{MARKET:Ticker}',city:'{City,ST}',Sector:'{Sector}',indus:'{Industry}',Ceo:'{CEO}',set:true},
       {LastUpdated: '{year-month-date, timestamp}',Pname:'{Profile Name}', Cname:'Executive', Market:'{Affiliated Company}',city:'{City,ST}',Sector:'{Position}',indus:'{Years at Position}'},
       {LastUpdated: '{year-month-date, timestamp}',Pname:'{Location Name}', Cname:'Location', Market:'Territory {State}',city:'{City,ST}',Sector:'{Company Count}',indus:'{Executive Count}'},
       {LastUpdated: '{year-month-date, timestamp}',Pname:'{Profile Name}',Cname:'Company', Market:'{MARKET:Ticker}',city:'{City,ST}',Sector:'{Sector}',indus:'{Industry}',Ceo:'{CEO}',set:true},
       {LastUpdated: '{year-month-date, timestamp}',Pname:'{Profile Name}', Cname:'Executive', Market:'{Affiliated Company}',city:'{City,ST}',Sector:'{Position}',indus:'{Years at Position}'},
       {LastUpdated: '{year-month-date, timestamp}',Pname:'{Location Name}', Cname:'Location', Market:'Territory {State}',city:'{City,ST}',Sector:'{Company Count}',indus:'{Executive Count}'},
       {LastUpdated: '{year-month-date, timestamp}',Pname:'{Profile Name}',Cname:'Company', Market:'{MARKET:Ticker}',city:'{City,ST}',Sector:'{Sector}',indus:'{Industry}',Ceo:'{CEO}',set:true},
       {LastUpdated: '{year-month-date, timestamp}',Pname:'{Profile Name}', Cname:'Executive', Market:'{Affiliated Company}',city:'{City,ST}',Sector:'{Position}',indus:'{Years at Position}'},
       {LastUpdated: '{year-month-date, timestamp}',Pname:'{Location Name}', Cname:'Location', Market:'Territory {State}',city:'{City,ST}',Sector:'{Company Count}',indus:'{Executive Count}'},
       {LastUpdated: '{year-month-date, timestamp}',Pname:'{Profile Name}',Cname:'Company', Market:'{MARKET:Ticker}',city:'{City,ST}',Sector:'{Sector}',indus:'{Industry}',Ceo:'{CEO}',set:true},
       {LastUpdated: '{year-month-date, timestamp}',Pname:'{Profile Name}', Cname:'Executive', Market:'{Affiliated Company}',city:'{City,ST}',Sector:'{Position}',indus:'{Years at Position}'},
       {LastUpdated: '{year-month-date, timestamp}',Pname:'{Location Name}', Cname:'Location', Market:'Territory {State}',city:'{City,ST}',Sector:'{Company Count}',indus:'{Executive Count}'}
      ],
  //to change the tile color
     getcolor:function(){
       if(color==="white")
       {
         color="gray";
         return color;
       }
       else {
         color="white";
         return color;
       }
     }
 });
