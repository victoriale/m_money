Template.left_ad_zone.onRendered(function(){
  $(document).on('scroll',function() {
    var y_buffer = 10;
    var y_top = $('.layout_nav').offset().top + $('.layout_nav').height();
    if ( $(window).scrollTop() < $('.finance_body').offset().top + y_buffer ) {
      $('.ad_zone-test').attr('style','');
    } else if ( $(window).scrollTop() + $('.ad_zone-test').height() + (y_buffer * 2) > ($('.footer-standard').offset().top + 100)) {
      $('.ad_zone-test').attr('style','');
      $('.ad_zone-test').css({top: 'auto', bottom: y_buffer + 'px'});
    } else {
      $('.ad_zone-test').attr('style','');
      $('.ad_zone-test').css({position: 'fixed', top: y_buffer + 'px'});
    }
  });
  this.autorun(function(){
    if(typeof Session.get('p_data') != 'undefined'){
      var nexstar = Session.get('p_data').corporate_name.toLowerCase();
      var params = Router.current().getParams();
      if(nexstar == 'nexstar'){
        $(document).ready(function() {
          var info = getTagInfo();
          //in globalfunc.js to grab nexstart alias script tag;
          var script_tag = getScript(params.partner_id);
          var alias = script_tag+'_passfail_skyscraper';
          alias = alias !== '' ? 'alias=' + ( alias.split("_") ? alias.split("_")[ 0 ] : alias ) + '_' + info.alias : '';
          // var script = '<scr'+'ipt src="http://' + info.domain + '.adtechus.com/addyn/3.0/5336.1/defaultplacementid/0/-1/ADTECH;' + alias + ';loc=100;target=_blank;grp=' + info.groupId + ';misc=' + new Date().getTime() + '"></scri'+'pt>'
          var scriptUrl = 'http://' + info.domain + '.adtechus.com/addyn/3.0/5336.1/defaultplacementid/0/-1/ADTECH;' + alias + ';loc=100;target=_blank;grp=' + info.groupId + ';misc=' + new Date().getTime();
          //due to no access controller on their end decided to make a server side call to allow us to grab and parse out the tag_string
          Meteor.call('nexstarMethod',scriptUrl,function(error,data){
            var tag_string = data.content;
            tag_string = tag_string.replace("document.write('", '').replace("');", '');
            $(".ad_zone-test").append(tag_string);
          });
        });
      }//end if nexstar
      else{
        $('.finance_body_skyscraper').css('display','none');
      }//end else
    }//end of p_data if statement
  })//end of autorun
});

Template.left_ad_zone.onDestroyed(function(){
  $(document).unbind('scroll');
});

Template.left_ad_zone.events({
  'scroll body': function(){
    console.log('SCROLL');
  }
})
