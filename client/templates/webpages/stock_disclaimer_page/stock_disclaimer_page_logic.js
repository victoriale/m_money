/*
Author: jyothyswaroop
Created: 07/30/2015
Description: stock disclaimer page
Associated Files: stock_disclaimer_page.less and stock_disclaimer_page.html
*/

Template.stock_disclaimer_page.onRendered(function(){
  $('#sdsort_by').val("Stock");
})

Template.stock_disclaimer_page.events({
  'change #sdsort_by': function(e){
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
