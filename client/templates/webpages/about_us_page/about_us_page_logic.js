Template.au_page.events({
  'click .au_page-headerimage': function(){
    Router.go("content.realestate.homepage",{
      partner_id: Session.get("partner_id")
    });
  },
})
