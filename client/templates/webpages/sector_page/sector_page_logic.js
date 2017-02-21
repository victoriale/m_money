/*
Author: jyothyswaroop
Created: 8/12/2015
Description: sector_page
Associated Files: sector_page.less and sector_page.html
*/
var counter=0;
Template.sector_page.onCreated(function(){
  Session.set('sector_count', 0);
})
//renders the data when page loads
Template.sector_page.onRendered(function () {
  $(".sect_pg-page-selector1").css("background-color","#3098ff");
  Session.set('sector_page_num', 2);
  Session.set('isPulling', false);
  function recursive_list() {
    if ( Session.get('sector_page_num') > 100 || (Router.current().route.getName() != "content.sector" && Router.current().route.getName() != "partner.sector") ) {
      $(window).unbind('scroll');
      return false;
    }
    if ( $(window).scrollTop() + $(window).height() < $('.footer-standard').offset().top - 100 || Session.get('isPulling') ) {
      return false;
    }
    Session.set('isPulling', true);
    Meteor.call("sectorData", Session.get('loc_id'), Session.get('sector_id'), Session.get('sector_page_num'), function(error, data){
      if(error || data.success == false){
        console.log('Invalid Sector Error',data);
        Session.set('IsError',true);
        return '';
      }
      var old_data = Session.get('sector_companies');
      $.merge(old_data.companies, data.sector_companies.companies);
      Session.set('sector_companies', old_data);
      Session.set('sector_page_num', Session.get('sector_page_num') + 1);
      Session.set('isPulling', false);
      recursive_list();
    });
  }
  recursive_list();
//  $(window).scroll(recursive_list);
});

var backgroundStyle="tilewhite";
Template.sector_page.helpers({
  back_url: function(){
    if ( Router.current().params.loc_id == Router.current().params.partner_id ) {
      return Router.pick_path('content.partnerhome',{});
    }
    return Router.pick_path('content.locationprofile',{
      loc_id: Session.get('loc_id')
    });
  },

  backProfile:function(){
    var data = Session.get('profile_header');
    if ( typeof data == "object" && typeof data.location != "undefined" ) {
      return data.location;
    }
    var params = Router.current().getParams();
    var loc = fullstate(params.loc_id);
    loc = loc.replace(/-/g, ' ');
    return loc;
  },

  sectorData:function(){
    var data = Session.get('sector_companies');
    if(typeof data == 'undefined'){
      return '';
    }
    if ( data.sector == null ) {
      data.sector = 'All Companies';
    } else {
      data.sector = data.sector + ' Sector';
    }

    //if current location is a partner domain then pull partner information
    if ( Router.current().params.loc_id == Router.current().params.partner_id ) {
      data.location_data = {
        url: Router.pick_path('content.partnerhome',{})
      };
      if ( typeof Session.get('profile_header') != "undefined" ) {
        data.location_data.name = Session.get('profile_header').location;
      } else {
        data.location_data.name = '';
      }
    } else if(Router.current().params.loc_id == 'National'){
      data. location_data = {};
      data.location_data = {
        name: 'United States',
        url: Router.pick_path('content.locationprofile',{
          loc_id: 'National'
        })
      };
    } else {
      data.location_data = {
        url: Router.pick_path('content.locationprofile',{
          loc_id: Router.current().params.loc_id
        })
      };

      if ( typeof fullstate(Router.current().params.loc_id) != undefined ) {
        data.location_data.name = fullstate(Router.current().params.loc_id);
      } else {
        data.location_data.name = Router.current().params.loc_id;
      }
    }

      var image = data.companies[0].c_hq_state;
      if(image == 'National' || image == '' || typeof image == 'undefined'){
        data['image'] = "background-image: url('/StateImages/Location_"+ image +".jpg');";
      }else{
        if(isNaN(data)){
          image = fullstate(image) || image;
          image = image.replace(/ /g, '_');
          data['image'] = "background-image: url('/StateImages/Location_"+ image +".jpg');";
        }else{
          data['image'] = "background-image: url('/DMA_images/location-"+ image +".jpg');";
        }
      }
      data['headerDate'] = (new Date(data.companies[0].lcsi_price_last_updated)).toSNTForm();
    $.map(data.companies, function(data,index){
      if(index % 2 == 0){
        data['background'] = 'tilewhite';
      }else{
        data['background'] = 'tilegrey';
      }
      data['newDate'] = (new Date(data.lcsi_price_last_updated)).toSNTForm();
      data['rank'] = index+1;
      data['url'] = Router.pick_path('content.companyprofile',{
        ticker:data.c_ticker,
        name:compUrlName(data.c_name),
        company_id: data.c_id
      });
      data['locurl'] = Router.pick_path('content.locationprofile',{
        loc_id: data.c_hq_state,
        city: data.c_hq_city
      });
      data['lcsi_price'] = Number(data['lcsi_price']).toFixed(2);
      data['csi_price_change_since_last'] = Number(data['csi_price_change_since_last']).toFixed(2);
      data['csi_market_cap_friendly'] = data['lcsi_market_cap'] != null ? '$'+nFormatter(data['lcsi_market_cap']) : '';
      data['csi_percent_change_since_last'] = Number(data['csi_percent_change_since_last']).toFixed(2);
    });
    data['location'] = fullstate(Session.get('loc_id'));
    return data;
  },

  sectorList:function(){
    var count = Session.get("sector_count");
    var data = Session.get('sector_companies');
    if(typeof data == 'undefined'){
      return '';
    }
    $.map(data.companies, function(data,index){
      if(index % 2 == 0){
        data['background'] = 'tilewhite';
      }else{
        data['background'] = 'tilegrey';
      }
      data['newDate'] = (new Date(data.lcsi_price_last_updated)).toSNTForm();
      data['rank'] = index+1;
      data['url'] = Router.pick_path('content.companyprofile',{
        ticker:data.c_ticker,
        name:compUrlName(data.c_name),
        company_id: data.c_id
      });
      data['lcsi_price'] = Number(data['lcsi_price']).toFixed(2);
      data['csi_price_change_since_last'] = Number(data['csi_price_change_since_last']).toFixed(2);
      data['csi_percent_change_since_last'] = Number(data['csi_percent_change_since_last']).toFixed(2);
      data['locurl'] = Router.pick_path('content.locationprofile',{
        loc_id: data.c_hq_state,
        city: data.c_hq_city
      });
    });

    data['location'] = fullstate(Session.get('loc_id'));
    return data['companies'][count];
  },

//gave names for dyamic access {{getheadername0}}
    getheadername0: function(){
      var name0= "United States";
      return name0;
    },

  //This function is called everytime "each" loop runs, it returns the respective class which is suppose to use on each iteration
  getBackgroundStyle: function() {

    if (backgroundStyle === "tilegrey")
    {
      backgroundStyle="tilewhite";
      return backgroundStyle;
    } else {
      backgroundStyle = "tilegrey";
      return backgroundStyle;
    }
  }
});
//This handles the events on button clicks of 1,2,3 and 200
Template.sector_page.events({
  'click .list_vw-lefthov': function(){
    var counter = Session.get("sector_count");
    var list = Session.get('sector_companies')['companies'];
    if(counter > 0){
      counter--;
      Session.set("sector_count",counter);
    }
    else
    {
      counter = list.length-1;
      Session.set("sector_count", counter);
    }
  },
  'click .list_vw-righthov': function(){
    var counter = Session.get("sector_count");
    var list = Session.get('sector_companies')['companies'];
    if(counter < list.length - 1)
    {
      counter++;
      Session.set("sector_count",counter);
    }
    else
    {
      counter = 0;
      Session.set("sector_count", counter);
    }
  },
    //This function is called when user presses the button "1" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .sect_pg-page-selector1': function()
    {
        $(".sect_pg-page-selector1").css("background-color","#3098ff");
        $(".sect_pg-page-selector2").css("background-color","#ffffff");
        $(".sect_pg-page-selector3").css("background-color","#ffffff");
        $(".sect_pg-page-selector200").css("background-color","#ffffff");
    },
    //This function is called when user presses the button "2" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .sect_pg-page-selector2': function()
    {
        $(".sect_pg-page-selector2").css("background-color","#3098ff");
        $(".sect_pg-page-selector1").css("background-color","#ffffff");
        $(".sect_pg-page-selector3").css("background-color","#ffffff");
        $(".sect_pg-page-selector200").css("background-color","#ffffff");
    },
    //This function is called when user presses the button "3" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .sect_pg-page-selector3': function()
    {
        $(".sect_pg-page-selector3").css("background-color","#3098ff");
        $(".sect_pg-page-selector2").css("background-color","#ffffff");
        $(".sect_pg-page-selector1").css("background-color","#ffffff");
        $(".sect_pg-page-selector200").css("background-color","#ffffff");
    },
    //This function is called when user presses the button "200" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .sect_pg-page-selector200': function()
    {
        $(".sect_pg-page-selector200").css("background-color","#3098ff");
        $(".sect_pg-page-selector2").css("background-color","#ffffff");
        $(".sect_pg-page-selector3").css("background-color","#ffffff");
        $(".sect_pg-page-selector1").css("background-color","#ffffff");
    },
    'click .list_vw-x': function()
    {
        $(".list_vw-ct1").css("display","none");
    }
});
