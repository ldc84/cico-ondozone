
// --------------------------------------------------------------------------------
// window width
// load Event
// --------------------------------------------------------------------------------
let deviceChx;
(function($){
  $(function(){
    const win = $(window);
    win.on('load resize', function(){
      const wid = $(this).width();

      (wid < 767) ? deviceChx = 'mobile' : deviceChx = 'pc' ;
    });
  });
})(jQuery);

// --------------------------------------------------------------------------------
// header menu
// click Event
// --------------------------------------------------------------------------------

(function ($) {

  $(function () {
    const body = $('body');
    const wrap = $('#wrap');
    const header = $('#header');
    const menu = header.find('.menu');
    const menuBack = header.find('.menu-back');
    const gnb = $('#gnb');
    const searchBox = gnb.find('.search-box');
    const input = searchBox.find('.search-in input');

    // 메뉴 toggle
    menu.on('click', function () {
      const $this = $(this);

      if(header.hasClass('active')) {
        input.val('');
        header.removeClass('search');
        searchBox.removeClass('focus');
        $('.dim').remove();
      }else {
        wrap.append('<div class="dim"></div>')  
      }
      body.toggleClass('scroll-hidden');
      header.toggleClass('active');
      return false;

    });

    // 메뉴 close
    $(document).on('click', '.dim', function(){
      menu.trigger('click');
      return false;
    });

    // 메뉴로 돌아가기
    menuBack.on('click', function () {
      header.removeClass('search');
      input.val('');
      searchBox.removeClass('focus');
      return false;

    });

  });

})(jQuery);

// --------------------------------------------------------------------------------
// header search
// keyup Event
// --------------------------------------------------------------------------------

(function ($) {

  $(function () {

    const header = $('#header');
    const gnb = $('#gnb');
    const searchBox = gnb.find('.search-box');
    const input = searchBox.find('.search-in input');

    // 입력시
    input.on('keyup', myFunction);

    // 포커스 진입시
    input.on('focus', function(){
      if(this.value == ''){
        searchBox.addClass('focus');
      }
    });

    // 포커스 아웃시
    input.on('blur', function(){
      if(this.value == ''){
        searchBox.removeClass('focus');
      }
    });

    function myFunction() {

      const val = input[0].value;
      const filter = val.toUpperCase();
      const ul = gnb.find('.search-list');
      const li = ul.children('li');
      if(val == ''){
        header.removeClass('search');
      }else {
        header.addClass('search');
        for (i = 0; i < li.length; i++) {
          a = li[i].getElementsByTagName("a")[0];
          txtValue = a.textContent || a.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].classList = "";
          } else {
            li[i].classList = "hidden";
          }
        }
      }
    }
  });

})(jQuery);

// --------------------------------------------------------------------------------
// footer toggle - mobile
// click Event
// --------------------------------------------------------------------------------

(function ($) {

  $(function () {

    const footer = $('#footer');
    const h3 = footer.find('.container > div h3');

    h3.not(':first').on('click', function(){
      const $this = $(this);
      const $div = $this.parent('div');

      $div.toggleClass('active');
      
      return false;
    });

  });

})(jQuery);

// --------------------------------------------------------------------------------
// image lazy loader
// load Event
// --------------------------------------------------------------------------------

(function ($) {

  $(function () {

    $("img.lazyload").lazyload({
      effect : "fadeIn",
      placeholder:"/image/common/lazy_placeholder.png"
    });

  });

})(jQuery);

// --------------------------------------------------------------------------------
// list sorting
// click Event
// --------------------------------------------------------------------------------

(function ($) {

  $(function () {

    const tab = $('ul[data-sorting]');
    const tabLi = tab.find('> li');
    const tabA = tabLi.find('> a');

    tabA.not('[class="none"]').on('click', function(){
      const $this = $(this);
      const $li = $this.parent('li');
      const liSibl = $li.siblings('li');
      const $target = $this.attr('data-target');
      const list = $(tab.attr('data-sorting'));
      const listLi = list.find('li');

      $li.addClass('active');
      liSibl.removeClass('active');

      listLi.hide();
      list.find(`${$target}`).fadeIn(250);

      // listLi.removeClass('hidden');
      // listLi.not(`${$href}`).addClass('hidden');
      
      return false;
    });

  });

})(jQuery);

// --------------------------------------------------------------------------------
// faq toggle
// click Event
// --------------------------------------------------------------------------------

(function ($) {

  $(function () {

    const faq = $('.faq-list li');
    const faqA = faq.find('.qeustion');

    faqA.on('click', function(){
      const $this = $(this);
      const $li = $this.parent('li');
      const liSibl = $li.siblings('li');

      $li.toggleClass('active');
      liSibl.removeClass('active');
      
      return false;
    });

  });

})(jQuery);

// --------------------------------------------------------------------------------
// store toggle
// click Event
// --------------------------------------------------------------------------------

(function ($) {

  $(function () {

    const store = $('.store-list > li');
    const storeDepth1 = store.find('> a');
    const storeDepth2Ul = store.find('> ul');
    const storeDepth2Li = storeDepth2Ul.find('> li');
    const storeDepth2 = storeDepth2Li.find('> a');

    // depth1
    storeDepth1.on('click', function(){
      const $this = $(this);
      const $li = $this.parent('li');
      const liSibl = $li.siblings('li');

      liSibl.removeClass('active')
      $li.toggleClass('active');

      storeDepth2Ul.removeAttr('style');
      storeDepth2Li.removeAttr('class');

      return false;
    });

    // depth2
    storeDepth2.on('click', function(){
      const $this = $(this);
      const $li = $this.parent('li');
      const $ul = $li.parent('ul');
      const $childUl = $this.next();
      const liSibl = $li.siblings('li');

      if($li.hasClass('active')) {
        liSibl.removeClass('hide')
        $li.removeClass('active');
      }else {
        $li.removeClass('hide').addClass('active');
        liSibl.removeClass('active').addClass('hide');
        if(deviceChx !== 'mobile'){
          $ul.css('min-height',$childUl.height()+$li.position().top);
        }
      }

      console.log(deviceChx);
      
      return false;
    });

  });

})(jQuery);

// --------------------------------------------------------------------------------
// contactus
// form post
// --------------------------------------------------------------------------------

(function ($) {

  $(function () {

    var form = $('#form');
    var name = form.find('#name');
    var email = form.find('#email');
    var message = form.find('#message');
    var url = '';
    var layerSuccess = $('.layer-success');

    // submit 성공
    form.on('submit', function (e) {
      e.preventDefault();
      if (formValidation()) {
        send();
      }
    });

    var send = function () {
      // data
      var data = {
        'name': name.val(),
        'email': email.val(),
        'message': message.val()
      }

      // ajax post
      $.ajax({
        type: "POST",
        url: url,
        data: data,
        success: function (data) {
          console.log('success');
          document.getElementById('form').reset();
          $('.loading').hide();
          TweenLite.to(layerSuccess, .5, {
            left: 0,
            opacity: 1,
            zIndex: 20,
            ease: Expo.easeOut,
            onComplete: function () {
              TweenLite.to(layerSuccess, .5, {
                delay: 2,
                left: '100%',
                ease: Expo.easeOut,
                onComplete: function () {
                  TweenLite.to(layerSuccess, 0, {
                    left: '-100%',
                    opacity: 0,
                  });
                }
              });
            }
          });
        },
        error: function (data) {
          console.log('fail');
        }
      });
    }

    // email 체크
    function validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    // form validation
    function formValidation() {
      if (name.val() == '') {
        alert('Required Name field');
        name.focus();
        return false;
      } else if (!validateEmail(email.val()) || email.val() == '') {
        alert('Required Email field');
        email.focus();
        return false;
      } else if (message.val() == '') {
        alert('Required Message field');
        message.focus();
        return false;
      } else {
        $('.loading').show();
        return true;
      }
    }

  });
})(jQuery);