ListingRedirect = function(listing_id){
  if ( typeof listing_id == "undefined" ) {
    console.log("Whoops! Bad listing!");
    return "Invalid listing_id";
  }
  var passData = new Object();
  passData['listing_id'] = listing_id;
  if ( typeof Session.get("partner_id") != "undefined" ) {
    passData['partner_id'] = Session.get("partner_id");
    ResetSession();
    Router.go("content.realestate.partner.listing",passData);
  } else {
    ResetSession();
    Router.go("content.realestate.listing",passData);
  }
}

ListingURL = function(listing_id) {
  if ( typeof listing_id == "undefined" ) {
    console.log("Whoops! Bad listing!");
    return "Invalid listing_id";
  }
  if ( typeof Session.get("partner_id") != "undefined" ) {
    return "/" + Session.get("partner_id") + "/index/" + listing_id;
  } else {
    return "/listing/" + listing_id;
  }
}

LocationRedirect = function(location_id){
  if ( typeof location_id == "undefined" ) {
    console.log("Whoops! Bad location!");
    return "Invalid location_id";
  }
  var passData = new Object();
  if ( typeof Session.get("partner_id") != "undefined" ) {
    passData['partner_id'] = Session.get("partner_id");
    if ( location_id.match(/^\d*$/) ) {
      passData['zip'] = location_id;
      ResetSession();
      Router.go("content.realestate.partner.location.zip",passData);
    } else {
      location_id = location_id.split('_');
      passData['state_id'] = location_id[1];
      passData['city_id'] = location_id[0];
      ResetSession();
      Router.go("content.realestate.partner.location.city",passData);
    }
  } else {
    passData['location_id'] = location_id;
    ResetSession();
    Router.go("content.realestate.location",passData);
  }
}

ListViewRedirect = function(list_name,state_id,city_id) {
  if ( list_name == null ) {
    delete list_name;
  }
  ResetSession();
  Router.go('content.realestate.listview',{
    list_name: list_name,
    state_id: state_id,
    city_id: city_id,
    partner_id: Session.get("partner_id")
  });
}

ResetSession = function() {
  $(window).scrollTop(0);
  delete Session.keys['isListing'];
  delete Session.keys['NumberOfListsDisplay'];
  delete Session.keys['IsData'];
  delete Session.keys['IsListOfListPage'];
  /*for ( var SessVar in Session.keys ) {
    delete Session.keys[SessVar];
  }*/
}

function SetPageTitle(newtitle,override) {
  var DefaultTitle = "Joyful Home";
  override = override || false;
  newtitle = newtitle || null;
  if ( override ) {
    document.title = newtitle;
  } else {
    if ( newtitle != null ) {
      document.title = newtitle + " | " + DefaultTitle;
    } else {
      document.title = DefaultTitle;
    }
  }
  delete override;
  delete newtitle;
}

function GetLocationProfileData(location_id) {
  console.log(location_id);
  Meteor.call("GetProfileData",location_id,function(error,data){
    if ( error ) {
      console.log(error);
      RenderError();
      return;
    }
    for ( var module_name in data ) {
      if ( data.hasOwnProperty(module_name) ) {
        Session.set(module_name,data[module_name]);
        //console.log(module_name,data[module_name]);
      }
    }
    Session.set("IsData",true);
  });
}

function GetListingProfileData(listing_id) {
  console.log(listing_id);
  Meteor.call("GetListingData",listing_id,function(error,data){
    if ( error ) {
      console.log(error);
      RenderError();
      return;
    }
    for ( var module_name in data ) {
      if ( data.hasOwnProperty(module_name) ) {
        Session.set(module_name,data[module_name]);
        //console.log(module_name,data[module_name]);
      }
    }
    Session.set('IsData',true);
  });
}

function DisplayPartnerHeader(partner_id) {
  return "";
  Session.set('partner_id',partner_id);
  Meteor.call("GetPartnerHeader",partner_id,function(error,data){
    RenderedRoute.render(data,{to: 'header'})
  });
}

function RenderLoading(router) {
  router.layout('realestate_layout_single');
  router.render('realestate_loading',{to:'centerarea'});
  router.render('nothing',{to: 'rightarea'});
}

function RenderError(router) {
  router.layout('realestate_layout_single');
  router.render('realestate_error',{to:'centerarea'});
  router.render('nothing',{to: 'rightarea'});
}

Router.configure({
  layoutTemplate: 'realestate_layout',
  loadingTemplate: 'realestate_loading',
  notFoundTemplate: 'realestate_404'
});

Router.map(function(){
  // ****** JOYFULHOME.COM ROUTES ******
  // Location route
  this.route('content.realestate.location',{
    path: '/location/:location_id?',
    onBeforeAction: function() {
      if ( typeof Session.get("IsFirstRun") == "undefined" ) {
        console.log("********************** NEW LOCATION *************************");
        ResetSession();
        Session.set("IsData",false);
        Session.set("IsFirstRun",true);
        SetPageTitle('Loading');
      }
      this.next();
    },
    action: function() {
      if ( Session.get("IsFirstRun") ) {
        if ( typeof this.params.location_id == 'undefined' ) {
          $.get("http://ipinfo.io", function(data,status) {
            GetLocationProfileData(data['postal']);
          },"jsonp");
        } else {
          GetLocationProfileData(this.params.location_id);
        }
        Session.set("IsFirstRun",false);
      }
      if ( Session.get('IsData') ) {
        var data = Session.get("profile_header");
        if ( typeof data != "undefined" ) {
          SetPageTitle(data['city'] + " " + data['state']);
        }
        this.layout('realestate_layout_single');
        this.render('re_location_profile',{to:'centerarea'});
        //this.render('live_updates',{to:'rightarea'});
      } else {
        RenderLoading(this);
      }
    },
    onStop: function() {
      delete Session.keys.IsFirstRun;
    }
  });

  // Listing route
  this.route('content.realestate.listing',{
    path: '/listing/:listing_id?',
    onBeforeAction: function() {
      if ( typeof Session.get("IsFirstRun") == "undefined" ) {
        console.log("********************** NEW LISTING *************************");
        ResetSession();
        Session.set("IsData",false);
        Session.set("IsFirstRun",true);
        SetPageTitle('Loading');
      }
      this.next();
    },
    action: function() {
      if ( Session.get("IsFirstRun") ) {
        GetListingProfileData(this.params.listing_id);
        Session.set("IsFirstRun",false);
      }
      if ( Session.get('IsData') ) {
        Session.set("isListing",true);
        var data = Session.get("profile_header");
        if ( typeof data != "undefined" ) {
          SetPageTitle(StringToSentence(data['street_address']));
        }
        this.layout('realestate_layout');
        this.render('re_listing_profile',{to:'centerarea'});
        this.render('realtor_contact',{to:'rightarea'});
      } else {
        RenderLoading(this);
      }
    },
    onStop: function() {
      delete Session.keys.IsFirstRun;
    }
  });

  // ****** PARTNER ROUTES ******
  // Location route zip code
  this.route('content.realestate.partner.location.zip',{
    path: '/:partner_id/loc/:zip?',
    onBeforeAction: function() {
      if ( typeof Session.get("IsFirstRun") == "undefined" ) {
        console.log("********************** NEW PARTNER LOCATION (ZIP) *************************");
        ResetSession();
        Session.set("IsData",false);
        Session.set("IsFirstRun",true);
        SetPageTitle('Loading');
      }
      this.next();
    },
    action: function() {
      if ( Session.get("IsFirstRun") ) {
        if ( typeof this.params.location_id == 'undefined' ) {
          $.get("http://ipinfo.io", function(data,status) {
            GetLocationProfileData(data['postal']);
          },"jsonp");
        } else {
          GetLocationProfileData(this.params.zip);
        }
        RenderedRoute = this;
        DisplayPartnerHeader(this.params.partner_id);
        Session.set("IsFirstRun",false);
      }
      if ( Session.get('IsData') ) {
        var data = Session.get("profile_header");
        if ( typeof data != "undefined" ) {
          SetPageTitle(data['city'] + " " + data['state']);
        }
        this.layout('realestate_layout');
        this.render('re_location_profile',{to:'centerarea'});
        //this.render('live_updates',{to:'rightarea'});
      } else {
        RenderLoading(this);
      }
    },
    onStop: function() {
      delete Session.keys.IsFirstRun;
    }
  });

  // Location route city/state
  this.route('content.realestate.partner.location.city',{
    path: '/:partner_id/loc/:state_id/:city_id',
    onBeforeAction: function() {
      if ( typeof Session.get("IsFirstRun") == "undefined" ) {
        console.log("********************** NEW PARTNER LOCATION (CITY) *************************");
        ResetSession();
        Session.set("IsData",false);
        Session.set("IsFirstRun",true);
        SetPageTitle('Loading');
      }
      this.next();
    },
    action: function() {
      if ( Session.get("IsFirstRun") ) {
        GetLocationProfileData(this.params.city_id + "_" + this.params.state_id);
        RenderedRoute = this;
        DisplayPartnerHeader(this.params.partner_id);
        Session.set("IsFirstRun",false);
      }
      if ( Session.get('IsData') ) {
        var data = Session.get("profile_header");
        if ( typeof data != "undefined" ) {
          SetPageTitle(data['city'] + " " + data['state']);
        }
        this.layout('realestate_layout');
        this.render('re_location_profile',{to:'centerarea'});
        //this.render('live_updates',{to:'rightarea'});
      } else {
        RenderLoading(this);
      }
    },
    onStop: function() {
      delete Session.keys.IsFirstRun;
    }
  });

  // Listing route
  this.route('content.realestate.partner.listing',{
    path: '/:partner_id/index/:listing_id',
    onBeforeAction: function() {
      if ( typeof Session.get("IsFirstRun") == "undefined" ) {
        console.log("********************** NEW PARTNER LISTING *************************");
        ResetSession();
        Session.set("IsData",false);
        Session.set("IsFirstRun",true);
        SetPageTitle('Loading');
      }
      this.next();
    },
    action: function() {
      if ( Session.get("IsFirstRun") ) {
        GetListingProfileData(this.params.listing_id);
        RenderedRoute = this;
        DisplayPartnerHeader(this.params.partner_id);
        Session.set("IsFirstRun",false);
      }
      if ( Session.get('IsData') ) {
        var data = Session.get("profile_header");
        if ( typeof data != "undefined" ) {
          SetPageTitle(StringToSentence(data['street_address']));
        }
        this.layout('realestate_layout');
        this.render('re_listing_profile',{to:'centerarea'});
        this.render('realtor_contact',{to:'rightarea'});
      } else {
        RenderLoading(this);
      }
    },
    onStop: function() {
      delete Session.keys.IsFirstRun;
    }
  });

  // ****** PAGE ROUTES ******
  // List view
  this.route('content.realestate.listview',{
    path: '/:partner_id?/listview/:list_name?/:state_id?/:city_id?',
    onBeforeAction: function() {
      if ( typeof Session.get("IsFirstRun") == "undefined" ) {
        console.log("********************** NEW LISTVIEW *************************");
        ResetSession();
        Session.set("IsData",false);
        Session.set("IsFirstRun",true);
        SetPageTitle("Loading");
      }
      this.next();
    },
    action: function() {
      if ( Session.get("IsFirstRun") ) {
        var ListLocation = "U.S.";
        if ( typeof this.params.state_id != "undefined" ) {
          ListLocation = this.params.state_id;
        }
        if ( typeof this.params.city_id != "undefined" ) {
          ListLocation = this.params.city_id + ", " + this.params.state_id;
        }
        Session.set("ListLocation",ListLocation);
        if ( typeof this.params.list_name == "undefined" ) {
          this.params.list_name = "most_recent_listings";
        }
        Session.set("ListName",this.params.list_name);
        console.log(this.params.list_name);
        Meteor.call("GetListData",this.params.list_name,this.params.state_id,this.params.city_id,function(error,result){
          if ( error ) {
            console.log(error);
            RenderError();
            return "";
          }
          Session.set("ListViewData",result['Data']);
          Session.set("IsData",true);
        });
        if ( typeof this.params.partner_id != "undefined" ) {
          RenderedRoute = this;
          DisplayPartnerHeader(this.params.partner_id);
        }
        Session.set("IsFirstRun",false);
      }
      if ( Session.get("IsData") ) {
        SetPageTitle(StringToSentence(Session.get("ListName").replace(/\_/g," ")) + " in " + Session.get("ListLocation"));
        this.layout('realestate_layout_single');
        this.render('re_list_view',{to: 'centerarea'});
        this.render('nothing',{to: 'rightarea'});
      } else {
        RenderLoading(this);
      }
    },
    onStop: function() {
      delete Session.keys.IsFirstRun;
    }
  });

  // Amenities List (listing, with skip)
  this.route('content.realestate.amenities.listing.skip',{
    path: '/amenities_list/listing/:listing_id/:category?&skip=:skip',
    onBeforeAction: function() {
      if ( typeof Session.get("IsFirstRun") == "undefined" ) {
        console.log("********************** NEW AMENITIES LIST (SKIP,LISTING) *************************");
        ResetSession();
        Session.set("IsData",false);
        Session.set("IsFirstRun",true);
        SetPageTitle("Loading");
      }
      this.next();
    },
    action: function() {
      if ( Session.get("IsFirstRun") ) {
        Session.set("AmenitiesSkip",this.params.skip);
        Session.set("AmenitiesCategory",this.params.category);
        Session.set("AmenitiesListing",this.params.listing_id);
        Meteor.call("get_amenities",this.params.category,null,null,this.params.listing_id,this.params.skip,function(error,result){
          if ( !error ) {
            Session.set("amenities_list_info",result);
            Session.set("IsData",true)
          } else {
            RenderError();
            console.log("ERROR",error);
          }
        });
        if ( typeof this.params.partner_id != "undefined" ) {
          RenderedRoute = this;
          DisplayPartnerHeader(this.params.partner_id);
        }
        Session.set("IsFirstRun",false);
      }
      if ( Session.get("IsData") ) {
        SetPageTitle("Amenities");
        this.layout('realestate_layout_single');
        this.render('amenities_list',{to: "centerarea"});
        this.render('nothing',{to: "rightarea"});
      } else {
        RenderLoading(this);
      }
    },
    onStop: function() {
      delete Session.keys.IsFirstRun;
    }
  });

  // Amenities List (listing)
  this.route('content.realestate.amenities.listing',{
    path: '/amenities_list/listing/:listing_id/:category?',
    onBeforeAction: function() {
      if ( typeof Session.get("IsFirstRun") == "undefined" ) {
        console.log("********************** NEW AMENITIES LIST (LISTING) *************************");
        ResetSession();
        Session.set("IsData",false);
        Session.set("IsFirstRun",true);
        SetPageTitle("Loading");
      }
      this.next();
    },
    action: function() {
      if ( Session.get("IsFirstRun") ) {
        Session.set("AmenitiesSkip",0);
        Session.set("AmenitiesCategory",this.params.category);
        Session.set("AmenitiesListing",this.params.listing_id);
        Meteor.call("get_amenities",this.params.category,null,null,this.params.listing_id,null,function(error,result){
          if ( !error ) {
            Session.set("amenities_list_info",result);
            Session.set("IsData",true)
          } else {
            RenderError();
            console.log("ERROR",error);
          }
        });
        if ( typeof this.params.partner_id != "undefined" ) {
          RenderedRoute = this;
          DisplayPartnerHeader(this.params.partner_id);
        }
        Session.set("IsFirstRun",false);
      }
      if ( Session.get("IsData") ) {
        SetPageTitle("Amenities");
        this.layout('realestate_layout_single');
        this.render('amenities_list',{to: "centerarea"});
        this.render('nothing',{to: "rightarea"});
      } else {
        RenderLoading(this);
      }
    },
    onStop: function() {
      delete Session.keys.IsFirstRun;
    }
  });

  // Amenities List (city, state, with skip)
  this.route('content.realestate.amenities.skip',{
    path: '/amenities_list/:state_id/:city_id/:category?&skip=:skip',
    onBeforeAction: function() {
      if ( typeof Session.get("IsFirstRun") == "undefined" ) {
        console.log("********************** NEW AMENITIES LIST (SKIP,LISTING) *************************");
        ResetSession();
        Session.set("IsData",false);
        Session.set("IsFirstRun",true);
        SetPageTitle("Loading");
      }
      this.next();
    },
    action: function() {
      if ( Session.get("IsFirstRun") ) {
        Session.set("AmenitiesSkip",this.params.skip);
        Session.set("AmenitiesCategory",this.params.category);
        Session.set("AmenitiesCity",this.params.city_id);
        Session.set("AmenitiesState",this.params.state_id);
        Meteor.call("get_amenities",this.params.category,this.params.city_id,this.params.state_id,null,this.params.skip,function(error,result){
          if ( !error ) {
            Session.set("amenities_list_info",result);
            Session.set("IsData",true)
          } else {
            RenderError();
            console.log("ERROR",error);
          }
        });
        if ( typeof this.params.partner_id != "undefined" ) {
          RenderedRoute = this;
          DisplayPartnerHeader(this.params.partner_id);
        }
        Session.set("IsFirstRun",false);
      }
      if ( Session.get("IsData") ) {
        SetPageTitle(StringToSentence(this.params.city_id + ", " + this.params.state_id + " Amenities"));
        this.layout('realestate_layout_listing');
        this.render('amenities_list',{to: "centerarea"});
        this.render('nothing',{to: "rightarea"});
      } else {
        RenderLoading(this);
      }
    },
    onStop: function() {
      delete Session.keys.IsFirstRun;
    }
  });

  // Amenities List (city, state)
  this.route('content.realestate.amenities',{
    path: '/amenities_list/:state_id/:city_id/:category?',
    onBeforeAction: function() {
      if ( typeof Session.get("IsFirstRun") == "undefined" ) {
        console.log("********************** NEW AMENITIES LIST *************************");
        ResetSession();
        Session.set("IsData",false);
        Session.set("IsFirstRun",true);
        SetPageTitle("Loading");
      }
      this.next();
    },
    action: function() {
      if ( Session.get("IsFirstRun") ) {
        Session.set("AmenitiesSkip",0);
        Session.set("AmenitiesCategory",this.params.category);
        Session.set("AmenitiesCity",this.params.city_id);
        Session.set("AmenitiesState",this.params.state_id);
        Meteor.call("get_amenities",this.params.category,this.params.city_id,this.params.state_id,null,function(error,result){
          if ( !error ) {
            Session.set("amenities_list_info",result);
            Session.set("IsData",true)
          } else {
            RenderError();
            console.log("ERROR",error);
          }
        });
        if ( typeof this.params.partner_id != "undefined" ) {
          RenderedRoute = this;
          DisplayPartnerHeader(this.params.partner_id);
        }
        Session.set("IsFirstRun",false);
      }
      if ( Session.get("IsData") ) {
        SetPageTitle(StringToSentence(this.params.city_id + ", " + this.params.state_id + " Amenities"));
        this.layout('realestate_layout_single');
        this.render('amenities_list',{to: "centerarea"});
        this.render('nothing',{to: "rightarea"});
      } else {
        RenderLoading(this);
      }
    },
    onStop: function() {
      delete Session.keys.IsFirstRun;
    }
  });

  // Schools List (listing, with skip)
  this.route('content.realestate.schools.listing.skip',{
    path: '/school_list/listing/:listing_id/:category?&skip=:skip',
    onBeforeAction: function() {
      if ( typeof Session.get("IsFirstRun") == "undefined" ) {
        console.log("********************** NEW SCHOOL LIST (SKIP, LISTING) *************************");
        ResetSession();
        Session.set("IsData",false);
        Session.set("IsFirstRun",true);
        SetPageTitle("Loading");
      }
      this.next();
    },
    action: function() {
      if ( Session.get("IsFirstRun") ) {
        Session.set("SchoolSkip",this.params.skip);
        Session.set("SchoolCategory",this.params.category);
        Session.set("SchoolListing",this.params.listing_id);
        Meteor.call("get_schools",this.params.category,null,null,this.params.listing_id,this.params.skip,function(error,result){
          if ( !error ) {
            Session.set("school_list_info",result);
            Session.set("IsData",true)
          } else {
            RenderError();
            console.log("ERROR",error);
          }
        });
        if ( typeof this.params.partner_id != "undefined" ) {
          RenderedRoute = this;
          DisplayPartnerHeader(this.params.partner_id);
        }
        Session.set("IsFirstRun",false);
      }
      if ( Session.get("IsData") ) {
        if ( typeof this.params.category != "undefined" ) {
          SetPageTitle(this.params.category + " Schools");
        } else {
          SetPageTitle("Schools");
        }
        this.layout('realestate_layout_single');
        this.render('school_list',{to: "centerarea"});
        this.render('nothing',{to: "rightarea"});
      } else {
        RenderLoading(this);
      }
    },
    onStop: function() {
      delete Session.keys.IsFirstRun;
    }
  });

  // Schools List (listing)
  this.route('content.realestate.schools.listing',{
    path: '/school_list/listing/:listing_id/:category?',
    onBeforeAction: function() {
      if ( typeof Session.get("IsFirstRun") == "undefined" ) {
        console.log("********************** NEW SCHOOLS LIST (LISTING) *************************");
        ResetSession();
        Session.set("IsData",false);
        Session.set("IsFirstRun",true);
        SetPageTitle("Loading");
      }
      this.next();
    },
    action: function() {
      if ( Session.get("IsFirstRun") ) {
        Session.set("SchoolSkip",0);
        Session.set("SchoolCategory",this.params.category);
        Session.set("SchoolListing",this.params.listing_id);
        Meteor.call("get_schools",this.params.category,null,null,this.params.listing_id,null,function(error,result){
          if ( !error ) {
            Session.set("school_list_info",result);
            console.log(result);
            Session.set("IsData",true)
          } else {
            RenderError();
            console.log("ERROR",error);
          }
        });
        if ( typeof this.params.partner_id != "undefined" ) {
          RenderedRoute = this;
          DisplayPartnerHeader(this.params.partner_id);
        }
        Session.set("IsFirstRun",false);
      }
      if ( Session.get("IsData") ) {
        if ( typeof this.params.category != "undefined" ) {
          SetPageTitle(this.params.category + " Schools");
        } else {
          SetPageTitle("Schools");
        }
        this.layout('realestate_layout_single');
        this.render('school_list',{to: "centerarea"});
        this.render('nothing',{to: "rightarea"});
      } else {
        RenderLoading(this);
      }
    },
    onStop: function() {
      delete Session.keys.IsFirstRun;
    }
  });

  // Schools List (city, state, with skip)
  this.route('content.realestate.schools.skip',{
    path: '/school_list/:state_id/:city_id/:category?&skip=:skip',
    onBeforeAction: function() {
      if ( typeof Session.get("IsFirstRun") == "undefined" ) {
        console.log("********************** NEW SCHOOLS LIST (SKIP) *************************");
        ResetSession();
        Session.set("IsData",false);
        Session.set("IsFirstRun",true);
        SetPageTitle("Loading");
      }
      this.next();
    },
    action: function() {
      if ( Session.get("IsFirstRun") ) {
        Session.set("SchoolSkip",this.params.skip);
        Session.set("SchoolCategory",this.params.category);
        Session.set("SchoolCity",this.params.city_id);
        Session.set("SchoolState",this.params.state_id);
        Meteor.call("get_schools",this.params.category,this.params.city_id,this.params.state_id,null,this.params.skip,function(error,result){
          if ( !error ) {
            Session.set("school_list_info",result);
            Session.set("IsData",true)
          } else {
            RenderError();
            console.log("ERROR",error);
          }
        });
        if ( typeof this.params.partner_id != "undefined" ) {
          RenderedRoute = this;
          DisplayPartnerHeader(this.params.partner_id);
        }
        Session.set("IsFirstRun",false);
      }
      if ( Session.get("IsData") ) {
        SetPageTitle(StringToSentence(this.params.city_id + ", " + this.params.state_id + " Schools"));
        this.layout('realestate_layout_single');
        this.render('school_list',{to: "centerarea"});
        this.render('nothing',{to: "rightarea"});
      } else {
        RenderLoading(this);
      }
    },
    onStop: function() {
      delete Session.keys.IsFirstRun;
    }
  });

  // Schools List (city, state)
  this.route('content.realestate.schools',{
    path: '/school_list/:state_id/:city_id/:category?',
    onBeforeAction: function() {
      if ( typeof Session.get("IsFirstRun") == "undefined" ) {
        console.log("********************** NEW SCHOOLS LIST *************************");
        ResetSession();
        Session.set("IsData",false);
        Session.set("IsFirstRun",true);
        SetPageTitle("Loading");
      }
      this.next();
    },
    action: function() {
      if ( Session.get("IsFirstRun") ) {
        Session.set("SchoolSkip",0);
        Session.set("SchoolCategory",this.params.category);
        Session.set("SchoolCity",this.params.city_id);
        Session.set("SchoolState",this.params.state_id);
        Meteor.call("get_schools",this.params.category,this.params.city_id,this.params.state_id,null,function(error,result){
          if ( !error ) {
            Session.set("school_list_info",result);
            Session.set("IsData",true)
          } else {
            RenderError();
            console.log("ERROR",error);
          }
        });
        if ( typeof this.params.partner_id != "undefined" ) {
          RenderedRoute = this;
          DisplayPartnerHeader(this.params.partner_id);
        }
        Session.set("IsFirstRun",false);
      }
      if ( Session.get("IsData") ) {
        SetPageTitle(StringToSentence(this.params.city_id + ", " + this.params.state_id + " Schools"));
        this.layout('realestate_layout_single');
        this.render('school_list',{to: "centerarea"});
        this.render('nothing',{to: "rightarea"});
      } else {
        RenderLoading(this);
      }
    },
    onStop: function() {
      delete Session.keys.IsFirstRun;
    }
  });
});

// ****** PAGE ROUTES ******
// Property listing that shows the features of the listing
Router.route('/:partner_id?/property/:listing_id',
  function(){
    ResetSession();
    SetPageTitle(null);
    GetListingProfileData(this.params.listing_id);
    this.layout('realestate_layout_single');
    this.render('property_features',{to:'centerarea'});
    this.render('nothing',{to: "rightarea"});
    RenderedRoute = this;
    if ( typeof this.params.partner_id != 'undefined' ) {
      DisplayPartnerHeader(this.params.partner_id);
    }
  }, {
    name: 'content.property.features'
})

//Route to directory page
Router.route('/directory/:state?/:city?/:zipcode?/:list/page/:pageNum',
  function(){
    ResetSession()
    SetPageTitle(null);
    this.layout('directory_layout');
    this.render('directory');
    RenderedRoute = this;
    if ( typeof this.params.partner_id != 'undefined' ) {
      DisplayPartnerHeader(this.params.partner_id);
    }
  }, {
    name: 'content.realestate.directory'
});

// Search Results Page
Router.route('/:partner_id?/realestate/search/',
  function(){
    ResetSession();
    SetPageTitle(null);
    this.layout('realestate_layout_single');
    this.render('search_results',{to:'centerarea'});
    this.render('nothing',{to: "rightarea"});
    RenderedRoute = this;
    if ( typeof this.params.partner_id != 'undefined' ) {
      DisplayPartnerHeader(this.params.partner_id);
    }
  },{
    name: 'content.realestate.search'
});

// List of Lists Page
Router.route('/:partner_id?/list_of_lists:list_limit?/:state_id?/:city_id?',
  function(){
    ResetSession();
    if ( typeof this.params.list_limit != "undefined" ) {
      Session.set("NumberOfListsDisplay",this.params.list_limit);
    }
    Session.set("IsListOfListPage",true);
    var ListLocation = "U.S.";
    if ( typeof this.params.state_id != "undefined" ) {
      ListLocation = this.params.state_id;
      Session.set("ListMasterState",this.params.state_id);
    }
    if ( typeof this.params.city_id != "undefined" ) {
      ListLocation = this.params.city_id + ", " + this.params.state_id;
      Session.set("ListMasterCity",this.params.city_id);
    }
    Session.set("ListMasterLocation",ListLocation);
    SetPageTitle("List of Lists");
    this.layout('realestate_layout_single');
    this.render('list_of_lists',{to: "centerarea"});
    this.render('nothing',{to: "rightarea"});
  },{
    name: 'content.realestate.listoflists'
});

//pagest tester to directory page
Router.route('/:partner_id?/pagetest',
  function(){
    ResetSession();
    SetPageTitle(null);
    this.layout('realestate_layout');
    this.render('ad_zone',{to:'centerarea'});
    this.render('nothing',{to: "rightarea"});
    RenderedRoute = this;
    if ( typeof this.params.partner_id != 'undefined' ) {
      DisplayPartnerHeader(this.params.partner_id);
    }
  }, {
    name: 'content.realestate.pagetest'
})
//points to contact joyful home page
Router.route('/:partner_id?/contactus',
  function(){
    ResetSession();
    SetPageTitle(null);
    this.layout('realestate_layout_single');
    this.render('contact_us_page',{to:'centerarea'});
    this.render('nothing',{to: "rightarea"});
    RenderedRoute = this;
    if ( typeof this.params.partner_id != 'undefined' ) {
      DisplayPartnerHeader(this.params.partner_id);
    }
  }, {
    name: 'realestate.contactus'
})
// Disclaimer Page
Router.route('/:partner_id?/disclaimer',
  function(){
    ResetSession();
    this.layout('realestate_layout_single');
    this.render('realestate_disclaimer',{to:'centerarea'});
    this.render('nothing',{to: "rightarea"});
    RenderedRoute = this;
    if ( typeof this.params.partner_id != 'undefined' ) {
      DisplayPartnerHeader(this.params.partner_id);
    }
  },{
    name: 'realestate.disclaimer'
});
//points to about us page
Router.route('/:partner_id?/aboutus',
  function(){
    ResetSession();
    SetPageTitle(null);
    this.layout('realestate_layout_single');
    this.render('au_page',{to:'centerarea'});
    this.render('nothing',{to: "rightarea"});
    RenderedRoute = this;
    if ( typeof this.params.partner_id != 'undefined' ) {
      DisplayPartnerHeader(this.params.partner_id);
    }
  }, {
    name: 'realestate.aboutuspage'
})

Router.route('/:partner_id?/realestate/photoview/',
  function(){
    ResetSession();
    this.layout('realestate_layout_single');
    this.render('photo_view', {to:'centerarea'});
    this.render('nothing',{to: 'rightarea'});
    RenderedRoute = this;
    if ( typeof this.params.partner_id != 'undefined' ) {
      DisplayPartnerHeader(this.params.partner_id);
    }
  },{
  name: 'content.realestate.photoview'
  }
);

//Home Route
Router.route('/:partner_id?',
  function(){
    ResetSession()
    SetPageTitle(null);
    this.layout('realestate_layout_single');
    this.render('realestate_homepage',{to:'centerarea'});
    RenderedRoute = this;
    if ( typeof this.params.partner_id != 'undefined' ) {
      DisplayPartnerHeader(this.params.partner_id);
    }
  }, {
    name: 'content.realestate.homepage'
})

Router.route('/login',
  function(){
  this.layout('login_layout');
  this.render('login_page');
}, {
  name: 'joyfulhomelogin'
})


/*---------------HOOK ACTIONS FOR USER LOGIN ROUTES--------------------------*/
Router.onBeforeAction(function(){
  //If user is not logged in render login page
  if(!Meteor.userId()){
    this.layout('login_layout');
    this.render('login_page');
  } else{
    //Else continue running route
    this.next();
  }
})
