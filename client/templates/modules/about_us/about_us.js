Template.about_us.helpers({
  aboutus:function(){
    return Router.pick_path('content.aboutus');
  },
  contactus:function(){
    return Router.pick_path('content.contactus');
  },
  disclaimer:function(){
    return Router.pick_path('content.disclaimer');
  },

})
