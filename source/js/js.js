
// --------------------------------------------------------------------------------
// card menu
// click Event
// --------------------------------------------------------------------------------

(function ($) {

  $(function () {
    const cardSection = $('.card-section > section');
    const dim = $('.dim');

    // 메뉴 show
    cardSection.on('click', function () {
      const $this = $(this);

      dim.fadeIn(800);
      $this.addClass('active');
      $this.addClass('z-index-up');

      return false;
    });

    dim.on('click', function () {
      dim.fadeOut(800);
      cardSection.removeClass('active');

      
      return false;
    });

    cardSection.on('transitionend', function(){
      if(!cardSection.hasClass('active')) cardSection.removeClass('z-index-up');
    });

  });

})(jQuery);