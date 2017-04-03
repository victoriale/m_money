// TODO: FIND OUT IFRAME ID

// Set partner header
Template.finance_layout.helpers({
  partner_header: function() {
    return Session.get('partner_header_code');
  },
  partner_height: function() {
    return Session.get('partner_header_height');
  }
});

Template.finance_layout_loading.helpers({
  partner_header: function() {
    return Session.get('partner_header_code');
  },
  partner_height: function() {
    return Session.get('partner_header_height');
  }
});

Template.finance_layout_home.helpers({
  partner_header: function() {
    return Session.get('partner_header_code');
  },
  partner_height: function() {
    return Session.get('partner_header_height');
  },
  myinvestkit: function() {
    if ( Router.current().url.match(/myinvestkit/) != null ) {
      return true;
    }
    return false;
  }
});

Template.finance_layout.onRendered(function(){
  this.autorun(function(){
    if(typeof Session.get('p_data') != 'undefined'){
      var nexstar = Session.get('p_data').corporate_name.toLowerCase();
      var params = Router.current().getParams();
      var nexstarAd = getDomainAds(params.partner_id);
      if(nexstar == 'nexstar'){
        $(document).ready(function() {
          var info = getTagInfo();
          //in globalfunc.js to grab nexstart alias script tag;
          var script_tag = getScript(params.partner_id);
          var alias = script_tag +'_passfail_leaderboard';
          alias = alias !== '' ? 'alias=' + ( alias.split("_") ? alias.split("_")[ 0 ] : alias ) + '_' + info.alias : '';
          // var script = '<scr'+'ipt src="http://' + info.domain + '.adtechus.com/addyn/3.0/5336.1/defaultplacementid/0/-1/ADTECH;' + alias + ';loc=100;target=_blank;grp=' + info.groupId + ';misc=' + new Date().getTime() + '"></scri'+'pt>'
          var scriptUrl = 'http://' + info.domain + '.adtechus.com/addyn/3.0/5336.1/'+ nexstarAd.banner +'/0/-1/ADTECH;' + alias + ';loc=100;target=_blank;grp=' + info.groupId + ';misc=' + new Date().getTime();
          //due to no access controller on their end decided to make a server side call to allow us to grab and parse out the tag_string
          Meteor.call('nexstarMethod',scriptUrl,function(error,data){
            if(data.statusCode == 304 || data.statusCode == 200){
              //display the whole header leaderboard_ad
              $(".leaderboard_ad").css('display','block');
              var tag_string = data.content;
              var bannerIframe = document.getElementById("leaderboard_iframe");
              var script = bannerIframe.contentWindow.document.createElement("script");
              script.type = "text/javascript";
              script.innerHTML = tag_string;
              bannerIframe.contentWindow.document.body.appendChild(script);
            }else{
              $(".leaderboard_ad").css('display','none');
            }
          });
        });
      }//end nexstar if statement
      else{
        $(".leaderboard_ad").css('display','none');
      }//end else
    }//end of p_data check
  })//and autorun
});
