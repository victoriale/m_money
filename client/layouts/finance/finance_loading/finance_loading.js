Template.no_company.helpers({
  Url: function(){
    var Url = PartnerHome(Session.get('PartnerHeaderID'));
    return Url;
  },
})

Template.no_executive.helpers({
  Url: function(){
    var Url = PartnerHome(Session.get('PartnerHeaderID'));
    return Url;
  },
})
