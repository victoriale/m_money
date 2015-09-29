BaseController = RouteController.extend({
  onBeforeAction: function(){
    if ( Session.get('IsError') ) {
      this.layout('finance_layout');
      console.log('error');
      this.render('finance_profile');
    } else {
      //$('.ad_zone-widget1-area').removeClass('stick_top');
      //$('.ad_zone-widget1-area').removeClass('stick_bottom');
      this.layout('finance_layout');
      this.render('finance_profile');
    }
    this.next();
  }
})

HomePageController = BaseController.extend({
  onBeforeAction: function() {
    if ( typeof Session.get("IsFirstRun") == "undefined" ) {
      Session.set("IsFirstRun",false);
    }
    this.next();
  },
  action: function() {
    //$('.realestate_body_faq').css('display','none');
    if ( typeof Session.get('HomePageLocation') != "undefined"){
      Session.set('IsData',true);
    }
    this.layout('finance_layout_home');
    this.render('header_nav',{to: "header"});
    this.render('finance_homepage');
    SetPageTitle(null);
  }
})

Router.map(function(){

  // ****** HOME PAGE ******
  this.route('content.finance.home',{
    path: '/',
    controller: 'HomePageController'
  });

});

//Home Route
// Router.route('/:partner_id?/home',
//   function(){
//
//   }, {
//     name: 'content.realestate.homepage'
// })
// Router.route('/')


//finace_profile
Router.route('/finance',
function(){
  this.layout('finance_layout');
  this.render('finance_profile');
},{
  name:'login_resetf'
})

//company_profile
Router.route('/company',
function(){
  this.layout('finance_layout');
  this.render('company_profile');
},{
  //name:'login_resetc'
})

//location_profile
Router.route('/location',
function(){
  this.layout('finance_layout');
  this.render('location_profile');
},{
  //name:'login_resetc'
})

//exective_profile
Router.route('/executive',
function(){
  this.layout('finance_layout');
  this.render('executive_profile');
},{
  //name:'login_resetx'
})
