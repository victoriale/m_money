/*   Author: David Wibowo
**** Created: [09/30/2015]
**** Description: Exec profile header
**** Associated Files: l-p_header.html, l-p_header.less, l-p_header_logic.js
*/

Template.l_p_header.helpers({
})

Template.lp_head.helpers({
  National:function(){
    return Router.pick_path('content.locationprofile',{
      loc_id: 'National'
    });
  },
  locationData: function(){
    var data = Session.get('profile_header');
    var getDate = Session.get('daily_update');
    if(typeof(data) === 'undefined'){
      return false;
    }
    console.log(getDate);
    data['LastUpdate'] = (new Date(getDate['lcsi_price_last_updated'])).toSNTFormTime();
    console.log(data['LastUpdate']);
    return data;
  }
});

Template.lp_body.helpers({
  locationData: function(){
    var data = Session.get('profile_header');

    if(typeof(data) === 'undefined'){
      return false;
    }
    console.log(data);
    return data;
  }
});
Template.lp_head.helpers({
  image: function(){
    var data = Session.get('loc_id');
    if(isNaN(data)){
      data = fullstate(data);
      data = data.replace(/ /g, '_');
      return "background-image: url('/StateImages/Location_"+ data +".jpg');";
    }else{
      return "background-image: url('/DMA_images/location-"+ data +".jpg');";
    }
  },

});
