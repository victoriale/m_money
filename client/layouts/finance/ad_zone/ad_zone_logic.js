Template.ad_zone.onRendered(function(){
  $(document).on('scroll',function() {
    var y_buffer = 10;
    var y_top = $('.layout_nav').offset().top + $('.layout_nav').height();
    if ( $(window).scrollTop() < $('.finance_body').offset().top + y_buffer ) {
      $('.ad_zone-widget1-area').attr('style','');
    } else if ( $(window).scrollTop() + $('.ad_zone-widget1-area').height() + (y_buffer * 2) > $('.footer-standard').offset().top ) {
      $('.ad_zone-widget1-area').attr('style','');
      $('.ad_zone-widget1-area').css({top: 'auto', bottom: y_buffer + 'px'});
    } else {
      $('.ad_zone-widget1-area').attr('style','');
      $('.ad_zone-widget1-area').css({position: 'fixed', top: y_buffer + 'px'});
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
