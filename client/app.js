//inizialize navigation and content layers
function layerInit(){
  var diameterValue = (Math.sqrt( Math.pow($(window).height(), 2) + Math.pow($(window).width(), 2))*2);
  $('.cd-overlay-nav').children('span').velocity({
    scaleX: 0,
    scaleY: 0,
    translateZ: 0,
  }, 50).velocity({
    height : diameterValue+'px',
    width : diameterValue+'px',
    top : -(diameterValue/2)+'px',
    left : -(diameterValue/2)+'px',
  }, 0);

  $('.cd-overlay-content').children('span').velocity({
    scaleX: 0,
    scaleY: 0,
    translateZ: 0,
  }, 50).velocity({
    height : diameterValue+'px',
    width : diameterValue+'px',
    top : -(diameterValue/2)+'px',
    left : -(diameterValue/2)+'px',
  }, 0);
}


Template.main.onCreated(function() {
  window.requestAnimationFrame(layerInit);
});



Template.main.onRendered(function () {

  $(window).on('resize', function(){
    window.requestAnimationFrame(layerInit);
  });

  mapboxgl.accessToken = "pk.eyJ1Ijoiaml0b3MiLCJhIjoiOXE1SHc4VSJ9.RRtkSxtWwF2e7jBnLskfiQ";
  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/jitos/cikohsmg800irbgm1e4za2mwk",
  });
  map.addControl(new mapboxgl.Directions({
    profile: 'cycling'
  }));

});



Template.main.events({

  'click .cd-nav-trigger': function(){

    if(!$('.cd-nav-trigger').hasClass('close-nav')) {
       //it means navigation is not visible yet - open it and animate navigation layer
       $('.cd-nav-trigger').addClass('close-nav');

       $('.cd-overlay-nav').children('span').velocity({
         translateZ: 0,
         scaleX: 1,
         scaleY: 1,
       }, 500, 'easeInCubic', function(){
         $('.cd-primary-nav').addClass('fade-in');
       });
     } else {
       //navigation is open - close it and remove navigation layer
       $('.cd-nav-trigger').removeClass('close-nav');

       $('.cd-overlay-content').children('span').velocity({
         translateZ: 0,
         scaleX: 1,
         scaleY: 1,
       }, 500, 'easeInCubic', function(){
         $('.cd-primary-nav').removeClass('fade-in');

         $('.cd-overlay-nav').children('span').velocity({
           translateZ: 0,
           scaleX: 0,
           scaleY: 0,
         }, 0);

         $('.cd-overlay-content').addClass('is-hidden').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
           $('.cd-overlay-content').children('span').velocity({
             translateZ: 0,
             scaleX: 0,
             scaleY: 0,
           }, 0, function(){$('.cd-overlay-content').removeClass('is-hidden');});
         });
         if($('html').hasClass('no-csstransitions')) {
           $('.cd-overlay-content').children('span').velocity({
             translateZ: 0,
             scaleX: 0,
             scaleY: 0,
           }, 0, function(){$('.cd-overlay-content').removeClass('is-hidden');});
         }
       });
     }
  }
});
