Template.about_us.helpers({
  aboutus:function(){
    console.log(Router.pick_path('content.aboutus'));
    return Router.pick_path('content.aboutus');
  },
  contactus:function(){
    console.log(Router.pick_path('content.abocontactusutus'));
    return Router.pick_path('content.contactus');
  },
  disclaimer:function(){
    console.log(Router.pick_path('content.disclaimer'));
    return Router.pick_path('content.disclaimer');
  },

})
