Template.footer.helpers({
  notPartner: function() {
    if ( typeof Router.current().params.partner_id != "undefined" ) {
      return false;
    }
    return true;
  }
});
