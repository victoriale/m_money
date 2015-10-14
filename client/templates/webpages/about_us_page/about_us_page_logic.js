Template.about_us_page.helpers({
  company: "[Profile]",
  upd: "10/24/2015, 12:36 AM EDT",
  members: "1,200,000+",

  country: function(){
    var name0= "The United States of America";
    return name0;
  },

  statement: function(){
    var name0= "Take a seat and get to know us better";
    return name0;
  },

  // total: function(){
  //   var name0= "Total U.S. Public Companies";
  //   return name0;
  // },
  //
  // number: function(){
  //   var name0= "9,278";
  //   return name0;
  // },

items: [
  {totals:"Total U.S. Public Companies", numbers:"9,278",image:"Icon_Companies.png", totals2:"Total U.S. Executives", numbers2:"101,200", image2:"Icon_Executives.png"},
  {totals:"Total U.S. Brokerage Firms", numbers:"5,006",image:"Icon_Brokerage_Firms.png", totals2:"Total U.S. Financial Advisors", numbers2:"460,120", image2:"Icon_Financial_Advisors.png"},
],
});

Template.disclaimer_page.onRendered(function(){
  $('#sort_by').val("About Us");
})

Template.about_us_page.events({
  'change #sort_by': function(e){
    var page = e.target.value;
    switch(page){
      case 'About':
        Router.go('content.aboutus');
        break;
      case 'Contact':
        Router.go('content.contactus');
        break;
      case 'Copyright':
        Router.go('content.copyright');
        break;
      case 'Disclaimer':
        Router.go('content.disclaimer');
        break;
      case 'Privacy':
        Router.go('content.privacypolicy');
        break;
      case 'Stock':
        Router.go('content.stockdisclaimer');
        break;
      case 'Terms':
        Router.go('content.termsofservice');
        break;
    }
  }
});
