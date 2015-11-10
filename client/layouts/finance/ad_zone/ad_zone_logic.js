Template.ad_zone.onRendered(function(){
  $(document).on('scroll',function() {
    var y_stop = 10;
    var y_stop = $('.layout_nav').offset().top + $('.layout_nav').height();
    if ( $(window).scrollTop() >= ($('.ad_zone-widget1-area').offset().top - y_stop) && ($('.ad_zone-widget1-area').offset().top + $('.ad_zone-widget1-area').height() + 25) >= $('.footer-standard').offset().top ) {
      console.log(1);
      $('.ad_zone-widget1-area').attr('style','');
      $('.ad_zone-widget1-area').css({position: 'absolute', bottom: '0px'});
    } else if ( $(window).scrollTop() > $('.ad_zone-widget1-area').offset().top || ($(window).scrollTop() <= ($('.ad_zone-widget1-area').offset().top - y_stop) && ($('.ad_zone-widget1-area').offset().top + $('.ad_zone-widget1-area').height() + 25) <= $('.footer-standard').offset().top && $(window).scrollTop() > y_stop) ) {
      console.log(2);
      $('.ad_zone-widget1-area').attr('style','');
      $('.ad_zone-widget1-area').css({position: 'fixed', top: '10px'});
    } else if ( $(window).scrollTop() <= y_stop && $(window).scrollTop() < $('.ad_zone-widget1-area').offset().top ) {
      console.log(3);
      $('.ad_zone-widget1-area').attr('style','');
    } else {
      console.log(4);
    }
  })
});

Template.ad_zone.onDestroyed(function(){
  $(document).unbind('scroll');
});

Template.ad_zone.events({
  'scroll body': function(){
    console.log('SCROLL');
  }
})
