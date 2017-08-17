cdnURL = undefined;
var apiUrl = "";

//NOTE: GEOLOCATION is in file  ../layouts/finance/finance_homepage_logic.js

//Global Url that will auto check the environment and call the appropriate api
//console.log("absURL: "+ Meteor.absoluteUrl());
if (Meteor.absoluteUrl().indexOf("localhost") > -1 ) {
  apiUrl = "http://dev-finance-api.synapsys.us/call_controller.php";
} else if ( Meteor.absoluteUrl().indexOf("dev.") > -1) {
  apiUrl = "http://dev-finance-api.synapsys.us/call_controller.php";
} else if ( Meteor.absoluteUrl().indexOf("qa.") > -1) {
  apiUrl = "http://qa-finance-api.synapsys.us/call_controller.php";
} else if ( Meteor.absoluteUrl().indexOf("sandbox.") > -1) {
  apiUrl = "http://sandbox-finance-api.synapsys.us/call_controller.php";
} else {
  apiUrl = "http://apifin.investkit.com/call_controller.php";
}
//console.log("apiURL: "+ apiUrl);

Router.pick_path = function(route_name, router_params, current_params) {
  var ogRoute = route_name;
  if ( (typeof current_params != "undefined" && typeof current_params.partner_id != "undefined") || ( typeof Router.current != "undefined" && typeof Router.current().params.partner_id != "undefined") ) {
    if ( route_name == "content.finance.home" ) {
      route_name = "content.partnerhome";
    }
    if ( route_name != 'content.partnerhome' ) {
      var arr = route_name.split('.');
      arr.splice(0,1);
      route_name = 'partner.' + arr.join('.');
    }
    if ( typeof current_params != "undefined" && typeof current_params.partner_id != "undefined" ) {
      router_params.partner_id = current_params.partner_id;
    } else {
      router_params.partner_id = Router.current().params.partner_id;
    }
  }
  if ( typeof router_params.loc_id != "undefined" ) {
    if ( typeof fullstate(router_params.loc_id) != "undefined" ) {
      router_params.loc_id = fullstate(router_params.loc_id);
    }
    router_params.loc_id = compUrlName(router_params.loc_id);
  }
  var getURL = window.location.host;
  if (/finance/i.test(getURL.toLowerCase())){
    router_params.partner_id = "";
    route_name = ogRoute;
  }
  // Pull out query string
  var options = {};
  if ( typeof router_params != "undefined" && typeof router_params.query != "undefined" ) {
    options = {query: router_params.query};
    delete router_params.query;
  }
  var path = Router.path(route_name,router_params, options);
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
    path:'/:partner_id/:ticker/:name/company/:company_id',
    controller: 'CompanyProfileController'
  });
  this.route('deprecated.companyprofile',{
    path:'/:partner_id/:name/:ticker/c/:company_id',
    controller: 'CompanyProfileController'
  });

  this.route('content.executiveprofile',{
    path:'/:fname-:lname/:ticker/executive/:exec_id',
    controller: 'ExecutiveProfileController'
  });
  this.route('partner.executiveprofile',{
    path:'/:partner_id/:fname-:lname/:ticker/executive/:exec_id',
    controller: 'ExecutiveProfileController'
  });
  this.route('deprecated.executiveprofile',{
    path:'/:partner_id/:ticker/:lname-:fname/e/:exec_id',
    controller: 'ExecutiveProfileController'
  });
  this.route('content.locationprofile',{
    path:'/:loc_id/:city?/location/:city_id?',
    controller: 'LocationProfileController'
  });
  this.route('partner.locationprofile',{
    path:'/:partner_id/:loc_id/:city?/loc/:city_id?',
    controller: 'LocationProfileController'
  });
  // this.route('deprecated.locationprofile',{
  //   path:'/:partner_id/:city?/:loc_id/loc/:city_id?',
  //   controller: 'LocationProfileController'
  // });
 /********************PROFILES END********************/

 /*********ANYTHING BELOW THIS LINE ARE WEBPAGES**************/
 /*********LIST PAGES**************/
  this.route('content.toplist',{
    path: '/:l_name/:list_id/list/:loc_id?/:page_num',
    controller: 'TopListController'
  });
  this.route('partner.toplist',{
    path: '/:partner_id/:l_name/:list_id/list/:loc_id?/:page_num',
    controller: 'TopListController'
  });
  this.route('deprecated.toplist',{
    path: '/:partner_id/:l_name/:loc_id?/:list_id/list/:page_num',
    controller: 'TopListController'
  });

  this.route('content.toplist2',{
    path: '/:loc_id?/:l_name/:list_id/executive-list/:page_num',
    controller: 'TopList2Controller'
  });
  this.route('partner.toplist2',{
    path: '/:partner_id/:loc_id?/:l_name/:list_id/executive-list/:page_num',
    controller: 'TopList2Controller'
  });
  this.route('deprecated.toplist2',{
    path: '/:partner_id/:l_name/:loc_id?/:list_id/list-executives/:page_num',
    controller: 'TopList2Controller'
  });

  this.route('content.executivelocation',{
    path: '/:loc_id/executives-list/:page_num',
    controller: 'ExecLocController'
  });
  this.route('partner.executivelocation',{
    path: '/:partner_id/:loc_id/executives-list/:page_num',
    controller: 'ExecLocController'
  });
  this.route('deprecated.executivelocation',{
    path: '/:partner_id/:loc_id/list-executives/:page_num',
    controller: 'ExecLocController'
  });

  this.route('content.totalmarketcap',{
    path: '/:loc_id/total-market-cap',
    controller: 'TotalMarketController'
  });
  this.route('partner.totalmarketcap',{
    path: '/:partner_id/:loc_id/total-market-cap',
    controller: 'TotalMarketController'
  });

  this.route('content.search',{
    path: '/search/r=:search_results?',
    controller: 'SearchController'
  });
  this.route('partner.search',{
    path: '/:partner_id/search/r=:search_results?',
    controller: 'SearchController'
  });
  this.route('deprecated.search',{
    path: '/:partner_id/s/r=:search_results?',
    controller: 'SearchController'
  });
  this.route('content.sector',{
    path: '/:loc_id/sector/:sector_id?/:page_num',
    controller: 'SectorController'
  });
  this.route('partner.sector',{
    path: '/:partner_id/:loc_id/sector/:sector_id?/:page_num',
    controller: 'SectorController'
  });
  this.route('deprecated.sector',{
    path: '/:partner_id/sec/:loc_id/:sector_id?/:page_num',
    controller: 'SectorController'
  });

  this.route('content.boardcommittee',{
    path: '/:ticker/:name/executives/:company_id',
    controller: 'BoardCommitteeController'
  });
  this.route('partner.boardcommittee',{
    path: '/:partner_id/:ticker/:name/executives/:company_id',
    controller: 'BoardCommitteeController'
  });
  this.route('deprecated.boardcommittee',{
    path: '/:partner_id/:name/:ticker/execs/:company_id',
    controller: 'BoardCommitteeController'
  });

  this.route('content.widgetlist', {
    path: '/widget-list',
    controller: 'WidgetListController'
  });
  this.route('partner.widgetlist', {
    path: '/:partner_id/widget-list',
    controller: 'WidgetListController'
  });
  this.route('deprecated.widgetlist', {
    path: '/:partner_id/w-list',
    controller: 'WidgetListController'
  });
  /*********LIST PAGES END**************/
  /*********STANDALONE PAGES**************/

  this.route('content.moneymemory',{ // CHANGED
    path: '/:ticker/:name/money-memory/:company_id',
    controller: 'MoneyMemoryController'
  })
  this.route('partner.moneymemory',{
    path: '/:partner_id/:ticker/:name/money-memory/:company_id',
    controller: 'MoneyMemoryController'
  })
  this.route('deprecated.moneymemory',{
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

  this.route('content.earnings',{
    //path: '/earnings/:company_id/:type/Annual/comp_id',
    path: '/:ticker/:name/earnings/:earn_type/:company_id',
    controller: 'EarningsController'
  })
  this.route('partner.earnings',{
    //path: '/earnings/:company_id/:type/Annual/comp_id',
    path: '/:partner_id/:ticker/:name/earnings/:earn_type/:company_id',
    controller: 'EarningsController'
  })

  this.route('content.articlenews',{
    path: '/:ticker/:name/news/:company_id',
    controller: 'ArticleNewsController'
  });
  this.route('partner.articlenews',{
    path: '/:partner_id/:ticker/:name/news/:company_id',
    controller: 'ArticleNewsController'
  });
  this.route('deprecated.articlenews',{
    path: '/:partner_id/:name/:ticker/n/:company_id',
    controller: 'ArticleNewsController'
  });

  this.route('content.articlenewsloc',{ // NEW
    path: '/:loc_id/news',
    controller: 'ArticleNewsController'
  })
  this.route('partner.articlenewsloc',{ // NEW
    path: '/:partner_id/:loc_id/news',
    controller: 'ArticleNewsController'
  })
  this.route('deprecated.articlenewsloc',{ // NEW
    path: '/:partner_id/news/:loc_id',
    controller: 'ArticleNewsController'
  })

  this.route('content.articlenewsexec',{ // NEW
    path: '/:fname-:lname/:ticker/executive/news/:company_id',
    controller: 'ArticleNewsController'
  })
  this.route('partner.articlenewsexec',{ // NEW
    path: '/:partner_id/:fname-:lname/:ticker/executive/news/:company_id',
    controller: 'ArticleNewsController'
  })
  this.route('deprecated.articlenewsexec',{ // NEW
    path: '/:partner_id/:ticker/:lname-:fname/executive/news/:company_id',
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
    path: '/:partner_id/:lname-:fname/:ticker/compensation/:exec_id',
    controller: 'CompensationController'
  })
  this.route('deprecated.compensation',{ // CHANGED
    path: '/:partner_id/:ticker/:lname-:fname/comp/:exec_id',
    controller: 'CompensationController'
  })

  this.route('content.collegerivals',{ // CHANGED
    path: '/:fname-:lname/:ticker/rivals/:exec_id',
    controller: 'CollegeRivalsController'
  })
  this.route('partner.collegerivals',{ // CHANGED
    path: '/:partner_id/:fname-:lname/:ticker/rivals/:exec_id',
    controller: 'CollegeRivalsController'
  })
  this.route('deprecated.collegerivals',{ // CHANGED
    path: '/:partner_id/:ticker/:lname-:fname/rival/:exec_id',
    controller: 'CollegeRivalsController'
  })

  this.route('content.eduhist',{
    path: '/:fname-:lname/:ticker/education/:exec_id',
    controller: 'EducationController'
  });
  this.route('partner.eduhist',{
    path: '/:partner_id/:fname-:lname/:ticker/education/:exec_id',
    controller: 'EducationController'
  });
  this.route('deprecated.eduhist',{
    path: '/:partner_id/:ticker/:lname-:fname/edu/:exec_id',
    controller: 'EducationController'
  });

  this.route('content.statistics',{ // CHANGED
    path: '/:loc_id/:city?/statistics',
    controller: 'StatisticsController'
  })
  this.route('partner.statistics',{ // CHANGED
    path: '/:partner_id/:loc_id/:city?/statistics',
    controller: 'StatisticsController'
  })
  this.route('deprecated.statistics',{ // CHANGED
    path: '/:partner_id/:city?/:loc_id/stats',
    controller: 'StatisticsController'
  })

  this.route('content.aboutexec',{ // CHANGED
    path: '/:fname-:lname/:ticker/about/:exec_id',
    controller: 'AboutexecController'
  })
  this.route('partner.aboutexec',{ // CHANGED
    path: '/:partner_id/:fname-:lname/:ticker/about/:exec_id',
    controller: 'AboutexecController'
  })
  this.route('deprecated.aboutexec',{ // CHANGED
    path: '/:partner_id/:ticker/:lname-:fname/abt/:exec_id',
    controller: 'AboutexecController'
  })

  this.route('content.workhistory',{
    path: '/:lname-:fname/:ticker/workhistory/:exec_id',
    controller: 'WorkHistoryController'
  })
  this.route('partner.workhistory',{
    path: '/:partner_id/:lname-:fname/:ticker/workhistory/:exec_id',
    controller: 'WorkHistoryController'
  })
  this.route('deprecated.workhistory',{
    path: '/:partner_id/:ticker/:lname-:fname/wrk-hist/:exec_id',
    controller: 'WorkHistoryController'
  })

  this.route('content.abouthq',{ // CHANGED
    path: '/:ticker/:name/hq/:company_id',
    controller: 'AboutHQController'
  })
  this.route('partner.abouthq',{ // CHANGED
    path: '/:partner_id/:ticker/:name/hq/:company_id',
    controller: 'AboutHQController'
  })
  this.route('deprecated.abouthq',{ // CHANGED
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
    path: '/:partner_id/:ticker/:name/financial-overview/:company_id',
    controller: 'FinancialOverviewController'
  })
  this.route('deprecated.finoverview',{ // CHANGED
    path: '/:partner_id/:name/:ticker/fin-view/:company_id',
    controller: 'FinancialOverviewController'
  })

  this.route('content.competitor',{ // CHANGED
    path: '/:ticker/:name/competitors/:company_id',
    controller: 'CompetitorController'
  })
  this.route('partner.competitor',{ // CHANGED
    path: '/:partner_id/:ticker/:name/competitors/:company_id',
    controller: 'CompetitorController'
  })
  this.route('deprecated.competitor',{ // CHANGED
    path: '/:partner_id/:name/:ticker/rivals/:company_id',
    controller: 'CompetitorController'
  })

  this.route('content.listoflist',{ // CHANGED
    path: '/:ticker/:name/lists/:company_id',
    controller: 'ListofListController'
  })
  this.route('partner.listoflist',{ // CHANGED
    path: '/:partner_id/:ticker/:name/lists/:company_id',
    controller: 'ListofListController'
  })
  this.route('deprecated.listoflist',{ // CHANGED
    path: '/:partner_id/:name/:ticker/lists/:company_id',
    controller: 'ListofListController'
  })

  this.route('content.listoflistloc',{ // NEW 10/28/2015
    path: '/:loc_id/lists',
    controller: 'ListofListLocController'
  })
  this.route('partner.listoflistloc',{ // NEW 10/28/2015
    path: '/:partner_id/:loc_id/lists',
    controller: 'ListofListLocController'
  })
  this.route('deprecated.listoflistloc',{ // NEW 10/28/2015
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

  this.route('content.latestnews',{
    //news page
    path:'/National/news',
    controller: 'NationalNewsController'
  })
  this.route('partner.latestnews',{
    //news page
    path:'/:partner_id/National/news',
    controller: 'NationalNewsController'
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

  this.route('partner.error',{
    path: '/error-page',
    controller: 'ErrorController'
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
  before: function(){
    var self = this;
    // Set the CDN hostname
    if ( typeof Router == "function" && typeof Router.current == "function" && typeof Router.current() == "object" ) {
      if ( Router.current().url.match(/myinvestkit/) != null ) {
        cdnURL = 'http://images.myinvestkit.com/images/';
      }
      //cdnURL = 'http://cdn.investkit.com/';
      cdnURL = 'http://images.investkit.com/images/';
    }

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

    //var hostn = window.location.host.split(':')[0]; // For local testing
    var hostn = window.location.host;
    var hosty = hostn.split('.');

    // Check for subdomain and set session true
    if(hosty[0].match(/finance/) != null){
      this.params.partner_id = hostn.split(".")[1] + "." + hostn.split(".")[2];
      Session.set('IsSubDomain', true);
      Session.set('isPartner', true);
      Session.set('partner_id', this.params.partner_id);
    }

    if ( typeof this.params.partner_id != "undefined" && typeof Session.get('IsGlobalFirstRun') == "undefined" ) {
      this.params.partner_id = this.params.partner_id.toLowerCase();

      Session.set('isPartner', true);
      Session.set('partner_id', this.params.partner_id);

      SetPageTitle('Finance', true);
      var doCall = true;
      if ( typeof Storage != "undefined" && typeof localStorage[this.params.partner_id] != "undefined" ) {
        var p_data = JSON.parse(localStorage[this.params.partner_id]);
        SetPageTitle( 'Finance', true);
        if (p_data.source == 'null' || p_data.source == null || p_data.source == "") {
            Session.set('IsError', true);
            Session.set("IsData", false);
            self.redirect('/error-page');
            return '';
        }
        Session.set('isPartner', true);
        Session.set('partner_id', this.params.partner_id);
        Session.set('p_data',p_data);
        Session.set('partner_header_code',p_data.script);
        Session.set('partner_header_height',p_data.height+'px');
      }
      if ( typeof p_data == "undefined" || typeof p_data.date == "undefined" || ((new Date()).getTime() - p_data.date) > 604800000 ) {
        Meteor.call('GetPartnerHeader',this.params.partner_id,function(error,data){
          if ( error ) {
            console.log('Partner Header Error:', error);
            Session.set('IsError', true);
            Session.set("IsData", false);
            self.redirect('/error-page');
            return false;
          }
          try {
            var p_data = data.data[0];
            p_data.date = (new Date()).getTime();
              if (p_data.source == 'null' || p_data.source == null || p_data.source == "") {
                  Session.set('IsError', true);
                  Session.set("IsData", false);
                  self.redirect('/error-page');
                  return '';
              } else {
                  if (p_data.status != "success") {
                      console.log('Invalid partner domain: ', Router.current().params.partner_id);
                      return false;
                  }
                  if (typeof Storage != "undefined") {
                      localStorage[Router.current().params.partner_id] = JSON.stringify(p_data);
                  }
                  SetPageTitle('Finance', true);
                  Session.set('isPartner', true);
                  Session.set('partner_id', Session.get('partner_id'));
                  Session.set('p_data', p_data);
                  Session.set('partner_header_code', p_data.script);
                  Session.set('partner_header_height', p_data.height + 'px');
              }
          } catch (e) {
            Session.set('IsError', true);
            Session.set("IsData", false);
            console.log('Partner Error (parsing)',e);
            self.redirect('/error-page');
            return '';
          }
        });
      } else if (p_data.source == 'null' || p_data.source == null || p_data.source == "") {
          Session.set('IsError', true);
          Session.set("IsData", false);
          self.redirect('/error-page');
          return '';
      } else {
          Session.set('isPartner', true);
          console.log('Partner Header Previously Downloaded');
      }
      Session.set('IsGlobalFirstRun', false);
    }
    if (!Session.get('IsError')) {
        this.next();
    } else {
        return ''
    }
  }
});
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
           Session.set("cp_metadata",data);
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
 },

    //Company Profile Page Meta Tags
    setCompanyTags: function (data) {
        var searchString;

        var companyData = data.whos_who?data.whos_who.company:null
     /*   searchString += data.TeamName ? ', ' + data.TeamName : '';
        searchString += data.Division ? ', ' + data.Division : '';*/
     if(companyData!=null){
         var searchString = "Company page, " + companyData.c_name+ ", finance, " + companyData.c_ticker +", " +companyData.c_industry;

         return {
             "description": companyData.c_desc.length>167?companyData.c_desc.substr(0,167) + '...':companyData.c_desc,
             "robots": "INDEX, FOLLOW",
             "og:title": companyData.c_name,
             "og:type": "Website",
             "og:url": window.location.href,
             "og:image": companyData.c_logo,
             "og:description": companyData.c_desc.length>167?companyData.c_desc.substr(0,167) + '...':companyData.c_desc,
             "es_page_title":companyData.c_name,
             "es_image_url": companyData.c_logo,
             "es_page_type": "Company Profile Page",
             "es_category": companyData.c_sector,
             "es_published_date": companyData.c_tr_last_updated,
             "es_page_url": window.location.href,
             "es_keywords": searchString,
             "es_description": companyData.c_desc,
         };
     } else return "No Metadata";

    },
    onAfterAction: function () {
        var data =  Session.get('cp_metadata');
        if (typeof data == 'undefined') {return ''};
        var metaTags = this.setCompanyTags(data);
        if(metaTags != "No Metadata"){setMetaTags(metaTags)};
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
       Session.set('ep_metadata',data);
       //console.log("batch1", data);
       if(error || typeof data == 'undefined' || typeof data.profile_header == "string" ){
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
 },
    setExecutiveTags: function (data) {
        var searchString;
        var executiveData = data.profile_header?data.profile_header:null;
        if(executiveData!=null){
            var title = executiveData.o_first_name + " " + executiveData.o_middle_initial + " " + executiveData.o_last_name + " , " + executiveData.c_name;

            searchString = "Executive page, " +executiveData.o_current_title.long_title +", "+title +", " + executiveData.c_name+ ", finance, " + executiveData.c_ticker +", " +executiveData.c_hq_city + ", "+executiveData.c_hq_state;
            var image = executiveData.o_pic?executiveData.o_pic:executiveData.c_logo;
            return {
                "description": executiveData.o_bio.length>167?executiveData.o_bio.substr(0,167)+'...':executiveData.o_bio,
                "robots": "INDEX, FOLLOW",
                "og:title": title,
                "og:type": "Website",
                "og:url": window.location.href,
                "og:image": image,
                "og:description": executiveData.o_bio.length>167?executiveData.o_bio.substr(0,167)+'...':executiveData.o_bio,
                'es_page_title': title,
                "es_image_url": image,
                "es_page_type": "Executive Profile Page",
                "es_category": executiveData.o_current_title.long_title,
                "es_published_date": executiveData.o_last_updated,
                "es_page_url": window.location.href,
                "es_keywords": searchString,
                "es_description": executiveData.o_bio,
            };
        } else return "No Metadata";

    },
   onAfterAction: function () {
        var data =  Session.get('ep_metadata');
        if (typeof data == 'undefined') {return ''};
        var emetaTags = this.setExecutiveTags(data);
       if(emetaTags != "No Metadata"){setMetaTags(emetaTags)};
    }
});

LocationProfileController = BaseController.extend({
 onBeforeAction: function(){
   console.log(this.params.loc_id);
   console.log(abbrstate(this.params.loc_id));
   if ( typeof abbrstate(this.params.loc_id) != "undefined" ) {
     this.params.loc_id = abbrstate(this.params.loc_id);
   }
   console.log("PARTNER:", this.params.partner_id);
   console.log("LOCATION:", this.params.loc_id);
   Session.set("IsLocation", true);
   if ( typeof this.params.city_id != "undefined" ) {
     Session.set("loc_id", this.params.city_id);
   } else {
     Session.set("loc_id", this.params.loc_id);
   }
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
       Session.set('lp_metadata', data);
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

           //MAKE SECOND call to grab all data for daily update
          //  GetLocationData: function(loc_id, batchNum, graph_option) send true to graph_option
           Meteor.call("GetLocationData", Session.get('loc_id'), "indie", true, function(error, data){
             //console.log("batch2", data);
             if(error){
               console.log('Invalid Exec Batch 2 Error',error);
               return '';
             }
             var composite_history = Session.get('location_daily_update');
             if(typeof composite_history['composite_history'] != 'undefined' || composite_history['composite_history'] != null){// Detect if there is any composite_history in the api
               var newCompositeHistory = data['location_daily_update']['composite_history'];
               if(newCompositeHistory.length > 0 && typeof newCompositeHistory != 'undefined' && newCompositeHistory != null){//detect if there is any new data to append to the current data set
                 composite_history['composite_history'] = newCompositeHistory;
                 Session.set('location_daily_update', composite_history);// re set the data back to the session variable
               }
             }
           });//end BATCH 2 ADDITIONAL CALL
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
   // Check for data
   if ( Session.get('IsData') ) {
     //renders the layout of all finance page and company profile
     this.layout('finance_layout');
     this.render('location_profile');
   }
 },
    setLocationTags: function (data) {
       if(data.profile_header){
           var title =  data.profile_header.location + " business profile";
           var desc = data.profile_header.location+ " has " + data.profile_header.total_companies + ", gathering a total market cap of " + data.profile_header.total_market_cap + " dollars. " + data.profile_header.location + " is also home to " + data.profile_header.total_executives + " executives";

           var searchString = "Location profile page, " + "companies in "+data.profile_header.location +", "+"finance";
           var image = '/public/public/Logo_InvestKit.png';
           return {
               "description":desc.length>167?desc.substr(0,167)+'...':desc,
               "robots": "INDEX, FOLLOW",
               "og:title": title,
               "og:type": "Website",
               "og:url": window.location.href,
               "og:image": image,
               "og:description": desc.length>167?desc.substr(0,167)+'...':desc,
               'es_page_title': title,
               "es_image_url": image,
               "es_page_type": "Location Profile Page",
               "es_category": "Finance",
               "es_published_date": data.profile_header.last_updated,
               "es_page_url": window.location.href,
               "es_keywords": searchString,
               "es_description": desc,
           };
       } else return "No MetaData";

    },
    onAfterAction: function () {

        var data =  Session.get('lp_metadata');
        if (typeof data == 'undefined') {return ''}
        var lmetaTags = this.setLocationTags(data);
        if(lmetaTags!="No MetaData"){setMetaTags(lmetaTags)};
    }

});

PartnerHomeController = BaseController.extend({
  onBeforeAction: function(){
    console.log("PARTNER:", this.params.partner_id);
    console.log("LOCATION:", this.params.loc_id);
    Session.set("IsLocation", true);
    Session.set('loc_id',this.params.partner_id);
    //Session.set("city_id", this.params.city_id);
    // Only run the calls that get the data if it's the first run
    // This prevents the calls from being looped
    if ( typeof Session.get('IsFirstRun') == "undefined" ) {
      // Prevent this loop from running again
      Session.set('IsFirstRun',false);

      /*****************************************
      Meteor method call for server side ajax
      ppath:'/:partner_id',
      methods.js: GetProfileData: function(profile, batchNum, state, city)
      ******************************************/
      //BATCH 1 call sending only first few modules data
      Meteor.call("GetPartnerProfile", Session.get('loc_id'), "batch_1", function(error, data){
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
          Meteor.call("GetPartnerProfile", Session.get('loc_id'), "batch_2", function(error, data){
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
            Meteor.call("GetPartnerProfile", Session.get('loc_id'), "indie", true,function(error, data){
              //console.log("batch2", data);
              if(error){
                console.log('Invalid Exec Batch 2 Error',error);
                return '';
              }
              var composite_history = Session.get('location_daily_update');
              if(typeof composite_history['composite_history'] != 'undefined' || composite_history['composite_history'] != null){// Detect if there is any composite_history in the api
                var newCompositeHistory = data['location_daily_update']['composite_history'];
                if(newCompositeHistory.length > 0 && typeof newCompositeHistory != 'undefined' && newCompositeHistory != null){//detect if there is any new data to append to the current data set
                  composite_history['composite_history'] = newCompositeHistory;
                  Session.set('location_daily_update', composite_history);// re set the data back to the session variable
                }
              }
            });//end BATCH 2 grabbing partner data
          });//end BATCH 2

          //BATCH 3 call sending rest of the data missing
          Meteor.call("GetPartnerProfile", Session.get('loc_id'), "batch_3", function(error, data){
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
          Meteor.call("GetPartnerProfile", Session.get('loc_id'), "batch_4", function(error, data){
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
            Meteor.call("GetPartnerProfile", Session.get('loc_id'), "batch_5", function(error, data){
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
          Meteor.call("GetPartnerProfile", Session.get('loc_id'), "batch_6", function(error, data){
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
            Meteor.call("GetPartnerProfile", Session.get('loc_id'), "batch_7", function(error, data){
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
    // Check for data
    if ( Session.get('IsData') ) {
      //renders the layout of all finance page and company profile
      this.layout('finance_layout');
      //this.render('finance_homepage');
      this.render('location_profile');
    }
  }
})

/****************************END PROFILE_CONTROLLERS*******************************/

/****************************WEBPAGE CONTROLLERS*******************************/
/*********LIST CONTROLLER**************/
TopListController = BaseController.extend({
 onBeforeAction: function(){
   if ( typeof abbrstate(this.params.loc_id) != "undefined" ) {
     this.params.loc_id = abbrstate(this.params.loc_id);
   }
   console.log("RENDERING Top List");
   console.log("Location",this.params.loc_id);
   console.log("List-Index",this.params.list_id);
   console.log("Page Number", this.params.page_num);
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
     Meteor.call("topListData", this.params.list_id, this.params.loc_id, this.params.page_num, function(error, data){
       //console.log(data, error);
       Session.set('list_metadata',data.top_list_gen);
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
  },
    setListTags: function (data) {
     if(typeof (data.top_list_list)!=undefined){
         l_array = [];
         data.top_list_list.forEach(function(val){
             l_array.push(val.c_name);
             l_array.push(val.c_industry);
             l_array.push(val.c_ticker);
             l_array.push(val.c_exchange);
         });
         var fil_array = l_array.filter(function (val,pos,self) {
             return self.indexOf(val) ==pos && val != "undefined";
         })
         var title = "List Page";
         var desc = data.top_list_info.top_list_title;
         var searchString = "List page, " + fil_array.join(', ');
         var image = '/public/public/Logo_InvestKit.png';
         return {
             "description":desc.length>167?desc.substr(0,167)+'...':desc,
             "robots": "INDEX, FOLLOW",
             "og:title": title,
             "og:type": "Website",
             "og:url": window.location.href,
             "og:image": image,
             "og:description": desc.length>167?desc.substr(0,167)+'...':desc,
             'es_page_title': title,
             "es_image_url": image,
             "es_page_type": "List Page",
             "es_category": "Finance",
             "es_published_date": data.top_list_list[0].lcsi_price_last_updated,
             "es_page_url": window.location.href,
             "es_keywords": searchString,
             "es_description": desc,
         };
     }else return "No Metadata";

    },
    onAfterAction: function () {

        var data =  Session.get('list_metadata');
        if (typeof data == 'undefined') {return ''};
        var listMetaTags = this.setListTags(data);
        if(listMetaTags!="No Metadata"){setMetaTags(listMetaTags)};
    }
});

WidgetListController = BaseController.extend({
  onBeforeAction: function(){
    // Check for query values
    if ( typeof(this.params.query) == "undefined" ) {
      Session.set('IsError', true);
      Session.set('IsFirstRun', false);
    }
    // Only run the calls that get the data if it's the first run
    // This prevents the calls from being looped
    if ( typeof Session.get('IsFirstRun') == "undefined" ) {
      /*****************************************
      Meteor method call for server side ajax
      path: '/widget-list',
      GetWidgetData: function(tw, sw, input)
      ******************************************/
      //Set page number
      Session.set('ListPage', 0);
      if ( typeof(this.params.query.page) != "undefined" ) {
        Session.set('ListPage', (this.params.query.page - 1));
      }
      // Make method call
      Meteor.call("GetWidgetData", this.params.query.tw, this.params.query.sw, this.params.query.input, function(error, data){
          Session.set('widget_data', data);
          // Error handling
        if(error || (typeof(data.success) != "undefined" && !data.success)){
          console.log('Invalid Team Error',error, data);
          Session.set('IsError',true);
          return '';
        }

        // Manipulate data
        for ( i = 0; i < data.data.length; i++ ) {
          // Create correct URL
          if ( typeof(Router.current().params.partner_id) == "undefined" ) {
            // Our site
            data.data[i].url = data.data[i].primary_url;
            if ( data.data[i].sub_img != "false" ) {
              data.data[i].sub_img.url = data.data[i].sub_img.primary_url;
            }
          } else {
            // Partner sites
            data.data[i].url = data.data[i].partner_url.replace('{partner}', Router.current().params.partner_id);
            if ( data.data[i].sub_img ) {
              data.data[i].sub_img.url = data.data[i].sub_img.partner_url.replace('{partner}', Router.current().params.partner_id);
            }
          }
        }

        // Save out the data
        Session.set('ListData', data);
        Session.set('IsData', true);
      });//end Meteor Call
    }
    // Prevent this loop from running again
    Session.set('IsFirstRun',false);
    this.next();
  },
  action: function(){
    if ( Session.get('IsData') ) {
      this.layout('finance_layout');
      this.render('widget_list_view');
    }
  },
    setWidgetTags: function (data) {
        if(data.data){

            w_arr = [];

            widData = data.data.length>10?data.data.slice(0,9):data.data;
            widData.forEach(function (val) {
                w_arr.push(val.desc);
                w_arr.push(val.tag);
                w_arr.push(val.title);
            });
            var fil_w_arr = w_arr.filter(function (val, pos, self) {
                return self.indexOf(val) == pos && val != "undefined";
            });
            var title = data.title?data.title: ' Widget List Page';
            var desc = 'List shows ' + title;
            var searchString = "Widget List page, " + fil_w_arr.join(', ');
            var image = '/public/public/Logo_InvestKit.png';
            return {
                "description":desc.length>167?desc.substr(0,167)+'...':desc,
                "robots": "INDEX, FOLLOW",
                "og:title": title,
                "og:type": "Website",
                "og:url": window.location.href,
                "og:image": image,
                "og:description": desc.length>167?desc.substr(0,167)+'...':desc,
                'es_page_title': title,
                "es_image_url": image,
                "es_page_type": "Widget List Page",
                "es_category": data.category?data.category:"Finance",
                "es_published_date": data.date?data.date:'',
                "es_page_url": window.location.href,
                "es_keywords": searchString,
                "es_description": desc,
            };

        }else return "No Metadata";

    },
    onAfterAction: function () {

        var data =  Session.get('widget_data');
        if (typeof data == 'undefined') {return ''};
        var widgetTags = this.setWidgetTags(data);
        if(widgetTags!="No Metadata"){setMetaTags(widgetTags)};
    }
});

TopList2Controller = BaseController.extend({
 onBeforeAction: function(){
   if ( typeof abbrstate(this.params.loc_id) != "undefined" ) {
     this.params.loc_id = abbrstate(this.params.loc_id);
   }
   console.log("RENDERING Top List");
   //console.log("List-Index",this.params.list_id);
   //console.log("lname",this.params.l_name);
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

ExecLocController = BaseController.extend({
 onBeforeAction: function(){
   if ( typeof abbrstate(this.params.loc_id) != "undefined" ) {
     this.params.loc_id = abbrstate(this.params.loc_id);
   }
   if ( this.params.loc_id == 'default' ) {
     this.params.loc_id = this.params.partner_id;
   }
   console.log("RENDERING exec List");
   console.log("loc_id", this.params.loc_id);
   Session.set("IsData",true);
   Session.set('loc_id',this.params.loc_id);
   // Only run the calls that get the data if it's the first run
   // This prevents the calls from being looped
   if ( typeof Session.get('IsFirstRun') == "undefined" ) {
     // Prevent this loop from running again
     Session.set('IsFirstRun',false);
     Meteor.call("GetLocationPage", this.params.loc_id,'all_executives', this.params.page_num, function(error, data){
         Session.set('exec_data',data);
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
     if ( this.params.loc_id == this.params.partner_id ) {
       Meteor.call("GetPartnerProfile", Session.get('loc_id'), "batch_1", function(error, data){
         //console.log("batch1", data);
         console.log('BATCH 1 DONE');
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
         }
       });
     }
   }
   this.next();
 },
 action: function(){
   //console.log(Session.get('IsData'));
   if ( Session.get('IsData') ) {
     this.layout('finance_layout');
     this.render('exec_loc');
   }
  },
    setExecLocTags: function (data) {
        if(data.all_executives){
            data = data.all_executives;
            e_arr = [];
            execData = data.length>10?data.slice(0,9):data;
            execData.forEach(function (val) {
                e_arr.push(val.c_name);
                fullname = val.o_first_name?val.o_firstname:'' + val.o_last_name?" " + val.o_last_name:'';
                if(fullname!=''){e_arr.push(fullname)};
                e_arr.push(val.o_current_title.long_title);
            });
            var fil_e_arr = e_arr.filter(function (val, pos, self) {
                return self.indexOf(val) == pos && val != "undefined";
            });
            var title = 'Location Executives';
            var desc = 'List shows ' + title;
            var searchString = "Executives List page, " + fil_e_arr.join(', ');
            var image = '/public/public/Logo_InvestKit.png';
            return {
                "description":desc,
                "robots": "INDEX, FOLLOW",
                "og:title": title,
                "og:type": "Website",
                "og:url": window.location.href,
                "og:image": image,
                "og:description": desc,
                'es_page_title': title,
                "es_image_url": image,
                "es_page_type": "Location Executive List Page",
                "es_category": "Finance",
                "es_page_url": window.location.href,
                "es_keywords": searchString,
                "es_description": desc,
            };

        }else return "No Metadata";

    },
    onAfterAction: function () {
        var data =  Session.get('exec_data');
        if (typeof data == 'undefined') {return ''};
        var execTags = this.setExecLocTags(data);
        if(execTags!="No Metadata"){setMetaTags(execTags)};
    }
});
TotalMarketController = BaseController.extend({
 onBeforeAction: function(){
   if ( typeof abbrstate(this.params.loc_id) != "undefined" ) {
     this.params.loc_id = abbrstate(this.params.loc_id);
   }
   console.log("RENDERING exec List");
   console.log("loc_id", this.params.loc_id);
   Session.set("IsData",true);
   // Only run the calls that get the data if it's the first run
   // This prevents the calls from being looped
   if ( typeof Session.get('IsFirstRun') == "undefined" ) {
     // Prevent this loop from running again
     Session.set('IsFirstRun',false);
     //path: '/:loc_id?/:l_name/:list_id/executive-list',
     Meteor.call("GetLocationPage", this.params.loc_id, 'executives_page' , function(error, data){
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
       }//end for
     });//end Meteor Call
   }
   this.next();
 },
 action: function(){
   //console.log(Session.get('IsData'));
   if ( Session.get('IsData') ) {
     this.layout('finance_layout');
     this.render('market_cap_loc');
   }
  }
});

SectorController = BaseController.extend({
  onBeforeAction: function(){
    if ( typeof abbrstate(this.params.loc_id) != "undefined" ) {
      this.params.loc_id = abbrstate(this.params.loc_id);
    }
    if ( typeof this.params.sector_id != "undefined" ) {
      this.params.sector_id = this.params.sector_id.replace(/-/g,' ').replace(/_/g,'/');
    }
    if ( this.params.loc_id == 'default' ) {
      this.params.loc_id = this.params.partner_id;
    }
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
      Meteor.call("sectorData", Session.get('loc_id'), Session.get('sector_id'), function(error, data){
        if(error || data.success == false){
          console.log('Invalid Sector Error',data);
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
      if ( this.params.loc_id == this.params.partner_id ) {
        Meteor.call("GetPartnerProfile", Session.get('loc_id'), "batch_1", function(error, data){
          //console.log("batch1", data);
          //console.log('BATCH 1 DONE');
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
          }
        });
      }
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
           //console.log(module_name,data[module_name]);
           Session.set(module_name,data[module_name]);
         }
         Session.set("IsData",true);
       }
     });
     Meteor.call("CompIndie", this.params.company_id, 'profile_header', function(error, data){
         Session.set('profile_data',data);
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
     this.render('co_board_committee');
   }
 },
    setExecListTags: function (data) {
     if(data.profile_header){
         data = data.profile_header;
         var title = "Executives List Page";
         var desc = "List of Executives " + data.c_name? "in "+data.c_name:'';
         var searchString = "Executive List page, " + data.c_name? data.c_name:''+ ", " +data.c_sector? data.c_sector:'';
         var image = data.c_logo? data.c_logo:'/public/public/Logo_InvestKit.png';
         return {
             "description":desc.length>167?desc.substr(0,167)+'...':desc,
             "robots": "INDEX, FOLLOW",
             "og:title": title,
             "og:type": "Website",
             "og:url": window.location.href,
             "og:image": image,
             "og:description": desc.length>167?desc.substr(0,167)+'...':desc,
             'es_page_title': title,
             "es_image_url": image,
             "es_page_type": "Executive List Page",
             "es_category": "Finance",
             "es_published_date": data.c_tr_last_updated?data.c_tr_last_updated:'',
             "es_page_url": window.location.href,
             "es_keywords": searchString,
             "es_description": desc,
         };
     } else return "No Metadata";


    },
    onAfterAction: function () {

        var data =  Session.get('profile_data');
        if (typeof data == 'undefined') {return ''};
        var execListTags = this.setExecListTags(data);
        if(execListTags != "No Metadata"){setMetaTags(execListTags)};
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
    //console.log(hostname[0]);
    $('.finance_body_faq').css('display','none');
    if ( typeof Session.get('HomePageLocation') != "undefined"){
      Session.set('IsData',true);
    }
    SetPageTitle(null);
    var hostnexstar = hostname[0].split('.');
    // console.log(hostnexstar);
    if(hostnexstar[0].match(/finance/) != null){
      hostnexstar[2] = hostnexstar[2].split(':')[0];
      // console.log(hostnexstar[2]);
      var partner_link = hostnexstar[1] +'.'+ hostnexstar[2];
      // Router.go('content.partnerhome', {partner_id:partner_link});
      this.layout('finance_layout_home');
      this.render('finance_homepage');
    }else{
      // Check for myinvestkit vs investkit
      if ( hostname[0].match(/myinvestkit/) == null ) {
        this.layout('finance_layout_home');
        this.render('finance_homepage');
      } else {
        this.layout('finance_layout_home');
        SetPageTitle('MyInvestKit', true);
        this.render('myinvestkit_home');
      }
    }
  },
    setHomePageTags: function () {
        var title = "Home Page";
        var desc = "Discover your next investment. Find the stocks you can invest in your interested area. Explore public companies near you";
        var searchString = "Home Page, explore, finance, investkit";
        var image = '/public/public/Logo_InvestKit.png';
        return {
            "description":desc,
            "robots": "INDEX, FOLLOW",
            "og:title": title,
            "og:type": "Website",
            "og:url": window.location.href,
            "og:image": image,
            "og:description": desc,
            'es_page_title': title,
            "es_image_url": image,
            "es_page_type": "Home Page",
            "es_category": "Finance",
            "es_published_date": '',
            "es_page_url": window.location.href,
            "es_keywords": searchString,
            "es_description": desc,
        };
    },
    onAfterAction: function () {
        var hpMetaTags = this.setHomePageTags();
        setMetaTags(hpMetaTags);
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
        if ( typeof abbrstate(this.params.loc_id) != "undefined" ) {
            this.params.loc_id = abbrstate(this.params.loc_id);
        }
        if ( this.params.loc_id == 'default' ) {
            this.params.loc_id = this.params.partner_id;
        }
        var params = this.params;
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
            if(typeof this.params.company_id !== 'undefined'){
                Meteor.call("CompIndie", this.params.company_id,'profile_header', function(error, data){
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
            }else if(typeof this.params.exec_id !== 'undefined'){
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
            }else if(typeof this.params.loc_id !== 'undefined'){
                if ( this.params.loc_id == this.params.partner_id ) {
                    Meteor.call("GetPartnerProfile", this.params.loc_id,'batch_1', function(error, data){
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
                } else {
                    Meteor.call("GetLocationData", this.params.loc_id,'batch_1', function(error, data){
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
            }
        }
        this.next();
    },
    action: function(){
        if ( Session.get('IsData') ) {
            this.layout('finance_layout');
            this.render('article_news_page');
        }
    },
    setArticleNewsTags: function () {
        var title = "Article News Page";
        var desc = "Article News: Explore the latest trending articles in the United states today.";
        var searchString = "Article News Page, finance, investkit";
        var image = '/public/public/Logo_InvestKit.png';
        return {
            "description":desc,
            "robots": "INDEX, FOLLOW",
            "og:title": title,
            "og:type": "Website",
            "og:url": window.location.href,
            "og:image": image,
            "og:description": desc,
            'es_page_title': title,
            "es_image_url": image,
            "es_page_type": "Article News Page",
            "es_category": "Finance",
            "es_published_date": '',
            "es_page_url": window.location.href,
            "es_keywords": searchString,
            "es_description": desc,
        };
    },
    onAfterAction: function () {
        var anMetaTags = this.setArticleNewsTags();
        setMetaTags(anMetaTags);
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
       console.log(data);
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
   if ( typeof abbrstate(this.params.loc_id) != "undefined" ) {
     this.params.loc_id = abbrstate(this.params.loc_id);
   }
   if ( this.params.loc_id == 'default' ) {
     this.params.loc_id = this.params.partner_id;
   }
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
     if ( this.params.loc_id == this.params.partner_id ) {
       Meteor.call("GetPartnerProfile", Session.get('loc_id'), "batch_1", function(error, data){
         //console.log("batch1", data);
         console.log('BATCH 1 DONE');
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
         }
       });
     }
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
      Session.set('IsData', true);
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
            console.log(module_name,data[module_name]);
            Session.set(module_name,data[module_name]);
          }
          Session.set("IsData",true);
        }
     })
    }
    this.next();
  },
  action: function() {
    if ( Session.get('IsData') ) {
      this.layout('finance_layout');
      this.render('annual_EBS');
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

//need to change onBeforeAction incompatible with Microsft edge using Same name webHooks with XXX.extend
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

//need to change onBeforeAction incompatible with Microsft edge using Same name webHooks with XXX.extend
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
ErrorController = BaseController.extend({
 onBeforeAction: function(){
   console.log("ERROR");
   this.next();
 },
 action: function(){
   this.layout('error_layout');
   this.render();
 }
});

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
 },
    setContactPageTags: function () {
        var title = "Contact Us Page";
        var desc = "Help us help you faster";
        var searchString = "Contact us page, finance, investkit";
        var image = '/public/public/Logo_InvestKit.png';
        return {
            "description":desc,
            "robots": "INDEX, FOLLOW",
            "og:title": title,
            "og:type": "Website",
            "og:url": window.location.href,
            "og:image": image,
            "og:description": desc,
            'es_page_title': title,
            "es_image_url": image,
            "es_page_type": "Contact us Page",
            "es_category": "Finance",
            "es_published_date": '',
            "es_page_url": window.location.href,
            "es_keywords": searchString,
            "es_description": desc,
        };
    },
    onAfterAction: function () {
        var cMetaTags = this.setContactPageTags();
        setMetaTags(cMetaTags);
    }

});
NationalNewsController = BaseController.extend({
 onBeforeAction: function(){
   console.log("RENDERING National News");
   this.next();
 },
 action: function(){
   this.layout('finance_layout');
  // this.render('latest_news');
 }
});

AboutUsController = BaseController.extend({
 onBeforeAction: function(){
   console.log("RENDERING About Us");
   Meteor.call("GetLocationData", 'National', "batch_1", function(error, data){
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
   this.next();
 },
 action: function(){
   this.layout('finance_layout');
   this.render('about_us_page');
 },
    setAboutUsTags: function () {
        var title = "About Us Page";
        var desc = "About US: Stay up to date with what is happening in your local area in finance. Watch live updates and get stock quotes on your favorite companies. Here at Investkit, we have an appetite for digesting down big data in the world of finance.";
        var searchString = "About Us Page, finance, investkit";
        var image ='/public/public/Logo_InvestKit.png';
        return {
            "description":desc.length>167?desc.substr(0,167)+'...':desc,
            "robots": "INDEX, FOLLOW",
            "og:title": title,
            "og:type": "Website",
            "og:url": window.location.href,
            "og:image": image,
            "og:description": desc.length>167?desc.substr(0,167)+'...':desc,
            'es_page_title': title,
            "es_image_url": image,
            "es_page_type": "About Us Page",
            "es_category": "Finance",
            "es_published_date": '',
            "es_page_url": window.location.href,
            "es_keywords": searchString,
            "es_description": desc,
        };
    },
    onAfterAction: function () {

        var auMetaTags = this.setAboutUsTags();
        setMetaTags(auMetaTags);
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
 },
    setPrivacyTags: function () {
        var title = "Privacy Policy Page";
        var desc = "Privacy Policy: We respect your online privacy. We acknowledge your right to manage any personal information that may identify you('personal information')...";
        var searchString = "Privacy Policy Page, finance, investkit";
        var image = '/public/public/Logo_InvestKit.png';
        return {
            "description":desc.length>167?desc.substr(0,167)+'...':desc,
            "robots": "INDEX, FOLLOW",
            "og:title": title,
            "og:type": "Website",
            "og:url": window.location.href,
            "og:image": image,
            "og:description": desc.length>167?desc.substr(0,167)+'...':desc,
            'es_page_title': title,
            "es_image_url": image,
            "es_page_type": "Privacy Policy Page",
            "es_category": "Finance",
            "es_published_date": '',
            "es_page_url": window.location.href,
            "es_keywords": searchString,
            "es_description": desc,
        };
    },
    onAfterAction: function () {
        var pMetaTags = this.setPrivacyTags();
        setMetaTags(pMetaTags);
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
 },
    setTOSTags: function () {
        var title = "Terms of Service Page";
        var desc = "Terms of Service : InvestKit";
        var searchString = "Terms of Service Page, finance, investkit";
        var image = '/public/public/Logo_InvestKit.png';
        return {
            "description":desc,
            "robots": "INDEX, FOLLOW",
            "og:title": title,
            "og:type": "Website",
            "og:url": window.location.href,
            "og:image": image,
            "og:description": desc,
            'es_page_title': title,
            "es_image_url": image,
            "es_page_type": "Terms of Service Page",
            "es_category": "Finance",
            "es_published_date": '',
            "es_page_url": window.location.href,
            "es_keywords": searchString,
            "es_description": desc,
        };
    },
    onAfterAction: function () {
        var tMetaTags = this.setTOSTags();
        setMetaTags(tMetaTags);
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
  },
    setDirectoryTags: function (data) {
        var dataDirectory = data.directory;
        d_array = [];
        dataDirectory.listings.forEach(function(val){
            if(val.c_ceo_name){
                d_array.push(val.c_ceo_name);
            }
            if(val.c_name){
                d_array.push(val.c_name);
            }
            if(val.c_hq_city){
                d_array.push(val.c_hq_city);
            }
            if(val.c_hq_state){
                d_array.push(val.c_hq_state);
            }
            if(val.c_industry){
                d_array.push(val.c_industry);
            };
        });

        var title = "Directory Page";
        var desc = "Directory page that lists various companies starting from Consumer cyclical, health sector, Energy, financial to business material sectors, bank sector etc. Click on any city to know various organizations working in that city.";
        var searchString = "Directory page, " + d_array.join(', ');
        var image = '/public/public/Logo_InvestKit.png';
        return {
            "description":desc.length>167?desc.substr(0,167)+'...':desc,
            "robots": "INDEX, FOLLOW",
            "og:title": title,
            "og:type": "Website",
            "og:url": window.location.href,
            "og:image": image,
            "og:description": desc.length>167?desc.substr(0,167)+'...':desc,
            'es_page_title': title,
            "es_image_url": image,
            "es_page_type": "Directory Page",
            "es_category": "Finance",
            "es_published_date": '',
            "es_page_url": window.location.href,
            "es_keywords": searchString,
            "es_description": desc,
        };
    },
    onAfterAction: function () {

        var data =  Session.get('directory_data');
        if (typeof data == 'undefined'){return ''}
        var dMetaTags = this.setDirectoryTags(data);
        setMetaTags(dMetaTags);
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
        Session.set("list-of-list",data);
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
  },//Close action
    setListofListTags: function (data) {
        if(data.list_of_lists){
            data = data.list_of_lists.list_rankings?data.list_of_lists.list_rankings:null;
            if(data!=null){
                var title = "Company List of Lists page";
                var desc = data[0].top_list_list?data[0].top_list_list[0].list_of_lists_title:'';
                var searchString = "Company list of lists page";
                var image = data[0].c_logo? data[0].c_logo:'/public/public/Logo_InvestKit.png';
                return {
                    "description":desc.length>167?desc.substr(0,167)+'...':desc,
                    "robots": "INDEX, FOLLOW",
                    "og:title": title,
                    "og:type": "Website",
                    "og:url": window.location.href,
                    "og:image": image,
                    "og:description": desc.length>167?desc.substr(0,167)+'...':desc,
                    'es_page_title': title,
                    "es_image_url": image,
                    "es_page_type": "Executive List Page",
                    "es_category": "Finance",
                    "es_published_date": data[0].tle_last_updated ?data[0].tle_last_updated:'',
                    "es_page_url": window.location.href,
                    "es_keywords": searchString,
                    "es_description": desc,
                };
            }else return "No Metadata";

        } else return "No Metadata";


    },
    onAfterAction: function () {

        var data =  Session.get('list-of-list');
        if (typeof data == 'undefined') {return ''};
        var listOfListTags = this.setListofListTags(data);
        console.log(listOfListTags);
        if(listOfListTags != "No Metadata"){setMetaTags(listOfListTags)};
    }
})

ListofListLocController = BaseController.extend({
  onBeforeAction: function(){
    if ( typeof abbrstate(this.params.loc_id) != "undefined" ) {
      this.params.loc_id = abbrstate(this.params.loc_id);
    }
    if ( this.params.loc_id == 'default' ) {
      this.params.loc_id = this.params.partner_id;
    }
    Session.set('loc_id',this.params.loc_id);
    console.log('List of List parameter', this.params.loc_id);
    console.log('RENDERING List of List Location Page');
    Session.set('list_page_num', 1);
    // Only run the calls that get the data if it's the first run
    // This prevents the calls from being looped
    if ( typeof Session.get('IsFirstRun') == "undefined" ) {
      // Prevent this loop from running again
      Session.set('IsFirstRun',false);
      Meteor.call('listOfListLoc', this.params.loc_id, Session.get('list_page_num'), function(error, data){
          Session.set('ml_metadata', data);
        if(error || data.success == false){
          console.log('Invalid List Error', error);
          Session.set('listErr', true);
          return '';
        }
        for ( var module_name in data ) {
          if ( data.hasOwnProperty(module_name) ) {
            //console.log(module_name,data[module_name]);
            Session.set(module_name,data[module_name]);
          }
          Session.set('listErr',false);
          Session.set("IsData",true);
        }
      });

      if ( this.params.loc_id == this.params.partner_id ) {
        Meteor.call("GetPartnerProfile", Session.get('loc_id'), "batch_1", function(error, data){
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
          }
        });
      }
    }//Close if
    this.next();
  },
  action: function(){
    if(Session.get('IsData')){
      this.layout('finance_layout');
      this.render('list_of_list_loc_page');
    }//Close if
  },//Close action

    setListOfListTags: function (data) {
        var list_of_lists = data.list_of_lists?data.list_of_lists:null;
        if(list_of_lists!=null){
            ml_array = [];
            list_of_lists.forEach(function(val){
                ml_array.push(val.top_list_info.top_list_title);
            });
            var title = "List of Lists Page";
            var desc = "Complete list of top list pages that are trending on various sectors that includes but not limited to Consumer cyclical, health sector, Energy, financial and business material sectors, etc. ";
            var searchString = "List of Lists page, " + ml_array.join(', ');
            var image = '/public/public/Logo_InvestKit.png';
            return {
                "description":desc.length>167?desc.substr(0,167)+'...':desc,
                "robots": "INDEX, FOLLOW",
                "og:title": title,
                "og:type": "Website",
                "og:url": window.location.href,
                "og:image": image,
                "og:description": desc.length>167?desc.substr(0,167)+'...':desc,
                'es_page_title': title,
                "es_image_url": image,
                "es_page_type": "List of List Page",
                "es_category": "Finance",
                "es_published_date": '',
                "es_page_url": window.location.href,
                "es_keywords": searchString,
                "es_description": desc,
            };
        }else return "No MetaData";

    },
    onAfterAction: function () {

        var data =  Session.get('ml_metadata');
        if (typeof data == 'undefined') {return ''};
        var mlMetaTags = this.setListOfListTags(data);
        if(mlMetaTags!="No MetaData"){setMetaTags(mlMetaTags)};
    }
})

/****************************WEBPAGE CONTROLLERS END*******************************/


/****************************GLOBAL FUNCTIONS*******************************/
Router.onStop(function() {
  // Delete these 3 session variables (used to determine loading) whenever the page is changed
  console.log('RUNNING onStop Route');
    // Remove all meta tags created by DocHead.
    DocHead.removeDocHeadAddedTags();
  ResetSession();
  delete Session.keys.IsFirstRun;
  delete Session.keys.IsError;
  delete Session.keys.IsData;
});
/****************************END GLOBAL FUNCTIONS*******************************/
