$(document).ready(function () {

  // 定数
  const $header = $('.l-header');
  const $headerContent = $('.l-header__content');
  const $navBtn = $('.l-header__hamburger');
  const $heroSlick = $('.js-hero-slick');
  const $heroImg = $('.p-hero__bg__list__item__img');
  const $anchorLink = $('a[href^="#"]');
  const $faqListItem = $('.p-faq__list__item');
  const $productImgPicture = $('.p-product__card__img__picture');

  // スクロールジャンクの警告メッセージへの対応
  jQuery.event.special.touchstart = {
    setup: function (_, ns, handle) {
      this.addEventListener('touchstart', handle, { passive: true });
    }
  };

  jQuery.event.special.touchmove = {
    setup: function (_, ns, handle) {
      this.addEventListener('touchmove', handle, { passive: true });
    }
  };

  // スクロールした場合の処理
  $(window).on('scroll', () => {
    let windowHeight = window.innerHeight;
    let scrollTop = $(window).scrollTop();
    
    // cssのアニメーション処理
    $('.p-wave__shape__fill').each(function () {
      let position = $(this).offset().top;
      if (scrollTop > position - windowHeight) {
        $(this).addClass('js-animetion-scroll');
      }
    });
  });

  $(window).on('load resize', () => {
    let windowHeight = window.innerHeight;
    let scrollTop = $(window).scrollTop();

    // スクロールした場合の処理
    $(window).on('scroll', () => {

      // cssのアニメーション処理
      $('.p-wave__shape__fill').each(function() {
        let position = $(this).offset().top;
        if (scrollTop > position - windowHeight) {
          $(this).addClass('js-animetion-scroll');
        }
      });

    });

    // cssのアニメーション処理（スクロールなし）
    $('.p-hero__text__catchcopy__content, .p-hero__scroll').each(function () {
      if (!$(this).hasClass('js-animation')) {
        $(this).addClass('js-animation');
      }
    });

    // ハンバーガーメニューのクリック時処理
    $navBtn.off('click');
    $navBtn.on('click', e => {
    $header.toggleClass('js-nav-is-active');

      // ヘッダーロゴがクリックされればハンバーガーメニューは閉じる
      if ($('.logo').on('click', e => {
        $header.removeClass('js-nav-is-active');
      }))

      e.stopPropagation();
    });

    // ページ内リンクについての処理
    $anchorLink.off('click');
    $anchorLink.on('click', function (e) {

      // ハンバーガーメニューでクリックされていた場合、ハンバーガーメニューを閉じる
      if ($header.hasClass('js-nav-is-active')) {
        $header.removeClass('js-nav-is-active');
      }

      // リンク先の要素を取得
      let href = $(this).attr('href');
      let target = $(href == '#' || href == '' ? 'html' : href);
      // リンク先の要素が存在する場合はスクロール処理を実行
      if (target.length) {
        let headerOuterHeight = $headerContent.outerHeight();
        // ヘッダーの高さを考慮してスクロール位置を計算
        let position = target.offset().top - headerOuterHeight + 50;
        // スクロールアニメーションを実行（LazyLoad対応版）
        $.when(
          $('html, body').animate({ scrollTop: position }, 500, 'swing'),
          e.preventDefault(),
        ).done(function () {
          let diff = target.offset().top - headerOuterHeight;
          if (diff === position) {
          } else {
            $('html, body').animate({ scrollTop: diff }, 10, 'swing');
          }
        });
        return false;
      }
      e.stopPropagation();
    });

    // hero画像のスライダーでエラーが出たのでその対処
    document.addEventListener('turbolinks:before-cache', function(){
      $('.slider.slick-initialized').slick('unslick');
    });

    // hero画像のクロスフェードイン
    $heroSlick.each(function () {
      $heroSlick.not('.slick-initialized').slick({
        fade: true,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 2800,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: false,
        arrows: false, // 矢印
        dots: false, // インジケーター
        pauseOnFocus: false,//フォーカスで一時停止
        pauseOnHover: false,//マウスホバーで一時停止
      });

      //スマホ用：スライダーをタッチしても止めずにスライド
      $heroSlick.on('touchmove', function(event, slick, currentSlide, nextSlide){
        $heroSlick.slick('slickPlay');
      });
    });

    // スマホ、タブレットでメインビジュアルの高さを「viewportの高さいっぱい-headerの高さ」にする
    if ((navigator.userAgent.match(/iPhone|iPad|Android.+Mobile|Macintosh/) && 'ontouchend' in document) || (navigator.userAgentData && navigator.userAgentData.mobile)) {
      let headerHeight = $headerFix[0].getBoundingClientRect().height;
      $heroImg.height(windowHeight - headerHeight);
    }

    // 商品画像をクリックした際のモーダルウィンドウ
    $productImgPicture.on('click', function(e) {
      $productImgPicture.modaal({
        type: 'image',
        overlay_close: true,//モーダル背景クリック時に閉じるか
        before_open: function(){// モーダルが開く前に行う動作
          $('html').css('overflow-y','hidden');/*縦スクロールバーを出さない*/
          if (!$(this).hasClass('js-product-modaal-active')) {
            $(this).addClass('js-product-modaal-active');
          }
        },
        after_close:function(){// モーダルが閉じた後に行う動作
          $('html').css('overflow-y','scroll');/*縦スクロールバーを出す*/
          if ($(this).hasClass('js-product-modaal-active')) {
            $(this).removeClass('js-product-modaal-active');
          }
        },
      });
    });

    // FAQの開閉
    // 768px以上（PC用）の場合
    if (window.innerWidth > 767) {
      $faqListItem.each(function () {
        if ($(this).hasClass('js-faq-is-not-active')) {
          $(this).removeClass('js-faq-is-not-active');
          $(this).children('dd').slideDown();
        }
      });
    // 767px以下（SP用）の場合
    } else {
      $faqListItem.each(function () {
        if (!$(this).hasClass('js-faq-is-not-active')) {
          $(this).addClass('js-faq-is-not-active');
          $(this).children('dd').slideUp();
        }
      });
    }
    $faqListItem.off('click');
    $faqListItem.on('click', function(e) {
      $(this).toggleClass('js-faq-is-not-active');
      $(this).children('dd').slideToggle();
      e.stopPropagation();
    });
  });
})