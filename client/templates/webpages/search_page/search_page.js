Template.search_page.onRendered(function(){
  this.autorun(function(){

  })
})

Template.search_page.events({
  'click .search_tab-menu-active-list': function(event, t){
    t.$('.current-list').removeClass('current-list');
    t.$(event.currentTarget).addClass('current-list');
  }
})

Template.search_page.helpers({

})
