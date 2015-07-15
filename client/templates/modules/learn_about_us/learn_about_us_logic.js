Template.learn_about_us.events({
  'click .link': function(){
    Router.go("realestate.disclaimer",{
      partner_id: Session.get("partner_id")
    });
  },
  'click #disclaimer': function(){
    Router.go("realestate.disclaimer",{
      partner_id: Session.get("partner_id")
    });
  },
  'click #bio': function(){
    Router.go("realestate.aboutuspage",{
      partner_id: Session.get("partner_id")
    });
  },
  'click #contactus': function(){
    Router.go("realestate.contactus",{
      partner_id: Session.get("partner_id")
    });
  },
})
