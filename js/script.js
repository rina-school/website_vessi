  // 定数
  const $header = $('.l-header');
  const $headerContent = $('.l-header__content');
  const $navBtn = $('.l-header__hamburger');
  const $nav = $('.l-header__nav');
  const $heroSlick = $('.js-hero-slick');
  const $heroImg = $('.p-hero__bg__img');
  const $anchorLink = $('a[href^="#"]');
  const $faqItem = $('.p-faq__item');
  const $productImg = $('.p-product__card__img');
  const $loading = $('.p-loading');
  const $loadingLogo = $('.p-loading__logo');
  const $loadingLogoFadeUp = $('.p-loading__logo__fadeup');
  const $loadingLogoLetter = $('.p-loading__logo__letter');
  const $jsLimitTextReview = $('.js-limit__text__review');
  const $jsLimitTextProduct = $('.js-limit__text__product');
  const $fadeIn = $('.js-fadeIn');
  const $eyecatch = $('.p-eyecatch');

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
    let scrollY = window.scrollY;

    // フェードイン対象要素が指定されたエリア内に来たらフェードイン実行
    $fadeIn.each(function() {
      let offset = $(this).offset().top;

      if(scrollY > offset - windowHeight) {
        $(this).addClass('is-scrollIn')
      }
    });
  })

  // ローディング画面
  $(window).on('load', function() {
    // スクロール停止
    scrollStop();

    // ロディング終了処理
    endLoading();

    // ページロードが8秒たったら強制終了
    setTimeout(endLoading(), 8000);
  });

  // 商品一覧の表示文字数制限（SP用）
  jsLimitTextFunction($jsLimitTextProduct, 50);

  // レビューの表示文字数制限（SP用）
  jsLimitTextFunction($jsLimitTextReview, 100);

  // ロード及びリサイズした時
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
    $('.p-hero__catchcopy__content, .p-hero__scroll').each(function() {
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

    // 商品画像をクリックした際のモーダルウィンドウ
    $productImg.on('click', function(e) {
      $productImg.modaal({
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

    // 768px以上のpcとタブレット（iosのタブレットは除く）のみアイキャッチをfixedで表示
    $eyecatch.each(function() {
      // 768px以上の場合
      if (window.innerWidth >= 768) {
        if ((navigator.userAgent.match(/iPhone|iPad/) && 'ontouchend' in document) || (navigator.userAgentData && navigator.userAgentData.mobile)) {

          if ($(this).hasClass('js-eyecatch-fixed')) {
            $(this).removeClass('js-eyecatch-fixed');
          }
  
        } else {
          if (!$(this).hasClass('js-eyecatch-fixed')) {
            $(this).addClass('js-eyecatch-fixed');
          }
        }

      // 767px以下の場合
      } else {
        if ($(this).hasClass('js-eyecatch-fixed')) {
          $(this).removeClass('js-eyecatch-fixed');
        }
      }
    });

    // 768px以上（PC用）の場合
    if (window.innerWidth >= 768) {

      // FAQの開閉
      $faqItem.each(function () {
        if ($(this).hasClass('js-faq-is-not-active')) {
          $(this).removeClass('js-faq-is-not-active');
          $(this).children('dd').slideDown();
        }
      });

    // 767px以下（SP用）の場合
    } else {

      // スマホ、タブレットでhero画像の高さを「viewportの高さいっぱい-(headerの高さ+URL、操作エリアの高さ)」にする
      if ((navigator.userAgent.match(/iPhone|iPad|Android.+Mobile|Macintosh/) && 'ontouchend' in document) || (navigator.userAgentData && navigator.userAgentData.mobile)) {
        const $height = window.innerHeight;
        $heroImg.css('height', $height);
        $nav.css('height', $height);
      }

      // FAQの開閉
      $faqItem.each(function () {
        if (!$(this).hasClass('js-faq-is-not-active')) {
          $(this).addClass('js-faq-is-not-active');
          $(this).children('dd').slideUp();
        }
      });
    }

    // FAQの開閉
    $faqItem.off('click');
    $faqItem.on('click', function(e) {
      $(this).toggleClass('js-faq-is-not-active');
      $(this).children('dd').slideToggle();
      e.stopPropagation();
    });
  });

  // 関数定義
  // 表示文字数制限（spanタグで編集しているものは全て小文字になるが許容する）
  function jsLimitTextFunction($element, $maxLength) {
    $element.each(function() {
      const $textWrapper = $(this);
      const fullText = $textWrapper.html();
      const text = $textWrapper.text();
      const $readMore = $('<a href="/" class="c-text__expand-link">もっと見る</a>');
  
      // ロード及びリサイズした時
      $(window).on('load resize', () => {
        if (window.innerWidth >= 768) {
          $textWrapper.html(fullText);
        } else {
          if (text.length > $maxLength) {
            const limitText = text.substring(0, $maxLength) + '... ';
            $textWrapper.html(limitText).append($readMore);
  
            $readMore.on('click', function(e) {
              e.preventDefault();
              $textWrapper.html(fullText);
              e.stopPropagation();
            });
          }
        }
      });
    });
  }

  // ローディング終了処理
  function endLoading() {
    $loadingLogoLetter.delay(2400).fadeOut('slow');
    $loadingLogoFadeUp.delay(2500).fadeOut('slow');
    $loadingLogo.delay(2600).fadeOut('slow');
    $loading.delay(2800).fadeOut('slow', function() {
      scrollStart();
    });
  }

  // スクロール停止の実施
  function scrollStop() {
    document.addEventListener('touchmove', noscroll, {passive: false});
    document.addEventListener('wheel', noscroll, {passive: false});
  }

  // スクロール停止の解除
  function scrollStart() {
    document.removeEventListener('touchmove', noscroll);
    document.removeEventListener('wheel', noscroll);
  }

  // スクロール停止・実行用
  function noscroll(e){
    e.preventDefault();
  }
