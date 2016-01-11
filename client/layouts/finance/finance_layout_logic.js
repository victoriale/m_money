// TODO: FIND OUT IFRAME ID

// Set partner header
Template.finance_layout.helpers({
  partner_header: function() {
    return Session.get('partner_header_code');
  }
});

Template.finance_layout_loading.helpers({
  partner_header: function() {
    return Session.get('partner_header_code');
  }
});

Template.finance_layout_home.helpers({
  partner_header: function() {
    return Session.get('partner_header_code');
  },
  myinvestkit: function() {
    if ( Router.current().url.match(/myinvestkit/) != null ) {
      return true;
    }
    return false;
  }
});
