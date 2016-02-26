// TODO: FIND OUT IFRAME ID

// Set partner header
Template.finance_layout.helpers({
  partner_header: function() {
    return Session.get('partner_header_code');
  }
});

Template.finance_layout_loading.helpers({
  partner_header: function() {
    return Session.get('partner_header_code');
  }
});

Template.finance_layout_home.helpers({
  partner_header: function() {
    return Session.get('partner_header_code');
  },
  myinvestkit: function() {
    if ( Router.current().url.match(/myinvestkit/) != null ) {
      return true;
    }
    return false;
  }
});

Template.finance_layout.onRendered(function(){
  if(typeof Session.get('p_data') != 'undefined'){
    var nexstar = Session.get('p_data').corporate_name.toLowerCase();
    var params = Router.current().getParams();
  }
  if(nexstar == 'nexstar'){
    $(document).ready(function() {
      var info = getTagInfo();
      //in globalfunc.js to grab nexstart alias script tag;
      var script_tag = getScript(params.partner_id);
      var alias = script_tag +'_passfail_leaderboard';
      alias = alias !== '' ? 'alias=' + ( alias.split("_") ? alias.split("_")[ 0 ] : alias ) + '_' + info.alias : '';
      // var script = '<scr'+'ipt src="http://' + info.domain + '.adtechus.com/addyn/3.0/5336.1/defaultplacementid/0/-1/ADTECH;' + alias + ';loc=100;target=_blank;grp=' + info.groupId + ';misc=' + new Date().getTime() + '"></scri'+'pt>'
      var scriptUrl = 'http://' + info.domain + '.adtechus.com/addyn/3.0/5336.1/defaultplacementid/0/-1/ADTECH;' + alias + ';loc=100;target=_blank;grp=' + info.groupId + ';misc=' + new Date().getTime();

      //due to no access controller on their end decided to make a server side call to allow us to grab and parse out the tag_string
      Meteor.call('nexstarMethod',scriptUrl,function(error,data){
        var tag_string = data.content;
        tag_string = tag_string.replace("document.write('", '').replace("');", '');
        $(".leaderboard_ad").append(tag_string);
      });
    });
  }else{
    $(".leaderboard_ad").css('display','none');
  }
});
