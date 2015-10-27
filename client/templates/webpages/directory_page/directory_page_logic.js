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

 //helpers
 Template.directory_page.helpers({
   //to print a to z
   location:'United States',
   title: function(){
    var params = Router.current().getParams();

    if(params.type === 'officer'){
      var title = 'Executive Profiles in the United States of America';
    }else if(params.type === 'company'){
      var title = 'Company Profiles in the United States of America';
    }else if(params.type === 'location'){
      var title = 'Location Profiles in the United States of America';
    }

    return title;
  },
     //Helper to build sort buttons
     sortButtons: function(){
      var params = Router.current().getParams();
      var atoz = [
         {az: '#', vln:true},
         {az: 'A', vln:true},{az: 'B', vln:true}, {az: 'C', vln:true},{az: 'D', vln:true},{az: 'E', vln:true},{az: 'F', vln:true},{az: 'G', vln:true},{az: 'H', vln:true},{az: 'I', vln:true},{az: 'J', vln:true},{az: 'K', vln:true},{az: 'L', vln:true},{az: 'M', vln:true},
         {az: 'N', vln:true},{az:'O', vln:true},{az: 'P', vln:true}, {az: 'Q', vln:true}, {az: 'R', vln:true}, {az: 'S', vln:true}, {az: 'T', vln:true}, {az: 'U', vln:true}, {az: 'V', vln:true},{az: 'W', vln:true},{az: 'X', vln:true}, {az: 'Y', vln:true}, {az: 'Z', vln:false}];

       atoz.map(function(item, index){
         //If the button does not equal # or Newly Added (Newly added not available right now and blank is the same as #)
         if(item.az !== '#'){
           var path = Router.path('content.finance.directory', {pageNum: 1, type: params.type}, {query: 'sort=' + item.az});
         }else{
           var path = Router.path('content.finance.directory', {pageNum: 1, type: params.type});
         }
         //Set button path
         item.path = path;
         //Set color to blue if option is selected in query parameters.
         if(item.az === params.query.sort){
           item.color = true;
         }else if(item.az === '#' && typeof params.query.sort === 'undefined'){
           //If no sort parameter is defined, set color to blue of '#' button (default)
           item.color = true;
         }

         return item;
       })

       return atoz;
     },
     //Helper to build list
      profiles: function(){
        var data = Session.get('directory_data');
        //Exit helper if data undefined
        if(typeof data === 'undefined'){
          return '';
        }

        console.log('RETURNED DATA', data);

        //Build return array
        var returnArr = [];
        //Loop through each entry
        data.directory.listings.forEach(function(item, index){

          switch(item.type){
            case 'officer':

              var years = new Date().getFullYear() - item.o_current_title.start_year;
              var years = years === 1 ? years + ' year' : years + ' years';
              
              var url1 = Router.path('content.executiveprofile', {exec_id: item.o_id});

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
                text2: 'Executive',
                text3: item.c_name,
                url1: url1,
                lastUpdated: item.o_last_updated,
                path1: path1,
                path2: item.o_current_title.long_title,
                path3: years
              })
            break;
            case 'company':

              var url1 = Router.path('content.companyprofile', {company_id: item.c_ticker});

              returnArr.push({
                text1: item.c_name,
                text2: 'Company',
                text3: item.c_ticker,
                url1: url1,
                url3: url1,
                lastUpdated: item.c_tr_last_updated,
                path1: item.c_hq_city + ', ' + item.c_hq_state,
                path2: item.c_sector,
                path3: item.c_industry,
                path4: item.c_ceo_name
              })
            break;
            case 'location':

              returnArr.push({
                text1: item.location_name,
                text2: 'DMA: ' + item.dma_region_id
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

     if(typeof params.query !== 'undefined' && typeof params.query.sort !== 'undefined'){
       var query = {sort: params.query.sort};
     }else{
       var query = undefined;
     }

     if(pageNum === 1){
       var prev = '';
     }else if(pageNum !== 1 && typeof query !== 'undefined'){
       var prev = Router.path('content.finance.directory', {pageNum: pageNum - 1, type: params.type}, {query: query});
     }else{
        var prev = Router.path('content.finance.directory', {pageNum: pageNum - 1, type: params.type});
     }

     if(pageNum * 25 >= total){
       var next = '';
     }else if(typeof query !== 'undefined'){
       var next = Router.path('content.finance.directory', {pageNum: pageNum + 1, type: params.type}, {query: query});
     }else{
       var next = Router.path('content.finance.directory', {pageNum: pageNum + 1, type: params.type});
    }

     return{
       next: next,
       prev: prev
     }
   }
 })
