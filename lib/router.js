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

  this.route('content.toplist',{
    path: '/:partner_id?/top-list',
    controller: 'TopListController'
  })

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

  this.route('content.noresults',{
    path: '/:partner_id?/no-results',
    controller: 'ResultsController'
  })

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
