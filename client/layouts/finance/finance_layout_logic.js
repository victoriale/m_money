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
  }
});
