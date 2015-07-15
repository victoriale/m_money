Template.contact_us_page.events({
  'click .cu_topbox-headerimage': function(){
    Router.go("content.realestate.homepage",{
      partner_id: Session.get("partner_id")
    });
  },
})
