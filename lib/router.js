//Home Route
// Router.route('/:partner_id?/home',
//   function(){
//
//   }, {
//     name: 'content.realestate.homepage'
// })
// Router.route('/')

Router.pick_path = function(route_name, router_params, current_params) {
  if ( (typeof current_params != "undefined" && typeof current_params.partner_id != "undefined") || ( typeof Router.current != "undefined" && typeof Router.current().params.partner_id != "undefined") ) {
    route_name = 'partner.' + route_name.split('.')[1];
    if ( typeof current_params != "undefined" && typeof current_params.partner_id != "undefined" ) {
      router_params.partner_id = current_params.partner_id;
    } else {
      router_params.partner_id = Router.current().params.partner_id;
    }
  }
  if ( typeof router_params.loc_id != "undefined" ) {
    router_params.loc_id = compUrlName(router_params.loc_id);
  }
  var path = Router.path(route_name,router_params);
  if ( path == null ) {
    return '#';
  }
  return path;
}

/******************ROUTE MAP******************/
Router.map(function(){

  // ****** HOME PAGE ****** //
  this.route('content.finance.home',{
    path: '/',
    controller: 'HomePageController'
  });

  /********************PROFILES********************/
  this.route('content.companyprofile',{
    path:'/:ticker/:name/company/:company_id',
    controller: 'CompanyProfileController'
  });
  this.route('partner.companyprofile',{
    path:'/:partner_id/:name/:ticker/c/:company_id',
    controller: 'CompanyProfileController'
  });

  this.route('content.executiveprofile',{
    path:'/:fname-:lname/:ticker/executive/:exec_id',
    controller: 'ExecutiveProfileController'
  });
  this.route('partner.executiveprofile',{
    path:'/:partner_id/:ticker/:lname-:fname/e/:exec_id',
    controller: 'ExecutiveProfileController'
  });

  this.route('content.locationprofile',{
    path:'/:loc_id/:city?/location',
    controller: 'LocationProfileController'
  });
  this.route('partner.locationprofile',{
    path:'/:partner_id/:city?/:loc_id/loc',
    controller: 'LocationProfileController'
  });
 /********************PROFILES END********************/

 /*********ANYTHING BELOW THIS LINE ARE WEBPAGES**************/
 /*********LIST PAGES**************/
  this.route('content.toplist',{
    path: '/:l_name/:list_id/list/:loc_id?',
    controller: 'TopListController'
  });
  this.route('partner.toplist',{
    path: '/:partner_id/:l_name/:loc_id?/:list_id/list',
    controller: 'TopListController'
  });

  this.route('content.toplist2',{
    path: '/:loc_id?/:l_name/:list_id/executive-list',
    controller: 'TopList2Controller'
  });
  this.route('partner.toplist2',{
    path: '/:partner_id/:l_name/:loc_id?/:list_id/list-executives',
    controller: 'TopList2Controller'
  });

  this.route('content.search',{
    path: '/search/r=:search_results?',
    controller: 'SearchController'
  });
  this.route('partner.search',{
    path: '/:partner_id/s/r=:search_results?',
    controller: 'SearchController'
  });

  this.route('content.sector',{
    path: '/:loc_id/sector/:sector_id',
    controller: 'SectorController'
  });
  this.route('partner.sector',{
    path: '/:partner_id/sector/:loc_id/:sector_id',
    controller: 'SectorController'
  });

  this.route('content.boardcommittee',{
    path: '/:ticker/:name/executives/:company_id',
    controller: 'BoardCommitteeController'
  });
  this.route('partner.boardcommittee',{
    path: '/:partner_id/:name/:ticker/execs/:company_id',
    controller: 'BoardCommitteeController'
  });
  /*********LIST PAGES END**************/
  /*********STANDALONE PAGES**************/

  this.route('content.moneymemory',{ // CHANGED
    path: '/:ticker/:name/money-memory/:company_id',
    controller: 'MoneyMemoryController'
  })
  this.route('partner.moneymemory',{
    path: '/:partner_id/:name/:ticker/mon-mem/:company_id',
    controller: 'MoneyMemoryController'
  })

  this.route('content.earningsPR',{
    path: '/previous-earnings',
    controller: 'PreviousEarningsController'
  })
  this.route('partner.earningsPR',{
    path: '/:partner_id/previous-earnings',
    controller: 'PreviousEarningsController'
  })

  this.route('content.articlenews',{
    path: '/:ticker/:name/news/:company_id',
    controller: 'ArticleNewsController'
  });
  this.route('partner.articlenews',{
    path: '/:partner_id/:name/:ticker/n/:company_id',
    controller: 'ArticleNewsController'
  });

  this.route('content.articlenewsloc',{ // NEW
    path: '/:loc_id/news',
    controller: 'ArticleNewsController'
  })
  this.route('partner.articlenewsloc',{ // NEW
    path: '/:partner_id/news/:loc_id',
    controller: 'ArticleNewsController'
  })

  this.route('content.articlenewsexec',{ // NEW
    path: '/:fname-:lname/:ticker/news/:company_id',
    controller: 'ArticleNewsController'
  })
  this.route('partner.articlenewsexec',{ // NEW
    path: '/:partner_id/:ticker/:lname-:fname/news/:company_id',
    controller: 'ArticleNewsController'
  })

  this.route('content.disqus',{
    path: '/disqus',
    controller: 'DisqusController'
  })
  this.route('partner.disqus',{
    path: '/:partner_id/disqus',
    controller: 'DisqusController'
  })

  this.route('content.compensation',{ // CHANGED
    path: '/:lname-:fname/:ticker/compensation/:exec_id',
    controller: 'CompensationController'
  });
  this.route('partner.compensation',{ // CHANGED
    path: '/:partner_id/:ticker/:lname-:fname/comp/:exec_id',
    controller: 'CompensationController'
  })

  this.route('content.collegerivals',{ // CHANGED
    path: '/:fname-:lname/:ticker/rivals/:exec_id',
    controller: 'CollegeRivalsController'
  })
  this.route('partner.collegerivals',{ // CHANGED
    path: '/:partner_id/:ticker/:lname-:fname/rival/:exec_id',
    controller: 'CollegeRivalsController'
  })

  this.route('content.statistics',{ // CHANGED
    path: '/:loc_id/:city?/statistics',
    controller: 'StatisticsController'
  })
  this.route('partner.statistics',{ // CHANGED
    path: '/:partner_id/:city?/:loc_id/stats',
    controller: 'StatisticsController'
  })

  this.route('content.aboutexec',{ // CHANGED
    path: '/:fname-:lname/:ticker/about/:exec_id',
    controller: 'AboutexecController'
  })
  this.route('partner.aboutexec',{ // CHANGED
    path: '/:partner_id/:ticker/:lname-:fname/abt/:exec_id',
    controller: 'AboutexecController'
  })

  this.route('content.workhistory',{
    path: '/:lname-:fname/:ticker/workhistory/:exec_id',
    controller: 'WorkHistoryController'
  })
  this.route('partner.workhistory',{
    path: '/:partner_id/:ticker/:lname-:fname/wrk-hist/:exec_id',
    controller: 'WorkHistoryController'
  })

  this.route('content.abouthq',{ // CHANGED
    path: '/:ticker/:name/hq/:company_id',
    controller: 'AboutHQController'
  })
  this.route('partner.abouthq',{ // CHANGED
    path: '/:partner_id/:name/:ticker/headquarters/:company_id',
    controller: 'AboutHQController'
  })
  /*********STANDALONE PAGES END**************/

  /*********FINANCIAL PAGES**************/
  this.route('content.finoverview',{ // CHANGED
    path: '/:ticker/:name/financial-overview/:company_id',
    controller: 'FinancialOverviewController'
  })
  this.route('partner.finoverview',{ // CHANGED
    path: '/:partner_id/:name/:ticker/fin-view/:company_id',
    controller: 'FinancialOverviewController'
  })

  this.route('content.competitor',{ // CHANGED
    path: '/:ticker/:name/competitors/:company_id',
    controller: 'CompetitorController'
  })
  this.route('partner.competitor',{ // CHANGED
    path: '/:partner_id/:name/:ticker/rivals/:company_id',
    controller: 'CompetitorController'
  })

  this.route('content.listoflist',{ // CHANGED
    path: '/:ticker/:name/lists/:company_id',
    controller: 'ListofListController'
  })
  this.route('partner.listoflist',{ // CHANGED
    path: '/:partner_id/:name/:ticker/list/:company_id',
    controller: 'ListofListController'
  })

  this.route('content.listoflistloc',{ // NEW 10/28/2015
    path: '/:loc_id/lists',
    controller: 'ListofListLocController'
  })
  this.route('partner.listoflistloc',{ // NEW 10/28/2015
    path: '/:partner_id/lists/:loc_id',
    controller: 'ListofListLocController'
  })

  /*********FINANCIAL PAGES END**************/

  /*********DISCLAIMER**************/
  this.route('content.disclaimer',{
    //disclaimer page
    path:'/disclaimer',
    controller: 'DisclaimerController'
  })
  this.route('partner.disclaimer',{
    //disclaimer page
    path:'/:partner_id/disclaimer',
    controller: 'DisclaimerController'
  })

  this.route('content.contactus',{
    //contact us page
    path:'/contactus',
    controller: 'ContactUsController'
  })
  this.route('partner.contactus',{
    //contact us page
    path:'/:partner_id/contactus',
    controller: 'ContactUsController'
  })

  this.route('content.copyright',{
    //copyright page
    path:'/copyright',
    controller: 'CopyrightController'
  })
  this.route('partner.copyright',{
    //copyright page
    path:'/:partner_id/copyright',
    controller: 'CopyrightController'
  })

  this.route('content.privacypolicy',{
    //Privacy Policy page
    path:'/privacy-policy',
    controller: 'PrivacyPolicyController'
  })
  this.route('partner.privacypolicy',{
    //Privacy Policy page
    path:'/:partner_id/privacy-policy',
    controller: 'PrivacyPolicyController'
  })

  this.route('content.aboutus',{
    //about us page
    path:'/aboutus',
    controller: 'AboutUsController'
  })
  this.route('partner.aboutus',{
    //about us page
    path:'/:partner_id/aboutus',
    controller: 'AboutUsController'
  })

  this.route('content.stockdisclaimer',{
    //about us page
    path:'/stock-disclaimer',
    controller: 'StockDisclaimerController'
  })
  this.route('partner.stockdisclaimer',{
    //about us page
    path:'/:partner_id/stock-disclaimer',
    controller: 'StockDisclaimerController'
  })

  this.route('content.termsofservice',{
    //about us page
    path:'/terms-of-service',
    controller: 'TermsOfServiceController'
  })
  this.route('partner.termsofservice',{
    //about us page
    path:'/:partner_id/terms-of-service',
    controller: 'TermsOfServiceController'
  })
  /*********DISCLAIMER END**************/

  this.route('content.comingsoon',{
    path: '/coming-soon',
    controller: 'ComingSoonController'
  })
  this.route('partner.comingsoon',{
    path: '/:partner_id/coming-soon',
    controller: 'ComingSoonController'
  })

  this.route('content.noresults',{
    path: '/no-results',
    controller: 'ResultsController'
  })
  this.route('partner.noresults',{
    path: '/:partner_id/no-results',
    controller: 'ResultsController'
  })

  this.route('content.finance.directory',{
    path: '/directory/profiles/:type/page/:pageNum',
    controller: 'DirectoryController'
  })
  this.route('partner.finance.directory',{
    path: '/:partner_id/directory/profiles/:type/page/:pageNum',
    controller: 'DirectoryController'
  })

  /*********WEBPAGES END**************/

  /*********PARTNER PAGE**************/
  this.route('content.partnerhome',{
    path: '/:partner_id',
    controller: 'PartnerHomeController'
  });

});
/******************END OF ROUTE MAP******************/

/*********************BASE CONTROLLER********************/
//All controllers with go through this controller extension before running it's primary controller function
Router.configure({
  layoutTemplate: 'finance_layout_loading',
  // loadingTemplate: 'realestate_loading',
  notFoundTemplate: 'finance_404'
});

BaseController = RouteController.extend({
  onBeforeAction: function(){
    //scrollUp() is a globalfunc.js  go to top of page
    scrollUp();
    if ( Session.get('IsError') ) {
      this.layout('finance_layout');
      this.render('finance_error');
    }
    else {
      this.layout('finance_layout');
      this.render('finance_loading');
    }
    /*
      Render the partner header
    */
    if ( typeof this.params.partner_id != "undefined" && typeof Session.get('IsGlobalFirstRun') == "undefined" ) {
      var doCall = true;
      if ( typeof Storage != "undefined" && typeof localStorage[this.params.partner_id] != "undefined" ) {
        var p_data = JSON.parse(localStorage[this.params.partner_id]);
        Session.set('partner_header_code',p_data.results.header.script);
      }
      if ( typeof p_data == "undefined" || typeof p_data.date == "undefined" || ((new Date()).getTime() - p_data.date) > 604800000 ) {
        Meteor.call('GetPartnerHeader',this.params.partner_id,function(error,data){
          if ( error ) {
            console.log('Partner Header Error:', error);
            return false;
          }

          try {
            var p_data = JSON.parse(data.content);
            p_data.date = (new Date()).getTime();
            if ( typeof p_data.status != "undefined" ) {
              console.log('Invalid partner domain: ', Router.current().params.partner_id);
              return false;
            }
            if ( typeof Storage != "undefined" ) {
              localStorage[Router.current().params.partner_id] = JSON.stringify(p_data);
            }
            Session.set('partner_header_code',p_data.results.header.script);
          } catch (e) {
            console.log('Partner Error (parsing)',e);
          }
        });
      } else {
        console.log('Partner Header Previously Downloaded');
      }
      Session.set('IsGlobalFirstRun', false);
    }
    this.next();
  }
})
/*********************BASE CONTROLLER END****************/

/**********************PROFILE_CONTROLLERS*************************/
CompanyProfileController = BaseController.extend({
 onBeforeAction: function(){
   console.log('EXCHANGE:', this.params.exchange);
   console.log('COMPANY:', this.params.comp_name);
   console.log('ID:', this.params.company_id);
   console.log("GATHERING DATA FOR COMPANY PROFILE");
   Session.set("IsCompany", true);
   Session.set('pageExchange',this.params.exchange);
   Session.set('pageCompany',this.params.comp_name);
   Session.set('page_id',this.params.company_id);
   // Only run the calls that get the data if it's the first run
   // This prevents the calls from being looped
   if ( typeof Session.get('IsFirstRun') == "undefined" ) {
     // Prevent this loop from running again
     Session.set('IsFirstRun',false);

     /*****************************************
     Meteor method call for server side ajax
     path:'/:partner_id?/company/:exchange/:comp_name/:company_id',
     methods.js: GetCompanyData: function(company_id, batchNum)
     ******************************************/
     //BATCH 1 call sending only first few modules data
     Meteor.call("GetCompanyData",this.params.company_id, "batch_1", function(error, data){
       //console.log("batch1", data);
       if(error || typeof data == 'undefined'){
         console.log('Invalid Company Error',error);
         Session.set('IsError',true);
         Session.set("IsData",false);
         return '';
       }
       for ( var module_name in data ) {
         if ( data.hasOwnProperty(module_name) ) {
           //console.log(module_name,data[module_name]);
           Session.set(module_name,data[module_name]);
         }
         Session.set("IsData",true);
       }

       //BATCH 2 call sending only next few modules data
       Meteor.call("GetCompanyData",Session.get('profile_header').c_id, "batch_2", function(error, data){
         //console.log("batch2", data);
         if(error){
           //console.log('Invalid Company Batch 2 Error',error);
           return '';
         }
         for ( var module_name in data ) {
           if ( data.hasOwnProperty(module_name) ) {
             //console.log(module_name,data[module_name]);
             Session.set(module_name,data[module_name]);
           }
         }

         //BATCH 3 call sending rest of the data missing
         Meteor.call("GetCompanyData",Session.get('profile_header').c_id, "batch_3", function(error, data){
           //console.log("batch3", data);
           if(error){
             console.log('Invalid Company Batch 3',error);
             return '';
           }
           for ( var module_name in data ) {
             if ( data.hasOwnProperty(module_name) ) {
               //console.log(module_name,data[module_name]);
               Session.set(module_name,data[module_name]);
             }
           }
         });
       });
     });
     /*
     */
   }
   this.next();
 },
 action: function(){

   if ( Session.get('IsData') ) {
     //renders the layout of all finance page and company profile
     console.log("RENDERING COMPANY PROFILE");
     this.layout('finance_layout');
     this.render('company_profile');
   }
 }
});

ExecutiveProfileController = BaseController.extend({
 onBeforeAction: function(){
   console.log('COMPANY:', this.params.comp_name);
   console.log('EXECUTIVE:', this.params.exec_name);
   console.log('EXEC ID:', this.params.exec_id);
   console.log("GATHERING DATA FOR EXECUTIVE PROFILE");
   Session.set("IsExec", true);
   Session.set('pageCompany',this.params.comp_name);
   Session.set('pageExec',this.params.exec_name);
   Session.set("exec_id", this.params.exec_id);
   // Only run the calls that get the data if it's the first run
   // This prevents the calls from being looped
   if ( typeof Session.get('IsFirstRun') == "undefined" ) {
     // Prevent this loop from running again
     Session.set('IsFirstRun',false);
     /*****************************************
     Meteor method call for server side ajax
     path:'/:partner_id?/executive/:comp_name/:exec_name/:exec_id',
     methods.js: GetExecData: function(exec_id, batchNum)
     ******************************************/
     //BATCH 1 call sending only first few modules data
     Meteor.call("GetExecData",Session.get('exec_id'), "batch_1", function(error, data){
       //console.log("batch1", data);
       if(error || typeof data == 'undefined'){
         console.log('Invalid Exec Batch 1 Error',error);
         Session.set('IsError',true);
         Session.set("IsData",false);
         return '';
       }else{

         for ( var module_name in data ) {
           if ( data.hasOwnProperty(module_name) ) {
             //console.log(module_name,data[module_name]);
             Session.set(module_name,data[module_name]);
           }
         }

         //BATCH 2 call sending only next few modules data
         Meteor.call("GetExecData",Session.get('exec_id'), "batch_2", function(error, data){
           //console.log("batch2", data);
           if(error){
             console.log('Invalid Exec Batch 2 Error',error);
             return '';
           }
           for ( var module_name in data ) {
             if ( data.hasOwnProperty(module_name) ) {
               //console.log(module_name,data[module_name]);
               Session.set(module_name,data[module_name]);
             }
           }

           //BATCH 3 call sending rest of the data missing
           Meteor.call("GetExecData",Session.get('exec_id'), "batch_3", function(error, data){
             //console.log("batch3", data);
             if(error){
               console.log('Invalid Exec Batch 3 Error',error);
               return '';
             }
             for ( var module_name in data ) {
               if ( data.hasOwnProperty(module_name) ) {
                 //console.log(module_name,data[module_name]);
                 Session.set(module_name,data[module_name]);
               }
             }
           });
         });
       }
    });
   }
   this.next();
 },
 action: function(){
   if ( Session.get('IsData') ) {
     //renders the layout of all finance page and company profile
     this.layout('finance_layout');
     this.render('executive_profile');
   }
 }
});

LocationProfileController = BaseController.extend({
 onBeforeAction: function(){
   console.log("PARTNER:", this.params.partner_id);
   console.log("LOCATION:", this.params.loc_id);
   Session.set("IsLocation", true);
   Session.set("loc_id", this.params.loc_id);
   //Session.set("city_id", this.params.city_id);
   // Only run the calls that get the data if it's the first run
   // This prevents the calls from being looped
   if ( typeof Session.get('IsFirstRun') == "undefined" ) {
     // Prevent this loop from running again
     Session.set('IsFirstRun',false);

     /*****************************************
     Meteor method call for server side ajax
     ppath:'/:partner_id?/location/:state_id/:city_id?',
     methods.js: GetProfileData: function(profile, batchNum, state, city)
     ******************************************/
     //BATCH 1 call sending only first few modules data
     Meteor.call("GetLocationData", Session.get('loc_id'), "batch_1", function(error, data){
       //console.log("batch1", data);
       if(error || typeof data == 'undefined'){
         console.log('Invalid Exec Batch 1 Error',error);
         Session.set('IsError',true);
         Session.set("IsData",false);
         return '';
       }else{
         for ( var module_name in data ) {
           if ( data.hasOwnProperty(module_name) ) {
             //console.log(module_name,data[module_name]);
             Session.set(module_name,data[module_name]);
           }
         }
         console.log("RENDER PAGE");
         Session.set("IsData",true);
         //BATCH 2 call sending only next few modules data
         Meteor.call("GetLocationData", Session.get('loc_id'), "batch_2", function(error, data){
           //console.log("batch2", data);
           if(error){
             console.log('Invalid Exec Batch 2 Error',error);
             return '';
           }
           for ( var module_name in data ) {
             if ( data.hasOwnProperty(module_name) ) {
               //console.log(module_name,data[module_name]);
               Session.set(module_name,data[module_name]);
             }
           }
         });//end BATCH 2

         //BATCH 3 call sending rest of the data missing
         Meteor.call("GetLocationData", Session.get('loc_id'), "batch_3", function(error, data){
           //console.log("batch3", data);
           if(error){
             console.log('Invalid Exec Batch 3 Error',error);
             return '';
           }
           for ( var module_name in data ) {
             if ( data.hasOwnProperty(module_name) ) {
               //console.log(module_name,data[module_name]);
               Session.set(module_name,data[module_name]);
             }
           }
         });//end BATCH 3

         //BATCH 4 call sending rest of the data missing
         Meteor.call("GetLocationData", Session.get('loc_id'), "batch_4", function(error, data){
           //console.log("batch4", data);
           if(error){
             console.log('Invalid Exec Batch 4 Error',error);
             return '';
           }
           for ( var module_name in data ) {
             if ( data.hasOwnProperty(module_name) ) {
               //console.log(module_name,data[module_name]);
               Session.set(module_name,data[module_name]);
             }
           }
           //BATCH 5 call sending rest of the data missing
           Meteor.call("GetLocationData", Session.get('loc_id'), "batch_5", function(error, data){
             //console.log("batch5", data);
             if(error){
               console.log('Invalid Exec Batch 5 Error',error);
               return '';
             }
             for ( var module_name in data ) {
               if ( data.hasOwnProperty(module_name) ) {
                 //console.log(module_name,data[module_name]);
                 Session.set(module_name,data[module_name]);
               }
             }
           });//end BATCH 5
         });//end BATCH 4


         //BATCH 6 call sending rest of the data missing
         Meteor.call("GetLocationData", Session.get('loc_id'), "batch_6", function(error, data){
           //console.log("batch6", data);
           if(error){
             console.log('Invalid Exec Batch 6 Error',error);
             return '';
           }
           for ( var module_name in data ) {
             if ( data.hasOwnProperty(module_name) ) {
               //console.log(module_name,data[module_name]);
               Session.set(module_name,data[module_name]);
             }
           }
           //BATCH 7 call sending rest of the data missing
           Meteor.call("GetLocationData", Session.get('loc_id'), "batch_7", function(error, data){
             //console.log("batch7", data);
             if(error){
               console.log('Invalid Exec Batch 7 Error',error);
               return '';
             }
             for ( var module_name in data ) {
               if ( data.hasOwnProperty(module_name) ) {
                 //console.log(module_name,data[module_name]);
                 Session.set(module_name,data[module_name]);
               }
             }
           });//end BATCH 7
         });//end BATCH 6

       }
    });//end BATCH 1
   }
   this.next();
 },
 action: function(){
   Session.set("IsData",true);
   // Check for data
   if ( Session.get('IsData') ) {
     //renders the layout of all finance page and company profile
     this.layout('finance_layout');
     this.render('location_profile');
   }
 }
});

PartnerHomeController = BaseController.extend({
  action: function() {
    this.layout('finance_layout');
    this.render('location_profile');
  }
})

/****************************END PROFILE_CONTROLLERS*******************************/

/****************************WEBPAGE CONTROLLERS*******************************/
/*********LIST CONTROLLER**************/
TopListController = BaseController.extend({
 onBeforeAction: function(){
   console.log("RENDERING Top List");
   console.log("Location",this.params.loc_id);
   console.log("List-Index",this.params.list_id);
   Session.set('widgets', this.params.list_id);
   // Only run the calls that get the data if it's the first run
   // This prevents the calls from being looped
   if ( typeof Session.get('IsFirstRun') == "undefined" ) {
     // Prevent this loop from running again
     Session.set('IsFirstRun',false);
     /*****************************************
     Meteor method call for server side ajax
     path: '/:loc_id/:l_name/:list_id/list',
     topListData: function(index ,loc_id)
     ******************************************/
     Meteor.call("topListData", this.params.list_id, this.params.loc_id, function(error, data){
       console.log(data, error);
       if(error){
         console.log('Invalid Team Error',error);
         Session.set('IsError',true);
         return '';
       }
       //if no list is being returned go to error page
       if(Session.get('widgets') == 'sv150_gainers' || Session.get('widgets') == 'sv150_losers'){
         for ( var module_name in data ) {
           if ( data.hasOwnProperty(module_name) ) {
             //console.log(module_name,data[module_name]);
             Session.set(module_name,data[module_name]);
           }
           Session.set("IsData",true);
         }//end for
       }else{
         if(data.top_list_gen != null || typeof data.top_list_gen != 'undefined'){
           var listCheck = data.top_list_gen;
         }
          //check if a list is even being returned
         if(listCheck == null || typeof listCheck == 'undefined'){
           Session.set('IsError',true);
         }else{
           //check further in case data call returns but array length is at 0
           if(listCheck.top_list_list == null || typeof listCheck.top_list_list == 'undefined' || listCheck.top_list_list.length == 0){
             Session.set('IsError',true);
           }else{
             for ( var module_name in data ) {
               if ( data.hasOwnProperty(module_name) ) {
                 console.log(module_name,data[module_name]);
                 Session.set(module_name,data[module_name]);
               }
               Session.set("IsData",true);
             }//end for
           }//end else
         }//end else
       }
     });//end Meteor Call
   }
   this.next();
 },
 action: function(){
   if ( Session.get('IsData') ) {
     this.layout('finance_layout');
     this.render('list_view');
   }
  }
});

TopList2Controller = BaseController.extend({
 onBeforeAction: function(){
   console.log("RENDERING Top List");
   console.log("List-Index",this.params.list_id);
   console.log("lname",this.params.l_name);
   Session.set("IsData",true);
   // Only run the calls that get the data if it's the first run
   // This prevents the calls from being looped
   if ( typeof Session.get('IsFirstRun') == "undefined" ) {
     // Prevent this loop from running again
     Session.set('IsFirstRun',false);
     //path: '/:loc_id?/:l_name/:list_id/executive-list',
     Meteor.call("topListData", this.params.list_id, null, function(error, data){
       if(error){
         console.log('Invalid Team Error',error);
         Session.set('IsError',true);
         return '';
       }

       for ( var module_name in data ) {
         if ( data.hasOwnProperty(module_name) ) {
           //console.log(module_name,data[module_name]);
           Session.set(module_name,data[module_name]);
         }
         Session.set("IsData",true);
       }//end for
     });//end Meteor Call
   }
   this.next();
 },
 action: function(){
   console.log(Session.get('IsData'));
   if ( Session.get('IsData') ) {
     this.layout('finance_layout');
     this.render('list_view_exec');
   }
  }
});

SectorController = BaseController.extend({
 onBeforeAction: function(){
   console.log("RENDERING Sector Page");
   console.log("Location", this.params.loc_id);
   console.log("Sector", this.params.sector_id);
   Session.set("loc_id", this.params.loc_id);
   Session.set("sector_id", this.params.sector_id);

   // Only run the calls that get the data if it's the first run
   // This prevents the calls from being looped
   if ( typeof Session.get('IsFirstRun') == "undefined" ) {
     // Prevent this loop from running again
     Session.set('IsFirstRun',false);
     /*****************************************
     Meteor method call for server side ajax
     path: '/:partner_id?/collegerivals/:exec_id',
     methods.js: ExecWebpageData: function(exec_id, option)
     ******************************************/
     Meteor.call("sectorData", Session.get('loc_id'),Session.get('sector_id'), function(error, data){
       if(error || data.success == false){
         console.log('Invalid Team Error',error);
         Session.set('IsError',true);
         return '';
       }
       for ( var module_name in data ) {
         if ( data.hasOwnProperty(module_name) ) {
           console.log(module_name,data[module_name]);
           Session.set(module_name,data[module_name]);
         }
         Session.set("IsData",true);
       }
     });
   }
     /*
     */
   this.next();
 },
 action: function(){
   if ( Session.get('IsData') ) {
     this.layout('finance_layout');
     this.render('sector_page');
   }
 }
});

TrendingController = BaseController.extend({
 onBeforeAction: function(){
   console.log("RENDERING Trendings Page");
   Session.set('IsData',true);
   this.next();
 },
 action: function(){
   if ( Session.get('IsData') ) {
     this.layout('finance_layout');
     this.render('trending_page');
   }
 }
});

MarketRecapController = BaseController.extend({
 onBeforeAction: function(){
   console.log("RENDERING Market Recap Page");
   Session.set('IsData',true);
   this.next();
 },
 action: function(){
   if ( Session.get('IsData') ) {
     this.layout('finance_layout');
     this.render('market_recap_page');
   }
 }
});

BoardCommitteeController = BaseController.extend({
 onBeforeAction: function(){
   console.log("RENDERING Board Committee");
   // Only run the calls that get the data if it's the first run
   // This prevents the calls from being looped
   if ( typeof Session.get('IsFirstRun') == "undefined" ) {
     // Prevent this loop from running again
     Session.set('IsFirstRun',false);
     /*****************************************
     Meteor method call for server side ajax
     path: '/:partner_id?/compensation/:exec_id',
     methods.js: ExecWebpageData: function(exec_id, option)
     ******************************************/
     Meteor.call("CompWebPageData", this.params.company_id, 'officers', function(error, data){
       if(error){
         console.log('Invalid Team Error',error);
         Session.set('IsError',true);
         return '';
       }
       for ( var module_name in data ) {
         if ( data.hasOwnProperty(module_name) ) {
           console.log(module_name,data[module_name]);
           Session.set(module_name,data[module_name]);
         }
         Session.set("IsData",true);
       }
     });
     Meteor.call("CompIndie", this.params.company_id, 'profile_header', function(error, data){
       if(error){
         console.log('Invalid Team Error',error);
         Session.set('IsError',true);
         return '';
       }
       for ( var module_name in data ) {
         if ( data.hasOwnProperty(module_name) ) {
           console.log(module_name,data[module_name]);
           Session.set(module_name,data[module_name]);
         }
         Session.set("IsData",true);
       }
     });
   }
   this.next();
 },
 action: function(){
   if ( Session.get('IsData') ) {
     this.layout('finance_layout');
     this.render('co_board_committee');
   }
 }
});
/*********LIST CONTROLLER END**************/

/*********STANDALONE CONTROLLERS**************/
HomePageController = BaseController.extend({
  onBeforeAction: function() {
    if ( typeof Session.get("IsFirstRun") == "undefined" ) {
      Session.set("IsFirstRun",false);
    }
    this.next();
  },
  action: function() {
    var hostname = Router.current().originalUrl.replace('http://','').split('/');
    console.log(hostname[0]);
    $('.finance_body_faq').css('display','none');
    if ( typeof Session.get('HomePageLocation') != "undefined"){
      Session.set('IsData',true);
    }
    SetPageTitle(null);
    this.layout('finance_layout_home');

    // Check for myinvestkit vs investkit
    if ( hostname[0] != "myinvestkit.com" ) {
      this.render('finance_homepage');
    } else {
      this.render('myinvestkit_home');
    }
  }
})

ArticleController = BaseController.extend({
 onBeforeAction: function(){
   console.log("RENDERING All Articles Page");
   Session.set('IsData',true);
   this.next();
 },
 action: function(){
   if ( Session.get('IsData') ) {
     this.layout('finance_layout');
     this.render('article_page');
   }
 }
});

ArticleNewsController = BaseController.extend({
 onBeforeAction: function(){
   console.log("RENDERING All Articles Page");
   // Only run the calls that get the data if it's the first run
   // This prevents the calls from being looped
   if ( typeof Session.get('IsFirstRun') == "undefined" ) {
     // Prevent this loop from running again
     Session.set('IsFirstRun',false);
     Session.set("IsData",true);
     /*****************************************
     Meteor method call for server side ajax
     path: '/:partner_id?/compensation/:exec_id',
     methods.js: ExecWebpageData: function(exec_id, option)
     ******************************************/
     Meteor.call("CompIndie", this.params.comp_id,'profile_header', function(error, data){
       if(error){
         console.log('Invalid Team Error',error);
         Session.set('IsError',true);
         return '';
       }
       for ( var module_name in data ) {
         if ( data.hasOwnProperty(module_name) ) {
           console.log(module_name,data[module_name]);
           Session.set(module_name,data[module_name]);
         }
         Session.set("IsData",true);
       }
     });
     Meteor.call("ExecIndie", this.params.exec_id,'profile_header', function(error, data){
       if(error){
         console.log('Invalid Team Error',error);
         Session.set('IsError',true);
         return '';
       }
       for ( var module_name in data ) {
         if ( data.hasOwnProperty(module_name) ) {
           console.log(module_name,data[module_name]);
           Session.set(module_name,data[module_name]);
         }
         Session.set("IsData",true);
       }
     });
   }
   this.next();
 },
 action: function(){
   if ( Session.get('IsData') ) {
     this.layout('finance_layout');
     this.render('article_news_page');
   }
 }
});

PreviousEarningsController = BaseController.extend({
 onBeforeAction: function(){

   console.log("COMPANY:",this.params.comp_id);
   console.log("RENDERING Previous Earnings");
   // Only run the calls that get the data if it's the first run
   // This prevents the calls from being looped
   if ( typeof Session.get('IsFirstRun') == "undefined" ) {
     // Prevent this loop from running again
     Session.set('IsFirstRun',false);
     Session.set("IsData",true);
     /*****************************************
     Meteor method call for server side ajax
     path: '/:partner_id?/compensation/:exec_id',
     methods.js: ExecWebpageData: function(exec_id, option)
     ******************************************/
     Meteor.call("CompEarningsIndie", this.params.comp_id, function(error, data){
       if(error){
         console.log('Invalid Team Error',error);
         Session.set('IsError',true);
         return '';
       }
       for ( var module_name in data ) {
         if ( data.hasOwnProperty(module_name) ) {
           //console.log(module_name,data[module_name]);
           Session.set(module_name,data[module_name]);
         }
         Session.set("IsData",true);
       }
     });
   }
   this.next();
 },
 action: function(){
   if ( Session.get('IsData') ) {
     this.layout('finance_layout');
     this.render('coming_soon');
   }
 }
});

EarningsCalenderController = BaseController.extend({
 onBeforeAction: function(){

   console.log("RENDERING Earnings Calender");
   Session.set('IsData',true);
   this.next();
 },
 action: function(){
   if ( Session.get('IsData') ) {
     this.layout('finance_layout');
     this.render('earnings_calender');
   }
 }
});

DisqusController = BaseController.extend({
 onBeforeAction: function(){

   console.log("RENDERING Disqus Page");
   Session.set('IsData',true);
   this.next();
 },
 action: function(){
   if ( Session.get('IsData') ) {
     this.layout('finance_layout');
     this.render('comments_page');
   }
 }
});

MarketRecapNewsController = BaseController.extend({
 onBeforeAction: function(){

   console.log("RENDERING Market Recap News Page");
   Session.set('IsData',true);
   this.next();
 },
 action: function(){
   if ( Session.get('IsData') ) {
     this.layout('finance_layout');
     this.render('market_recap_news');
   }
 }
});

CompensationController = BaseController.extend({
 onBeforeAction: function(){

   console.log("PARTNER",this.params.exec_id);
   console.log("RENDERING Compensation Page");

   // Only run the calls that get the data if it's the first run
   // This prevents the calls from being looped
   if ( typeof Session.get('IsFirstRun') == "undefined" ) {
     // Prevent this loop from running again
     Session.set('IsFirstRun',false);
     /*****************************************
     Meteor method call for server side ajax
     path: '/:partner_id?/compensation/:exec_id',
     methods.js: ExecWebpageData: function(exec_id, option)
     ******************************************/
     Meteor.call("ExecWebpageData", this.params.exec_id, 'compensation', function(error, data){
       if(error){
         console.log('Invalid Team Error',error);
         Session.set('IsError',true);
         return '';
       }
       for ( var module_name in data ) {
         if ( data.hasOwnProperty(module_name) ) {
           //console.log(module_name,data[module_name]);
           Session.set(module_name,data[module_name]);
         }
         Session.set("IsData",true);
       }
     });
   }
     /*
     */
   this.next();
 },
 action: function(){
   this.layout('finance_layout');
   this.render('exec_compensation');
 }
});

CollegeRivalsController = BaseController.extend({
 onBeforeAction: function(){

   console.log("Exec_id", this.params.exec_id);
   console.log("RENDERING College Rivals Page");

   Session.set("IsData",true);

   // Only run the calls that get the data if it's the first run
   // This prevents the calls from being looped
   if ( typeof Session.get('IsFirstRun') == "undefined" ) {
     // Prevent this loop from running again
     Session.set('IsFirstRun',false);
     /*****************************************
     Meteor method call for server side ajax
     path: '/:partner_id?/collegerivals/:exec_id',
     methods.js: ExecWebpageData: function(exec_id, option)
     ******************************************/
     Meteor.call("ExecWebpageData", this.params.exec_id, 'college_rivals', function(error, data){
       if(error || data.success == false){
         console.log('Invalid Team Error',error);
         Session.set('IsError',true);
         return '';
       }
       for ( var module_name in data ) {
         if ( data.hasOwnProperty(module_name) ) {
           //console.log(module_name,data[module_name]);
           Session.set(module_name,data[module_name]);
         }
         Session.set("IsData",true);
       }
     });
   }
     /*
     */
   this.next();
 },
 action: function(){
   if ( Session.get('IsData') ) {
     this.layout('finance_layout');
     this.render('exec_college_rivals');
   }
 }
});

WorkHistoryController = BaseController.extend({
 onBeforeAction: function(){
   console.log("Exec_id", this.params.exec_id);
   console.log("RENDERING Work History Page");

   // Only run the calls that get the data if it's the first run
   // This prevents the calls from being looped
   if ( typeof Session.get('IsFirstRun') == "undefined" ) {
     // Prevent this loop from running again
     Session.set('IsFirstRun',false);
     /*****************************************
     Meteor method call for server side ajax
     path: '/:partner_id?/workhistory/:exec_id',
     methods.js: ExecWebpageData: function(exec_id, option)
     ******************************************/
     Meteor.call("GetExecData", this.params.exec_id, 'batch_1', function(error, data){
       if(error){
         console.log('Invalid Team Error',error);
         Session.set('IsError',true);
         return '';
       }
       for ( var module_name in data ) {
         if ( data.hasOwnProperty(module_name) ) {
           //console.log(module_name,data[module_name]);
           Session.set(module_name,data[module_name]);
         }
       }
     });
     Meteor.call("GetExecData", this.params.exec_id, 'batch_2', function(error, data){
       if(error){
         console.log('Invalid Team Error',error);
         return '';
       }
       for ( var module_name in data ) {
         if ( data.hasOwnProperty(module_name) ) {
           //console.log(module_name,data[module_name]);
           Session.set(module_name,data[module_name]);
         }
         Session.set("IsData",true);
       }
     });
   }
     /*
     */
   this.next();
 },
 action: function(){
   if ( Session.get('IsData') ) {
     this.layout('finance_layout');
     this.render('workhistory_page');
   }
 }
});

EducationController = BaseController.extend({
 onBeforeAction: function(){
   console.log("Exec_id", this.params.exec_id);
   console.log("RENDERING Education Page");

   // Only run the calls that get the data if it's the first run
   // This prevents the calls from being looped
   if ( typeof Session.get('IsFirstRun') == "undefined" ) {
     // Prevent this loop from running again
     Session.set('IsFirstRun',false);
     /*****************************************
     Meteor method call for server side ajax
     path: '/:partner_id?/collegerivals/:exec_id',
     methods.js: ExecWebpageData: function(exec_id, option)
     ******************************************/
     Meteor.call("ExecWebpageData", this.params.exec_id, 'education', function(error, data){
       if(error || data.success == false){
         console.log('Invalid Team Error',error);
         Session.set('IsError',true);
         return '';
       }
       for ( var module_name in data ) {
         if ( data.hasOwnProperty(module_name) ) {
           //console.log(module_name,data[module_name]);
           Session.set(module_name,data[module_name]);
         }
         Session.set("IsData",true);
       }
     });
   }
     /*
     */
   this.next();
 },
 action: function(){
   if ( Session.get('IsData') ) {
     this.layout('finance_layout');
     this.render('edu_history');
   }
 }
});

StatisticsController = BaseController.extend({
 onBeforeAction: function(){
   console.log("RENDERING Statistics Page");
   console.log("Location:",this.params.loc_id);
   Session.set("loc_id", this.params.loc_id);

   // Only run the calls that get the data if it's the first run
   // This prevents the calls from being looped
   if ( typeof Session.get('IsFirstRun') == "undefined" ) {
     // Prevent this loop from running again
     Session.set('IsFirstRun',false);
     /*****************************************
     Meteor method call for server side ajax
     path: '/:partner_id?/collegerivals/:exec_id',
     methods.js: ExecWebpageData: function(exec_id, option)
     ******************************************/
     Meteor.call("statisticsData", Session.get('loc_id'), function(error, data){
       if(error || data.success == false){
         console.log('Invalid Team Error',error);
         Session.set('IsError',true);
         return '';
       }
       for ( var module_name in data ) {
         if ( data.hasOwnProperty(module_name) ) {
           //console.log(module_name,data[module_name]);
           Session.set(module_name,data[module_name]);
         }
         Session.set("IsData",true);
       }
     });
   }
     /*
     */
   this.next();
 },
 action: function(){
   if ( Session.get('IsData') ) {
     this.layout('finance_layout');
     this.render('statistics_page');
   }
 }
});

AboutexecController = BaseController.extend({
 onBeforeAction: function(){
   console.log("EXEC ID",this.params.exec_id);
   console.log("RENDERING About Exec Page");
   // Only run the calls that get the data if it's the first run
   // This prevents the calls from being looped
   if ( typeof Session.get('IsFirstRun') == "undefined" ) {
     // Prevent this loop from running again
     Session.set('IsFirstRun',false);
     /*****************************************
     Meteor method call for server side ajax
     path: '/:partner_id?/aboutexec/:exec_id',
     CompWebPageData: function(comp_id, option)
     ******************************************/
     Meteor.call("ExecWebpageData", this.params.exec_id, 'about', function(error, data){
       console.log('About Exec', data);
       if(error){
         console.log('Invalid Team Error',error);
         Session.set('IsError',true);
         return '';
       }
       for ( var module_name in data ) {
         if ( data.hasOwnProperty(module_name) ) {
           //console.log(module_name,data[module_name]);
           Session.set(module_name,data[module_name]);
         }
         Session.set("IsData",true);
       }
     });
   }
   this.next();
 },
 action: function(){
   if ( Session.get('IsData') ) {
     this.layout('finance_layout');
     this.render('about_exec_page');
   }
 }
});

AboutHQController = BaseController.extend({
 onBeforeAction: function(){
   console.log("EXEC ID",this.params.company_id);
   console.log("RENDERING About HQ Page");
   // Only run the calls that get the data if it's the first run
   // This prevents the calls from being looped
   if ( typeof Session.get('IsFirstRun') == "undefined" ) {
     // Prevent this loop from running again
     Session.set('IsFirstRun',false);
     /*****************************************
     Meteor method call for server side ajax
     path: '/:partner_id?/aboutexec/:exec_id',
     CompWebPageData: function(comp_id, option)
     ******************************************/
     Meteor.call("CompIndie", this.params.company_id, 'bio_location', function(error, data){
       console.log('About Exe', data);
       if(error){
         console.log('Invalid Team Error',error);
         Session.set('IsError',true);
         return '';
       }
       for ( var module_name in data ) {
         if ( data.hasOwnProperty(module_name) ) {
           //console.log(module_name,data[module_name]);
           Session.set(module_name,data[module_name]);
         }
         Session.set("IsData",true);
       }
     });
     Meteor.call("CompIndie", this.params.company_id, 'profile_header', function(error, data){
       console.log('About Exe', data);
       if(error){
         console.log('Invalid Team Error',error);
         Session.set('IsError',true);
         return '';
       }
       for ( var module_name in data ) {
         if ( data.hasOwnProperty(module_name) ) {
           //console.log(module_name,data[module_name]);
           Session.set(module_name,data[module_name]);
         }
         Session.set("IsData",true);
       }
     });
   }
   this.next();
 },
 action: function(){
   if ( Session.get('IsData') ) {
     this.layout('finance_layout');
     this.render('c_hq_page');
   }
 }
});

SearchController = BaseController.extend({
 onBeforeAction: function(){
   //path: '/:partner_id?/search/r=:search_results?',
   console.log("RENDERING Search Page");
   console.log("Searching:", this.params.search_results);
   Session.set('search_results', this.params.search_results);
   var time = new Date();
   time = time.getTime();
   if(typeof Session.get('search_results') != 'undefined'){
     Meteor.call("GetSuggestion", this.params.search_results, time,  function(error, data){
       if(error){
         console.log('Invalid Team Error',error);
         Session.set('IsError',true);
         return '';
       }
       console.log(data);
       for ( var module_name in data ) {
         if ( data.hasOwnProperty(module_name) ) {
           console.log(module_name,data[module_name]);
           Session.set(module_name,data[module_name]);
         }
         Session.set("IsData",true);
       }
     });
   }
   this.next();
 },
 action: function(){
   this.layout('finance_layout');
   this.render('search_page');
 }
});
/*********STANDALONE CONTROLLERS END**************/

/*********FINANCIAL CONTROLLERS**************/
FinancialBaseController = BaseController.extend({
  onBeforeAction: function(){
    console.log("COMPANY ID", this.params.company_id);
    //ExecWebpageData: function(exec_id, option)
    Meteor.call("ExecWebpageData", this.params.exec_id,  function(error, data){
      if(error || data.success == false){
        console.log('Invalid Team Error',error);
        Session.set('IsError',true);
        return '';
      }
      for ( var module_name in data ) {
        if ( data.hasOwnProperty(module_name) ) {
          Session.set(module_name,data[module_name]);
        }
        Session.set("IsData",true);
      }
    });
    /*
    */
    this.next();
  },
});

MoneyMemoryController = BaseController.extend({
 onBeforeAction: function(){
   console.log("Company",this.params.company_id);
   console.log("RENDERING Money Memory");
   /*****************************************
   Meteor method call for server side ajax
   path: '/:partner_id?/money-memory/:company_id',
   CompWebPageData: function(comp_id, option)
   ******************************************/
   Meteor.call("CompWebPageData", this.params.company_id, 'money_memory', function(error, data){
     if(error || data.success == false){
       console.log('Money Memory Error',error);
       Session.set('IsError',true);
       return '';
     }
     console.log(data);
     for ( var module_name in data ) {
       if ( data.hasOwnProperty(module_name) ) {
         Session.set(module_name,data[module_name]);
       }
       Session.set("IsData",true);
     }
   });
   this.next();
 },
 action: function(){
   if ( Session.get('IsData') ) {
     this.layout('finance_layout');
     this.render('money_memory_page');
   }
 }
});

EarningsController = BaseController.extend({
  onBeforeAction: function() {
    if ( typeof Session.get("IsFirstRun") == "undefined" ) {
      Session.set("IsFirstRun",false);
      Meteor.call('EarningsReport',this.params.company_id,this.params.earning_id,function(error,data){
        if ( error ) {
          console.log('Earnings Report Error', error);
          Session.set('IsError', true);
          return false;
        }
        console.log(data);
        Session.set('IsData',true);
      });
    }
    this.next();
  },
  action: function() {
    if ( Session.get('IsData') ) {
      this.layout('finance_layout');
      if ( this.params.earning_id.match(/Income-Statement/) ) {
        this.render('co_income_statement');
      }
    }
  }
});

BalanceSheetController = BaseController.extend({
 onBeforeAction: function(){
   console.log("RENDERING Balance Sheet");
   Session.set('IsData',true);
   this.next();
 },
 action: function(){
   if ( Session.get('IsData') ) {
     this.layout('finance_layout');
     this.render('co_balance_sheet');
   }
 }
});

IncomeStatementController = FinancialBaseController.extend({
 onBeforeAction: function(){
   console.log("RENDERING Income Statement");
   Session.set('IsData',true);
   this.next();
 },
 action: function(){
   if ( Session.get('IsData') ) {
     this.layout('finance_layout');
     this.render('co_income_statement');
   }
 }
});

FinancialOverviewController = BaseController.extend({
 onBeforeAction: function(){
   console.log("COMPANY",this.params.comp_id);
   console.log("RENDERING Financial Overview");
   if ( typeof Session.get("IsFirstRun") == "undefined" ) {
     Session.set("IsFirstRun",false);
     Session.set('IsData',true);
     Meteor.call('CompWebPageData',this.params.company_id, 'fin_overview',function(error,data){
       if ( error ) {
         console.log('Earnings Report Error', error);
         Session.set('IsError', true);
         return false;
       }
       for ( var module_name in data ) {
         if ( data.hasOwnProperty(module_name) ) {
           Session.set(module_name,data[module_name]);
         }
         Session.set("IsData",true);
       }
     });
   }
   this.next();
 },
 action: function(){
   if ( Session.get('IsData') ) {
     this.layout('finance_layout');
     //this.render('co_fin_overview');
     this.render('co_fin_overview');
   }
 }
});

CompetitorController = BaseController.extend({
 onBeforeAction: function(){
   console.log("RENDERING Competitor Page");
   if ( typeof Session.get("IsFirstRun") == "undefined" ) {
     Session.set("IsFirstRun",false);
     Session.set('IsData',true);
     Meteor.call('CompWebPageData',this.params.company_id, 'competitors',function(error,data){
       if ( error ) {
         console.log('Earnings Report Error', error);
         Session.set('IsError', true);
         return false;
       }
       for ( var module_name in data ) {
         if ( data.hasOwnProperty(module_name) ) {
           Session.set(module_name,data[module_name]);
         }
         Session.set("IsData",true);
       }
     });
   }
   this.next();
 },
 action: function(){
   if ( Session.get('IsData') ) {
     this.layout('finance_layout');
     this.render('co_competitor');
   }
 }
});

CashFlowController = FinancialBaseController.extend({
 onBeforeAction: function(){

   console.log("RENDERING Compensation Page");
   Session.set('IsData',true);
   this.next();
 },
 action: function(){
   if ( Session.get('IsData') ) {
     this.layout('finance_layout');
     this.render('co_cash_flow');
   }
 }
});
/*********FINANCIAL CONTROLLERS END**************/

/*********DISCLAIMER CONTROLLERS**************/
DisclaimerController = BaseController.extend({
 onBeforeAction: function(){
   console.log("RENDERING disclaimer_page");
   this.next();
 },
 action: function(){
   this.layout('finance_layout');
   this.render('disclaimer_page');
 }
});

ContactUsController = BaseController.extend({
 onBeforeAction: function(){
   console.log("RENDERING Contact Us");
   this.next();
 },
 action: function(){
   this.layout('finance_layout');
   this.render('contact_us_page');
 }
});

AboutUsController = BaseController.extend({
 onBeforeAction: function(){
   console.log("RENDERING About Us");
   this.next();
 },
 action: function(){
   this.layout('finance_layout');
   this.render('about_us_page');
 }
});

PrivacyPolicyController = BaseController.extend({
 onBeforeAction: function(){
   console.log("RENDERING Privacy Policy");
   this.next();
 },
 action: function(){
   this.layout('finance_layout');
   this.render('privacy_policy_page');
 }
});

CopyrightController = BaseController.extend({
 onBeforeAction: function(){
   console.log("RENDERING Copyright");
   this.next();
 },
 action: function(){
   this.layout('finance_layout');
   this.render('copyright_page');
 }
});

StockDisclaimerController = BaseController.extend({
 onBeforeAction: function(){
   console.log("RENDERING Stock Disclaimer");
   this.next();
 },
 action: function(){
   this.layout('finance_layout');
   this.render('stock_disclaimer_page');
 }
});

TermsOfServiceController = BaseController.extend({
 onBeforeAction: function(){
   console.log("RENDERING Terms of Service");
   this.next();
 },
 action: function(){
   this.layout('finance_layout');
   this.render('terms_of_service');
 }
});
/*********DISCLAIMER CONTROLLERS END**************/
ComingSoonController = BaseController.extend({
  action: function(){
    this.layout('finance_layout');
    this.render('coming_soon');
  }
});

ResultsController = BaseController.extend({
  action: function(){
    if ( Session.get('IsData') ) {
      this.layout('finance_layout');
      this.render('finance_noresults');
    }
  }
});

DirectoryController = BaseController.extend({
  onBeforeAction: function(){
    if( typeof Session.get('IsFirstRun') === 'undefined'){
      //console.log('Directory On Before', this);
      var query='';

      if(typeof this.params.query !== 'undefined'){
        for(key in this.params.query){
          //Convert sort query param to letter (for api). Keep sort for url
          if(key === 'sort'){
            var param = 'letter';
          }else{
            var param = key;
          }
          query += '&' + param + '=' + this.params.query[key];
        }
      }else{
        query = null;
      }

      Meteor.call('GetDirectoryData', this.params.pageNum, this.params.type, query, function(error, data){
        if(error || typeof data === 'undefined'){
          console.log('Directory Error', error);
          Session.set('IsError', true);
          Session.set('IsData', false);
          return '';
        }
        //Success Code
        Session.set('directory_data', data);
        Session.set('IsData', true);
      })//End Meteor Call
      Session.set('IsFirstRun', false);
    }
    this.next();
  },
  action: function(){
    if ( Session.get('IsData') ){
      this.layout('finance_layout');
      this.render('directory_page');
    }
  }
})

ListofListController = BaseController.extend({
  onBeforeAction: function(){
    console.log('List of List parameter', this.params.company_id);
    console.log('RENDERING List of List Page');

    // Only run the calls that get the data if it's the first run
    // This prevents the calls from being looped
    if ( typeof Session.get('IsFirstRun') == "undefined" ) {
      // Prevent this loop from running again
      Session.set('IsFirstRun',false);
      Meteor.call('listOfListData', this.params.company_id, function(error, data){
        if(error || data.success == false){
          console.log('Invalid Team Error', error);
          Session.set('IsError', true);
          return '';
        }
        //console.log('RESULT OF LIST OF LIST CALL', data);
        for ( var module_name in data ) {
          if ( data.hasOwnProperty(module_name) ) {
            //console.log(module_name,data[module_name]);
            Session.set(module_name,data[module_name]);
          }
          Session.set("IsData",true);
        }
      });

    }//Close if
    this.next();
  },
  action: function(){
    if(Session.get('IsData')){
      this.layout('finance_layout');
      this.render('list_of_list_page');
    }//Close if
  }//Close action
})

ListofListLocController = BaseController.extend({
  onBeforeAction: function(){
    console.log('List of List parameter', this.params.loc_id);
    console.log('RENDERING List of List Location Page');

    // Only run the calls that get the data if it's the first run
    // This prevents the calls from being looped
    if ( typeof Session.get('IsFirstRun') == "undefined" ) {
      // Prevent this loop from running again
      Session.set('IsFirstRun',false);
      Meteor.call('listOfListLoc', this.params.loc_id, function(error, data){
        if(error || data.success == false){
          console.log('Invalid Team Error', error);
          Session.set('IsError', true);
          return '';
        }
        //console.log('RESULT OF LIST OF LIST CALL', data);
        for ( var module_name in data ) {
          if ( data.hasOwnProperty(module_name) ) {
            console.log(module_name,data[module_name]);
            Session.set(module_name,data[module_name]);
          }
          Session.set("IsData",true);
        }
      });

    }//Close if
    this.next();
  },
  action: function(){
    if(Session.get('IsData')){
      this.layout('finance_layout');
      this.render('list_of_list_loc_page');
    }//Close if
  }//Close action
})

/****************************WEBPAGE CONTROLLERS END*******************************/


/****************************GLOBAL FUNCTIONS*******************************/
Router.onStop(function() {
  // Delete these 3 session variables (used to determine loading) whenever the page is changed
  console.log('RUNNING onStop Route');
  ResetSession();
  delete Session.keys.IsFirstRun;
  delete Session.keys.IsError;
  delete Session.keys.IsData;
});
/****************************END GLOBAL FUNCTIONS*******************************/
