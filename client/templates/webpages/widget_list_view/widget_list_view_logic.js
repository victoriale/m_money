/*
Author: jyothyswaroop
Created: 07/30/2015
Description: followers page
Associated Files: list_view.less and list_view.html
*/

Template.widget_list_view.onCreated(function(){
  Session.set('lv_count', 0);
})

var backgroundStyle="tilewhite";
Template.widget_list_view.helpers({
  toplist:function(){
    // Get data
    var list_data = Session.get('ListData');
    if (typeof(list_data) == "undefined") {
      return false;
    }
      // Is partner but not subdomain
      // NOTE: URL rewriting happens in WidgetListController in /lib/router.js
      if(Router.current().params.partner_id && !Session.get('isSubDomain')) {
        $.map(list_data.data, function(val, index) {
          // Remove any apostrophes from images
          val['img'] = val['img'].replace(/'/g, '');
          // Strip root domain from DWL API
          val['url'] = val['url'].replace(/^.*\/\/[^\/]+/, '');
          // If there is a sub_img, replace that URL also
          if(val['sub_img']['url']) {
            val['sub_img']['url'] = val['sub_img']['url'].replace(/^.*\/\/[^\/]+/, '');
          }
        });
        // Is subdomain
      } else if (Session.get('isSubDomain')) {
        $.map(list_data.data, function(val, index) {
          // Remove any apostrophes from images
          val['img'] = val['img'].replace(/'/g, '');
          // Strip root domain from DWL API
          val['url'] = val['primary_url'].replace(/^.*\/\/[^\/]+/, '');
          // If there is a sub_img, replace that URL also
          if(val['sub_img']['url']) {
            val['sub_img']['url'] = val['sub_img']['primary_url'].replace(/^.*\/\/[^\/]+/, '');
          }
        });
      } else {
        // This is not a partner, so use relative links from DWL API
        $.map(list_data.data, function(val, index) {
          // Remove any apostrophes from images
          val['img'] = val['img'].replace(/'/g, '');
          // Strip root domain from DWL API
          val['url'] = val['primary_url'].replace(/^.*\/\/[^\/]+/, '');
          // If there is a sub_img, replace that URL also
          if(val['sub_img']['url']) {
            val['sub_img']['url'] = val['sub_img']['primary_url'].replace(/^.*\/\/[^\/]+/, '');
          }
        });
      }
    console.log(list_data.data);
    list_data.data = list_data.data.slice(Session.get('ListPage') * 10, (Session.get('ListPage') + 1) * 10);

    return list_data;
  },

  carouselList:function(){
    // Get and check data
    var list_data = Session.get('ListData'),
    list_index = Session.get('lv_count');
    if ( typeof(list_data) == "undefined" ) {
      return false;
    }
    // Is partner but not subdomain
    if(Router.current().params.partner_id && !Session.get('isSubDomain')) {
      $.map(list_data.data, function(val, index) {
        // Remove any apostrophes from images
        val['img'] = val['img'].replace(/'/g, '');
        // Strip root domain from DWL API
        val['url'] = val['url'].replace(/^.*\/\/[^\/]+/, '');
        // If there is a sub_img, replace that URL also
        if(val['sub_img']['url']) {
          val['sub_img']['url'] = val['sub_img']['url'].replace(/^.*\/\/[^\/]+/, '');
        }
      });
      // Is subdomain
    } else if (Session.get('isSubDomain')) {
      $.map(list_data.data, function(val, index) {
        // Remove any apostrophes from images
        val['img'] = val['img'].replace(/'/g, '');
        // Strip root domain from DWL API
        val['url'] = val['primary_url'].replace(/^.*\/\/[^\/]+/, '');
        // If there is a sub_img, replace that URL also
        if(val['sub_img']['url']) {
          val['sub_img']['url'] = val['sub_img']['primary_url'].replace(/^.*\/\/[^\/]+/, '');
        }
      });
    } else {
      // This is not a partner, so use relative links from DWL API
      $.map(list_data.data, function(val, index) {
        // Remove any apostrophes from images
        val['img'] = val['img'].replace(/'/g, '');
        // Strip root domain from DWL API
        val['url'] = val['primary_url'].replace(/^.*\/\/[^\/]+/, '');
        // If there is a sub_img, replace that URL also
        if(val['sub_img']['url']) {
          val['sub_img']['url'] = val['sub_img']['primary_url'].replace(/^.*\/\/[^\/]+/, '');
        }
      });
    }
    // Return the correct data
    return list_data.data[(Session.get('ListPage') * 10) + list_index];
  },

  backurl: function() {
    return Router.pick_path('content.locationprofile', {loc_id: "National"});
  },

  page_nav: function() {
    var page = Session.get('ListPage'),
    data = Session.get('ListData');

    if ( typeof(data) == "undefined" ) {
      return false;
    }

    var pages = [],
    query = Router.current().params.query;
    for ( var i = 0; i < Math.ceil(data.data.length / 10); i++ ) {
      query.page = i + 1;
      pages[i] = {
        page: i + 1,
        url: Router.pick_path("content.widgetlist", {query: query}),
        class: i == page ? "active" : ""
      };
    }

    return {
      bubble: pages
    };
  }
});
//This handles the events on button clicks of 1,2,3 and 200
Template.widget_list_view.events({
  'click .dwl-car-left': function() {
    var data = Session.get('ListData'),
    count = Session.get('lv_count'),
    page = Session.get('ListPage');

    if ( typeof(data) == "undefined" ) {
      return false;
    }

    if ( count-- < 1 ) {
      count = data.data.slice(page * 10, (page + 1) * 10).length - 1;
    }

    Session.set('lv_count', count);
  },
  'click .dwl-car-right': function() {
    var data = Session.get('ListData'),
    count = Session.get('lv_count'),
    page = Session.get('ListPage');

    if ( typeof(data) == "undefined" ) {
      return false;
    }

    if ( count++ > data.data.slice(page * 10, (page + 1) * 10).length - 2 ) {
      count = 0;
    }

    Session.set('lv_count', count);
  },
});
