Template.live_update.events({
  'click .lu-menu-active-list': function(event, t){
    t.$('.current-list').removeClass('current-list');
    t.$(event.currentTarget).addClass('current-list');
  }
})

Template.live_update.helpers({
  lu_info: function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return '';
    }
    return data;
  },
  text: function(){
    var data = Session.get('bio_location');
    if(typeof data == 'undefined'){
      return '';
    }
    return data.c_desc;
  },
  stockInfo: function(){
    var data = Session.get('daily_update');
    if(typeof data == 'undefined'){
      return '';
    }
    //data is being returned as string so convert to numbers and round to fit design
    data['csi_closing_price'] = Number(data['csi_closing_price']).toFixed(2);
    data['csi_opening_price'] = Number(data['csi_opening_price']).toFixed(2);

    return data;
  },
  WholeListURL: function(){
    /*return Router.pick_path for live update webpage*/
  },

});
