Template.left_ad_zone.onRendered(function(){
  this.autorun(function(){
    $(document).on('scroll',function() {
      var y_buffer = 10;
      var y_top = $('.layout_nav').offset().top + $('.layout_nav').height();
      if ( $(window).scrollTop() < $('.finance_body').offset().top + y_buffer ) {
        $('.ad_zone-placement').attr('style','');
      } else if ( $(window).scrollTop() + $('.ad_zone-placement').height() + (y_buffer * 2) > ($('.footer-standard').offset().top + 100)) {
        $('.ad_zone-placement').attr('style','');
        $('.ad_zone-placement').css({top: 'auto', bottom: y_buffer + 'px'});
      } else {
        $('.ad_zone-placement').attr('style','');
        $('.ad_zone-placement').css({position: 'fixed', top: y_buffer + 'px'});
      }
    });
  })
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
          var alias = script_tag+'_passfail_skyscraper';
          alias = alias !== '' ? 'alias=' + ( alias.split("_") ? alias.split("_")[ 0 ] : alias ) + '_' + info.alias : '';
          // var script = '<scr'+'ipt src="http://' + info.domain + '.adtechus.com/addyn/3.0/5336.1/defaultplacementid/0/-1/ADTECH;' + alias + ';loc=100;target=_blank;grp=' + info.groupId + ';misc=' + new Date().getTime() + '"></scri'+'pt>'
          var scriptUrl = 'http://' + info.domain + '.adtechus.com/addyn/3.0/5336.1/' + nexstarAd.skyscraper + '/0/-1/ADTECH;' + alias + ';loc=100;target=_blank;grp=' + info.groupId + ';misc=' + new Date().getTime();
          //due to no access controller on their end decided to make a server side call to allow us to grab and parse out the tag_string
          Meteor.call('nexstarMethod',scriptUrl,function(error,data){
            if(data.statusCode == 304 || data.statusCode == 200){
              $(".ad_zone-placement").css('display','block');
              var tag_string = data.content;
              if(tag_string.split('document.write("').length > 1){
                tag_string = tag_string.split('document.write("').join('').split('");').join('');
                tag_string = tag_string.replace(/\\n/g, '').replace(/\\"/g, '');
              }else{
                tag_string = tag_string.replace("document.write('", '').replace("');", '');
              }
              //appends content into a child elemement of leaderboard_ad called ad_zone-placement
              $(".ad_zone-placement").append(tag_string);
              //check whether the correct size ad is being returned otherwise remove the leaderboard_ad area
              var az_ph = $(".ad_zone-placement").height();
              var az_pw = $(".ad_zone-placement").width();

              // if(az_ph < 600 || az_pw < 160){
              //   console.log("ERROR: size of skyscraper ad is less than 160px width or 600px height");
              //   $(".finance_body_skyscraper").css('display','none');
              // }
            }else{
              $(".ad_zone-placement").css('display','none');
            }
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
