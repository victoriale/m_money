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
   //Event to add sorting to directory
   'click .dir_pg-cs-bf-az': function(e, t){

   }
 });

 //Helpers
 Template.directory_page.helpers({
  location:'United States',
  //Helper to determine location title
  location_title: function(){
    var params = Router.current().getParams();

    //Write title based on parameters.
    //If state is not defined write title with 'in the United States of America', else write particular state
    if(typeof params.query.state === 'undefined'){
      if(params.type === 'officer'){
        var title = 'Executive Profiles in the United States of America';
      }else if(params.type === 'company'){
        var title = 'Company Profiles in the United States of America';
      }
    }else{
      var state = fullstate(params.query.state);

      if(params.type === 'officer'){
        var title = 'Executive Profiles in ' + state;
      }else if(params.type === 'company'){
        var title = 'Company Profiles in ' + state;
      }
    }

    return title;
  },
  //Helper to determine sort title
  sort_title: function(){
    var params = Router.current().getParams();

    //Write title based on parameters.
    //If state is not defined write title with 'in the United States of America', else write particular state
    if(typeof params.query.state === 'undefined'){
      if(params.type === 'officer'){
        var title = 'Browse Executive Profiles from A to Z';
      }else if(params.type === 'company'){
        var title = 'Browse Company Profiles from A to Z';
      }
    }else{
      var title = 'Browse Company Profiles by State';
    }

    return title;
  },
  //Helper to build sort buttons
  sortButtons: function(){
    var params = Router.current().getParams();

    if(typeof params.query.state === 'undefined'){

      var sortButtons = [
         {disp: '#', vln: true},
         {disp: 'A', vln: true},
         {disp: 'B', vln: true},
         {disp: 'C', vln: true},
         {disp: 'D', vln: true},
         {disp: 'E', vln: true},
         {disp: 'F', vln: true},
         {disp: 'G', vln: true},
         {disp: 'H', vln: true},
         {disp: 'I', vln: true},
         {disp: 'J', vln: true},
         {disp: 'K', vln: true},
         {disp: 'L', vln: true},
         {disp: 'M', vln: true},
         {disp: 'N', vln: true},
         {disp: 'O', vln: true},
         {disp: 'P', vln: true},
         {disp: 'Q', vln: true},
         {disp: 'R', vln: true},
         {disp: 'S', vln: true},
         {disp: 'T', vln: true},
         {disp: 'U', vln: true},
         {disp: 'V', vln: true},
         {disp: 'W', vln: true},
         {disp: 'X', vln: true},
         {disp: 'Y', vln: true},
         {disp: 'Z', vln: false}
       ];

       sortButtons.map(function(item, index){
         //If the button does not equal # or Newly Added (Newly added not available right now and blank is the same as #)
         if(item.disp !== '#'){
           if(typeof params.partner_id === 'undefined'){
             var path = Router.path('content.finance.directory', {pageNum: 1, type: params.type}, {query: 'sort=' + item.disp});
           }else{
             var path = Router.path('partner.finance.directory', {pageNum: 1, type: params.type, partner_id: params.partner_id}, {query: 'sort=' + item.disp});
           }
         }else{
           if(typeof params.partner_id === 'undefined'){
             var path = Router.path('content.finance.directory', {pageNum: 1, type: params.type});
           }else{
             var path = Router.path('partner.finance.directory', {pageNum: 1, type: params.type, partner_id: params.partner_id});
           }
         }
         //Set button path
         item.path = path;
         //Set color to blue if option is selected in query parameters.
         if(item.disp === params.query.sort){
           item.color = true;
         }else if(item.disp === '#' && typeof params.query.sort === 'undefined'){
           //If no sort parameter is defined, set color to blue of '#' button (default)
           item.color = true;
         }

         return item;
       })

     }else{
     var sortButtons = [
       {val: 'AL', disp: 'Alabama', vln: true},
       {val: 'AK', disp: 'Alaska', vln: true},
       {val: 'AZ', disp: 'Arizona', vln: true},
       {val: 'AR', disp: 'Arkansas', vln: true},
       {val: 'CA', disp: 'California', vln: true},
       {val: 'CO', disp: 'Colorado', vln: true},
       {val: 'CT', disp: 'Connecticut', vln: true},
       {val: 'DE', disp: 'Delaware', vln: true},
       {val: 'FL', disp: 'Florida', vln: true},
       {val: 'GA', disp: 'Georgia', vln: true},
       {val: 'HI', disp: 'Hawaii', vln: true},
       {val: 'ID', disp: 'Idaho', vln: true},
       {val: 'IL', disp: 'Illinois', vln: true},
       {val: 'IN', disp: 'Indiana', vln: true},
       {val: 'IA', disp: 'Iowa', vln: true},
       {val: 'KS', disp: 'Kansas', vln: true},
       {val: 'KY', disp: 'Kentucky', vln: true},
       {val: 'LA', disp: 'Lousiana', vln: true},
       {val: 'ME', disp: 'Maine', vln: true},
       {val: 'MD', disp: 'Maryland', vln: true},
       {val: 'MA', disp: 'Maine', vln: true},
       {val: 'MI', disp: 'Michigan', vln: true},
       {val: 'MN', disp: 'Minnesota', vln: true},
       {val: 'MS', disp: 'Mississippi', vln: true},
       {val: 'MO', disp: 'Missouri', vln: true},
       {val: 'MT', disp: 'Montana', vln: true},
       {val: 'NE', disp: 'Nebraska', vln: true},
       {val: 'NV', disp: 'Nevada', vln: true},
       {val: 'NH', disp: 'New Hampshire', vln: true},
       {val: 'NJ', disp: 'New Jersey', vln: true},
       {val: 'NM', disp: 'New Mexico', vln: true},
       {val: 'NY', disp: 'New York', vln: true},
       {val: 'NC', disp: 'North Carolina', vln: true},
       {val: 'ND', disp: 'North Dakota', vln: true},
       {val: 'OH', disp: 'Ohio', vln: true},
       {val: 'OK', disp: 'Oklahoma', vln: true},
       {val: 'OR', disp: 'Oregon', vln: true},
       {val: 'PA', disp: 'Pennsylvania', vln: true},
       {val: 'RI', disp: 'Rhode Island', vln: true},
       {val: 'SC', disp: 'South Carolina', vln: true},
       {val: 'SD', disp: 'South Dakota', vln: true},
       {val: 'TN', disp: 'Tennessee', vln: true},
       {val: 'TX', disp: 'Texas', vln: true},
       {val: 'UT', disp: 'Utah', vln: true},
       {val: 'VT', disp: 'Vermont', vln: true},
       {val: 'VA', disp: 'Virginia', vln: true},
       {val: 'WA', disp: 'Washington', vln: true},
       {val: 'DC', disp: 'Washington, D.C.', vln: true},
       {val: 'WV', disp: 'West Virginia', vln: true},
       {val: 'WI', disp: 'Wisconsin', vln: true},
       {val: 'WY', disp: 'Wyoming', vln: false}
     ];

     sortButtons.map(function(item, index){
       //If the button does not equal # or Newly Added (Newly added not available right now and blank is the same as #)
       if(item.disp !== '#'){
         if(typeof params.partner_id === 'undefined'){
           var path = Router.path('content.finance.directory', {pageNum: 1, type: params.type}, {query: 'state=' + item.val});
         }else{
           var path = Router.path('partner.finance.directory', {pageNum: 1, type: params.type, partner_id: params.partner_id}, {query: 'state=' + item.val});
         }
       }else{
         if(typeof params.partner_id === 'undefined'){
           var path = Router.path('content.finance.directory', {pageNum: 1, type: params.type});
         }else{
           var path = Router.path('partner.finance.directory', {pageNum: 1, type: params.type, partner_id: params.partner_id});
         }
       }
       //Set button path
       item.path = path;
       //Set color to blue if option is selected in query parameters.
       if(item.val === params.query.state){
         item.color = true;
       }else if(item.disp === '#' && typeof params.query.state === 'undefined'){
         //If no sort parameter is defined, set color to blue of '#' button (default)
         item.color = true;
       }

       return item;
     })

   }//Close else

   return sortButtons;
  },
  //Helper to build list
  profiles: function(){
    var data = Session.get('directory_data');
    //Exit helper if data undefined
    if(typeof data === 'undefined'){
      return '';
    }

    //Build return array
    var returnArr = [];
    //Loop through each entry
    data.directory.listings.forEach(function(item, index){

      switch(item.type){
        case 'officer':

          //Unused
          //var years = new Date().getFullYear() - item.o_current_title.start_year;
          //var years = years === 1 ? years + ' year' : years + ' years';

          var url1 = Router.pick_path('content.executiveprofile', {lname: item.o_last_name, fname: item.o_first_name, ticker: item.c_ticker, exec_id: item.o_id});
          var url3 = Router.pick_path('content.companyprofile', {company_id: item.c_id, name: compUrlName(item.c_name), ticker: item.c_ticker});

          if(item.c_hq_state !== ''){
            var url4 = Router.pick_path('content.locationprofile', {loc_id: item.c_hq_state, city: toTitleCase(item.c_hq_city)});
          }else{
            var url4 = '';
          }

          //Build path 1 variable (Location of officer)
          if(item.c_hq_city !== '' && item.c_hq_state !== ''){
            var path1 = toTitleCase(item.c_hq_city) + ', ' + item.c_hq_state;
          }else if(item.c_hq_city !== '' && item.c_hq_state === ''){
            var path1 = toTitleCase(item.c_hq_city);
          }else if(item.c_hq_city === '' && item.c_hq_state !== ''){
            var path1 = item.c_hq_state;
          }else{
            var path1 = 'Location N/A';
          }


          returnArr.push({
            text1: item.o_first_name + ' ' + item.o_last_name,
            text3: item.c_name,
            url1: url1,
            url3: url3,
            url4: url4,
            lastUpdated: item.o_last_updated,
            path1: path1,
            path2: item.o_current_title.long_title,
            //path3: years
          })
        break;
        case 'company':

          var name = FullNameSplit(item.c_ceo_name);

          var sectorEncode = item.c_sector.replace(/ /g, "-");

          var url1 = Router.pick_path('content.companyprofile', {company_id: item.c_id, name: compUrlName(item.c_name), ticker: item.c_ticker});
          var url4 = Router.pick_path('content.locationprofile', {loc_id: item.c_hq_state, city: toTitleCase(item.c_hq_city)});
          var url5 = Router.pick_path('content.sector', {loc_id: item.c_hq_state, sector_id: sectorEncode, page_num: 1});
          var url6 = Router.pick_path('content.executiveprofile', {lname: name.lname, fname: name.fname, exec_id: item.c_ceo_id, ticker: item.c_ticker});

          returnArr.push({
            text1: item.c_name,
            text3: item.c_ticker,
            url1: url1,
            url3: url1,
            url4: url4,
            url5: url5,
            url6: url6,
            lastUpdated: item.c_tr_last_updated,
            path1: toTitleCase(item.c_hq_city) + ', ' + item.c_hq_state,
            path2: item.c_sector,
            path3: item.c_ceo_name
          })
        break;
        case 'location':

          returnArr.push({
            text1: item.location_name
          })
        break;
      }//Close switch
    })//Close for each

    return returnArr;
  },
  //to change the tile color
  getcolor:function(){
    if(color==="white"){
       color="gray";
       return color;
     }
     else {
       color="white";
       return color;
     }
   }
});

 Template.showdetails.helpers({
   //Helper to determine page range
   pageRange: function(){
     var params = Router.current().getParams();
     var pageNum = Number(params.pageNum);
     var data = Session.get('directory_data');

     if(typeof data === 'undefined'){
       return '';
     }

     var total = data.directory.total_profiles;

     if(pageNum * 25 > total){
       var end = total;
     }else{
       var end = pageNum * 25;
     }

     return {
       start: ((pageNum - 1) * 25) + 1,
       end: end,
       total: commaSeparateNumber_decimal(total)
     }
   },
   //Helper to create links
   navLink: function(){
     var params = Router.current().getParams();
     var pageNum = Number(params.pageNum);
     var data = Session.get('directory_data');

     if(typeof data === 'undefined'){
       return '';
     }

     var total = data.directory.total_profiles;

     if(typeof params.query.sort !== 'undefined'){
       var query = {sort: params.query.sort};
     }else if(typeof params.query.state !== 'undefined'){
       var query = {state: params.query.state};
     }else{
       var query = undefined;
     }

     if(pageNum === 1){
       var prev = '';
     }else if(pageNum !== 1 && typeof query !== 'undefined'){

       if(typeof params.partner_id === 'undefined'){
         var prev = Router.path('content.finance.directory', {pageNum: pageNum - 1, type: params.type}, {query: query});
       }else{
         var prev = Router.path('partner.finance.directory', {pageNum: pageNum - 1, type: params.type, partner_id: params.partner_id}, {query: query});
       }

     }else{

        if(typeof params.partner_id === 'undefined'){
          var prev = Router.path('content.finance.directory', {pageNum: pageNum - 1, type: params.type});
        }else{
          var prev = Router.path('partner.finance.directory', {pageNum: pageNum - 1, type: params.type, partner_id: params.partner_id});
        }

     }

     if(pageNum * 25 >= total){
       var next = '';
     }else if(typeof query !== 'undefined'){

       if(typeof params.partner_id === 'undefined'){
         var next = Router.path('content.finance.directory', {pageNum: pageNum + 1, type: params.type}, {query: query});
       }else{
         var next = Router.path('partner.finance.directory', {pageNum: pageNum + 1, type: params.type, partner_id: params.partner_id}, {query: query});
       }

     }else{

       if(typeof params.partner_id === 'undefined'){
         var next = Router.path('content.finance.directory', {pageNum: pageNum + 1, type: params.type});
       }else{
         var next = Router.path('partner.finance.directory', {pageNum: pageNum + 1, type: params.type, partner_id: params.partner_id});
       }

    }

     return{
       next: next,
       prev: prev
     }
   }
 })
