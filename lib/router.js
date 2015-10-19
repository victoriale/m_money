//Home Route
// Router.route('/:partner_id?/home',
//   function(){
//
//   }, {
//     name: 'content.realestate.homepage'
// })
// Router.route('/')


Router.map(function(){
  // ****** HOME PAGE ****** //
  this.route('content.finance.home',{
    path: '/',
    controller: 'HomePageController'
  });

/********************PROFILES********************/
 this.route('content.companyprofile',{
   path:'/:partner_id?/company/:company_id',
   //path:'/:partner_id?/company/:exchange/:comp_name/:company_id',
   controller: 'CompanyProfileController'
 })

 this.route('content.executiveprofile',{
   path:'/:partner_id?/executive/:exec_id',
   //path:'/:partner_id?/executive/:comp_name/:exec_name/:exec_id',
   controller: 'ExecutiveProfileController'
 })

 this.route('content.locationprofile',{
   path:'/:partner_id?/location',
   //path:'/:partner_id?/locale/:state_id/:city_id?,
   controller: 'LocationProfileController'
 })
 /********************PROFILES END********************/

 /*********ANYTHING BELOW THIS LINE ARE WEBPAGES**************/
/*********LIST PAGES**************/
  this.route('content.toplist',{
    path: '/:partner_id?/top-list',
    controller: 'TopListController'
  })

  this.route('content.sector',{
    path: '/:partner_id?/sector',
    controller: 'SectorController'
  })

  this.route('content.marketrecap',{
    path: '/:partner_id?/marketrecap',
    controller: 'MarketRecapController'
  })

  //list of lists uses this
  this.route('content.trending',{
    path: '/:partner_id?/trending',
    controller: 'TrendingController'
  })

  this.route('content.boardcommittee',{
    path: '/:partner_id?/board-committee/:comp_id',
    controller: 'BoardCommitteeController'
  })
/*********LIST PAGES END**************/
/*********STANDALONE PAGES**************/

  this.route('content.moneymemory',{
   path: '/:partner_id?/money-memory/:company_id',
   controller: 'MoneyMemoryController'
  })

  this.route('content.earningsPR',{
    path: '/:partner_id?/previous-earnings/:comp_id',
    controller: 'PreviousEarningsController'
  })

  this.route('content.earningscalender',{
    path: '/:partner_id?/earnings-calender',
    controller: 'EarningsCalenderController'
  })

  this.route('content.allarticles',{
    path: '/:partner_id?/article',
    controller: 'ArticleController'
  })

  this.route('content.articlenews',{
    path: '/:partner_id?/news/:comp_id',
    controller: 'ArticleNewsController'
  })

  this.route('content.disqus',{
    path: '/:partner_id?/disqus',
    controller: 'DisqusController'
  })

  this.route('content.marketrecapnews',{
    path: '/:partner_id?/marketnews',
    controller: 'MarketRecapNewsController'
  })

  this.route('content.compensation',{
    path: '/:partner_id?/compensation/:exec_id',
    controller: 'CompensationController'
  })

  this.route('content.collegerivals',{
    path: '/:partner_id?/collegerivals/:exec_id',
    controller: 'CollegeRivalsController'
  })

  this.route('content.workhistory',{
    path: '/:partner_id?/workhistory/:exec_id',
    controller: 'WorkHistoryController'
  })

  this.route('content.education',{
    path: '/:partner_id?/education/:exec_id',
    controller: 'EducationController'
  })

  this.route('content.statistics',{
    path: '/:partner_id?/statistics/',
    controller: 'StatisticsController'
  })

  this.route('content.aboutexec',{
    path: '/:partner_id?/about-exec/:exec_id',
    controller: 'AboutexecController'
  })

  this.route('content.abouthq',{
    path: '/:partner_id?/about-hq/:comp_id',
    controller: 'AboutHQController'
  })
  /*********STANDALONE PAGES END**************/

  /*********FINANCIAL PAGES**************/
  this.route('content.earningspage',{
    path: '/:partner_id?/company/:company_id/earnings/:earning_id',
    controller: 'EarningsController'
  });

  this.route('content.finoverview',{
    path: '/:partner_id?/company/:company_id/financial-overview',
    controller: 'FinancialOverviewController'
  })

  this.route('content.competitor',{
    path: '/:partner_id?/company/:company_id/competitor',
    controller: 'CompetitorController'
  })

  /*********FINANCIAL PAGES END**************/

  /*********DISCLAIMER**************/
  this.route('content.disclaimer',{
    //disclaimer page
    path:'/:partner_id?/disclaimer',
    controller: 'DisclaimerController'
  })

  this.route('content.contactus',{
    //contact us page
    path:'/:partner_id?/contactus',
    controller: 'ContactUsController'
  })

  this.route('content.copyright',{
    //copyright page
    path:'/:partner_id?/copyright',
    controller: 'CopyrightController'
  })

  this.route('content.privacypolicy',{
    //Privacy Policy page
    path:'/:partner_id?/privacy-policy',
    controller: 'PrivacyPolicyController'
  })

  this.route('content.aboutus',{
    //about us page
    path:'/:partner_id?/aboutus',
    controller: 'AboutUsController'
  })

  this.route('content.stockdisclaimer',{
    //about us page
    path:'/:partner_id?/stock-disclaimer',
    controller: 'StockDisclaimerController'
  })

  this.route('content.termsofservice',{
    //about us page
    path:'/:partner_id?/terms-of-service',
    controller: 'TermsOfServiceController'
  })
  /*********DISCLAIMER END**************/

  this.route('content.comingsoon',{
    path: '/:partner_id?/coming-soon',
    controller: 'ComingSoonController'
  })

  this.route('content.noresults',{
    path: '/:partner_id?/no-results',
    controller: 'ResultsController'
  })

  /*********WEBPAGES END**************/

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
      */
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
       console.log("batch1", data);
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
         console.log("batch2", data);
         if(error){
           //console.log('Invalid Company Batch 2 Error',error);
           return '';
         }
         for ( var module_name in data ) {
           if ( data.hasOwnProperty(module_name) ) {
             //console.log(module_name,data[module_name]);
             Session.set(module_name,data[module_name]);
           }
           Session.set("IsData",true);
         }

         //BATCH 3 call sending rest of the data missing
         Meteor.call("GetCompanyData",Session.get('profile_header').c_id, "batch_3", function(error, data){
           console.log("batch3", data);
           if(error){
             console.log('Invalid Company Batch 3',error);
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
       });
     });
     /*
     */
   }
   this.next();
 },
 action: function(){
   /*
   // Check URL and makes sure it fits the company page data otherwise it should error out and not display
   //path:'/:partner_id?/company/:exchange/:comp_name/:company_id',
   //test if the company page and exchange from database matches the URL so it will display only render page if url matches data in database
   if(typeof Session.get('pageCompany') == 'undefined' || typeof Session.get('pageExchange') == 'undefined'){
     Session.set('IsError',true);
     Session.set("IsData",false);
   }else{
     var comp_check = Session.get('profile_header');
     //allow both space bar and hyphen into URL in between sentences
     var comp_hyphen_check = Session.get('pageCompany').replace(/-/g, ' ');
     var exch = comp_check['c_exchange'];

     //this is where the url and data check happens and will make sure to display the correct page in response
     if((Session.get('pageCompany') != comp_check['c_name'] || comp_hyphen_check != comp_check['c_name']) && exch != Session.get('pageExchange')){
       Session.set('IsError',true);
       Session.set("IsData",false);
     }
   }
   */
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
   ResetSession();
   console.log('COMPANY:', this.params.comp_name);
   console.log('EXECUTIVE:', this.params.exec_name);
   console.log('EXEC ID:', this.params.exec_id);
   console.log("GATHERING DATA FOR EXECUTIVE PROFILE");
   delete Session.keys['IsExec'];
   Session.set("IsExec", true);
   Session.set('pageCompany',this.params.comp_name);
   Session.set('pageExec',this.params.exec_name);
   Session.set("exec_id", this.params.exec_id);
   // Only run the calls that get the data if it's the first run
   // This prevents the calls from being looped
   if ( typeof Session.get('IsFirstRun') == "undefined" ) {
     // Prevent this loop from running again
     Session.set('IsFirstRun',false);
     Session.set("IsData",true);

     /*****************************************
     Meteor method call for server side ajax
     path:'/:partner_id?/executive/:comp_name/:exec_name/:exec_id',
     methods.js: GetExecData: function(exec_id, batchNum)
     ******************************************/
     //BATCH 1 call sending only first few modules data
     Meteor.call("GetExecData",Session.get('exec_id'), "batch_1", function(error, data){
       console.log("batch1", data);
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
           Session.set("IsData",true);
         }

         //BATCH 2 call sending only next few modules data
         Meteor.call("GetExecData",Session.get('exec_id'), "batch_2", function(error, data){
           console.log("batch2", data);
           if(error){
             console.log('Invalid Exec Batch 2 Error',error);
             return '';
           }
           for ( var module_name in data ) {
             if ( data.hasOwnProperty(module_name) ) {
               //console.log(module_name,data[module_name]);
               Session.set(module_name,data[module_name]);
             }
             Session.set("IsData",true);
           }

           //BATCH 3 call sending rest of the data missing
           Meteor.call("GetExecData",Session.get('exec_id'), "batch_3", function(error, data){
             console.log("batch3", data);
             if(error){
               console.log('Invalid Exec Batch 3 Error',error);
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
         });
       }
    });
   }
   this.next();
 },
 action: function(){
   /*
   // Check URL and makes sure it fits the executive page data otherwise it should error out and not display
   //path:'/:partner_id?/executive/:comp_name/:exec_name/:exec_id',
   //test if the executive page and company matches from database matches the URL so it will display only render page if url matches data in database
   if(typeof Session.get('pageCompany') == 'undefined' || typeof Session.get('pageExec') == 'undefined'){
     Session.set('IsError',true);
     Session.set("IsData",false);
   }else{
     var comp_check = Session.get('profile_header');
     if(typeof comp_check != 'undefined'){
       //allow both space bar and hyphen into URL in between sentences
       var comp_hyphen_check = Session.get('pageCompany').replace(/-/g, ' ');
       var exec = comp_check['o_first_name'] + " " + comp_check['o_last_name'];
       var exec_hyphen_check = Session.get('pageExec').replace(/-/g, ' ');
       //this is where the url and data check happens and will make sure to display the correct page in response
       if((Session.get('pageCompany') == comp_check['c_name'] || comp_hyphen_check == comp_check['c_name']) && (exec_hyphen_check == exec || Session.get('pageExec') == exec)){
         Session.set('IsError',false);
         Session.set("IsData",true);
       }else{
         Session.set('IsError',true);
         Session.set("IsData",false);
       }
     }
   }
   */
   if ( Session.get('IsData') ) {
     //renders the layout of all finance page and company profile
     this.layout('finance_layout');
     this.render('executive_profile');
     delete Session.keys['IsData'];
   }
 }
});

LocationProfileController = BaseController.extend({
 onBeforeAction: function(){
   ResetSession();
   Session.set("IsData",true);
   Session.set("IsLocation", true);

   // Only run the calls that get the data if it's the first run
   // This prevents the calls from being looped
   if ( typeof Session.get('IsFirstRun') == "undefined" ) {
     // Prevent this loop from running again
     Session.set('IsFirstRun',false);

     /*****************************************
     Meteor method call for server side ajax
     path:'/:partner_id?/team/:t_profile',
     methods.js: GetTeamProfile: function(teamname, partner_id)
     ******************************************/
     /*
     Meteor.call("GetTeamProfile", this.params.t_profile, null, function(error, data){
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
     */

   }
   this.next();
 },
 action: function(){
   // Check for data
   if ( Session.get('IsData') ) {
     //renders the layout of all finance page and company profile
     this.layout('finance_layout');
     this.render('location_profile');
     delete Session.keys['IsData'];
   }
 }
});

/****************************END PROFILE_CONTROLLERS*******************************/

/****************************WEBPAGE CONTROLLERS*******************************/
/*********LIST CONTROLLER**************/
TopListController = BaseController.extend({
 onBeforeAction: function(){
   console.log("PARTNER",this.params.partner_id);
   console.log("RENDERING Top List");
   this.next();
 },
 action: function(){
   if ( Session.get('IsData') ) {
     this.layout('finance_layout');
     this.render('list_view');
   }
  }
});

SectorController = BaseController.extend({
 onBeforeAction: function(){
   console.log("PARTNER",this.params.partner_id);
   console.log("RENDERING Sector Page");
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
   console.log("PARTNER",this.params.partner_id);
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
   console.log("PARTNER",this.params.partner_id);
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
   console.log("PARTNER",this.params.partner_id);
   console.log("RENDERING Board Committee");
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
     Meteor.call("CompWebPageData", this.params.comp_id, 'officers', function(error, data){
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
     Meteor.call("CompIndie", this.params.comp_id, 'profile_header', function(error, data){
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
    $('.finance_body_faq').css('display','none');
    if ( typeof Session.get('HomePageLocation') != "undefined"){
      Session.set('IsData',true);
    }
    SetPageTitle(null);
    this.layout('finance_layout_home');
    this.render('finance_homepage');
  }
})

ArticleController = BaseController.extend({
 onBeforeAction: function(){
   console.log("PARTNER",this.params.partner_id);
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
   console.log("PARTNER",this.params.partner_id);
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
   console.log("PARTNER",this.params.partner_id);
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
     this.render('coming_soon');
   }
 }
});

EarningsCalenderController = BaseController.extend({
 onBeforeAction: function(){
   console.log("PARTNER",this.params.partner_id);
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
   console.log("PARTNER",this.params.partner_id);
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
   console.log("PARTNER",this.params.partner_id);
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
   console.log("PARTNER",this.params.partner_id);
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
   this.layout('finance_layout');
   this.render('exec_compensation');
 }
});

CollegeRivalsController = BaseController.extend({
 onBeforeAction: function(){
   console.log("PARTNER",this.params.partner_id);
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
     this.render('exec_college_rivals');
   }
 }
});

WorkHistoryController = BaseController.extend({
 onBeforeAction: function(){
   console.log("PARTNER",this.params.partner_id);
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
           console.log(module_name,data[module_name]);
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
     this.render('workhistory_page');
   }
 }
});

EducationController = BaseController.extend({
 onBeforeAction: function(){
   console.log("PARTNER",this.params.partner_id);
   console.log("Exec_id", this.params.exec_id);
   console.log("RENDERING Education Page");

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
     Meteor.call("ExecWebpageData", this.params.exec_id, 'education', function(error, data){
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
     this.render('edu_history');
   }
 }
});

StatisticsController = BaseController.extend({
 onBeforeAction: function(){
   console.log("PARTNER",this.params.partner_id);
   console.log("RENDERING Statistics Page");
   Session.set('IsData',true);
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
   console.log("PARTNER",this.params.partner_id);
   console.log("EXEC ID",this.params.exec_id);
   console.log("RENDERING About Exec Page");
   Session.set('IsData',true);
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
     Meteor.call("ExecWebpageData", this.params.exec_id, 'executive_page', function(error, data){
       console.log('About Exe', data);
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
     this.render('about_exec_page');
   }
 }
});

AboutHQController = BaseController.extend({
 onBeforeAction: function(){
   console.log("PARTNER",this.params.partner_id);
   console.log("EXEC ID",this.params.comp_id);
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
     Meteor.call("CompIndie", this.params.comp_id, 'bio_location', function(error, data){
       console.log('About Exe', data);
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
     Meteor.call("CompIndie", this.params.comp_id, 'profile_header', function(error, data){
       console.log('About Exe', data);
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
     this.render('c_hq_page');
   }
 }
});
/*********STANDALONE CONTROLLERS END**************/

/*********FINANCIAL CONTROLLERS**************/
FinancialBaseController = BaseController.extend({
  onBeforeAction: function(){
    console.log("PARTNER",this.params.partner_id);
    console.log("COMPANY ID", this.params.company_id);
    console.log("RENDERING Money Memory");

    //ExecWebpageData: function(exec_id, option)
    Meteor.call("ExecWebpageData", this.params.exec_id,  function(error, data){
      if(error || data.success == false){
        console.log('Invalid Team Error',error);
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
    /*
    */
    this.next();
  },
});

MoneyMemoryController = BaseController.extend({
 onBeforeAction: function(){
   console.log("PARTNER",this.params.partner_id);
   console.log("Company",this.params.company_id);
   console.log("RENDERING Money Memory");
   Session.set('IsData',true);
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
      console.log('THISSSS');
      this.layout('finance_layout');
      if ( this.params.earning_id.match(/Income-Statement/) ) {
        this.render('co_income_statement');
      }
    }
  }
});

BalanceSheetController = BaseController.extend({
 onBeforeAction: function(){
   console.log("PARTNER",this.params.partner_id);
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
   console.log("PARTNER",this.params.partner_id);
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
   console.log("PARTNER",this.params.partner_id);
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
     this.render('co_fin_overview');
   }
 }
});

CompetitorController = BaseController.extend({
 onBeforeAction: function(){
   console.log("PARTNER",this.params.partner_id);
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
   console.log("PARTNER",this.params.partner_id);
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
   console.log("PARTNER",this.params.partner_id);
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
   console.log("PARTNER",this.params.partner_id);
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
   console.log("PARTNER",this.params.partner_id);
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
   console.log("PARTNER",this.params.partner_id);
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
   console.log("PARTNER",this.params.partner_id);
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
   console.log("PARTNER",this.params.partner_id);
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
   console.log("PARTNER",this.params.partner_id);
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

/****************************WEBPAGE CONTROLLERS END*******************************/


/****************************GLOBAL FUNCTIONS*******************************/
Router.onStop(function() {
  // Delete these 3 session variables (used to determine loading) whenever the page is changed
  delete Session.keys.IsFirstRun;
  delete Session.keys.IsError;
  delete Session.keys.IsData;
});
/****************************END GLOBAL FUNCTIONS*******************************/
