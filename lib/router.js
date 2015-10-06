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
   //team can be removed once data is entered and we have dynamic data to test with
   path:'/:partner_id?/company',
   controller: 'CompanyProfileController'
 })

 this.route('content.executiveprofile',{
   //team can be removed once data is entered and we have dynamic data to test with
   path:'/:partner_id?/executive',
   controller: 'ExecutiveProfileController'
 })

 this.route('content.locationprofile',{
   //team can be removed once data is entered and we have dynamic data to test with
   path:'/:partner_id?/location',
   controller: 'LocationProfileController'
 })
 /********************PROFILES END********************/

 /*********ANYTHING BELOW THIS LINE ARE WEBPAGES**************/

  this.route('content.moneymemory',{
   path: '/:partner_id?/money-memory',
   controller: 'MoneyMemoryController'
  })

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
    path: '/:partner_id?/board-committee',
    controller: 'BoardCommitteeController'
  })
/*********LIST PAGES END**************/
/*********STANDALONE PAGES**************/
  this.route('content.earningsPR',{
    path: '/:partner_id?/previous-earnings',
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

  this.route('content.disqus',{
    path: '/:partner_id?/disqus',
    controller: 'DisqusController'
  })

  this.route('content.marketrecapnews',{
    path: '/:partner_id?/marketnews',
    controller: 'MarketRecapNewsController'
  })


  /*********STANDALONE PAGES END**************/

  /*********FINANCIAL PAGES**************/
  this.route('content.balancesheet',{
    path: '/:partner_id?/balance-sheet',
    controller: 'BalanceSheetController'
  })

  this.route('content.incomestatement',{
    path: '/:partner_id?/income-statement',
    controller: 'IncomeStatementController'
  })

  this.route('content.finoverview',{
    path: '/:partner_id?/financial-overview',
    controller: 'FinancialOverviewController'
  })

  this.route('content.competitor',{
    path: '/:partner_id?/competitor',
    controller: 'CompetitorController'
  })

  this.route('content.compensation',{
    path: '/:partner_id?/compensation',
    controller: 'CompensationController'
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
    //contact us page
    path:'/:partner_id?/copyright',
    controller: 'CopyrightController'
  })

  this.route('content.privacypolicy',{
    //contact us page
    path:'/:partner_id?/privacy-policy',
    controller: 'PrivacyPolicyController'
  })

  this.route('content.aboutus',{
    //about us page
    path:'/:partner_id?/aboutus',
    controller: 'AboutUsController'
  })
  /*********DISCLAIMER END**************/

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
   console.log("GATHERING DATA FOR COMPANY PROFILE");
   Session.set("IsData",true);
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
       if(error){
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
   console.log("RENDERING COMPANY PROFILE");
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
   Session.set("IsData",true);
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
       if(error){
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
     this.render('executive_profile');
   }
 }
});

LocationProfileController = BaseController.extend({
 onBeforeAction: function(){
   Session.set("IsData",true);
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
       if(error){
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
   this.layout('finance_layout');
   this.render('list_view');
 }
});

SectorController = BaseController.extend({
 onBeforeAction: function(){
   console.log("PARTNER",this.params.partner_id);
   console.log("RENDERING Sector Page");
   this.next();
 },
 action: function(){
   this.layout('finance_layout');
   this.render('sector_page');
 }
});

TrendingController = BaseController.extend({
 onBeforeAction: function(){
   console.log("PARTNER",this.params.partner_id);
   console.log("RENDERING Trendings Page");
   this.next();
 },
 action: function(){
   this.layout('finance_layout');
   this.render('trending_page');
 }
});

MarketRecapController = BaseController.extend({
 onBeforeAction: function(){
   console.log("PARTNER",this.params.partner_id);
   console.log("RENDERING Market Recap Page");
   this.next();
 },
 action: function(){
   this.layout('finance_layout');
   this.render('market_recap_page');
 }
});

BoardCommitteeController = BaseController.extend({
 onBeforeAction: function(){
   console.log("PARTNER",this.params.partner_id);
   console.log("RENDERING Board Committee");
   this.next();
 },
 action: function(){
   this.layout('finance_layout');
   this.render('co_board_committee');
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
   this.next();
 },
 action: function(){
   this.layout('finance_layout');
   this.render('article_page');
 }
});

PreviousEarningsController = BaseController.extend({
 onBeforeAction: function(){
   console.log("PARTNER",this.params.partner_id);
   console.log("RENDERING Previous Earnings");
   this.next();
 },
 action: function(){
   this.layout('finance_layout');
   this.render('earnings_pr_page');
 }
});

EarningsCalenderController = BaseController.extend({
 onBeforeAction: function(){
   console.log("PARTNER",this.params.partner_id);
   console.log("RENDERING Earnings Calender");
   this.next();
 },
 action: function(){
   this.layout('finance_layout');
   this.render('earnings_calender');
 }
});

DisqusController = BaseController.extend({
 onBeforeAction: function(){
   console.log("PARTNER",this.params.partner_id);
   console.log("RENDERING Disqus Page");
   this.next();
 },
 action: function(){
   this.layout('finance_layout');
   this.render('comments_page');
 }
});

MarketRecapNewsController = BaseController.extend({
 onBeforeAction: function(){
   console.log("PARTNER",this.params.partner_id);
   console.log("RENDERING Market Recap News Page");
   this.next();
 },
 action: function(){
   this.layout('finance_layout');
   this.render('market_recap_news');
 }
});

/*********STANDALONE CONTROLLERS END**************/

/*********FINANCIAL CONTROLLERS**************/
MoneyMemoryController = BaseController.extend({
 onBeforeAction: function(){
   console.log("PARTNER",this.params.partner_id);
   console.log("RENDERING Money Memory");
   this.next();
 },
 action: function(){
   this.layout('finance_layout');
   this.render('money_memory_page');
 }
});

BalanceSheetController = BaseController.extend({
 onBeforeAction: function(){
   console.log("PARTNER",this.params.partner_id);
   console.log("RENDERING Balance Sheet");
   this.next();
 },
 action: function(){
   this.layout('finance_layout');
   this.render('co_balance_sheet');
 }
});

IncomeStatementController = BaseController.extend({
 onBeforeAction: function(){
   console.log("PARTNER",this.params.partner_id);
   console.log("RENDERING Income Statement");
   this.next();
 },
 action: function(){
   this.layout('finance_layout');
   this.render('co_income_statement');
 }
});

FinancialOverviewController = BaseController.extend({
 onBeforeAction: function(){
   console.log("PARTNER",this.params.partner_id);
   console.log("RENDERING Financial Overview");
   this.next();
 },
 action: function(){
   this.layout('finance_layout');
   this.render('co_fin_overview');
 }
});

CompetitorController = BaseController.extend({
 onBeforeAction: function(){
   console.log("PARTNER",this.params.partner_id);
   console.log("RENDERING Competitor Page");
   this.next();
 },
 action: function(){
   this.layout('finance_layout');
   this.render('co_competitor');
 }
});

CompensationController = BaseController.extend({
 onBeforeAction: function(){
   console.log("PARTNER",this.params.partner_id);
   console.log("RENDERING Compensation Page");
   this.next();
 },
 action: function(){
   this.layout('finance_layout');
   this.render('co_exec_comp');
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
/*********DISCLAIMER CONTROLLERS END**************/

ResultsController = BaseController.extend({
  action: function(){
    this.layout('finance_layout');
    this.render('finance_noresults');
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
