PhoneNumber = function(phone) {
  phone = phone.replace(/[^0-9]/g, '');
  phone = phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  return phone;
}

Template.realtor_contact.onCreated(function(){
  if ( typeof customerDetails == "undefined" ) {
    customerDetails = new Meteor.Collection('Details');
  }
});

Template.realtor_contact.helpers({
 Details: function(){
   return customerDetails.find({});
 },
 agentname: function(){
   var data = Session.get("profile_header");
   if ( typeof data == "undefined" ) {
     return "";
   }
   return data['agent_name'];
 },
 agentofficephone: function(){
   var data = Session.get("profile_header");
   if ( typeof data == "undefined" ) {
     return "";
   }
   return PhoneNumber(data['agent_office_phone']);
 },
 realtorcompany: function(){
   var data = Session.get("profile_header");
   if ( typeof data == "undefined" ) {
     return "";
   }
   return data['realtor_company'];
 },
 realtorlogo: function(){
   var data = Session.get("profile_header");
   if ( typeof data == "undefined" ) {
     return "";
   }
   return data['realtor_logo'];
 },
 address: function(){
   var data = Session.get("profile_header");
   if ( typeof data == "undefined" ) {
     return "";
   }
   return data['street_address'];
 },
 location: function(){
   var data = Session.get("profile_header");
   if ( typeof data == "undefined" ) {
     return "";
   }
   return data['city'] + ", " + data['state'];
 },
 zip: function(){
   var data = Session.get("profile_header");
   if ( typeof data == "undefined" ) {
     return "";
   }
   return data['zipcode'];
 },
 agentemail: function(){
   var data = Session.get("profile_header");
   if ( typeof data == "undefined" ) {
     return "";
   }
   return data['agent_email'];
 },
})
/*
Template.realtor_contact.events({
'click #realtor_contact_submit': function() {
  customerDetails.insert({
    name: $('.contact_realtor_input-name').val(),
    email: $('.contact_realtor_input-email').val(),
    number: $('.contact_realtor_input-number').val(),
    msg: $('.contact_realtor_msg-box').val()

  });

}
});
*/
