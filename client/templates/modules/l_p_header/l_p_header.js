/*   Author: David Wibowo
**** Created: [09/30/2015]
**** Description: Exec profile header
**** Associated Files: l-p_header.html, l-p_header.less, l-p_header_logic.js
*/
Template.lp_head.onRendered(function(){
  addCustomScroller('p-head-bottom-text');
});

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
    if(typeof(data) === 'undefined'){
      return false;
    }
    data['last_updated'] = (new Date(data['last_updated'])).toSNTFormTime();
    return data;
  }
});

Template.lp_body.helpers({
  locationData: function(){
    var data = Session.get('profile_header');
    if(typeof(data) === 'undefined'){
      return false;
    }
    return data;
  }
});

Template.lp_head.helpers({
  image: function(){
    var params = Router.current().getParams();
    var data = Session.get('loc_id');
    //if partner domain exists then choose the
    if(typeof params.loc_id == 'undefined'){
      var partner_image = Session.get('profile_header');
      if(partner_image.dma_code == null || partner_image.dma_code == '' || typeof partner_image.dma_code == 'undefined' || partner_image.dma_code == "null" || partner_image.dma_code == 0){
        partner_image['location'] = partner_image['location'].replace(/ /g, '_');
        return "background-image: url('/StateImages/Location_"+ partner_image['location'] +".jpg');";
      }else{
        return "background-image: url('/DMA_images/location-"+ partner_image['dma_code'].split(',')[0] +".jpg');";
      }
    }
    //otherwise take url data to detmine what image to show statewise
    if(data == 'National' || data == '' || typeof data == 'undefined'){
      return "background-image: url('/StateImages/Location_"+ data +".jpg');";
    }else{
      if(isNaN(data)){
        data = fullstate(data) || data;
        data = data.replace(/ /g, '_');
        return "background-image: url('/StateImages/Location_"+ data +".jpg');";
      }else{
        return "background-image: url('/DMA_images/location-"+ data +".jpg');";
      }
    }
  },

});
Template.lp_body.helpers({
  execUrl: function(){
    if ( Router.current().route.getName() == 'content.partnerhome' ) {
      if ( typeof Session.get('p_data') != "undefined" ) {
        loc_id = fullstate(Session.get('p_data')['state']);
      } else {
        loc_id = 'default';
      }
      return Router.pick_path('content.executivelocation',{
        loc_id: loc_id,
        page_num: 1
      });
    } else {
      var params = Router.current().getParams();
      return Router.pick_path('content.executivelocation',{
        loc_id: params.loc_id,
        page_num:1
      })
    }
  },

  compUrl: function(){
    var params = Router.current().getParams();
    if ( Router.current().route.getName() == 'content.partnerhome' ) {
      return Router.pick_path('content.sector',{
        loc_id: 'default',
        page_num: 1
      });
    }
    return Router.pick_path('content.sector',{
      loc_id: params.loc_id,
      page_num:1
    })
  },

});
